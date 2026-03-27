import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export interface Comment {
  id: string;
  user_id: string;
  issue_id: string;
  parent_id: string | null;
  content: string;
  is_official: boolean;
  created_at: string;
  author_name: string;
  author_avatar?: string;
  replies?: Comment[];
}

export const useComments = (issueId: string) => {
  return useQuery({
    queryKey: ["comments", issueId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("comments")
        .select("*")
        .eq("issue_id", issueId)
        .order("created_at", { ascending: true });

      if (error) throw error;

      // Fetch profiles for comment authors
      const userIds = [...new Set((data || []).map((c) => c.user_id))];
      const { data: profiles } = await supabase.from("profiles").select("user_id, display_name, avatar_url").in("user_id", userIds);
      const profileMap = new Map((profiles || []).map((p) => [p.user_id, p]));

      const flat = (data || []).map((c: any) => ({
        id: c.id,
        user_id: c.user_id,
        issue_id: c.issue_id,
        parent_id: c.parent_id,
        content: c.content,
        is_official: c.is_official,
        created_at: c.created_at,
        author_name: c.profiles?.display_name || "Anonymous",
        author_avatar: c.profiles?.avatar_url,
      }));

      // Build thread tree
      const roots: Comment[] = [];
      const map = new Map<string, Comment>();
      flat.forEach((c: Comment) => { map.set(c.id, { ...c, replies: [] }); });
      flat.forEach((c: Comment) => {
        const node = map.get(c.id)!;
        if (c.parent_id && map.has(c.parent_id)) {
          map.get(c.parent_id)!.replies!.push(node);
        } else {
          roots.push(node);
        }
      });
      return roots;
    },
    enabled: !!issueId,
  });
};

export const useAddComment = () => {
  const qc = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async ({
      issueId,
      content,
      parentId,
    }: {
      issueId: string;
      content: string;
      parentId?: string;
    }) => {
      if (!user) throw new Error("Please sign in to comment");
      const { error } = await supabase.from("comments").insert({
        user_id: user.id,
        issue_id: issueId,
        content,
        parent_id: parentId || null,
      });
      if (error) throw error;

      // Update comment count
      const { count } = await supabase
        .from("comments")
        .select("id", { count: "exact" })
        .eq("issue_id", issueId);
      await supabase.from("issues").update({ comments_count: count || 0 }).eq("id", issueId);
    },
    onSuccess: (_, vars) => {
      qc.invalidateQueries({ queryKey: ["comments", vars.issueId] });
      qc.invalidateQueries({ queryKey: ["issues"] });
      qc.invalidateQueries({ queryKey: ["issue"] });
      toast.success("Comment posted!");
    },
    onError: (e: Error) => toast.error(e.message),
  });
};

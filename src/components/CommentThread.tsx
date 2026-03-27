import { useState } from "react";
import { CheckCircle, Reply, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/AuthContext";
import { useAddComment, type Comment } from "@/hooks/useComments";
import { formatDistanceToNow } from "date-fns";

const CommentNode = ({ comment, issueId, depth = 0 }: { comment: Comment; issueId: string; depth?: number }) => {
  const [replying, setReplying] = useState(false);
  const [replyText, setReplyText] = useState("");
  const { user } = useAuth();
  const addComment = useAddComment();
  const initials = comment.author_name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();

  const handleReply = () => {
    if (!replyText.trim()) return;
    addComment.mutate(
      { issueId, content: replyText, parentId: comment.id },
      { onSuccess: () => { setReplyText(""); setReplying(false); } }
    );
  };

  return (
    <div className={depth > 0 ? "ml-6 border-l-2 border-border pl-4" : ""}>
      <div className="bg-card border border-border rounded-lg p-4 mb-2">
        <div className="flex items-center gap-2 mb-2">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
            comment.is_official ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"
          }`}>
            {initials}
          </div>
          <div>
            <div className="text-sm font-semibold text-foreground flex items-center gap-1">
              {comment.author_name}
              {comment.is_official && <CheckCircle className="w-3.5 h-3.5 text-primary" />}
            </div>
            <div className="text-xs text-muted-foreground">
              {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
              {comment.is_official && " · Official Response"}
            </div>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mb-2">{comment.content}</p>
        {user && depth < 3 && (
          <button
            onClick={() => setReplying(!replying)}
            className="text-xs text-primary hover:underline flex items-center gap-1"
          >
            <Reply className="w-3 h-3" /> Reply
          </button>
        )}
      </div>

      {replying && (
        <div className="ml-6 mb-2 flex gap-2">
          <Textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Write a reply..."
            className="text-sm min-h-[60px]"
          />
          <Button size="icon" onClick={handleReply} disabled={addComment.isPending}>
            <Send className="w-4 h-4" />
          </Button>
        </div>
      )}

      {comment.replies?.map((reply) => (
        <CommentNode key={reply.id} comment={reply} issueId={issueId} depth={depth + 1} />
      ))}
    </div>
  );
};

export default CommentNode;

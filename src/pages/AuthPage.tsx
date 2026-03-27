import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { regions } from "@/data/sampleData";
import logo from "@/assets/ghana-star-logo.png";

const sampleDistricts: Record<string, string[]> = {
  Ashanti: ["Kumasi Metropolitan", "Obuasi Municipal", "Ejisu Municipal"],
  "Greater Accra": ["Accra Metropolitan", "Tema Metropolitan", "Ga South Municipal"],
  Northern: ["Tamale Metropolitan", "Sagnarigu Municipal", "Yendi Municipal"],
  Western: ["Sekondi-Takoradi Metropolitan", "Tarkwa-Nsuaem Municipal"],
  Bono: ["Sunyani Municipal", "Dormaa Municipal"],
};

const sampleConstituencies: Record<string, string[]> = {
  "Kumasi Metropolitan": ["Kumasi Central", "Nhyiaeso", "Subin"],
  "Accra Metropolitan": ["Accra Central", "Odododiodoo", "Ablekuma South"],
  "Tamale Metropolitan": ["Tamale Central", "Tamale South", "Sagnarigu"],
  "Sekondi-Takoradi Metropolitan": ["Takoradi", "Sekondi", "Essikado-Ketan"],
  "Sunyani Municipal": ["Sunyani East", "Sunyani West"],
};

const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [region, setRegion] = useState("");
  const [district, setDistrict] = useState("");
  const [constituency, setConstituency] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { display_name: displayName },
            emailRedirectTo: window.location.origin,
          },
        });
        if (error) throw error;

        // Update profile with constituency info
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          await supabase.from("profiles").update({
            constituency,
            region,
            district,
          }).eq("user_id", user.id);
        }

        toast.success("Account created! Check your email to verify.");
        navigate("/feed");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Welcome back!");
        navigate("/feed");
      }
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const districts = region ? sampleDistricts[region] || [] : [];
  const constituencies = district ? sampleConstituencies[district] || [] : [];

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <img src={logo} alt="Ghana CIT" className="w-12 h-12 mx-auto mb-2" />
          <CardTitle className="font-display text-2xl">
            {isSignUp ? "Join Ghana CIT" : "Welcome Back"}
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            {isSignUp ? "Your voice matters. Sign up to report issues." : "Sign in to your account"}
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" value={displayName} onChange={(e) => setDisplayName(e.target.value)} required />
              </div>
            )}
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} />
            </div>

            {isSignUp && (
              <>
                <div>
                  <Label>Region</Label>
                  <Select value={region} onValueChange={(v) => { setRegion(v); setDistrict(""); setConstituency(""); }}>
                    <SelectTrigger><SelectValue placeholder="Select region" /></SelectTrigger>
                    <SelectContent>{regions.map((r) => <SelectItem key={r} value={r}>{r}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                {districts.length > 0 && (
                  <div>
                    <Label>District</Label>
                    <Select value={district} onValueChange={(v) => { setDistrict(v); setConstituency(""); }}>
                      <SelectTrigger><SelectValue placeholder="Select district" /></SelectTrigger>
                      <SelectContent>{districts.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                )}
                {constituencies.length > 0 && (
                  <div>
                    <Label>Constituency</Label>
                    <Select value={constituency} onValueChange={setConstituency}>
                      <SelectTrigger><SelectValue placeholder="Select constituency" /></SelectTrigger>
                      <SelectContent>{constituencies.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                )}
              </>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Please wait..." : isSignUp ? "Create Account" : "Sign In"}
            </Button>
          </form>

          <div className="mt-4 text-center">
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-sm text-primary hover:underline"
            >
              {isSignUp ? "Already have an account? Sign in" : "Don't have an account? Sign up"}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthPage;

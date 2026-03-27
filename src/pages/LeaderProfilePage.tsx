import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Star, CheckCircle, Clock, MessageCircle, BarChart3 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { sampleLeaders, sampleIssues } from "@/data/sampleData";
import BottomNav from "@/components/BottomNav";

const LeaderProfilePage = () => {
  const { id } = useParams();
  const leader = sampleLeaders.find((l) => l.id === id);

  if (!leader) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-display text-2xl font-bold text-foreground mb-2">Leader Not Found</h2>
          <Link to="/leaderboard" className="text-primary underline">Back to Leaders</Link>
        </div>
      </div>
    );
  }

  const constituencyIssues = sampleIssues.filter((i) => i.constituency === leader.constituency);
  const ignoredIssues = constituencyIssues.filter((i) => !i.hasOfficialResponse && i.magnitudeScore > 500);

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <header className="sticky top-0 z-40 bg-background/90 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto flex items-center h-14 px-4 gap-3">
          <Link to="/leaderboard" className="text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="font-display font-semibold text-foreground truncate text-sm">Leader Profile</h1>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-2xl">
        {/* Profile Card */}
        <div className="bg-card border border-border rounded-xl p-6 mb-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-2xl font-display font-bold text-primary">
              {leader.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-display text-xl font-bold text-foreground">{leader.name}</h2>
                {leader.verified && <CheckCircle className="w-5 h-5 text-primary" />}
              </div>
              <div className="text-sm text-muted-foreground">
                {leader.role.toUpperCase()} · {leader.constituency} · {leader.party}
              </div>
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-6 h-6 ${star <= Math.round(leader.rating) ? "fill-secondary text-secondary" : "text-border"}`}
                />
              ))}
            </div>
            <span className="font-display text-2xl font-bold text-foreground">{leader.rating.toFixed(1)}</span>
            <span className="text-sm text-muted-foreground">({leader.totalRatings.toLocaleString()} ratings)</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {[
            { label: "Response Rate", value: `${leader.responseRate}%`, icon: BarChart3, color: leader.responseRate >= 50 ? "text-primary" : "text-accent" },
            { label: "Avg Response", value: leader.avgResponseTime, icon: Clock, color: "text-foreground" },
            { label: "Issues Responded", value: `${leader.issuesResponded}/${leader.totalIssues}`, icon: MessageCircle, color: "text-foreground" },
            { label: "Rating Trend", value: leader.rating >= 3.5 ? "↑ Rising" : "↓ Declining", icon: BarChart3, color: leader.rating >= 3.5 ? "text-primary" : "text-accent" },
          ].map((stat) => (
            <div key={stat.label} className="bg-card border border-border rounded-xl p-4">
              <stat.icon className={`w-5 h-5 ${stat.color} mb-2`} />
              <div className={`font-display text-xl font-bold ${stat.color}`}>{stat.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Top Ignored Issues */}
        {ignoredIssues.length > 0 && (
          <div className="mb-6">
            <h3 className="font-display text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
              🚨 Top Issues Ignored
            </h3>
            <div className="space-y-2">
              {ignoredIssues.map((issue) => (
                <Link key={issue.id} to={`/issue/${issue.id}`}>
                  <div className="bg-accent/5 border border-accent/20 rounded-lg p-3 hover:bg-accent/10 transition-colors">
                    <div className="font-medium text-sm text-foreground">{issue.title}</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Score: {issue.magnitudeScore} · {issue.daysOpen} days without response
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default LeaderProfilePage;

import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ArrowUp, Users, MessageCircle, CheckCircle, Share2, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { sampleIssues } from "@/data/sampleData";
import BottomNav from "@/components/BottomNav";

const IssueDetailPage = () => {
  const { id } = useParams();
  const issue = sampleIssues.find((i) => i.id === id);

  if (!issue) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-display text-2xl font-bold text-foreground mb-2">Issue Not Found</h2>
          <Link to="/feed" className="text-primary underline">Back to Feed</Link>
        </div>
      </div>
    );
  }

  const urgencyColors = {
    low: "bg-urgency-low text-primary-foreground",
    medium: "bg-urgency-medium text-secondary-foreground",
    high: "bg-urgency-high text-primary-foreground",
    critical: "bg-urgency-critical text-accent-foreground",
  };

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/90 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto flex items-center h-14 px-4 gap-3">
          <Link to="/feed" className="text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="font-display font-semibold text-foreground truncate text-sm">Issue Details</h1>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-2xl">
        {/* Badges */}
        <div className="flex items-center gap-2 flex-wrap mb-4">
          <Badge variant="secondary">{issue.category}</Badge>
          <Badge className={urgencyColors[issue.urgency]}>{issue.urgency.charAt(0).toUpperCase() + issue.urgency.slice(1)}</Badge>
          {issue.hasOfficialResponse && (
            <Badge className="bg-primary text-primary-foreground gap-1">
              <CheckCircle className="w-3 h-3" /> Official Response
            </Badge>
          )}
        </div>

        {/* Title */}
        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">
          {issue.title}
        </h2>

        {/* Meta */}
        <div className="flex items-center gap-3 text-sm text-muted-foreground mb-6">
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>{issue.constituency}, {issue.region}</span>
          </div>
          <span>·</span>
          <span>{issue.daysOpen} days ago</span>
          <span>·</span>
          <span>by {issue.authorName}</span>
        </div>

        {/* Magnitude */}
        <div className="bg-card border border-border rounded-xl p-4 mb-6">
          <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">Magnitude Score</div>
          <div className="flex items-end gap-4">
            <span className="font-display text-4xl font-bold text-primary">{issue.magnitudeScore}</span>
            <div className="flex gap-4 pb-1">
              <div className="text-center">
                <div className="font-semibold text-foreground">{issue.upvotes}</div>
                <div className="text-xs text-muted-foreground">Upvotes</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-accent">{issue.meTooCount}</div>
                <div className="text-xs text-muted-foreground">Me Too</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-foreground">{issue.commentsCount}</div>
                <div className="text-xs text-muted-foreground">Comments</div>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mb-6">
          <h3 className="font-display text-lg font-semibold text-foreground mb-2">Description</h3>
          <p className="text-muted-foreground leading-relaxed">{issue.description}</p>
        </div>

        {/* Action buttons */}
        <div className="flex gap-3 mb-8">
          <Button className="flex-1 gap-2">
            <ArrowUp className="w-4 h-4" /> Upvote
          </Button>
          <Button variant="destructive" className="flex-1 gap-2">
            <Users className="w-4 h-4" /> Me Too
          </Button>
          <Button variant="outline" size="icon">
            <Share2 className="w-4 h-4" />
          </Button>
        </div>

        {/* Comments section placeholder */}
        <div className="border-t border-border pt-6">
          <h3 className="font-display text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <MessageCircle className="w-5 h-5" /> Comments ({issue.commentsCount})
          </h3>
          <div className="space-y-4">
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-xs font-bold text-primary">KA</div>
                <div>
                  <div className="text-sm font-semibold text-foreground">Kofi Agyeman</div>
                  <div className="text-xs text-muted-foreground">2 days ago</div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">This has been an issue for months. My car broke down last week because of these potholes. Something must be done!</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-xs font-bold text-primary-foreground">MP</div>
                <div>
                  <div className="text-sm font-semibold text-foreground flex items-center gap-1">
                    Hon. Kwadwo Mensah <CheckCircle className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <div className="text-xs text-muted-foreground">1 day ago · Official Response</div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">Thank you for raising this concern. I have escalated this to the Ministry of Roads and Highways. We expect a contractor on site within 2 weeks.</p>
            </div>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default IssueDetailPage;

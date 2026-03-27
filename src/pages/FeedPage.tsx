import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, TrendingUp, Clock, AlertTriangle, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import IssueCard from "@/components/IssueCard";
import BottomNav from "@/components/BottomNav";
import { sampleIssues, categories } from "@/data/sampleData";
import logo from "@/assets/ghana-star-logo.png";

type SortMode = "trending" | "newest" | "urgent";

const FeedPage = () => {
  const [sort, setSort] = useState<SortMode>("trending");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const sortedIssues = [...sampleIssues]
    .filter((i) => !selectedCategory || i.category === selectedCategory)
    .sort((a, b) => {
      if (sort === "trending") return b.magnitudeScore - a.magnitudeScore;
      if (sort === "urgent") return b.urgency === "critical" ? 1 : -1;
      return b.daysOpen - a.daysOpen;
    });

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      {/* Top bar */}
      <header className="sticky top-0 z-40 bg-background/90 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto flex items-center justify-between h-14 px-4">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="Ghana CIT" width={28} height={28} className="w-7 h-7" />
            <span className="font-display font-bold text-foreground">CIT</span>
          </Link>
          <div className="flex items-center gap-1">
            {([
              { key: "trending", label: "Trending", icon: TrendingUp },
              { key: "newest", label: "New", icon: Clock },
              { key: "urgent", label: "Urgent", icon: AlertTriangle },
            ] as const).map((s) => (
              <Button
                key={s.key}
                variant={sort === s.key ? "default" : "ghost"}
                size="sm"
                className="text-xs gap-1"
                onClick={() => setSort(s.key)}
              >
                <s.icon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{s.label}</span>
              </Button>
            ))}
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-4">
        {/* Category filters */}
        <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-hide mb-4">
          <Badge
            variant={selectedCategory === null ? "default" : "outline"}
            className="cursor-pointer shrink-0 px-3 py-1.5"
            onClick={() => setSelectedCategory(null)}
          >
            <Filter className="w-3 h-3 mr-1" /> All
          </Badge>
          {categories.map((cat) => (
            <Badge
              key={cat.name}
              variant={selectedCategory === cat.name ? "default" : "outline"}
              className="cursor-pointer shrink-0 px-3 py-1.5"
              onClick={() => setSelectedCategory(selectedCategory === cat.name ? null : cat.name)}
            >
              {cat.icon} {cat.name}
            </Badge>
          ))}
        </div>

        {/* Issue list */}
        <div className="space-y-3">
          {sortedIssues.map((issue) => (
            <IssueCard key={issue.id} issue={issue} />
          ))}
        </div>

        {sortedIssues.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground">No issues found in this category.</p>
          </div>
        )}
      </div>

      {/* FAB */}
      <Link
        to="/report"
        className="fixed bottom-24 md:bottom-8 right-6 z-50 w-14 h-14 bg-secondary text-secondary-foreground rounded-full shadow-gold flex items-center justify-center hover:scale-105 transition-transform"
      >
        <Plus className="w-7 h-7" />
      </Link>

      <BottomNav />
    </div>
  );
};

export default FeedPage;

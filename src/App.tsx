import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import LandingPage from "./pages/LandingPage";
import FeedPage from "./pages/FeedPage";
import IssueDetailPage from "./pages/IssueDetailPage";
import LeaderboardPage from "./pages/LeaderboardPage";
import LeaderProfilePage from "./pages/LeaderProfilePage";
import PriorityBoardPage from "./pages/PriorityBoardPage";
import ConstituencyPage from "./pages/ConstituencyPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/feed" element={<FeedPage />} />
          <Route path="/issue/:id" element={<IssueDetailPage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route path="/leader/:id" element={<LeaderProfilePage />} />
          <Route path="/priority-board" element={<PriorityBoardPage />} />
          <Route path="/constituency/:id" element={<ConstituencyPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

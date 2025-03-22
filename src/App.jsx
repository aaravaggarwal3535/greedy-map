import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ReactFlowProvider } from "@xyflow/react";
import { PremiumProvider } from "@/contexts/PremiumContext";
import SmoothScroll from "./components/SmoothScroll";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Platforms from "./pages/Platforms";
import Community from "./pages/Community"
import Learning from "./pages/Learning"
import Signin from "./pages/signin"
import Signup from "./pages/signup"
import Roadmap from "./pages/Roadmap";
import Projects from "./pages/Projects";
import Contributor from "./pages/Contributor";
import TechStackDetail from "./pages/TechStackDetail";
import Dashboard from "./pages/Dashboard";
import '@xyflow/react/dist/style.css';
import Skills from "./pages/Skills";
import ProjectDetail from "./pages/ProjectDetail";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <PremiumProvider>
        <BrowserRouter>
          <SmoothScroll />
          <Toaster />
          <Sonner />
          <ReactFlowProvider>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/platforms" element={<Platforms />} />
              <Route path="/community" element={<Community />} />
              <Route path="/learning" element={<Learning />} />
              <Route path="/roadmap" element={<Roadmap />} />
              <Route path="/signin" element={<Signin />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/:projectTitle" element={<ProjectDetail />} />
              <Route path="/contributor" element={<Contributor />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/techstack/:platformId" element={<TechStackDetail />} />
              <Route path="/skills" element={<Skills />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </ReactFlowProvider>
        </BrowserRouter>
      </PremiumProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

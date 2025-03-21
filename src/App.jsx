import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import { ReactFlowProvider } from "@xyflow/react";
import '@xyflow/react/dist/style.css';
import Skills from "./pages/Skills";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
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
            <Route path="/contributor" element={<Contributor />} />
            <Route path="/techstack/:platformId" element={<TechStackDetail />} />
            <Route path="/skills" element={<Skills />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ReactFlowProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

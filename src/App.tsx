
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import CaseStudy from "./pages/CaseStudy";
import Works from "./pages/Works";
import NotFound from "./pages/NotFound";
import BlackBooksAir from "./pages/BlackBooksAir";
import UrbanSprout from "./pages/UrbanSprout";
import TravelPerkHackathon from "./pages/TravelPerkHackathon";
import MedicAir from "./pages/MedicAir";
import Thrive from "./pages/Thrive";
import Empty from "./pages/empty";
import SonarDashboard from "./pages/SonarDashboard";
import Challenge from "./pages/Challenge";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/case-study" element={<CaseStudy />} />
          <Route path="/works" element={<Works />} />
          <Route path="/BlackBooksAir" element={<BlackBooksAir />} />
          <Route path="/UrbanSprout" element={<UrbanSprout />} />
          <Route path="/TravelPerkHackathon" element={<TravelPerkHackathon />} />
          <Route path="/MedicAir" element={<MedicAir />} />
          <Route path="/Thrive" element={<Thrive />} />
          <Route path="/empty" element={<Empty />} />
          <Route path="/CaseStudy" element={<CaseStudy />} />
          <Route path="/SonarDashboard" element={<SonarDashboard />} />
          <Route path="/Challenge" element={<Challenge />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

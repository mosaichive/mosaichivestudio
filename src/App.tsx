import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { AnimatePresence } from "framer-motion";
import { AuthProvider } from "./context/AuthContext";
import LoadingScreen from "./components/LoadingScreen";
import PageTransition from "./components/PageTransition";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import ServicesPage from "./pages/ServicesPage";
import AboutPage from "./pages/AboutPage";
import PortfolioPage from "./pages/PortfolioPage";
import CaseStudyPage from "./pages/CaseStudyPage";
import BlogPage from "./pages/BlogPage";
import BlogPostPage from "./pages/BlogPostPage";
import ContactPage from "./pages/ContactPage";
import ClientsPage from "./pages/ClientsPage";
import GetStartedPage from "./pages/GetStartedPage";
import TeamPage from "./pages/TeamPage";
import PodcastPage from "./pages/PodcastPage";
import CareersPage from "./pages/CareersPage";
import PortfolioSubmissionPage from "./pages/PortfolioSubmissionPage";
import NotFound from "./pages/NotFound";
import AuthPage from "./pages/AuthPage";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProjects from "./pages/admin/AdminProjects";
import AdminProjectEditor from "./pages/admin/AdminProjectEditor";
import AdminTestimonials from "./pages/admin/AdminTestimonials";
import AdminLogos from "./pages/admin/AdminLogos";
import AdminSettings from "./pages/admin/AdminSettings";
import AdminInvites from "./pages/admin/AdminInvites";

const queryClient = new QueryClient();

// Wrap a page element in the cinematic transition.
const T = (el: React.ReactNode) => <PageTransition>{el}</PageTransition>;

const AnimatedRoutes = () => {
  const location = useLocation();
  // Skip transitions inside admin (it has its own layout / nested routes)
  const isAdmin = location.pathname.startsWith("/admin");

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={isAdmin ? "admin" : location.pathname}>
        <Route path="/" element={T(<Home />)} />
        <Route path="/services" element={T(<ServicesPage />)} />
        <Route path="/services/:serviceId" element={T(<ServicesPage />)} />
        <Route path="/about" element={T(<AboutPage />)} />
        <Route path="/portfolio" element={T(<PortfolioPage />)} />
        <Route path="/portfolio/:slug" element={T(<CaseStudyPage />)} />
        <Route path="/blog" element={T(<BlogPage />)} />
        <Route path="/blog/:slug" element={T(<BlogPostPage />)} />
        <Route path="/contact" element={T(<ContactPage />)} />
        <Route path="/clients" element={T(<ClientsPage />)} />
        <Route path="/team" element={T(<TeamPage />)} />
        <Route path="/get-started" element={T(<GetStartedPage />)} />
        <Route path="/podcast" element={T(<PodcastPage />)} />
        <Route path="/careers" element={T(<CareersPage />)} />
        <Route path="/portfolio-submission" element={T(<PortfolioSubmissionPage />)} />

        {/* Auth + Admin (no transition wrapper for admin children) */}
        <Route path="/auth" element={T(<AuthPage />)} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="projects" element={<AdminProjects />} />
          <Route path="projects/:id" element={<AdminProjectEditor />} />
          <Route path="testimonials" element={<AdminTestimonials />} />
          <Route path="logos" element={<AdminLogos />} />
          <Route path="settings" element={<AdminSettings />} />
          <Route path="invites" element={<AdminInvites />} />
        </Route>

        <Route path="*" element={T(<NotFound />)} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <BrowserRouter>
        <AuthProvider>
          <TooltipProvider>
            <LoadingScreen />
            <Toaster />
            <ScrollToTop />
            <AnimatedRoutes />
          </TooltipProvider>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;

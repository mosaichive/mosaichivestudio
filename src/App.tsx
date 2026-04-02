import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import AdminLayout from "@/components/admin/AdminLayout";

import Index from "./pages/Index";
import AboutPage from "./pages/AboutPage";
import ServicesPage from "./pages/ServicesPage";
import PricingPage from "./pages/PricingPage";
import PortfolioPage from "./pages/PortfolioPage";
import GrowthPlansPage from "./pages/GrowthPlansPage";
import ShopPage from "./pages/ShopPage";
import TeamPage from "./pages/TeamPage";
import ContactPage from "./pages/ContactPage";
import NotFound from "./pages/NotFound";

import LoginPage from "./pages/admin/LoginPage";
import ResetPasswordPage from "./pages/admin/ResetPasswordPage";
import DashboardPage from "./pages/admin/DashboardPage";
import AdminHomePage from "./pages/admin/AdminHomePage";
import AdminAboutPage from "./pages/admin/AdminAboutPage";
import AdminServicesPage from "./pages/admin/AdminServicesPage";
import AdminPricingPage from "./pages/admin/AdminPricingPage";
import AdminPortfolioPage from "./pages/admin/AdminPortfolioPage";
import AdminGrowthPlansPage from "./pages/admin/AdminGrowthPlansPage";
import AdminShopPage from "./pages/admin/AdminShopPage";
import AdminTeamPage from "./pages/admin/AdminTeamPage";
import AdminContactPage from "./pages/admin/AdminContactPage";
import AdminMessagesPage from "./pages/admin/AdminMessagesPage";
import AdminMediaPage from "./pages/admin/AdminMediaPage";
import AdminSeoPage from "./pages/admin/AdminSeoPage";
import AdminSettingsPage from "./pages/admin/AdminSettingsPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/growth-plans" element={<GrowthPlansPage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/contact" element={<ContactPage />} />

            {/* Auth Routes */}
            <Route path="/admin/login" element={<LoginPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />

            {/* Protected Admin Routes */}
            <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
              <Route index element={<DashboardPage />} />
              <Route path="home" element={<AdminHomePage />} />
              <Route path="about" element={<AdminAboutPage />} />
              <Route path="services" element={<AdminServicesPage />} />
              <Route path="pricing" element={<AdminPricingPage />} />
              <Route path="portfolio" element={<AdminPortfolioPage />} />
              <Route path="growth-plans" element={<AdminGrowthPlansPage />} />
              <Route path="shop" element={<AdminShopPage />} />
              <Route path="team" element={<AdminTeamPage />} />
              <Route path="contact" element={<AdminContactPage />} />
              <Route path="messages" element={<AdminMessagesPage />} />
              <Route path="media" element={<AdminMediaPage />} />
              <Route path="seo" element={<AdminSeoPage />} />
              <Route path="settings" element={<AdminSettingsPage />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

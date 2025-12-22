import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";

import DashboardLayout from "@/components/layout/DashboardLayout";
import EmailVerification from "@/pages/Auth/EmailVerification";
import Auth from "@/pages/Auth/Auth";

import Dashboard from "@/pages/Dashboard";
import Courses from "@/pages/Courses";
import Internships from "@/pages/Internships";
import Events from "@/pages/Events";
import Workshops from "@/pages/Workshops";
import Profile from "@/pages/Profile";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

/* ======================
   PROTECTED ROUTE
====================== */
const ProtectedDashboardRoute = ({ children }: { children: JSX.Element }) => {
  const { user, loading } = useAuth();

  if (loading) return null;

  // ❌ Not logged in
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // ❌ Email not verified
  if (!user.isEmailVerified) {
    return <Navigate to="/verify-email" replace />;
  }

  // ✅ Allowed
  return children;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* AUTH */}
            <Route path="/" element={<Auth />} />
            <Route path="/verify-email" element={<EmailVerification />} />

            {/* 🔐 PROTECTED DASHBOARD */}
            <Route
              element={
                <ProtectedDashboardRoute>
                  <DashboardLayout />
                </ProtectedDashboardRoute>
              }
            >
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/internships" element={<Internships />} />
              <Route path="/events" element={<Events />} />
              <Route path="/workshops" element={<Workshops />} />
              <Route path="/profile" element={<Profile />} />
            </Route>

            {/* FALLBACK */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

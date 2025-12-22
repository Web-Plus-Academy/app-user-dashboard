import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Mail, Lock, User, Phone, Eye, EyeOff, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import Loader from "@/components/loader/Loader.jsx";
import "./Auth.css";

type AuthMode = "login" | "signup" | "forgot-password";

/* ======================
   VALIDATION REGEX
====================== */
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^[6-9]\d{9}$/;

const Auth: React.FC = () => {
  const {
    isAuthenticated,
    loading,
    login,
    signup,
    forgotPassword,
    resendEmailOtp,
  } = useAuth();

  const navigate = useNavigate();

  const [mode, setMode] = useState<AuthMode>("login");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  /* ======================
     AUTH STATE HANDLING
  ====================== */
  if (loading) return <Loader />;
  if (isAuthenticated) return <Navigate to="/dashboard" replace />;

  /* ======================
     INPUT VALIDATION
  ====================== */
  const validateForm = () => {
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return false;
    }

    if (mode !== "forgot-password" && formData.password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return false;
    }

    if (mode === "signup") {
      if (!formData.name.trim()) {
        toast.error("Full name is required");
        return false;
      }

      if (!phoneRegex.test(formData.phone)) {
        toast.error("Enter a valid 10-digit mobile number");
        return false;
      }

      if (formData.password !== formData.confirmPassword) {
        toast.error("Passwords do not match");
        return false;
      }
    }

    return true;
  };

  /* ======================
     SUBMIT HANDLER
  ====================== */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      /* ---------- LOGIN ---------- */
      if (mode === "login") {
        const res = await login(formData.email, formData.password);

        // 🚨 Email not verified
        if (!res.isEmailVerified) {
          toast.warning("Email not verified. OTP sent again.");

          await resendEmailOtp(formData.email);

          navigate("/verify-email", {
            state: { email: formData.email },
          });
          return;
        }

        toast.success("Welcome back!");
        navigate("/dashboard");
      }

      /* ---------- SIGNUP ---------- */
      if (mode === "signup") {
        await signup(
          formData.name,
          formData.email,
          formData.phone,
          formData.password
        );

        toast.success("OTP sent to your email");
        navigate("/verify-email", {
          state: { email: formData.email },
        });
      }

      /* ---------- FORGOT PASSWORD ---------- */
      if (mode === "forgot-password") {
        const res = await forgotPassword(formData.email);

        if (res?.attemptleft !== undefined) {
          if (res.attemptleft <= 1) {
            toast.warning(
              `Password reset link sent. Attempts left today: ${res.attemptleft}`
            );
          } else {
            toast.success(
              `Password reset link sent. Attempts left today: ${res.attemptleft}`
            );
          }
        } else {
          toast.success("Password reset link sent to your email");
        }

        setMode("login");
      }
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <Loader />}

      <div className="min-h-screen flex">
        {/* LEFT PANEL */}
        <div
          className="hidden lg:flex lg:w-1/2 relative overflow-hidden"
          style={{ background: 'var(--gradient-card)' }}
        >
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/20 blur-3xl animate-float" />
            <div
              className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-accent/20 blur-3xl animate-float"
              style={{ animationDelay: '2s' }}
            />
          </div>

          <div className="relative z-10 flex flex-col justify-center px-16">
            <div className="flex items-center gap-4 mb-12">
              <div className="w-16 h-16 flex items-center justify-center animate-glow login-logo">
                <img src="favicon.ico" alt="SWPA Logo" />
              </div>
              <span className="font-display text-4xl font-bold gradient-text">
                #SWPA-intelligence
              </span>
            </div>

            <h1 className="text-5xl font-display font-bold mb-6 leading-tight">
              Learn Smarter,<br />
              <span className="gradient-text">Grow Faster</span>
            </h1>

            <p className="text-xl text-muted-foreground mb-8 max-w-md">
              Your AI-powered learning companion with industry-aligned training
              and real-world projects.
            </p>

            <div className="flex gap-8">
              <div>
                <p className="text-3xl font-display font-bold gradient-text">2.5K+</p>
                <p className="text-sm text-muted-foreground">Active Learners</p>
              </div>
              <div>
                <p className="text-3xl font-display font-bold gradient-text">3.2K+</p>
                <p className="text-sm text-muted-foreground">SWPA Events</p>
              </div>
              <div>
                <p className="text-3xl font-display font-bold gradient-text">5.6K+</p>
                <p className="text-sm text-muted-foreground">Workshops</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            {/* MOBILE LOGO */}
            <div className="lg:hidden flex items-center gap-2 mb-8 justify-center">
              <div className="w-14 h-14 flex items-center justify-center animate-glow login-logo">
                <img src="favicon.ico" alt="SWPA Logo" />
              </div>
              <span className="font-display text-xl font-bold gradient-text">
                #SWPA-intelligence
              </span>
            </div>

            <div className="text-center mb-8">
              <h2 className="text-2xl font-display font-bold mb-2">
                {mode === "login" && "Welcome Back"}
                {mode === "signup" && "Create Account"}
                {mode === "forgot-password" && "Reset Password"}
              </h2>
              <p className="text-muted-foreground">
                {mode === "login" && "Log in to continue your learning journey"}
                {mode === "signup" && "Start your learning journey today"}
                {mode === "forgot-password" &&
                  "We'll send a reset link to your email"}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === "signup" && (
                <>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Full Name"
                      className="input-field pl-12"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                  </div>

                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      className="input-field pl-12"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                    />
                  </div>
                </>
              )}

              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="input-field pl-12"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>

              {mode !== "forgot-password" && (
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className="input-field pl-12 pr-12"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>
              )}

              {mode === "signup" && (
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    className="input-field pl-12 pr-12"
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        confirmPassword: e.target.value,
                      })
                    }
                  />
                </div>
              )}

              {mode === "login" && (
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => setMode("forgot-password")}
                    className="text-sm text-primary hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary w-full flex items-center justify-center gap-2"
              >
                {mode === "login" && "Log In"}
                {mode === "signup" && "Create Account"}
                {mode === "forgot-password" && "Send Reset Link"}
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>

            <p className="text-center text-sm text-muted-foreground mt-10">
              {mode === "login" ? (
                <>
                  Don’t have an account?{" "}
                  <button
                    onClick={() => setMode("signup")}
                    className="text-primary hover:underline font-medium"
                  >
                    Sign up
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <button
                    onClick={() => setMode("login")}
                    className="text-primary hover:underline font-medium"
                  >
                    Log in
                  </button>
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Auth;

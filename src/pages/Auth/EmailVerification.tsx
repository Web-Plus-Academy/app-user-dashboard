import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import api from "@/services/api";
import { toast } from "sonner";
import Loader from "@/components/loader/Loader";

const MAX_RESENDS = 3;

const EmailVerification: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { resendEmailOtp, setAuthUser } = useAuth();

  const email = location.state?.email;

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [attemptleft, setattemptleft] = useState<number | null>(null);

  if (!email) {
    return <p className="text-center mt-10">Invalid verification request</p>;
  }

  /* ======================
     VERIFY OTP
  ====================== */
  const handleVerify = async () => {
    setLoading(true);
    try {
      const { data } = await api.post("/verify-otp", {
        email,
        emailOtp: otp,
      });

      // ✅ THIS IS THE FIX
      setAuthUser(data.user);

      toast.success("Email verified successfully!");
      navigate("/dashboard", { replace: true });
    } catch (err: any) {
      toast.error(
        err?.response?.data?.message || "Invalid OTP. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  /* ======================
     RESEND OTP (LIMITED)
  ====================== */
  const handleResendOtp = async () => {
    setLoading(true);
    try {
      const res = await resendEmailOtp(email);

      //   toast.success("OTP resent to your email");

      //   if (res?.attemptleft !== undefined) {
      //     setattemptleft(res.attemptleft);
      //     toast.info(`Resend attempts left today: ${res.attemptleft}`);
      //   }

      if (res?.attemptleft <= 1) {
        toast.warning(
          `OTP resent to your email. Resend attempts left today: ${res.attemptleft}`
        );
      } else {
        toast.success(
          `OTP resent to your email. Resend attempts left today: ${res.attemptleft}`
        );
      }
    } catch (err: any) {
      toast.error(
        err?.response?.data?.message ||
          "Resend limit reached. Try again tomorrow."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Loader />}

      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="auth-card w-full max-w-md text-center">
          <h2 className="text-2xl font-bold mb-2">Verify Your Email</h2>

          <p className="text-muted-foreground mb-6">
            Enter the OTP sent to <strong>{email}</strong>
          </p>

          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="input-field mb-4 text-center tracking-widest"
          />

          <button
            onClick={handleVerify}
            className="btn-primary w-full mb-4"
            disabled={loading}
          >
            Verify Email
          </button>

          <button
            onClick={handleResendOtp}
            disabled={attemptleft === 0}
            className="text-sm text-primary hover:underline disabled:text-gray-400"
          >
            Resend OTP
          </button>

          {attemptleft !== null && (
            <p className="text-xs text-muted-foreground mt-2">
              Attempts left today: {attemptleft}
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default EmailVerification;

import React, { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Loader from "@/components/loader/Loader";

import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Save,
  LogOut,
  Shield,
  Phone,
} from "lucide-react";
import { toast } from "sonner";
import "./Profile.css";

const Profile: React.FC = () => {
  const { user, logout, changePassword, updateUser, updateProfile } = useAuth();

  const [sessionTimeLeft, setSessionTimeLeft] = useState<string>("--:--:--");
  const [updatingPassword, setUpdatingPassword] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordSection, setShowPasswordSection] = useState(false);
  const [showPasswords, setShowPasswords] = useState(false);

  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  //Session Timer
  useEffect(() => {
    const expiry = localStorage.getItem("swpa_session_expiry");
    if (!expiry) return;

    const updateTimer = () => {
      const remaining = Number(expiry) - Date.now();

      if (remaining <= 0) {
        setSessionTimeLeft("00:00:00");
        return;
      }

      const hours = Math.floor(remaining / (1000 * 60 * 60));
      const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((remaining % (1000 * 60)) / 1000);

      setSessionTimeLeft(
        `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
          2,
          "0"
        )}:${String(seconds).padStart(2, "0")}`
      );
    };

    updateTimer(); // initial
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, []);

  /* ======================
     SAVE PROFILE (NAME + PHONE NO.)
  ====================== */
  const handleSaveProfile = async () => {
    if (profileData.name.trim().length < 2) {
      toast.error("Name must be at least 2 characters");
      return;
    }

    if (!/^[6-9]\d{9}$/.test(profileData.phone)) {
      toast.error("Enter valid 10-digit phone number");
      return;
    }

    try {
      setUpdatingPassword(true); //loader
      await updateProfile(profileData.name.trim(), profileData.phone.trim());

      toast.success("Profile updated successfully");
      setIsEditing(false);
      setUpdatingPassword(false); //close loader
    } catch {
      toast.error("Failed to update profile");
    }
  };

  /* ======================
     CHANGE PASSWORD
  ====================== */
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setUpdatingPassword(true); //loader

      const updatedDate = await changePassword(
        passwordData.currentPassword,
        passwordData.newPassword
      );

      updateUser({
        lastPasswordChangedAt: updatedDate,
      });

      toast.success("Password updated successfully");

      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      setShowPasswordSection(false);
    } finally {
      setUpdatingPassword(false);
    }
  };

  const formatLastChanged = (date?: string | null) => {
    if (!date) return "Never";

    const diffDays = Math.floor(
      (Date.now() - new Date(date).getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "1 day ago";
    return `${diffDays} days ago`;
  };

  return (
    <>
      {updatingPassword && <Loader />}

      <div className="max-w-3xl mx-auto px-2 sm:px-0">
        {/* Header */}
        <div className="mb-6 sm:mb-8 opacity-0 animate-fade-in">
          <h1 className="text-2xl sm:text-3xl font-display font-bold mb-2">
            Profile Settings
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Manage your account and preferences
          </p>
        </div>

        {/* Profile Card */}
        <div className="glass-card rounded-2xl p-5 sm:p-8 mb-6 opacity-0 animate-fade-in">
          <div className="flex flex-col sm:flex-row sm:items-start gap-6 mb-6">
            {/* Verified Badge */}
            <div className="verify">
              <img
                src="/swpaverified.png"
                alt="Verified"
                className="verified-logo lg:h-20 lg:w-20 h-40 w-40"
              />
            </div>

            {/* User Info */}
            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-xl sm:text-2xl font-display font-bold mb-1">
                {user?.name}
              </h2>
              <p className="text-base text-muted-foreground mt-1">
                User ID: SAREDUFY-{user?._id.slice(-5).toUpperCase()}
              </p>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
            </div>

            {/* Edit Button */}
            <button
              onClick={() => {
                setIsEditing(!isEditing);
                setProfileData({
                  name: user?.name || "",
                  email: user?.email || "",
                  phone: user?.phone || "",
                });
              }}
              className={`w-full sm:w-auto ${
                isEditing ? "btn-secondary" : "btn-primary"
              }`}
            >
              {isEditing ? "Cancel" : "Edit Profile"}
            </button>
          </div>

          {/* Profile Form */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  value={profileData.name}
                  onChange={(e) =>
                    setProfileData({
                      ...profileData,
                      name: e.target.value,
                    })
                  }
                  disabled={!isEditing}
                  className="input-field pl-12 w-full disabled:opacity-60"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                <div className="flex gap-2 items-center">
                  Email Address
                  <span className="status-badge completed">
                    <Lock className="w-3 h-3 mr-1" />
                    Verified
                  </span>
                </div>
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="email"
                  value={profileData.email}
                  disabled
                  className="input-field pl-12 w-full disabled:opacity-60"
                />
              </div>
            </div>

            {/* edit phone number  */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="tel"
                  value={profileData.phone}
                  onChange={(e) =>
                    setProfileData({
                      ...profileData,
                      phone: e.target.value,
                    })
                  }
                  disabled={!isEditing}
                  className="input-field pl-12 w-full disabled:opacity-60"
                  placeholder="Enter phone number"
                />
              </div>
            </div>

            {isEditing && (
              <button
                onClick={handleSaveProfile}
                className="btn-primary w-full sm:w-auto flex items-center gap-2"
              >
                <Save className="w-5 h-5" />
                Save Changes
              </button>
            )}
          </div>
        </div>

        {/* Password Section */}
        <div className="glass-card rounded-2xl p-5 sm:p-8 mb-6 opacity-0 animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-display font-semibold">Password</h3>
            <button
              onClick={() => setShowPasswordSection(!showPasswordSection)}
              className="text-primary text-sm hover:underline"
            >
              {showPasswordSection ? "Cancel" : "Change Password"}
            </button>
          </div>

          {showPasswordSection ? (
            <form onSubmit={handleChangePassword} className="space-y-4">
              {["currentPassword", "newPassword", "confirmPassword"].map(
                (field) => (
                  <div key={field} className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type={showPasswords ? "text" : "password"}
                      placeholder={
                        field === "currentPassword"
                          ? "Current Password"
                          : field === "newPassword"
                          ? "New Password"
                          : "Confirm New Password"
                      }
                      value={(passwordData as any)[field]}
                      onChange={(e) =>
                        setPasswordData({
                          ...passwordData,
                          [field]: e.target.value,
                        })
                      }
                      className="input-field pl-12 pr-12 w-full"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPasswords(!showPasswords)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                    >
                      {showPasswords ? <EyeOff /> : <Eye />}
                    </button>
                  </div>
                )
              )}

              <button type="submit" className="btn-primary w-full">
                Update Password
              </button>
            </form>
          ) : (
            <p className="text-sm text-muted-foreground">
              Last changed {formatLastChanged(user?.lastPasswordChangedAt)}
            </p>
          )}
        </div>

        {/* Logout */}
        <div className="glass-card rounded-2xl p-5 sm:p-8 opacity-0 animate-fade-in">
          <h3 className="text-lg font-display font-semibold mb-2">Session</h3>

          <p className="text-sm text-muted-foreground mb-4">
            Session expires in{" "}
            <span className="font-semibold text-primary">
              {sessionTimeLeft}
            </span>
          </p>

          <button
            onClick={logout}
            className="flex items-center gap-2 text-destructive hover:underline"
          >
            <LogOut className="w-5 h-5" />
            Sign out of your account
          </button>
        </div>
      </div>
    </>
  );
};

export default Profile;

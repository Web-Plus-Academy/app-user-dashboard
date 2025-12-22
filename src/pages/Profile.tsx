import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Save,
  LogOut,
  Shield,
} from "lucide-react";
import { toast } from "sonner";

const Profile: React.FC = () => {
  const { user, logout, changePassword } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordSection, setShowPasswordSection] = useState(false);
  const [showPasswords, setShowPasswords] = useState(false);

  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleSaveProfile = () => {
    toast.success("Profile updated successfully!");
    setIsEditing(false);
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      await changePassword(
        passwordData.currentPassword,
        passwordData.newPassword
      );
      toast.success("Password changed successfully!");
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setShowPasswordSection(false);
    } catch {
      toast.error("Failed to change password");
    }
  };

  return (
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
          {/* Avatar */}
          <div className="avatar-ring mx-auto sm:mx-0">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-primary via-accent to-primary flex items-center justify-center">
              <span className="text-2xl sm:text-3xl font-bold text-primary-foreground">
                {user?.name.charAt(0)}
              </span>
            </div>
          </div>

          {/* User Info */}
          <div className="flex-1 text-center sm:text-left">
            <h2 className="text-xl sm:text-2xl font-display font-bold mb-1">
              {user?.name}
            </h2>
            <p className="text-sm text-muted-foreground">{user?.email}</p>
            <div className="flex justify-center sm:justify-start gap-2 mt-3">
              <span className="status-badge completed">
                <Shield className="w-3 h-3 mr-1" />
                Verified
              </span>
            </div>
          </div>

          {/* Edit Button */}
          <button
            onClick={() => setIsEditing(!isEditing)}
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
            <label className="block text-sm font-medium mb-2">Full Name</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                value={profileData.name}
                onChange={(e) =>
                  setProfileData({ ...profileData, name: e.target.value })
                }
                disabled={!isEditing}
                className="input-field pl-12 w-full disabled:opacity-60"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Email Address
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

          {isEditing && (
            <button
              onClick={handleSaveProfile}
              className="btn-primary w-full sm:w-auto flex items-center justify-center gap-2"
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
              (field, idx) => (
                <div key={idx} className="relative">
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
                  {field === "currentPassword" && (
                    <button
                      type="button"
                      onClick={() => setShowPasswords(!showPasswords)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                    >
                      {showPasswords ? <EyeOff /> : <Eye />}
                    </button>
                  )}
                </div>
              )
            )}

            <button type="submit" className="btn-primary w-full">
              Update Password
            </button>
          </form>
        ) : (
          <p className="text-sm text-muted-foreground">
            Last changed 30 days ago
          </p>
        )}
      </div>

      {/* Logout */}
      <div className="glass-card rounded-2xl p-5 sm:p-8 opacity-0 animate-fade-in">
        <h3 className="text-lg font-display font-semibold mb-4">Session</h3>
        <button
          onClick={logout}
          className="flex items-center gap-2 text-destructive hover:underline"
        >
          <LogOut className="w-5 h-5" />
          Sign out of your account
        </button>
      </div>
    </div>
  );
};

export default Profile;

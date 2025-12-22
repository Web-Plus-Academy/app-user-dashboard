import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import api from "@/services/api";
import { toast } from "sonner";

/* ======================
   SESSION CONFIG
====================== */
const SESSION_DURATION = 60 * 60 * 1000; // 1 hour

/* ======================
   TYPES
====================== */
export interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  isEmailVerified: boolean;
  lastPasswordChangedAt?: string | null;
}

interface LoginResponse {
  user: User;
  isEmailVerified: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;

  setAuthUser: (user: User) => void;
  updateUser: (data: Partial<User>) => void;
  updateProfileName: (name: string) => Promise<void>;

  login: (
    email: string,
    password: string
  ) => Promise<{
    user: User;
    isEmailVerified: boolean;
  }>;

  signup: (
    name: string,
    email: string,
    phone: string,
    password: string
  ) => Promise<{ email: string }>;

  logout: () => void;
  changePassword: (oldPassword: string, newPassword: string) => Promise<string>;
  forgotPassword: (email: string) => Promise<{ attemptleft?: number }>;
  resendEmailOtp: (email: string) => Promise<{ attemptleft?: number }>;
}

/* ======================
   CONTEXT
====================== */
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // ===================
  // Update User 
  // =================

  const updateUser = (data: Partial<User>) => {
  setUser((prev) => {
    if (!prev) return prev;

    const updatedUser = { ...prev, ...data };
    localStorage.setItem("swpa_user", JSON.stringify(updatedUser));
    return updatedUser;
  });
};


//=====================
// Update profile
//===================
const updateProfileName = async (name: string) => {
  const storedUser = localStorage.getItem("swpa_user");
  if (!storedUser) throw new Error("User not logged in");

  const user = JSON.parse(storedUser);

  const res = await api.post("/update-profile", {
    email: user.email,
    name,
  });

  // ✅ update context + localStorage
  updateUser(res.data.user);
};



  /* ======================
     SET AUTH USER
  ====================== */
  const setAuthUser = (user: User) => {
    const expiryTime = Date.now() + SESSION_DURATION;

    setUser(user);
    localStorage.setItem("swpa_user", JSON.stringify(user));
    localStorage.setItem("swpa_session_expiry", expiryTime.toString());
  };

  /* ======================
     RESTORE SESSION
  ====================== */
  useEffect(() => {
    const savedUser = localStorage.getItem("swpa_user");
    const expiry = localStorage.getItem("swpa_session_expiry");

    if (savedUser && expiry) {
      const expiryTime = Number(expiry);

      if (Date.now() < expiryTime) {
        setUser(JSON.parse(savedUser));
      } else {
        localStorage.removeItem("swpa_user");
        localStorage.removeItem("swpa_session_expiry");
        toast.warning("Session expired. Please login again.");
      }
    }

    setLoading(false);
  }, []);

  /* ======================
     AUTO LOGOUT TIMER
  ====================== */
  useEffect(() => {
    if (!user) return;

    const expiry = localStorage.getItem("swpa_session_expiry");
    if (!expiry) return;

    const timeout = Number(expiry) - Date.now();
    if (timeout <= 0) return;

    const timer = setTimeout(() => {
      localStorage.removeItem("swpa_user");
      localStorage.removeItem("swpa_session_expiry");
      setUser(null);
      toast.warning("Session expired. Please login again.");
    }, timeout);

    return () => clearTimeout(timer);
  }, [user]);

  /* ======================
     LOGIN
  ====================== */
  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const { data } = await api.post<LoginResponse>("/login", {
        email,
        password,
      });

      if (data.isEmailVerified) {
        setAuthUser(data.user);
      }

      return {
        user: data.user,
        isEmailVerified: data.isEmailVerified,
      };
    } finally {
      setLoading(false);
    }
  };

  /* ======================
     RESEND EMAIL OTP
  ====================== */
  const resendEmailOtp = async (email: string) => {
    setLoading(true);
    try {
      const { data } = await api.post("/resend-otp", { email });
      return { attemptleft: data.attemptleft };
    } finally {
      setLoading(false);
    }
  };

  /* ======================
     SIGNUP
  ====================== */
  const signup = async (
    name: string,
    email: string,
    phone: string,
    password: string
  ) => {
    setLoading(true);
    try {
      const { data } = await api.post("/signup", {
        name,
        email,
        phone,
        password,
      });
      return data;
    } finally {
      setLoading(false);
    }
  };

  /* ======================
     LOGOUT
  ====================== */
  const logout = () => {
    setUser(null);
    localStorage.removeItem("swpa_user");
    localStorage.removeItem("swpa_session_expiry");
  };

  /* ======================
     CHANGE PASSWORD
  ====================== */
  const changePassword = async (
    oldPassword: string,
    newPassword: string
  ) => {
    try {
      const storedUser = localStorage.getItem("swpa_user");
      if (!storedUser) {
        throw new Error("User not logged in");
      }

      const user = JSON.parse(storedUser);

      const res = await api.post("/change-password", {
        email: user.email,
        oldPassword,
        newPassword,
      });

      // ✅ return updated date from backend
      return res.data.lastPasswordChangedAt;
    } catch (err: any) {
      alert(err?.response?.data?.message || "Failed to change password");
      throw err;
    }
  };

  /* ======================
     FORGOT PASSWORD
  ====================== */
  const forgotPassword = async (email: string) => {
    setLoading(true);
    try {
      const { data } = await api.post("/forgot-password", { email });
      return { attemptleft: data.attemptleft };
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading,
        login,
        signup,
        logout,
        changePassword,
        forgotPassword,
        resendEmailOtp,
        setAuthUser,
        updateUser,
        updateProfileName
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

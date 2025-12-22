import React from "react";
import { LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const MobileHeader: React.FC = () => {
  const { logout } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 z-30 bg-sidebar border-b border-sidebar-border lg:hidden">
      <div className="flex items-center justify-between px-4 h-14">
        {/* Left: Logo + Name */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 login-logo flex items-center justify-center">
            <img src="/favicon.ico" alt="SWPA Logo" />
          </div>

          <span className="font-display text-base font-bold gradient-text truncate">
            Saredufy Web Plus Academy
          </span>
        </div>

        {/* Right: Logout */}
        <button
          onClick={logout}
          className="p-2 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
          aria-label="Logout"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
};

export default MobileHeader;

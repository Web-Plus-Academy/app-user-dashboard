import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  Briefcase,
  Calendar,
  Wrench,
  User,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: BookOpen, label: "Courses", path: "/courses" },
  { icon: Briefcase, label: "Internships", path: "/internships" },
  { icon: Calendar, label: "Events", path: "/events" },
  { icon: Wrench, label: "Workshops", path: "/workshops" },
  { icon: User, label: "Profile", path: "/profile" },
];

const Sidebar: React.FC<SidebarProps> = ({
  collapsed,
  onToggle,
  mobileOpen,
  setMobileOpen,
}) => {
  const location = useLocation();
  const { logout, user } = useAuth();

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 h-screen bg-sidebar border-r border-sidebar-border z-50 flex flex-col transition-all duration-300",
          // Desktop
          "hidden lg:flex",
          collapsed ? "lg:w-20" : "lg:w-64",
          // Mobile
          mobileOpen && "flex w-64"
        )}
      >
        {/* Logo */}
        <div className="p-6 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 login-logo flex items-center justify-center">
              <img src="favicon.ico" alt="logo" />
            </div>

            {!collapsed && (
              <span className="font-display text-xl font-bold gradient-text">
                #SWPA - User
              </span>
            )}
          </div>

          {/* Mobile close */}
          <button
            onClick={() => setMobileOpen(false)}
            className="lg:hidden text-muted-foreground"
          >
            <X />
          </button>
        </div>

        {/* Desktop collapse toggle */}
        <button
          onClick={onToggle}
          className="hidden lg:flex absolute -right-3 top-20 w-6 h-6 rounded-full bg-secondary border border-border items-center justify-center hover:bg-primary hover:border-primary transition-colors"
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </button>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={cn("nav-link", isActive && "active")}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* User Section */}
        <div className="p-4 border-t border-sidebar-border">
          {!collapsed && user && (
            <div className="flex items-center gap-3 mb-4">
              <div className="avatar-ring">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <span className="text-sm font-semibold text-primary-foreground">
                    {user.name.charAt(0)}
                  </span>
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{user.name}</p>
                <p className="text-xs text-muted-foreground truncate">
                  {user.email}
                </p>
              </div>
            </div>
          )}

          <button
            onClick={logout}
            className={cn(
              "nav-link w-full text-destructive hover:bg-destructive/10 hover:text-destructive",
              collapsed && "justify-center"
            )}
          >
            <LogOut className="w-5 h-5" />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Mobile hamburger */}
      {/* <button
        onClick={() => setMobileOpen(true)}
        className="fixed top-4 right-4 z-30 lg:hidden bg-secondary p-2 rounded-xl none"
      >
        <Menu />
      </button> */}
    </>
  );
};

export default Sidebar;

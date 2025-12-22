import React, { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Sparkles, Clock } from "lucide-react";

const WelcomeSection: React.FC = () => {
  const { user } = useAuth();
  const [now, setNow] = useState(new Date());
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(prev => {
        const newTime = new Date();
        if (prev.getSeconds() !== newTime.getSeconds()) {
          setPulse(true);
          setTimeout(() => setPulse(false), 300);
        }
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getGreeting = () => {
    const hour = now.getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  const formattedDate = now.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const formattedTime = now.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  return (
    <div
      className="relative overflow-hidden rounded-3xl p-5 sm:p-6 lg:p-8 mb-6 sm:mb-8 opacity-0 animate-fade-in"
      style={{ background: "var(--gradient-card)" }}
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 opacity-30"
        style={{ background: "var(--gradient-glow)" }}
      />

      {/* Decorative glow */}
      <div className="absolute -top-20 -right-20 w-64 h-64 opacity-20 hidden sm:block">
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-accent blur-3xl" />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 flex flex-col lg:flex-row gap-6 lg:gap-0 lg:items-center lg:justify-between">
        {/* LEFT SECTION */}
        <div className="flex items-center gap-4 sm:gap-6">
          {/* Avatar */}
          <div className="avatar-ring shrink-0">
            <div className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-full bg-gradient-to-br from-primary via-accent to-primary flex items-center justify-center">
              <span className="text-lg sm:text-xl lg:text-2xl font-bold text-primary-foreground">
                {user?.name?.charAt(0)}
              </span>
            </div>
          </div>

          {/* Text */}
          <div>
            <div className="flex items-center gap-2 mb-1 sm:mb-2">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-primary animate-pulse-slow" />
              <span className="text-xs sm:text-sm text-primary font-medium">
                Welcome back!
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl lg:text-3xl font-display font-bold mb-1">
              {getGreeting()},{" "}
              <span  className="gradient-text text-2xl md:text-2xl lg:text-3xl">{user?.name}</span>
            </h1>

            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-md">
              Continue your learning journey. You're making great progress!
            </p>
          </div>
        </div>

        {/* RIGHT SECTION – DATE & TIME */}
        <div className="flex lg:hidden items-center gap-4 bg-secondary/50 rounded-xl p-3 backdrop-blur-sm">
          <div
            className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300
            ${pulse ? "bg-orange-500/30 shadow-orange-pulse" : "bg-orange-500/20"}`}
          >
            <Clock className="w-4 h-4 text-orange-500" />
          </div>

          <div className="time-fade">
            <p className="text-sm font-semibold">{formattedTime}</p>
            <p className="text-[11px] text-muted-foreground">{formattedDate}</p>
          </div>
        </div>

        {/* DESKTOP DATE & TIME */}
        <div className="hidden lg:flex items-center gap-6 bg-secondary/50 rounded-2xl p-4 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300
              ${pulse ? "bg-orange-500/30 shadow-orange-pulse" : "bg-orange-500/20"}`}
            >
              <Clock className="w-5 h-5 text-orange-500" />
            </div>

            <div className="time-fade">
              <p className="text-lg font-bold">{formattedTime}</p>
              <p className="text-xs text-muted-foreground">Current Time</p>
            </div>
          </div>

          <div className="w-px h-12 bg-border" />

          <div className="time-fade">
            <p className="text-lg font-bold">{formattedDate}</p>
            <p className="text-xs text-muted-foreground">Today</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeSection;

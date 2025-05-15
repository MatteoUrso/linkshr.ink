"use client";

import { cn } from "@/lib/utils";
import { Monitor, Moon, Sun } from "lucide-react";
import { motion } from "motion/react";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";

const icons = {
  system: Monitor,
  light: Sun,
  dark: Moon,
};

type Props = React.HTMLAttributes<HTMLDivElement>;

export const ThemeSwitcher = ({ className, ...rest }: Props) => {
  const { setTheme, theme, themes } = useTheme();

  const [mounted, setMounted] = useState(false);
  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }
  return (
    <div
      className={cn(
        "bg-slate-1 ring-slate-7 relative isolate flex h-8 gap-1 rounded-full p-1 ring-1",
        className
      )}
      {...rest}
    >
      {themes.map((key) => {
        const isActive = theme === key;
        const label = key;
        const Icon = icons[key as keyof typeof icons];

        return (
          <button
            type="button"
            key={key}
            className="hover:bg-slate-4 relative h-6 w-6 rounded-full focus-visible:ring-1 focus-visible:ring-red-500"
            onClick={() => setTheme(key as "light" | "dark" | "system")}
            aria-label={label}
          >
            {isActive && (
              <motion.div
                layoutId="activeTheme"
                className="bg-slate-9 absolute inset-0 rounded-full"
                transition={{ type: "spring", duration: 0.5 }}
              />
            )}
            <Icon
              className={cn(
                "relative z-10 m-auto h-4 w-4",
                isActive ? "text-white" : "text-slate-12"
              )}
            />
          </button>
        );
      })}
    </div>
  );
};

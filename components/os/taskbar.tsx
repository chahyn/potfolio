"use client";

import { useState, useEffect, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutGrid } from "lucide-react";

interface TaskbarProps {
  windows: Array<{
    id: string;
    title: string;
    icon: ReactNode;
    isMinimized: boolean;
    isFocused: boolean;
  }>;
  onWindowClick: (id: string) => void;
  onMenuItemClick: (id: string) => void;
}

// Minimal SVG icons for the center launcher
const IconTerminal = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="4 17 10 11 4 5" />
    <line x1="12" y1="19" x2="20" y2="19" />
  </svg>
);

const IconBriefcase = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" />
    <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
  </svg>
);

const IconUser = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const IconMail = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <polyline points="2,4 12,13 22,4" />
  </svg>
);

const IconGrid = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
  </svg>
);

// Maps menu item id → window id in desktop-os
const centerItems = [
  { id: "projects",  label: "Projects",  icon: <IconBriefcase /> },
  { id: "about",     label: "About",     icon: <IconUser /> },
  { id: "terminal",  label: "Terminal",  icon: <IconTerminal /> },
  { id: "contact",   label: "Contact",   icon: <IconMail /> },
];

export function Taskbar({ windows, onWindowClick, onMenuItemClick }: TaskbarProps) {
  const [time, setTime] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const [showLauncher, setShowLauncher] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!showMenu && !showLauncher) return;
    const handleClickOutside = () => {
      setShowMenu(false);
      setShowLauncher(false);
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [showMenu, showLauncher]);

  return (
    <>
      <motion.div
        initial={{ y: 48, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.5, ease: [0.4, 0, 0.2, 1] }}
        className="fixed bottom-0 left-0 right-0 h-12 z-[9999] flex items-center"
        style={{
          background: "rgba(10,10,20,0.90)",
          backdropFilter: "blur(20px)",
          borderTop: "1px solid rgba(255,255,255,0.08)",
          paddingLeft: "clamp(16px, 4vw, 80px)",
          paddingRight: "clamp(16px, 4vw, 80px)",
        }}
      >
        {/* ── LEFT — OS logo ── */}
        <div className="flex-shrink-0 relative">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowMenu(!showMenu);
            }}
            className="flex items-center gap-2 px-2 py-1.5 rounded-md transition-colors"
            style={{ background: showMenu ? "rgba(255,255,255,0.08)" : "transparent" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.08)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = showMenu ? "rgba(255,255,255,0.08)" : "transparent")}
          >
            <LayoutGrid size={18} className="text-white" />
            <span className="text-xs font-semibold text-white tracking-widest">CHAHYNE OS</span>
          </button>

          <AnimatePresence>
            {showMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: 10 }}
                transition={{ duration: 0.12 }}
                className="absolute bottom-full left-0 mb-2 min-w-[200px] py-1.5 rounded-lg"
                style={{
                  background: "rgba(15,15,28,0.95)",
                  border: "1px solid rgba(255,255,255,0.10)",
                  boxShadow: "0 16px 40px rgba(0,0,0,0.6)",
                  transformOrigin: "bottom left",
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="px-3 py-2 text-[13px] text-white/50 cursor-default">
                  About CHAHYNE OS
                </div>
                <div className="mx-2 border-t border-white/7" />
                <a
                  href="https://github.com/chahyn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-3 py-2 text-[13px] text-white hover:bg-[#6366f1]/30 rounded-md mx-1 transition-colors"
                >
                  GitHub Profile
                </a>
                <a
                  href="https://www.linkedin.com/in/chahine-ouledouhiba-b4365621b/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-3 py-2 text-[13px] text-white hover:bg-[#6366f1]/30 rounded-md mx-1 transition-colors"
                >
                  LinkedIn
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Window tabs next to OS logo */}
        <div className="flex items-center gap-2 ml-4 mr-auto">
          <AnimatePresence>
            {windows.map((win) => (
              <motion.button
                key={win.id}
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.15 }}
                onClick={() => onWindowClick(win.id)}
                className={`h-7 px-3 rounded-full flex items-center gap-2 transition-colors ${
                  win.isFocused
                    ? "bg-white/18 border border-white/30"
                    : "bg-white/6 hover:bg-white/12"
                } ${win.isMinimized ? "opacity-45" : ""}`}
              >
                <span className="text-white w-3 h-3 flex items-center justify-center text-[10px]">
                  {win.icon}
                </span>
                <span className="text-xs text-white whitespace-nowrap">{win.title}</span>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>

        {/* ── CENTER — launcher pill ── */}
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center">
          <AnimatePresence>
            {showLauncher && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 6 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 6 }}
                transition={{ duration: 0.15 }}
                className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 flex gap-2 px-3 py-2 rounded-xl"
                style={{
                  background: "rgba(15,15,28,0.97)",
                  border: "1px solid rgba(255,255,255,0.10)",
                  boxShadow: "0 16px 40px rgba(0,0,0,0.6)",
                  whiteSpace: "nowrap",
                }}
                onClick={(e) => e.stopPropagation()}
              >
                {centerItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      onMenuItemClick(item.id);
                      setShowLauncher(false);
                    }}
                    className="flex flex-col items-center gap-1.5 px-4 py-2 rounded-lg transition-colors"
                    style={{ color: "rgba(255,255,255,0.65)" }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "rgba(139,92,246,0.18)";
                      e.currentTarget.style.color = "rgba(167,139,250,1)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.color = "rgba(255,255,255,0.65)";
                    }}
                  >
                    <span style={{ color: "inherit" }}>{item.icon}</span>
                    <span className="text-[10px] font-medium tracking-wide" style={{ color: "inherit" }}>
                      {item.label}
                    </span>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* The pill button itself */}
          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              setShowLauncher(!showLauncher);
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-1.5 rounded-full transition-all"
            style={{
              background: showLauncher ? "rgba(139,92,246,0.25)" : "rgba(139,92,246,0.12)",
              border: `1px solid ${showLauncher ? "rgba(139,92,246,0.55)" : "rgba(139,92,246,0.28)"}`,
              color: "rgba(200,185,255,0.9)",
            }}
          >
            <motion.span
              animate={{ rotate: showLauncher ? 45 : 0 }}
              transition={{ duration: 0.2 }}
              style={{ display: "flex", alignItems: "center" }}
            >
              <IconGrid />
            </motion.span>
            <span className="text-[11px] font-semibold tracking-widest uppercase">Menu</span>
          </motion.button>
        </div>

        {/* ── RIGHT — clock & user ── */}
        <div className="ml-auto flex items-center gap-3 flex-shrink-0">
          <span className="text-[13px] text-white tabular-nums">{time}</span>
          <div className="w-px h-5 bg-white/15" />
          <span className="text-[11px] text-white/50">Guest</span>
        </div>
      </motion.div>
    </>
  );
}
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const bootLines = [
  "Initializing CHAHYNE OS v1.0...",
  "Loading kernel modules...",
  "Mounting file system...",
  "Starting user interface...",
  "Welcome, Visitor.",
];

interface BootScreenProps {
  onComplete: () => void;
}

export function BootScreen({ onComplete }: BootScreenProps) {
  const [visibleLines, setVisibleLines] = useState<string[]>([]);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Check if already booted this session
    if (sessionStorage.getItem("chahyne-os-booted")) {
      onComplete();
      return;
    }

    let lineIndex = 0;
    const interval = setInterval(() => {
      if (lineIndex < bootLines.length) {
        setVisibleLines((prev) => [...prev, bootLines[lineIndex]]);
        lineIndex++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setIsExiting(true);
          sessionStorage.setItem("chahyne-os-booted", "true");
          setTimeout(onComplete, 400);
        }, 600);
      }
    }, 300);

    return () => clearInterval(interval);
  }, [onComplete]);

  const handleSkip = () => {
    sessionStorage.setItem("chahyne-os-booted", "true");
    setIsExiting(true);
    setTimeout(onComplete, 200);
  };

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[99999] bg-black flex items-center justify-center"
        >
          <button
            onClick={handleSkip}
            className="absolute top-4 right-4 text-sm text-white/50 hover:text-white/80 transition-colors font-sans"
          >
            Skip →
          </button>

          <div className="font-mono text-white text-sm space-y-2">
            {visibleLines.map((line, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.15 }}
              >
                {line}
              </motion.div>
            ))}
            {visibleLines.length < bootLines.length && (
              <span className="animate-blink">▋</span>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

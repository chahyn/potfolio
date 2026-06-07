"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FileText } from "lucide-react";

const loadingLines = [
  "> Preparing CV package...",
  "> Verifying contents...",
  "[██████████] 100%",
  "> Ready.",
];

export function CVContent() {
  const [visibleLines, setVisibleLines] = useState<string[]>([]);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    let lineIndex = 0;
    const interval = setInterval(() => {
      if (lineIndex < loadingLines.length) {
        setVisibleLines((prev) => [...prev, loadingLines[lineIndex]]);
        lineIndex++;
      } else {
        clearInterval(interval);
        setTimeout(() => setShowContent(true), 300);
      }
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full flex flex-col items-center justify-center">
      {!showContent && (
        <div className="font-mono text-xs text-[#6366f1] space-y-1">
          {visibleLines.map((line, idx) => (
            <div key={idx}>{line}</div>
          ))}
          {visibleLines.length < loadingLines.length && (
            <span className="animate-blink">▋</span>
          )}
        </div>
      )}

      {showContent && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="text-center"
        >
          <FileText size={48} className="text-[#6366f1] mx-auto" />
          <h3 className="text-[15px] font-bold text-white mt-3">
            Chahine_Ouled_Ouhiba.pdf
          </h3>
          <p className="text-[13px] text-white/60 mt-1">
            Full resume — skills, experience, projects, education.
          </p>
          <a
            href="/Chahine_OULEDOUHIBA.pdf" // TODO: replace "#" with actual hosted PDF URL
            download="Chahine_OuledOuhiba.pdf"
            className="inline-block mt-6 px-10 py-3.5 text-[15px] font-bold text-white rounded-[10px] hover:scale-105 transition-transform animate-pulse-glow"
            style={{
              background: "linear-gradient(135deg, #6366f1, #4f9cf9)",
            }}
          >
            ⬇ Download CV
          </a>
        </motion.div>
      )}
    </div>
  );
}

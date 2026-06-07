"use client";

import { motion } from "framer-motion";

interface ContextMenuProps {
  x: number;
  y: number;
  onClose: () => void;
}

export function ContextMenu({ x, y, onClose }: ContextMenuProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{ duration: 0.12 }}
      className="fixed z-[10000] min-w-[200px] py-1.5 rounded-[10px]"
      style={{
        left: x,
        top: y,
        background: "rgba(15,15,28,0.95)",
        border: "1px solid rgba(255,255,255,0.10)",
        boxShadow: "0 16px 40px rgba(0,0,0,0.6)",
        transformOrigin: "top left",
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="px-3 py-2 text-[13px] text-white/50 cursor-default rounded-md mx-1">
        About CHAHYNE OS
      </div>
      <div className="mx-2 my-1 border-t border-white/7" />
      <a
        href="https://github.com/chahyn"
        target="_blank"
        rel="noopener noreferrer"
        className="block px-3 py-2 text-[13px] text-white hover:bg-white/8 rounded-md mx-1 transition-colors"
        onClick={onClose}
      >
        Open GitHub Profile
      </a>
      <a
        href="https://www.linkedin.com/in/chahine-ouledouhiba-b4365621b/"
        target="_blank"
        rel="noopener noreferrer"
        className="block px-3 py-2 text-[13px] text-white hover:bg-white/8 rounded-md mx-1 transition-colors"
        onClick={onClose}
      >
        Open LinkedIn
      </a>
      <div className="mx-2 my-1 border-t border-white/7" />
      <button
        onClick={onClose}
        className="w-full text-left px-3 py-2 text-[13px] text-white hover:bg-white/8 rounded-md mx-1 transition-colors"
        style={{ width: "calc(100% - 8px)" }}
      >
        Refresh Desktop
      </button>
    </motion.div>
  );
}

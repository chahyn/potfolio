"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useState } from "react";

interface DesktopIconProps {
  icon: ReactNode;
  label: string;
  isSelected: boolean;
  index: number;
  onClick: () => void;
  onDoubleClick: () => void;
}

export function DesktopIcon({
  icon,
  label,
  isSelected,
  index,
  onClick,
  onDoubleClick,
}: DesktopIconProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      data-desktop-icon
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ 
        duration: 0.4, 
        delay: 0.8 + index * 0.1,
        ease: "easeOut"
      }}
      className="flex flex-col items-center w-[72px] cursor-pointer select-none"
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      onDoubleClick={(e) => {
        e.stopPropagation();
        onDoubleClick();
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        animate={{
          scale: isHovered || isSelected ? 1.1 : 1,
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="relative"
      >
        {/* Glowing purple border pulse effect */}
        {(isHovered || isSelected) && (
          <motion.div
            className="absolute -inset-1 rounded-2xl"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0.4, 0.8, 0.4],
              scale: [1, 1.02, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              background: "linear-gradient(135deg, rgba(139, 92, 246, 0.6) 0%, rgba(99, 102, 241, 0.4) 100%)",
              filter: "blur(8px)",
            }}
          />
        )}
        
        <div
          className={`relative w-[72px] h-[72px] rounded-2xl flex items-center justify-center transition-all duration-200 ${
            isSelected
              ? "bg-violet-500/25 border-2 border-violet-400/60"
              : isHovered
              ? "bg-white/15 border-2 border-violet-400/40"
              : "bg-white/7 border border-white/12"
          }`}
          style={{
            backdropFilter: "blur(12px)",
            boxShadow: isSelected || isHovered 
              ? "0 8px 32px rgba(139, 92, 246, 0.3), inset 0 1px 0 rgba(255,255,255,0.1)" 
              : "0 4px 20px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)",
          }}
        >
          <motion.div 
            className="text-white"
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.2 }}
          >
            {icon}
          </motion.div>
        </div>
      </motion.div>
      
      <motion.span
        animate={{
          textShadow: isSelected || isHovered 
            ? "0 0 12px rgba(139, 92, 246, 0.8), 0 0 4px rgba(255,255,255,0.5)" 
            : "0 2px 4px rgba(0,0,0,0.5)",
        }}
        className={`mt-2 text-[11px] text-white text-center max-w-[80px] truncate font-medium`}
      >
        {label}
      </motion.span>
    </motion.div>
  );
}

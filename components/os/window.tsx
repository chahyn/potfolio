"use client";

import { useState, useEffect, useRef, useCallback, type ReactNode } from "react";
import { motion } from "framer-motion";

interface WindowProps {
  id: string;
  title: string;
  icon: ReactNode;
  isMinimized: boolean;
  isFocused: boolean;
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
  onClose: () => void;
  onMinimize: () => void;
  onFocus: () => void;
  onPositionChange: (pos: { x: number; y: number }) => void;
  onSizeChange: (size: { width: number; height: number }) => void;
  onMaximize: () => void;
  children: ReactNode;
}

export function Window({
  id,
  title,
  icon,
  isMinimized,
  isFocused,
  position,
  size,
  zIndex,
  onClose,
  onMinimize,
  onFocus,
  onPositionChange,
  onSizeChange,
  onMaximize,
  children,
}: WindowProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const resizeStart = useRef({ width: 0, height: 0, mouseX: 0, mouseY: 0 });

  const handleDragStart = useCallback(
    (e: React.MouseEvent) => {
      if ((e.target as HTMLElement).closest("button")) return;
      e.preventDefault();
      setIsDragging(true);
      dragStart.current = {
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      };
      onFocus();
    },
    [position.x, position.y, onFocus]
  );

  const handleResizeStart = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsResizing(true);
      resizeStart.current = {
        width: size.width,
        height: size.height,
        mouseX: e.clientX,
        mouseY: e.clientY,
      };
      onFocus();
    },
    [size.width, size.height, onFocus]
  );

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      let newX = e.clientX - dragStart.current.x;
      let newY = e.clientY - dragStart.current.y;

      // Clamp position
      newX = Math.max(0, Math.min(newX, viewportWidth - size.width));
      newY = Math.max(0, Math.min(newY, viewportHeight - 48 - size.height));

      onPositionChange({ x: newX, y: newY });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, size.width, size.height, onPositionChange]);

  useEffect(() => {
    if (!isResizing) return;

    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - resizeStart.current.mouseX;
      const deltaY = e.clientY - resizeStart.current.mouseY;

      const newWidth = Math.max(400, resizeStart.current.width + deltaX);
      const newHeight = Math.max(300, resizeStart.current.height + deltaY);

      onSizeChange({ width: newWidth, height: newHeight });
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing, onSizeChange]);

  return (
    <motion.div
      key={id}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={
        isMinimized
          ? { opacity: 0, scale: 0.5, y: window.innerHeight }
          : { opacity: 1, scale: 1, y: 0 }
      }
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: isMinimized ? 0.2 : 0.18, ease: "easeOut" }}
      className="absolute overflow-hidden"
      style={{
        left: position.x,
        top: position.y,
        width: size.width,
        height: size.height,
        zIndex,
        borderRadius: "12px",
        border: isFocused
          ? "1px solid rgba(255,255,255,0.20)"
          : "1px solid rgba(255,255,255,0.08)",
        boxShadow:
          "0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04)",
        backdropFilter: "blur(2px)",
        pointerEvents: isMinimized ? "none" : "auto",
      }}
      onMouseDown={onFocus}
    >
      {/* Title Bar */}
      <div
        className="h-10 flex items-center justify-between px-3"
        style={{
          background: "rgba(20,20,35,0.98)",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          cursor: isDragging ? "grabbing" : "grab",
        }}
        onMouseDown={handleDragStart}
      >
        <div className="flex items-center gap-2">
          <span className="text-white w-4 h-4 flex items-center justify-center">
            {icon}
          </span>
          <span className="text-[13px] text-white font-medium">{title}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            onClick={onClose}
            className="w-3 h-3 rounded-full bg-[#ff5f57] hover:brightness-90 flex items-center justify-center group transition-all"
          >
            <span className="text-[10px] text-black/70 opacity-0 group-hover:opacity-100 leading-none">
              ✕
            </span>
          </button>
          <button
            onClick={onMinimize}
            className="w-3 h-3 rounded-full bg-[#ffbd2e] hover:brightness-90 flex items-center justify-center group transition-all"
          >
            <span className="text-[10px] text-black/70 opacity-0 group-hover:opacity-100 leading-none">
              −
            </span>
          </button>
          <button
            onClick={onMaximize}
            className="w-3 h-3 rounded-full bg-[#28c840] hover:brightness-90 flex items-center justify-center group transition-all"
          >
            <span className="text-[10px] text-black/70 opacity-0 group-hover:opacity-100 leading-none">
              ⤢
            </span>
          </button>
        </div>
      </div>

      {/* Window Body */}
      <div
        className="overflow-y-auto p-5"
        style={{
          background: "rgba(15,15,28,0.97)",
          height: `calc(100% - 40px)`,
        }}
      >
        {children}
      </div>

      {/* Resize Handle */}
      <div
        className="absolute bottom-0 right-0 w-3 h-3 cursor-se-resize"
        style={{
          background:
            "linear-gradient(135deg, transparent 50%, rgba(255,255,255,0.2) 50%)",
        }}
        onMouseDown={handleResizeStart}
      />
    </motion.div>
  );
}

import type { ReactNode } from "react";

export interface WindowState {
  id: string;
  title: string;
  icon: ReactNode;
  isOpen: boolean;
  isMinimized: boolean;
  isFocused: boolean;
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
  defaultSize: { width: number; height: number };
}

export interface DesktopIcon {
  id: string;
  label: string;
  icon: ReactNode;
}

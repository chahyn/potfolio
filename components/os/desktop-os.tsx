"use client";

import { useState, useRef, useCallback, useEffect, type ReactNode } from "react";
import { AnimatePresence } from "framer-motion";
import { User, Zap, FolderOpen, Mail, FileText, Terminal } from "lucide-react";

import { Wallpaper } from "./wallpaper";
import { DesktopIcon } from "./desktop-icon";
import { Window } from "./window";
import { Taskbar } from "./taskbar";
import { ContextMenu } from "./context-menu";
import { AboutMeContent } from "./window-contents/about-me";
import { SkillsContent } from "./window-contents/skills";
import { ProjectsContent } from "./window-contents/projects";
import { ContactContent } from "./window-contents/contact";
import { CVContent } from "./window-contents/cv";
import { TerminalContent } from "./window-contents/terminal";
import type { WindowState } from "@/types/os";

interface IconConfig {
  id: string;
  label: string;
  icon: ReactNode;
  defaultSize: { width: number; height: number };
  content: ReactNode;
  desktopOnly?: boolean; // if true, won't show in sidebar desktop icons
}

const iconConfigs: IconConfig[] = [
  {
    id: "about",
    label: "About Me",
    icon: <User size={28} />,
    defaultSize: { width: 680, height: 480 },
    content: <AboutMeContent />,
  },
  {
    id: "skills",
    label: "Skills",
    icon: <Zap size={28} />,
    defaultSize: { width: 720, height: 520 },
    content: <SkillsContent />,
  },
  {
    id: "projects",
    label: "Projects",
    icon: <FolderOpen size={28} />,
    defaultSize: { width: 860, height: 600 },
    content: <ProjectsContent />,
  },
  {
    id: "contact",
    label: "Contact",
    icon: <Mail size={28} />,
    defaultSize: { width: 520, height: 420 },
    content: <ContactContent />,
  },
  {
    id: "cv",
    label: "My CV",
    icon: <FileText size={28} />,
    defaultSize: { width: 480, height: 360 },
    content: <CVContent />,
  },
  {
    id: "terminal",
    label: "Terminal",
    icon: <Terminal size={28} />,
    defaultSize: { width: 680, height: 440 },
    content: <TerminalContent />,
    desktopOnly: true, // terminal lives in taskbar menu, not sidebar
  },
];

export function DesktopOS() {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);
  const zCounter = useRef(100);

  const handleDesktopClick = useCallback(() => {
    setSelectedIcon(null);
    setContextMenu(null);
  }, []);

  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    const target = e.target as HTMLElement;
    if (
      target.closest("[data-desktop-icon]") ||
      target.closest("[data-window]")
    ) return;
    setContextMenu({ x: e.clientX, y: e.clientY });
  }, []);

  useEffect(() => {
    if (!contextMenu) return;
    const handleClick = () => setContextMenu(null);
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [contextMenu]);

  const openWindow = useCallback((id: string) => {
    const config = iconConfigs.find((c) => c.id === id);
    if (!config) return;
    const index = iconConfigs.findIndex((c) => c.id === id);

    setWindows((prev) => {
      const existing = prev.find((w) => w.id === config.id);

      if (existing) {
        zCounter.current++;
        return prev.map((w) =>
          w.id === config.id
            ? { ...w, isMinimized: false, isFocused: true, zIndex: zCounter.current }
            : { ...w, isFocused: false }
        );
      }

      zCounter.current++;
      const newWindow: WindowState = {
        id: config.id,
        title: config.label,
        icon: config.icon,
        isOpen: true,
        isMinimized: false,
        isFocused: true,
        position: {
          x: 80 + index * 30,
          y: 60 + index * 20,
        },
        size: { ...config.defaultSize },
        defaultSize: { ...config.defaultSize },
        zIndex: zCounter.current,
      };

      return [...prev.map((w) => ({ ...w, isFocused: false })), newWindow];
    });
  }, []);

  const closeWindow = useCallback((id: string) => {
    setWindows((prev) => prev.filter((w) => w.id !== id));
  }, []);

  const minimizeWindow = useCallback((id: string) => {
    setWindows((prev) =>
      prev.map((w) =>
        w.id === id ? { ...w, isMinimized: true, isFocused: false } : w
      )
    );
  }, []);

  const focusWindow = useCallback((id: string) => {
    zCounter.current++;
    setWindows((prev) =>
      prev.map((w) =>
        w.id === id
          ? { ...w, isFocused: true, zIndex: zCounter.current }
          : { ...w, isFocused: false }
      )
    );
  }, []);

  const toggleMaximize = useCallback((id: string) => {
    setWindows((prev) =>
      prev.map((w) => {
        if (w.id !== id) return w;
        const isMaximized =
          w.size.width === window.innerWidth &&
          w.size.height === window.innerHeight - 48;
        if (isMaximized) {
          return { ...w, size: { ...w.defaultSize }, position: { x: 80, y: 60 } };
        }
        return {
          ...w,
          size: { width: window.innerWidth, height: window.innerHeight - 48 },
          position: { x: 0, y: 0 },
        };
      })
    );
  }, []);

  const updateWindowPosition = useCallback(
    (id: string, position: { x: number; y: number }) => {
      setWindows((prev) =>
        prev.map((w) => (w.id === id ? { ...w, position } : w))
      );
    },
    []
  );

  const updateWindowSize = useCallback(
    (id: string, size: { width: number; height: number }) => {
      setWindows((prev) =>
        prev.map((w) => (w.id === id ? { ...w, size } : w))
      );
    },
    []
  );

  const handleTaskbarClick = useCallback(
    (id: string) => {
      const win = windows.find((w) => w.id === id);
      if (!win) return;

      if (win.isMinimized) {
        zCounter.current++;
        setWindows((prev) =>
          prev.map((w) =>
            w.id === id
              ? { ...w, isMinimized: false, isFocused: true, zIndex: zCounter.current }
              : { ...w, isFocused: false }
          )
        );
      } else {
        focusWindow(id);
      }
    },
    [windows, focusWindow]
  );

  const getWindowContent = (id: string): ReactNode => {
    const config = iconConfigs.find((c) => c.id === id);
    return config?.content ?? null;
  };

  // Only show non-terminal configs in sidebar
  const sidebarConfigs = iconConfigs.filter((c) => !c.desktopOnly);

  return (
    <div
      className="fixed inset-0 overflow-hidden select-none"
      onClick={handleDesktopClick}
      onContextMenu={handleContextMenu}
    >
      <Wallpaper onOpenProjects={() => openWindow("projects")} />

      {/* Desktop Icons */}
      <div
        className="absolute left-6 top-6 flex flex-col gap-4 z-10"
        style={{ paddingBottom: "64px" }}
      >
        {sidebarConfigs.map((config, index) => (
          <div
            key={config.id}
            data-desktop-icon
            onClick={(e) => e.stopPropagation()}
          >
            <DesktopIcon
              icon={config.icon}
              label={config.label}
              isSelected={selectedIcon === config.id}
              index={index}
              onClick={() => {
                setSelectedIcon(config.id);
                openWindow(config.id);
              }}
            />
          </div>
        ))}
      </div>

      {/* Windows */}
      <AnimatePresence mode="sync">
        {windows.map((win) => (
          <div key={win.id} data-window>
            <Window
              id={win.id}
              title={win.title}
              icon={
                <span className="w-4 h-4 flex items-center justify-center">
                  {iconConfigs.find((c) => c.id === win.id)?.icon}
                </span>
              }
              isMinimized={win.isMinimized}
              isFocused={win.isFocused}
              position={win.position}
              size={win.size}
              zIndex={win.zIndex}
              onClose={() => closeWindow(win.id)}
              onMinimize={() => minimizeWindow(win.id)}
              onFocus={() => focusWindow(win.id)}
              onPositionChange={(pos) => updateWindowPosition(win.id, pos)}
              onSizeChange={(size) => updateWindowSize(win.id, size)}
              onMaximize={() => toggleMaximize(win.id)}
            >
              {getWindowContent(win.id)}
            </Window>
          </div>
        ))}
      </AnimatePresence>

      {/* Taskbar */}
      <Taskbar
        windows={windows.map((w) => ({
          id: w.id,
          title: w.title,
          icon: (
            <span className="w-3 h-3 flex items-center justify-center">
              {iconConfigs.find((c) => c.id === w.id)?.icon}
            </span>
          ),
          isMinimized: w.isMinimized,
          isFocused: w.isFocused,
        }))}
        onWindowClick={handleTaskbarClick}
        onMenuItemClick={openWindow}
      />

      {/* Context Menu */}
      <AnimatePresence>
        {contextMenu && (
          <ContextMenu
            x={contextMenu.x}
            y={contextMenu.y}
            onClose={() => setContextMenu(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
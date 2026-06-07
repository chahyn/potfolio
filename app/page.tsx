"use client";

import { useState, useEffect } from "react";
import { BootScreen } from "@/components/os/boot-screen";
import { DesktopOS } from "@/components/os/desktop-os";
import { MobileFallback } from "@/components/os/mobile-fallback";

export default function Home() {
  const [isBooted, setIsBooted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check if already booted this session
    if (sessionStorage.getItem("chahyne-os-booted")) {
      setIsBooted(true);
    }
    // Check screen size
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Show nothing until mounted to prevent hydration mismatch
  if (!mounted) {
    return <div className="fixed inset-0 bg-black" />;
  }

  // Mobile view
  if (isMobile) {
    return <MobileFallback />;
  }

  // Desktop view with boot sequence
  return (
    <>
      {!isBooted && <BootScreen onComplete={() => setIsBooted(true)} />}
      {isBooted && <DesktopOS />}
    </>
  );
}

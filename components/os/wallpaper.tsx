"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useMemo } from "react";

// Floating particle component
function FloatingParticle({ delay, duration, size, startX, startY }: {
  delay: number;
  duration: number;
  size: number;
  startX: number;
  startY: number;
}) {
  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        width: size,
        height: size,
        left: `${startX}%`,
        top: `${startY}%`,
        background: "rgba(139, 92, 246, 0.3)",
        boxShadow: "0 0 10px rgba(139, 92, 246, 0.5)",
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, 0.6, 0.3, 0.6, 0],
        scale: [0, 1, 1.2, 1, 0],
        y: [-20, -60, -40, -80, -100],
        x: [0, 10, -10, 15, 0],
      }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

// Decorative star/sparkle
function Sparkle({ x, y, delay, size = 16 }: { x: number; y: number; delay: number; size?: number }) {
  return (
    <motion.svg
      className="absolute"
      style={{ left: `${x}%`, top: `${y}%` }}
      width={size} height={size} viewBox="0 0 24 24" fill="none"
      initial={{ opacity: 0, rotate: 0, scale: 0.5 }}
      animate={{ opacity: [0, 0.5, 0.3, 0.5, 0], rotate: [0, 30, 0, -30, 0], scale: [0.5, 1, 0.8, 1, 0.5] }}
      transition={{ duration: 6 + delay, delay, repeat: Infinity, ease: "easeInOut" }}
    >
      <path d="M12 2L13.5 9L20 10.5L13.5 12L12 19L10.5 12L4 10.5L10.5 9L12 2Z"
        stroke="rgba(139,92,246,0.6)" strokeWidth="1" fill="rgba(139,92,246,0.15)" />
    </motion.svg>
  );
}

// Typewriter effect component
function TypewriterText({ text, delay = 0 }: { text: string; delay?: number }) {
  const [displayedText, setDisplayedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      let index = 0;
      const interval = setInterval(() => {
        if (index <= text.length) {
          setDisplayedText(text.slice(0, index));
          index++;
        } else {
          clearInterval(interval);
        }
      }, 70);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timeout);
  }, [text, delay]);

  useEffect(() => {
    const cursorInterval = setInterval(() => setShowCursor((p) => !p), 530);
    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <span>
      {displayedText}
      <span className={`${showCursor ? "opacity-100" : "opacity-0"} transition-opacity`}>|</span>
    </span>
  );
}

// ── Custom SVG icons — geometric, sharp, futuristic ──

const IconBolt = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

const IconDiamond = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2.7 10.3L12 2l9.3 8.3L12 22z" />
    <line x1="2.7" y1="10.3" x2="21.3" y2="10.3" />
  </svg>
);

const IconHexagon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" />
    <line x1="12" y1="2" x2="12" y2="22" />
    <line x1="2" y1="8.5" x2="22" y2="8.5" />
    <line x1="2" y1="15.5" x2="22" y2="15.5" />
  </svg>
);

const IconLayers = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 22 8.5 12 15 2 8.5 12 2" />
    <polyline points="2 14 12 20.5 22 14" />
  </svg>
);

const IconFolder = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 6a1 1 0 0 1 1-1h4.586a1 1 0 0 1 .707.293L10.707 6.7A1 1 0 0 0 11.414 7H20a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6z" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const IconFile = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="8" y1="13" x2="16" y2="13" />
    <line x1="8" y1="17" x2="13" y2="17" />
  </svg>
);

const IconGear = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

const tags = [
  { icon: <IconBolt />,    label: "AI Engineer" },
  { icon: <IconDiamond />, label: "Creative builder" },
  { icon: <IconHexagon />, label: "Full-Stack Dev" },
  { icon: <IconLayers />,  label: "Web + Mobile" },
];

export function Wallpaper({ onOpenProjects }: { onOpenProjects?: () => void }) {
  const particles = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        id: i,
        delay: i * 0.9,
        duration: 8 + (i % 5),
        size: 4 + (i % 5),
        startX: 5 + (i * 7) % 85,
        startY: 20 + (i * 11) % 65,
      })),
    []
  );

  const sparkles = useMemo(() => [
    { id: 1, x: 6,  y: 8,  delay: 0,   size: 18 },
    { id: 2, x: 92, y: 12, delay: 1.5, size: 14 },
    { id: 3, x: 4,  y: 55, delay: 2,   size: 16 },
    { id: 4, x: 90, y: 60, delay: 0.8, size: 12 },
    { id: 5, x: 50, y: 5,  delay: 3,   size: 13 },
    { id: 6, x: 78, y: 85, delay: 1.2, size: 15 },
  ], []);

  return (
    <div
      className="fixed inset-0 z-0 overflow-hidden"
      style={{ background: "#0d0d12" }}
    >
      {/* Background gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 30% 50%, rgba(48,30,90,0.5) 0%, transparent 60%), radial-gradient(ellipse at 80% 50%, rgba(20,15,40,0.8) 0%, transparent 70%), #0d0d12",
        }}
      />

      {/* Subtle grid texture */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(139,92,246,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Sparkles */}
      {sparkles.map((s) => <Sparkle key={s.id} {...s} />)}

      {/* Particles */}
      {particles.map((p) => <FloatingParticle key={p.id} {...p} />)}

      {/* Large violet glow left-center */}
      <div
        className="absolute"
        style={{
          left: "10%",
          top: "40%",
          width: "500px",
          height: "500px",
          background: "radial-gradient(circle, rgba(109,40,217,0.12) 0%, transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />

      {/* ── HERO PHOTO — right side, no card border, blends into dark bg ── */}
      <motion.div
        className="absolute"
        style={{
          right: 0,
          top: 0,
          bottom: 0,
          width: "42%",
          overflow: "hidden",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, delay: 0.2 }}
      >
        <motion.img
          src="/images/heronew.png"
          alt="Chahine"
          style={{
            width: "85%",
            height: "85%",
            objectFit: "cover",
            objectPosition: "center -15%",
          }}
          initial={{ scale: 1 }}
          animate={{ scale: 1.06 }}
          transition={{ duration: 30, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
        />
        {/* Left fade so photo blends seamlessly into dark bg */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to right, #0d0d12 0%, rgba(13,13,18,0.5) 30%, transparent 70%), linear-gradient(to top, #0d0d12 0%, transparent 30%)",
          }}
        />
      </motion.div>

      {/* ── LEFT CONTENT ── */}
      <div
        className="absolute inset-0 flex flex-col justify-center"
        style={{ paddingLeft: "8%", paddingRight: "45%", gap: 0 }}
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          style={{ marginBottom: "18px" }}
        >
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 16px",
              borderRadius: "999px",
              border: "1px solid rgba(139,92,246,0.35)",
              background: "rgba(139,92,246,0.08)",
              fontSize: "13px",
              color: "rgba(200,180,255,0.85)",
              fontFamily: "'Courier New', monospace",
              letterSpacing: "0.02em",
            }}
          >
            <IconGear /> Génie Informatique · ENICarthage · 2025–2026
          </span>
        </motion.div>

        {/* Name */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          style={{ marginBottom: "16px" }}
        >
          <h1
            style={{
              fontSize: "clamp(52px, 6vw, 88px)",
              fontWeight: 800,
              lineHeight: 1.05,
              margin: 0,
              fontFamily: "'Georgia', serif",
              letterSpacing: "-0.02em",
            }}
          >
            <span style={{ color: "#a78bfa" }}>
              <TypewriterText text="Chahine" delay={700} />
            </span>
            <br />
            <span style={{ color: "#ffffff" }}>OULEDOUHIBA</span>
          </h1>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.8 }}
          style={{
            color: "rgba(200,200,220,0.65)",
            fontSize: "clamp(14px, 1.3vw, 17px)",
            lineHeight: 1.65,
            maxWidth: "460px",
            marginBottom: "24px",
            fontFamily: "'Georgia', serif",
          }}
        >
          ENICarthage · full-stack development, AI systems,<br />
          creative builds, and open-source along the way.
        </motion.p>

        {/* Tag pills */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 2.2 }}
          style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "32px" }}
        >
          {tags.map((tag, i) => (
            <motion.span
              key={tag.label}
              whileHover={{ scale: 1.05, borderColor: "rgba(139,92,246,0.7)" }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.3 + i * 0.1 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "7px",
                padding: "7px 15px",
                borderRadius: "999px",
                border: "1px solid rgba(139,92,246,0.25)",
                background: "rgba(139,92,246,0.06)",
                fontSize: "13px",
                color: "rgba(210,200,240,0.8)",
                cursor: "default",
                fontFamily: "'Courier New', monospace",
              }}
            >
              <span style={{ color: "rgba(167,139,250,0.9)", display: "flex", alignItems: "center" }}>
                {tag.icon}
              </span>
              {tag.label}
            </motion.span>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 2.8 }}
          style={{ display: "flex", gap: "14px", alignItems: "center", marginBottom: "28px" }}
        >
          <motion.button
            onClick={onOpenProjects}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            style={{
              padding: "12px 26px",
              borderRadius: "999px",
              border: "none",
              background: "linear-gradient(135deg, #7c3aed, #a855f7)",
              color: "#fff",
              fontWeight: 600,
              fontSize: "14px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              boxShadow: "0 4px 24px rgba(124,58,237,0.35)",
              fontFamily: "'Courier New', monospace",
            }}
          >
            <IconFolder /> View projects
          </motion.button>
          <motion.a
            href="/chahine_OULEDOUHIBA.pdf"
            download="Chahine_OULEDOUHIBA.pdf"
            whileHover={{ scale: 1.03, borderColor: "rgba(139,92,246,0.6)" }}
            whileTap={{ scale: 0.97 }}
            style={{
              padding: "12px 26px",
              borderRadius: "999px",
              border: "1px solid rgba(139,92,246,0.3)",
              background: "transparent",
              color: "rgba(220,210,255,0.85)",
              fontWeight: 600,
              fontSize: "14px",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              fontFamily: "'Courier New', monospace",
              textDecoration: "none",
            }}
          >
            <IconFile /> Download CV
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
}
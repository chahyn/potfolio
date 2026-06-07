"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin,  Mail, Wifi } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "../icons";
const contactItems = [
  {
    id: "location",
    label: "LOCATION.DAT",
    icon: MapPin,
    value: "Tunisia, North Africa",
    display: "Tunisia, North Africa",
    isLink: false,
    accent: "#6366f1",
  },
  {
    id: "linkedin",
    label: "LINKEDIN.LNK",
    icon: LinkedinIcon,
    value: "linkedin.com/in/chahine-ouledouhiba",
    href: "https://www.linkedin.com/in/chahine-ouledouhiba-b4365621b/",
    isLink: true,
    accent: "#0a66c2",
  },
  {
    id: "github",
    label: "GITHUB.LNK",
    icon: GithubIcon,
    value: "github.com/chahyn",
    href: "https://github.com/chahyn",
    isLink: true,
    accent: "#a78bfa",
  },
  {
    id: "email",
    label: "EMAIL.CFG",
    icon: Mail,
    value: "chahine.ouledouhiba@email.com",
    href: "mailto:chahine.ouledouhiba@email.com",
    isLink: true,
    accent: "#6366f1",
  },
];

function ScanLine() {
  return (
    <>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          height: "2px",
          background:
            "linear-gradient(to right, transparent, rgba(99,102,241,0.4), rgba(139,92,246,0.6), rgba(99,102,241,0.4), transparent)",
          animation: "contactScan 6s linear infinite",
          filter: "blur(1px)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />
      <style>{`
        @keyframes contactScan {
          0% { top: -2px; opacity: 0; }
          5% { opacity: 1; }
          95% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes contactBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes contactPulse {
          0%, 100% { box-shadow: 0 0 6px rgba(99,102,241,0.4); }
          50% { box-shadow: 0 0 14px rgba(99,102,241,0.8); }
        }
        @keyframes greenPulse {
          0%, 100% { box-shadow: 0 0 6px #22c55e; opacity: 1; }
          50% { box-shadow: none; opacity: 0.4; }
        }
        @keyframes contactFadeIn {
          from { opacity: 0; transform: translateX(-8px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes ping {
          0% { transform: scale(1); opacity: 0.8; }
          100% { transform: scale(2.2); opacity: 0; }
        }
      `}</style>
    </>
  );
}

export function ContactContent() {
  const [showContent, setShowContent] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const fullText = "establishing_connection...";

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i <= fullText.length) {
        setLoadingText(fullText.slice(0, i));
        i++;
      } else {
        clearInterval(interval);
        setTimeout(() => setShowContent(true), 300);
      }
    }, 45);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        height: "100%",
        background: "linear-gradient(135deg, #08080f 0%, #0d0b1a 50%, #080d1a 100%)",
        position: "relative",
        overflow: "hidden",
        fontFamily: "'Courier New', monospace",
      }}
    >
      <ScanLine />

      {/* Grid background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(99,102,241,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.04) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          pointerEvents: "none",
        }}
      />

      {/* Corner accents */}
      {[
        { top: 0, left: 0, borderTop: "2px solid", borderLeft: "2px solid" },
        { top: 0, right: 0, borderTop: "2px solid", borderRight: "2px solid" },
        { bottom: 0, left: 0, borderBottom: "2px solid", borderLeft: "2px solid" },
        { bottom: 0, right: 0, borderBottom: "2px solid", borderRight: "2px solid" },
      ].map((s, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: 16,
            height: 16,
            borderColor: "rgba(99,102,241,0.5)",
            pointerEvents: "none",
            ...s,
          }}
        />
      ))}

      {/* Glow orb */}
      <div
        style={{
          position: "absolute",
          bottom: "20%",
          right: "15%",
          width: 250,
          height: 250,
          background: "radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)",
          filter: "blur(40px)",
          pointerEvents: "none",
        }}
      />

      {/* Header bar */}
      <div
        style={{
          position: "relative",
          padding: "10px 16px",
          borderBottom: "1px solid rgba(99,102,241,0.15)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "rgba(99,102,241,0.04)",
          zIndex: 2,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#6366f1",
              animation: "contactPulse 2s infinite",
            }}
          />
          <span style={{ fontSize: 11, color: "rgba(99,102,241,0.8)", letterSpacing: "0.15em" }}>
            CONTACT.SYS
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <Wifi size={10} color="rgba(34,197,94,0.7)" />
          <span style={{ fontSize: 10, color: "rgba(34,197,94,0.6)", letterSpacing: "0.1em" }}>
            ONLINE
          </span>
        </div>
      </div>

      {/* Content */}
      <div
        style={{
          height: "calc(100% - 41px)",
          overflowY: "auto",
          padding: "16px 20px",
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          gap: 0,
        }}
      >
        {/* Terminal prompt */}
        <div
          style={{
            fontSize: 12,
            color: "#6366f1",
            marginBottom: 20,
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <span style={{ color: "rgba(99,102,241,0.5)" }}>{">"}</span>
          <span>{loadingText}</span>
          {!showContent && (
            <span style={{ animation: "contactBlink 0.8s infinite" }}>█</span>
          )}
          {showContent && (
            <span style={{ color: "rgba(34,197,94,0.7)", fontSize: 10, marginLeft: 4 }}>
              ✓ CONNECTED
            </span>
          )}
        </div>

        {/* Contact cards */}
        {showContent && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {contactItems.map((item, i) => {
              const ItemIcon = item.icon;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.08 }}
                  style={{
                    background: "rgba(99,102,241,0.04)",
                    border: "1px solid rgba(99,102,241,0.12)",
                    borderRadius: 6,
                    padding: "12px 14px",
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    position: "relative",
                    overflow: "hidden",
                    transition: "all 0.2s ease",
                    cursor: item.isLink ? "pointer" : "default",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = "rgba(99,102,241,0.08)";
                    el.style.borderColor = "rgba(99,102,241,0.3)";
                    el.style.transform = "translateX(4px)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = "rgba(99,102,241,0.04)";
                    el.style.borderColor = "rgba(99,102,241,0.12)";
                    el.style.transform = "translateX(0)";
                  }}
                >
                  {/* Left accent bar */}
                  <div
                    style={{
                      position: "absolute",
                      left: 0,
                      top: 0,
                      bottom: 0,
                      width: 2,
                      background: item.accent,
                      opacity: 0.7,
                    }}
                  />

                  {/* Icon */}
                  <div
                    style={{
                      width: 34,
                      height: 34,
                      borderRadius: 4,
                      background: "rgba(99,102,241,0.08)",
                      border: "1px solid rgba(99,102,241,0.15)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <ItemIcon size={15} color={item.accent} />
                  </div>

                  {/* Text */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        fontSize: 9,
                        color: "rgba(99,102,241,0.6)",
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        marginBottom: 4,
                      }}
                    >
                      {item.label}
                    </div>
                    {item.isLink && item.href ? (
                        <a
                        href={item.href}
                        target={item.href.startsWith("mailto") ? undefined : "_blank"}
                        rel="noopener noreferrer"
                        style={{
                          fontSize: 12,
                          color: "rgba(167,139,250,0.9)",
                          textDecoration: "none",
                          letterSpacing: "0.02em",
                          transition: "color 0.15s",
                          display: "block",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLElement).style.color = "#a78bfa";
                          (e.currentTarget as HTMLElement).style.textDecoration = "underline";
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLElement).style.color = "rgba(167,139,250,0.9)";
                          (e.currentTarget as HTMLElement).style.textDecoration = "none";
                        }}
                      >
                        {item.value}
                      </a>
                    ) : (
                      <span
                        style={{
                          fontSize: 12,
                          color: "rgba(220,220,240,0.8)",
                          letterSpacing: "0.02em",
                        }}
                      >
                        {item.display}
                      </span>
                    )}
                  </div>

                  {/* Arrow indicator for links */}
                  {item.isLink && (
                    <span style={{ fontSize: 10, color: "rgba(99,102,241,0.3)", flexShrink: 0 }}>
                      ↗
                    </span>
                  )}
                </motion.div>
              );
            })}

            {/* Status footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.45 }}
              style={{
                marginTop: 8,
                padding: "12px 14px",
                borderTop: "1px solid rgba(99,102,241,0.1)",
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <div style={{ position: "relative", flexShrink: 0 }}>
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: "#22c55e",
                    animation: "greenPulse 1.5s infinite",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: "50%",
                    background: "#22c55e",
                    animation: "ping 1.5s infinite",
                    opacity: 0,
                  }}
                />
              </div>
              <span
                style={{
                  fontSize: 12,
                  color: "rgba(255,255,255,0.55)",
                  letterSpacing: "0.03em",
                }}
              >
                Open to internships, full-time & freelance
              </span>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
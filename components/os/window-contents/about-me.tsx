"use client";

import { useState, useEffect } from "react";
import { GithubIcon, LinkedinIcon } from "../icons";

const roles = [
  "Software Engineer",
  "AI & Computer Vision Dev",
  "Backend Architect",
  "Full-Stack Builder",
];

const stats = [
  { label: "Languages", value: "5+" },
  { label: "Frameworks", value: "6+" },
  { label: "Projects", value: "10+" },
  { label: "Coffee", value: "∞" },
];

const socialLinks = [
  { href: "https://github.com/chahyn", label: "chahyn" },
  { href: "https://www.linkedin.com/in/chahine-ouledouhiba-b4365621b/", label: "LinkedIn" },
];

function ScanLine() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        borderRadius: "inherit",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          height: "2px",
          background:
            "linear-gradient(to right, transparent, rgba(99,102,241,0.4), rgba(139,92,246,0.6), rgba(99,102,241,0.4), transparent)",
          animation: "scanline 4s linear infinite",
          filter: "blur(1px)",
        }}
      />
      <style>{`
        @keyframes scanline {
          0% { top: -2px; opacity: 0; }
          5% { opacity: 1; }
          95% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes flicker {
          0%, 100% { opacity: 1; }
          92% { opacity: 1; }
          93% { opacity: 0.8; }
          94% { opacity: 1; }
        }
        @keyframes pulse-ring {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        @keyframes status-blink {
          0%, 100% { opacity: 1; box-shadow: 0 0 6px #22c55e; }
          50% { opacity: 0.4; box-shadow: none; }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export function AboutMeContent() {
  const [currentRole, setCurrentRole] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const role = roles[currentRole];
    let timeout: NodeJS.Timeout;
    if (!isDeleting && displayText.length < role.length) {
      timeout = setTimeout(() => setDisplayText(role.slice(0, displayText.length + 1)), 80);
    } else if (!isDeleting && displayText.length === role.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayText.length > 0) {
      timeout = setTimeout(() => setDisplayText(displayText.slice(0, -1)), 40);
    } else if (isDeleting && displayText.length === 0) {
      setIsDeleting(false);
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentRole]);

  return (
    <div
      style={{
        height: "100%",
        background: "linear-gradient(135deg, #08080f 0%, #0d0b1a 50%, #080d1a 100%)",
        position: "relative",
        overflow: "hidden",
        fontFamily: "'Courier New', monospace",
        animation: "flicker 8s infinite",
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
          top: "30%",
          left: "25%",
          width: 300,
          height: 300,
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
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#6366f1",
              boxShadow: "0 0 8px #6366f1",
              animation: "status-blink 2s infinite",
            }}
          />
          <span style={{ fontSize: 11, color: "rgba(99,102,241,0.8)", letterSpacing: "0.15em" }}>
            PROFILE.SYS
          </span>
        </div>
        <span style={{ fontSize: 10, color: "rgba(255,255,255,0.2)", letterSpacing: "0.1em" }}>
          v2.0.26 · TUN
        </span>
      </div>

      {/* Main content */}
      <div
        style={{
          display: "flex",
          gap: 0,
          height: "calc(100% - 41px)",
          opacity: loaded ? 1 : 0,
          transform: loaded ? "translateY(0)" : "translateY(8px)",
          transition: "opacity 0.5s ease, transform 0.5s ease",
        }}
      >
        {/* LEFT PANEL */}
        <div
          style={{
            width: 200,
            flexShrink: 0,
            borderRight: "1px solid rgba(99,102,241,0.12)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "20px 12px",
            background: "rgba(99,102,241,0.02)",
            overflowY: "auto",
          }}
        >
          {/* Avatar with rings */}
          <div style={{ position: "relative", marginBottom: 14 }}>
            <div
              style={{
                position: "absolute",
                inset: -8,
                borderRadius: "50%",
                border: "1px solid rgba(99,102,241,0.2)",
                animation: "pulse-ring 3s ease-out infinite",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: -4,
                borderRadius: "50%",
                border: "1px dashed rgba(99,102,241,0.3)",
                animation: "spin 12s linear infinite",
              }}
            />
            <div
              style={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                overflow: "hidden",
                border: "2px solid rgba(99,102,241,0.5)",
                boxShadow: "0 0 20px rgba(99,102,241,0.3), inset 0 0 20px rgba(0,0,0,0.5)",
                position: "relative",
              }}
            >
              <img
                src="https://avatars.githubusercontent.com/u/89745478?v=4"
                alt="Chahine"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)",
                  pointerEvents: "none",
                }}
              />
            </div>
          </div>

          <div
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: "#fff",
              textAlign: "center",
              letterSpacing: "0.02em",
              marginBottom: 4,
            }}
          >
            Chahine
          </div>
          <div
            style={{
              fontSize: 10,
              color: "rgba(255,255,255,0.35)",
              textAlign: "center",
              letterSpacing: "0.08em",
              marginBottom: 12,
              textTransform: "uppercase",
            }}
          >
            Ouled Ouhiba
          </div>

          {/* Animated role */}
          <div
            style={{
              width: "100%",
              padding: "6px 10px",
              background: "rgba(99,102,241,0.06)",
              border: "1px solid rgba(99,102,241,0.15)",
              borderRadius: 4,
              marginBottom: 16,
              minHeight: 36,
              display: "flex",
              alignItems: "center",
            }}
          >
            <span style={{ fontSize: 10, color: "#a78bfa", letterSpacing: "0.05em", lineHeight: 1.4 }}>
              {displayText}
              <span style={{ opacity: 0.8 }}>█</span>
            </span>
          </div>

          {/* Stats grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 6,
              width: "100%",
              marginBottom: 16,
            }}
          >
            {stats.map((s) => (
              <div
                key={s.label}
                style={{
                  background: "rgba(99,102,241,0.05)",
                  border: "1px solid rgba(99,102,241,0.12)",
                  borderRadius: 4,
                  padding: "6px 4px",
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: 14, fontWeight: 700, color: "#a78bfa" }}>{s.value}</div>
                <div
                  style={{
                    fontSize: 9,
                    color: "rgba(255,255,255,0.3)",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          {/* Social links */}
          <div style={{ display: "flex", flexDirection: "column", gap: 6, width: "100%" }}>
            {socialLinks.map((link) => (
                <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "5px 8px",
                  borderRadius: 4,
                  border: "1px solid rgba(99,102,241,0.15)",
                  background: "rgba(99,102,241,0.04)",
                  color: "rgba(255,255,255,0.55)",
                  fontSize: 11,
                  textDecoration: "none",
                  transition: "all 0.2s",
                  letterSpacing: "0.04em",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(99,102,241,0.5)";
                  (e.currentTarget as HTMLElement).style.color = "#a78bfa";
                  (e.currentTarget as HTMLElement).style.background = "rgba(99,102,241,0.1)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(99,102,241,0.15)";
                  (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.55)";
                  (e.currentTarget as HTMLElement).style.background = "rgba(99,102,241,0.04)";
                }}
              >
                {link.label === "chahyn" ? <GithubIcon size={12} /> : <LinkedinIcon size={12} />}
                <span>{link.label}</span>
              </a>
            ))}
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            gap: 18,
          }}
        >
          {/* About block */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
              <div style={{ width: 16, height: 1, background: "#6366f1" }} />
              <span style={{ fontSize: 10, color: "#6366f1", letterSpacing: "0.2em", textTransform: "uppercase" }}>
                about_me.txt
              </span>
              <div style={{ flex: 1, height: 1, background: "rgba(99,102,241,0.15)" }} />
            </div>
            <p
              style={{
                fontSize: 13,
                color: "rgba(220,220,240,0.75)",
                lineHeight: 1.8,
                margin: 0,
                paddingLeft: 8,
                borderLeft: "2px solid rgba(99,102,241,0.25)",
              }}
            >
              Passionate software engineering student based in{" "}
              <span style={{ color: "#a78bfa" }}>Tunisia</span>, building intelligent
              systems at the intersection of{" "}
              <span style={{ color: "#a78bfa" }}>AI</span>,{" "}
              <span style={{ color: "#a78bfa" }}>backend development</span>, and{" "}
              <span style={{ color: "#a78bfa" }}>computer vision</span>. Crafting
              robust, scalable applications — from Java Spring Boot microservices to
              Python-powered AI platforms.
            </p>
          </div>

          {/* Location + Status */}
          <div style={{ display: "flex", gap: 10 }}>
            {[
              {
                label: "location.dat",
                content: (
                  <span style={{ fontSize: 13, color: "rgba(220,220,240,0.8)" }}>
                     Tunisia, North Africa
                  </span>
                ),
              },
              {
                label: "status.sys",
                content: (
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div
                      style={{
                        width: 7,
                        height: 7,
                        borderRadius: "50%",
                        background: "#22c55e",
                        animation: "status-blink 1.5s infinite",
                        flexShrink: 0,
                      }}
                    />
                    <span style={{ fontSize: 12, color: "rgba(34,197,94,0.85)", lineHeight: 1.4 }}>
                      Open to internships,<br />full-time & freelance
                    </span>
                  </div>
                ),
              },
            ].map((block) => (
              <div
                key={block.label}
                style={{
                  flex: 1,
                  background: "rgba(99,102,241,0.04)",
                  border: "1px solid rgba(99,102,241,0.12)",
                  borderRadius: 6,
                  padding: "10px 12px",
                }}
              >
                <div
                  style={{
                    fontSize: 9,
                    color: "rgba(99,102,241,0.6)",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    marginBottom: 8,
                  }}
                >
                  {block.label}
                </div>
                {block.content}
              </div>
            ))}
          </div>

          {/* Tech stack */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
              <div style={{ width: 16, height: 1, background: "#6366f1" }} />
              <span style={{ fontSize: 10, color: "#6366f1", letterSpacing: "0.2em", textTransform: "uppercase" }}>
                core_stack.cfg
              </span>
              <div style={{ flex: 1, height: 1, background: "rgba(99,102,241,0.15)" }} />
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {["Python", "TypeScript", "Java", "React", "Next.js", "Spring Boot", "PostgreSQL", "MongoDB", "Docker", "Git"].map((tech) => (
                <span
                  key={tech}
                  style={{
                    padding: "3px 10px",
                    fontSize: 11,
                    color: "rgba(167,139,250,0.85)",
                    border: "1px solid rgba(99,102,241,0.2)",
                    borderRadius: 3,
                    background: "rgba(99,102,241,0.05)",
                    letterSpacing: "0.04em",
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
              <div style={{ width: 16, height: 1, background: "#6366f1" }} />
              <span style={{ fontSize: 10, color: "#6366f1", letterSpacing: "0.2em", textTransform: "uppercase" }}>
                education.log
              </span>
              <div style={{ flex: 1, height: 1, background: "rgba(99,102,241,0.15)" }} />
            </div>
            <div
              style={{
                background: "rgba(99,102,241,0.04)",
                border: "1px solid rgba(99,102,241,0.12)",
                borderRadius: 6,
                padding: "10px 14px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.85)", fontWeight: 600 }}>
                  Génie Informatique
                </div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginTop: 2 }}>
                  ENICarthage · Tunisia
                </div>
              </div>
              <div
                style={{
                  padding: "3px 10px",
                  borderRadius: 3,
                  background: "rgba(99,102,241,0.1)",
                  border: "1px solid rgba(99,102,241,0.25)",
                  fontSize: 10,
                  color: "#a78bfa",
                  letterSpacing: "0.06em",
                }}
              >
                2025–2026
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
"use client";

import { Bot, Server, Layers, Cpu, Code2, Database } from "lucide-react";
import { useState, useEffect } from "react";

const skillGroups = [
  {
    category: "LANGUAGES",
    icon: Code2,
    skills: ["Java", "Python", "TypeScript", "JavaScript", "SQL","C/C++", "HTML" , "CSS"],
  },
  {
    category: "FRAMEWORKS & LIBRARIES",
    icon: Layers,
    skills: [
      "Spring Boot", "Angular", "React", "Pandas", "NumPy", "NextJS" ,"MongoDB" 
    ],
  },
  {
    category: "TOOLS & PLATFORMS",
    icon: Database,
    skills: [
      "Git", "GitHub", "Maven", "Gradle", "SQLite",
      "REST APIs", "JWT", "Plotly","Docker"
    ],
  },
  {
    category: "CONCEPTS",
    icon: Cpu,
    skills: [
      "Computer Vision", "Machine Learning", "Sensor Fusion",
      , "AI" , "Agile",
    ],
  },
];

const highlightCards = [
  {
    icon: Bot,
    title: "AI-Powered Systems",
    description: "CV, ML, and real-time analytics platforms",
    accent: "#6366f1",
  },
  {
    icon: Server,
    title: "Backend Architecture",
    description: "Scalable Java & Python backends with clean APIs",
    accent: "#8b5cf6",
  },
  {
    icon: Layers,
    title: "Full-Stack Vision",
    description: "From database schema to enterprise dashboards",
    accent: "#a78bfa",
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
          animation: "skillScan 5s linear infinite",
          filter: "blur(1px)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />
      <style>{`
        @keyframes skillScan {
          0% { top: -2px; opacity: 0; }
          5% { opacity: 1; }
          95% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes skillBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes skillPulse {
          0%, 100% { box-shadow: 0 0 6px rgba(99,102,241,0.4); }
          50% { box-shadow: 0 0 14px rgba(99,102,241,0.8); }
        }
        @keyframes tagHoverGlow {
          0%, 100% { border-color: rgba(99,102,241,0.2); }
          50% { border-color: rgba(99,102,241,0.5); }
        }
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}

export function SkillsContent() {
  const [loaded, setLoaded] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const fullText = "loading skill_modules...";

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i <= fullText.length) {
        setLoadingText(fullText.slice(0, i));
        i++;
      } else {
        clearInterval(interval);
        setTimeout(() => setLoaded(true), 200);
      }
    }, 40);
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
          top: "20%",
          right: "10%",
          width: 280,
          height: 280,
          background: "radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 70%)",
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
              animation: "skillPulse 2s infinite",
            }}
          />
          <span style={{ fontSize: 11, color: "rgba(99,102,241,0.8)", letterSpacing: "0.15em" }}>
            SKILLS.SYS
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontSize: 10, color: "rgba(255,255,255,0.2)", letterSpacing: "0.1em" }}>
            {skillGroups.reduce((acc, g) => acc + g.skills.length, 0)} modules loaded
          </span>
        </div>
      </div>

      {/* Scrollable content */}
      <div
        style={{
          height: "calc(100% - 41px)",
          overflowY: "auto",
          padding: "16px 20px",
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* Terminal prompt */}
        <div
          style={{
            fontSize: 12,
            color: "#6366f1",
            marginBottom: 16,
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <span style={{ color: "rgba(99,102,241,0.5)" }}>{">"}</span>
          <span>{loadingText}</span>
          {!loaded && (
            <span style={{ animation: "skillBlink 0.8s infinite" }}>█</span>
          )}
          {loaded && (
            <span style={{ color: "rgba(34,197,94,0.7)", fontSize: 10, marginLeft: 4 }}>
              ✓ OK
            </span>
          )}
        </div>

        {/* Skill groups */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
            opacity: loaded ? 1 : 0,
            transition: "opacity 0.4s ease",
          }}
        >
          {skillGroups.map((group, gi) => {
            const GroupIcon = group.icon;
            return (
              <div
                key={group.category}
                style={{
                  animation: loaded ? `fadeSlideIn 0.4s ease ${gi * 0.08}s both` : "none",
                }}
              >
                {/* Section header */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: 8,
                  }}
                >
                  <GroupIcon size={11} color="rgba(99,102,241,0.7)" />
                  <div style={{ width: 12, height: 1, background: "#6366f1" }} />
                  <span
                    style={{
                      fontSize: 9,
                      color: "rgba(99,102,241,0.7)",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                    }}
                  >
                    {group.category}
                  </span>
                  <div style={{ flex: 1, height: 1, background: "rgba(99,102,241,0.1)" }} />
                </div>

                {/* Skill tags */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, paddingLeft: 4 }}>
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      style={{
                        padding: "4px 12px",
                        fontSize: 11,
                        color: "rgba(200,190,255,0.8)",
                        border: "1px solid rgba(99,102,241,0.2)",
                        borderRadius: 3,
                        background: "rgba(99,102,241,0.05)",
                        letterSpacing: "0.03em",
                        cursor: "default",
                        transition: "all 0.15s ease",
                      }}
                      onMouseEnter={(e) => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.background = "rgba(99,102,241,0.12)";
                        el.style.borderColor = "rgba(99,102,241,0.5)";
                        el.style.color = "#a78bfa";
                        el.style.transform = "translateY(-1px)";
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.background = "rgba(99,102,241,0.05)";
                        el.style.borderColor = "rgba(99,102,241,0.2)";
                        el.style.color = "rgba(200,190,255,0.8)";
                        el.style.transform = "translateY(0)";
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Highlight cards */}
        <div
          style={{
            display: "flex",
            gap: 10,
            marginTop: 20,
            opacity: loaded ? 1 : 0,
            transition: "opacity 0.4s ease 0.35s",
          }}
        >
          {highlightCards.map((card) => {
            const CardIcon = card.icon;
            return (
              <div
                key={card.title}
                style={{
                  flex: 1,
                  background: "rgba(99,102,241,0.04)",
                  border: "1px solid rgba(99,102,241,0.12)",
                  borderRadius: 6,
                  padding: "12px",
                  position: "relative",
                  overflow: "hidden",
                  transition: "all 0.2s ease",
                  cursor: "default",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "rgba(99,102,241,0.08)";
                  el.style.borderColor = "rgba(99,102,241,0.35)";
                  el.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "rgba(99,102,241,0.04)";
                  el.style.borderColor = "rgba(99,102,241,0.12)";
                  el.style.transform = "translateY(0)";
                }}
              >
                {/* Top accent line */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 1,
                    background: `linear-gradient(to right, transparent, ${card.accent}, transparent)`,
                  }}
                />
                <CardIcon size={16} color={card.accent} style={{ marginBottom: 8 }} />
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: "rgba(255,255,255,0.85)",
                    marginBottom: 4,
                    letterSpacing: "0.02em",
                  }}
                >
                  {card.title}
                </div>
                <div
                  style={{
                    fontSize: 10,
                    color: "rgba(255,255,255,0.4)",
                    lineHeight: 1.5,
                    letterSpacing: "0.02em",
                  }}
                >
                  {card.description}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
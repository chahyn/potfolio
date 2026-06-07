"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Terminal } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "../icons";

const projects = [
  {
    name: "Smart Warehouse Monitoring",
    shortName: "WAREHOUSE.SYS",
    tech: ["Python", "YOLOv8", "OpenCV", "Streamlit", "SQLite", "scikit-learn", "ARIMA", "Plotly"],
    description:
      "AI-powered warehouse monitoring platform combining Computer Vision, Multi-Sensor Fusion, and real-time analytics. YOLOv8 object detection for boxes, people, and forklifts. Enterprise dashboard with ARIMA forecasting, anomaly detection, collision alerts, and JWT + RBAC auth. 99%+ sensor fusion accuracy, 30+ FPS.",
    github: "https://github.com/chahyn/warehouse_project",
    accent: "#6366f1",
    status: "ACTIVE",
  },
  {
    name: "Examora — Exam Platform",
    shortName: "EXAMORA.JAR",
    tech: ["Java", "Spring Boot", "Maven"],
    description:
      "Intelligent platform to modernize and automate university exam management. Handles exam scheduling, student management, and maintenance workflows — bringing structure and automation to academic administration.",
    github: "https://github.com/chahyn/Examora",
    accent: "#8b5cf6",
    status: "STABLE",
  },
  {
    name: "Stage — Backend Internship",
    shortName: "STAGE.API",
    tech: ["Java", "Gradle", "Spring Boot"],
    description:
      "Backend system developed during an internship. Clean REST architecture, scalable service design, and robust data handling — demonstrating strong server-side engineering fundamentals.",
    github: "https://github.com/chahyn/Stage",
    accent: "#a78bfa",
    status: "COMPLETE",
  },
  {
    name: "ProjetWeb — Web Application",
    shortName: "PROJETWEB.JS",
    tech: ["HTML", "CSS", "JavaScript"],
    description:
      "Full web development project showcasing front-end and full-stack skills. Clean, functional interface design with interactive components.",
    github: "https://github.com/chahyn/ProjetWeb",
    accent: "#6366f1",
    status: "COMPLETE",
  },
  {
    name: "Examora Frontend",
    shortName: "EXAMORA.UI",
    tech: ["TypeScript", "Angular"],
    description:
      "Frontend counterpart to the Examora platform. Modern, responsive UI for university exam management connected to the Java backend via REST APIs.",
    github: "https://github.com/chahyn/Examora-project",
    accent: "#8b5cf6",
    status: "STABLE",
  },
];

const statusColors: Record<string, string> = {
  ACTIVE: "#22c55e",
  STABLE: "#6366f1",
  COMPLETE: "#a78bfa",
};

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
          animation: "projScan 7s linear infinite",
          filter: "blur(1px)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />
      <style>{`
        @keyframes projScan {
          0% { top: -2px; opacity: 0; }
          5% { opacity: 1; }
          95% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes projBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes projPulse {
          0%, 100% { box-shadow: 0 0 6px rgba(99,102,241,0.5); }
          50% { box-shadow: 0 0 14px rgba(99,102,241,0.9); }
        }
        @keyframes projFadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}

export function ProjectsContent() {
  const [loaded, setLoaded] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const fullText = "indexing project_registry...";

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
    }, 38);
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
          top: "30%",
          left: "60%",
          width: 300,
          height: 300,
          background: "radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 70%)",
          filter: "blur(50px)",
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
              animation: "projPulse 2s infinite",
            }}
          />
          <span style={{ fontSize: 11, color: "rgba(99,102,241,0.8)", letterSpacing: "0.15em" }}>
            PROJECTS.DIR
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <Terminal size={10} color="rgba(99,102,241,0.5)" />
          <span style={{ fontSize: 10, color: "rgba(255,255,255,0.2)", letterSpacing: "0.1em" }}>
            {projects.length} entries found
          </span>
        </div>
      </div>

      {/* Scrollable content */}
      <div
        style={{
          height: "calc(100% - 41px)",
          overflowY: "auto",
          padding: "14px 16px",
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* Terminal prompt */}
        <div
          style={{
            fontSize: 12,
            color: "#6366f1",
            marginBottom: 14,
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <span style={{ color: "rgba(99,102,241,0.5)" }}>{">"}</span>
          <span>{loadingText}</span>
          {!loaded && (
            <span style={{ animation: "projBlink 0.8s infinite" }}>█</span>
          )}
          {loaded && (
            <span style={{ color: "rgba(34,197,94,0.7)", fontSize: 10, marginLeft: 4 }}>
              ✓ {projects.length} projects indexed
            </span>
          )}
        </div>

        {/* Projects grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 10,
            opacity: loaded ? 1 : 0,
            transition: "opacity 0.3s ease",
          }}
        >
          {projects.map((project, i) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 10 }}
              animate={loaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.3, delay: i * 0.07 }}
              style={{
                background: "rgba(99,102,241,0.04)",
                border: "1px solid rgba(99,102,241,0.12)",
                borderTop: `2px solid ${project.accent}`,
                borderRadius: 6,
                padding: "12px 14px",
                position: "relative",
                overflow: "hidden",
                transition: "all 0.2s ease",
                cursor: "default",
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = "rgba(99,102,241,0.08)";
                el.style.borderColor = `${project.accent}55`;
                el.style.transform = "translateY(-2px)";
                el.style.boxShadow = `0 8px 32px rgba(0,0,0,0.4), 0 0 20px ${project.accent}15`;
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = "rgba(99,102,241,0.04)";
                el.style.borderColor = "rgba(99,102,241,0.12)";
                el.style.transform = "translateY(0)";
                el.style.boxShadow = "none";
              }}
            >
              {/* Corner glow on hover */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  width: 60,
                  height: 60,
                  background: `radial-gradient(circle at top right, ${project.accent}18, transparent 70%)`,
                  pointerEvents: "none",
                }}
              />

              {/* Header row */}
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8 }}>
                <div>
                  <div
                    style={{
                      fontSize: 9,
                      color: "rgba(99,102,241,0.5)",
                      letterSpacing: "0.15em",
                      marginBottom: 3,
                    }}
                  >
                    {project.shortName}
                  </div>
                  <h3
                    style={{
                      fontSize: 13,
                      fontWeight: 700,
                      color: "rgba(255,255,255,0.9)",
                      margin: 0,
                      lineHeight: 1.3,
                      letterSpacing: "0.01em",
                    }}
                  >
                    {project.name}
                  </h3>
                </div>
                <span
                  style={{
                    fontSize: 8,
                    padding: "2px 7px",
                    borderRadius: 2,
                    border: `1px solid ${statusColors[project.status]}44`,
                    background: `${statusColors[project.status]}11`,
                    color: statusColors[project.status],
                    letterSpacing: "0.12em",
                    flexShrink: 0,
                    marginTop: 2,
                  }}
                >
                  {project.status}
                </span>
              </div>

              {/* Tech tags */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                {project.tech.map((t) => (
                  <span
                    key={t}
                    style={{
                      fontSize: 9,
                      padding: "2px 7px",
                      borderRadius: 2,
                      border: "1px solid rgba(99,102,241,0.2)",
                      background: "rgba(99,102,241,0.06)",
                      color: "rgba(167,139,250,0.8)",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Description */}
              <p
                style={{
                  fontSize: 11,
                  color: "rgba(200,200,220,0.6)",
                  lineHeight: 1.65,
                  margin: 0,
                  flex: 1,
                  paddingLeft: 6,
                  borderLeft: "1px solid rgba(99,102,241,0.2)",
                }}
              >
                {project.description}
              </p>

              {/* GitHub link */}
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  fontSize: 10,
                  color: "rgba(167,139,250,0.7)",
                  textDecoration: "none",
                  padding: "5px 10px",
                  borderRadius: 3,
                  border: "1px solid rgba(99,102,241,0.15)",
                  background: "rgba(99,102,241,0.05)",
                  transition: "all 0.15s ease",
                  alignSelf: "flex-start",
                  letterSpacing: "0.06em",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.color = "#a78bfa";
                  el.style.borderColor = "rgba(99,102,241,0.4)";
                  el.style.background = "rgba(99,102,241,0.1)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.color = "rgba(167,139,250,0.7)";
                  el.style.borderColor = "rgba(99,102,241,0.15)";
                  el.style.background = "rgba(99,102,241,0.05)";
                }}
              >
                <GithubIcon size={10} />
                VIEW SOURCE
                <ExternalLink size={9} />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
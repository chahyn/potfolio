"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { X, Bot, Server, Layers, FileText } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./icons";

const projects = [
  {
    name: "Smart Warehouse Monitoring System",
    tech: ["Python", "YOLOv8", "OpenCV", "Streamlit", "SQLite"],
    description:
      "AI-powered warehouse monitoring with Computer Vision and real-time analytics.",
    github: "https://github.com/chahyn/warehouse_project",
  },
  {
    name: "Examora — University Exam Platform",
    tech: ["Java", "Spring Boot", "Maven"],
    description:
      "Intelligent platform to modernize university exam management.",
    github: "https://github.com/chahyn/Examora",
  },
  {
    name: "Stage — Backend Internship Project",
    tech: ["Java", "Gradle", "Spring Boot"],
    description: "Backend system with clean REST architecture.",
    github: "https://github.com/chahyn/Stage",
  },
  {
    name: "ProjetWeb — Web Application",
    tech: ["HTML", "CSS", "JavaScript"],
    description: "Full web development project with interactive components.",
    github: "https://github.com/chahyn/ProjetWeb",
  },
  {
    name: "Examora Frontend",
    tech: ["TypeScript", "Angular"],
    description:
      "Modern, responsive UI for university exam management.",
    github: "https://github.com/chahyn/Examora-project",
  },
];

const skillGroups = [
  { category: "LANGUAGES", skills: ["Java", "Python", "TypeScript", "JavaScript", "SQL"] },
  { category: "FRAMEWORKS", skills: ["Spring Boot", "Angular", "React", "YOLOv8", "OpenCV"] },
  { category: "TOOLS", skills: ["Git", "GitHub", "Maven", "Gradle", "REST APIs"] },
];

export function MobileFallback() {
  const [showBanner, setShowBanner] = useState(true);

  return (
    <div
      className="min-h-screen px-4 py-6"
      style={{
        background: "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
      }}
    >
      {/* Banner */}
      {showBanner && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-3 rounded-lg flex items-center justify-between"
          style={{
            background: "rgba(99,102,241,0.2)",
            border: "1px solid rgba(99,102,241,0.4)",
          }}
        >
          <span className="text-[13px] text-white">
            💻 For the full desktop OS experience, open on a larger screen
          </span>
          <button
            onClick={() => setShowBanner(false)}
            className="text-white/70 hover:text-white ml-2"
          >
            <X size={16} />
          </button>
        </motion.div>
      )}

      {/* About Me Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-6 p-6 rounded-2xl"
        style={{
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.10)",
        }}
      >
        <div className="border-l-4 border-[#6366f1] pl-4 mb-4">
          <h2 className="text-xl font-bold text-white">About Me</h2>
        </div>
        <div className="flex flex-col items-center mb-4">
          <img
            src="https://avatars.githubusercontent.com/u/89745478?v=4"
            alt="Chahine Ouled Ouhiba"
            className="w-20 h-20 rounded-full border-2 border-white/20 mb-3"
          />
          <h3 className="text-lg font-bold text-white">Chahine Ouled Ouhiba</h3>
          <p className="text-sm text-[#6366f1] font-mono">Software Engineer</p>
        </div>
        <p className="text-sm text-white/75 leading-relaxed mb-4">
          I&apos;m a passionate software engineering student based in Tunisia, building
          intelligent systems at the intersection of AI, backend development, and
          computer vision.
        </p>
        <div className="flex gap-2 justify-center">
          <a
            href="https://github.com/chahyn"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-2 text-xs text-white rounded-full border border-white/15 bg-white/5"
          >
            <GithubIcon size={14} />
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/chahine-ouledouhiba-b4365621b/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-2 text-xs text-white rounded-full border border-white/15 bg-white/5"
          >
            <LinkedinIcon size={14} />
            LinkedIn
          </a>
        </div>
      </motion.section>

      {/* Skills Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-6 p-6 rounded-2xl"
        style={{
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.10)",
        }}
      >
        <div className="border-l-4 border-[#6366f1] pl-4 mb-4">
          <h2 className="text-xl font-bold text-white">Skills</h2>
        </div>
        {skillGroups.map((group) => (
          <div key={group.category} className="mb-4">
            <div className="text-[10px] uppercase tracking-wider text-white/40 mb-2">
              {group.category}
            </div>
            <div className="flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 text-xs text-white bg-white/7 border border-white/12 rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
        <div className="grid grid-cols-1 gap-3 mt-4">
          {[
            { icon: Bot, title: "AI-Powered Systems", desc: "CV, ML, and analytics" },
            { icon: Server, title: "Backend Architecture", desc: "Scalable APIs" },
            { icon: Layers, title: "Full-Stack Vision", desc: "End-to-end apps" },
          ].map((card) => (
            <div
              key={card.title}
              className="bg-white/4 border border-white/9 rounded-lg p-3 flex items-center gap-3"
            >
              <card.icon size={18} className="text-[#6366f1]" />
              <div>
                <h4 className="text-sm font-bold text-white">{card.title}</h4>
                <p className="text-xs text-white/60">{card.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Projects Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-6 p-6 rounded-2xl"
        style={{
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.10)",
        }}
      >
        <div className="border-l-4 border-[#6366f1] pl-4 mb-4">
          <h2 className="text-xl font-bold text-white">Projects</h2>
        </div>
        <div className="space-y-4">
          {projects.map((project, idx) => (
            <div
              key={project.name}
              className="bg-white/4 border border-white/9 rounded-xl p-4"
              style={{
                borderTopWidth: "3px",
                borderTopColor: idx % 2 === 0 ? "#6366f1" : "#4f9cf9",
              }}
            >
              <h3 className="text-sm font-bold text-white mb-2">{project.name}</h3>
              <div className="flex flex-wrap gap-1 mb-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="text-[10px] px-2 py-0.5 rounded-full bg-[rgba(99,102,241,0.15)] border border-[rgba(99,102,241,0.3)] text-white/80"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <p className="text-xs text-white/65 mb-3">{project.description}</p>
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-xs bg-white/6 border border-white/15 text-white px-3 py-1.5 rounded-lg"
              >
                View on GitHub →
              </a>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-6 p-6 rounded-2xl"
        style={{
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.10)",
        }}
      >
        <div className="border-l-4 border-[#6366f1] pl-4 mb-4">
          <h2 className="text-xl font-bold text-white">Contact</h2>
        </div>
        <div className="space-y-3">
          <div className="border-l-[3px] border-[#6366f1] pl-3">
            <div className="text-[10px] uppercase text-white/40">LOCATION</div>
            <div className="text-sm text-white">📍 Tunisia</div>
          </div>
          <div className="border-l-[3px] border-[#6366f1] pl-3">
            <div className="text-[10px] uppercase text-white/40">LINKEDIN</div>
            <a
              href="https://www.linkedin.com/in/chahine-ouledouhiba-b4365621b/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[#4f9cf9]"
            >
              linkedin.com/in/chahine-ouledouhiba-b4365621b
            </a>
          </div>
          <div className="border-l-[3px] border-[#6366f1] pl-3">
            <div className="text-[10px] uppercase text-white/40">GITHUB</div>
            <a
              href="https://github.com/chahyn"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[#4f9cf9]"
            >
              github.com/chahyn
            </a>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-white/7 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-status-pulse" />
          <span className="text-xs text-white/70">Open to opportunities</span>
        </div>
      </motion.section>

      {/* CV Download Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-6 p-6 rounded-2xl text-center"
        style={{
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.10)",
        }}
      >
        <FileText size={40} className="text-[#6366f1] mx-auto mb-3" />
        <h3 className="text-base font-bold text-white">Download My CV</h3>
        <p className="text-xs text-white/60 mt-1 mb-4">
          Full resume with skills, experience & projects
        </p>
        <a
          href="#" // TODO: replace "#" with actual hosted PDF URL
          download="Chahine_Ouled_Ouhiba_CV.pdf"
          className="inline-block px-8 py-3 text-sm font-bold text-white rounded-lg animate-pulse-glow"
          style={{
            background: "linear-gradient(135deg, #6366f1, #4f9cf9)",
          }}
        >
          ⬇ Download CV
        </a>
      </motion.section>
    </div>
  );
}

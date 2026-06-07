"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface HistoryEntry {
  type: "input" | "output" | "error" | "info";
  text: string;
}

const USER = "chahine";
const HOST = "chahyne-os";
const PROMPT = `${USER}@${HOST}:~$`;

const FILES: Record<string, string> = {
  "readme.txt": `Welcome to CHAHYNE OS v1.0
Full-stack developer · AI engineer · ENICarthage 2025-2026
Type 'help' to see available commands.`,
  "about.txt": `Chahine Ouledouhiba
ENICarthage — Génie Informatique
GitHub  : github.com/chahyn
LinkedIn: linkedin.com/in/chahine-ouledouhiba-b4365621b`,
  "skills.txt": `Languages  : TypeScript, Java, Python, PHP
Frontend   : React, Next.js, Angular, Tailwind
Backend    : Node.js, Spring Boot, Laravel
Embedded   : LoRaWAN, Arduino, STM32
Tools      : Git, Docker, Figma, V0`,
  "projects.txt": `1. TerraNode     — LoRaWAN sensor node (ENICarthage thesis)
2. Examora       — Full-stack exam/e-learning platform
3. CHAHYNE OS    — Portfolio as a desktop OS (this!)`,
};

const CMDS: Record<string, (args: string[]) => string | string[]> = {
  help: () => [
    "Available commands:",
    "  help          — show this help",
    "  ls            — list files",
    "  cat <file>    — read a file",
    "  whoami        — current user",
    "  pwd           — print working directory",
    "  echo <text>   — print text",
    "  date          — current date & time",
    "  clear         — clear terminal",
    "  skills        — show tech skills",
    "  projects      — list projects",
    "  contact       — contact info",
    "  neofetch      — system info",
  ],
  ls: () => Object.keys(FILES).join("   "),
  whoami: () => USER,
  pwd: () => `/home/${USER}`,
  date: () => new Date().toString(),
  echo: (args) => args.join(" ") || "",
  cat: (args) => {
    if (!args[0]) return "cat: missing operand";
    const content = FILES[args[0]];
    if (!content) return `cat: ${args[0]}: No such file or directory`;
    return content;
  },
  skills: () => FILES["skills.txt"],
  projects: () => FILES["projects.txt"],
  contact: () =>
    [
      "Email   : chahine.ouledouhiba@enicar.ucar.tn",
      "GitHub  : github.com/chahyn",
      "LinkedIn: linkedin.com/in/chahine-ouledouhiba-b4365621b",
    ].join("\n"),
  neofetch: () =>
    [
      "       ██████████        chahine@chahyne-os",
      "     ██░░░░░░░░░░██      ------------------",
      "   ██░░░░░░░░░░░░░░██    OS      : CHAHYNE OS v1.0",
      "   ██░░░░░░░░░░░░░░██    Host    : ENICarthage",
      "   ██░░░░░░░░░░░░░░██    Shell   : chahsh 1.0",
      "     ██░░░░░░░░░░██      Stack   : Next.js · TypeScript",
      "       ██████████        Theme   : Violet Dark",
      "                         Terminal: chahyne-term",
    ].join("\n"),
};

export function TerminalContent() {
  const [history, setHistory] = useState<HistoryEntry[]>([
    { type: "info", text: "CHAHYNE OS Terminal v1.0 — type 'help' for commands" },
    { type: "info", text: "─────────────────────────────────────────────────" },
  ]);
  const [input, setInput] = useState("");
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const runCommand = useCallback((raw: string) => {
    const trimmed = raw.trim();
    if (!trimmed) return;

    setCmdHistory((h) => [trimmed, ...h]);
    setHistoryIndex(-1);

    const [cmd, ...args] = trimmed.split(/\s+/);

    setHistory((h) => [
      ...h,
      { type: "input", text: `${PROMPT} ${trimmed}` },
    ]);

    if (cmd === "clear") {
      setHistory([
        { type: "info", text: "CHAHYNE OS Terminal v1.0 — type 'help' for commands" },
        { type: "info", text: "─────────────────────────────────────────────────" },
      ]);
      return;
    }

    const handler = CMDS[cmd];
    if (!handler) {
      setHistory((h) => [
        ...h,
        { type: "error", text: `${cmd}: command not found. Type 'help' for available commands.` },
      ]);
      return;
    }

    const result = handler(args);
    const lines = Array.isArray(result) ? result : result.split("\n");
    setHistory((h) => [
      ...h,
      ...lines.map((line) => ({ type: "output" as const, text: line })),
    ]);
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        runCommand(input);
        setInput("");
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        const next = Math.min(historyIndex + 1, cmdHistory.length - 1);
        setHistoryIndex(next);
        setInput(cmdHistory[next] ?? "");
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        const next = Math.max(historyIndex - 1, -1);
        setHistoryIndex(next);
        setInput(next === -1 ? "" : cmdHistory[next] ?? "");
      } else if (e.key === "Tab") {
        e.preventDefault();
        // autocomplete filenames
        const partial = input.split(/\s+/).pop() ?? "";
        const match = Object.keys(FILES).find((f) => f.startsWith(partial));
        if (match) setInput(input.slice(0, input.lastIndexOf(partial)) + match);
      } else if (e.key === "c" && e.ctrlKey) {
        setHistory((h) => [
          ...h,
          { type: "input", text: `${PROMPT} ${input}^C` },
        ]);
        setInput("");
      }
    },
    [input, cmdHistory, historyIndex, runCommand]
  );

  return (
    <div
      className="h-full flex flex-col"
      style={{
        background: "#0a0a0f",
        fontFamily: "'Courier New', 'Consolas', monospace",
        fontSize: "13px",
        lineHeight: "1.6",
      }}
      onClick={() => inputRef.current?.focus()}
    >
      {/* Output area */}
      <div className="flex-1 overflow-y-auto px-4 pt-3 pb-2" style={{ minHeight: 0 }}>
        {history.map((entry, i) => (
          <div
            key={i}
            style={{
              color:
                entry.type === "input"
                  ? "#a78bfa"
                  : entry.type === "error"
                  ? "#f87171"
                  : entry.type === "info"
                  ? "rgba(167,139,250,0.5)"
                  : "rgba(220,220,240,0.85)",
              whiteSpace: "pre-wrap",
              wordBreak: "break-all",
            }}
          >
            {entry.text}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Divider */}
      <div style={{ borderTop: "1px solid rgba(139,92,246,0.15)" }} />

      {/* Input row */}
      <div className="flex items-center px-4 py-2 gap-2">
        <span style={{ color: "#a78bfa", whiteSpace: "nowrap", flexShrink: 0 }}>
          {PROMPT}
        </span>
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          spellCheck={false}
          autoComplete="off"
          className="flex-1 bg-transparent outline-none border-none"
          style={{
            color: "rgba(220,220,240,0.9)",
            fontFamily: "inherit",
            fontSize: "inherit",
            caretColor: "#a78bfa",
          }}
        />
      </div>
    </div>
  );
}
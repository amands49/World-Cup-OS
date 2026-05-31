"use client";

import Image from "next/image";
import { useState } from "react";
import {
  Activity,
  ArrowRight,
  ChevronDown,
  Layers,
  Menu,
  Trophy,
  User,
} from "lucide-react";

const AGENTS = [
  { name: "CrowdFlow", key: "crowd" },
  { name: "VendorOps", key: "vendor" },
  { name: "Emergency", key: "emergency" },
  { name: "Transport", key: "transport" },
  { name: "Executive", key: "executive" },
];

export default function TopNav({
  agentData,
  activeScenario,
  onAgentSelect,
  onOpenSimulation,
  onOpenSystem,
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background:
          "linear-gradient(180deg, rgba(17,17,17,0.72), rgba(13,13,13,0.78))",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
      }}
    >
      <header
        style={{
          padding: "18px clamp(18px, 2.4vw, 34px)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "16px",
        }}
      >
        <div
          style={{
            minWidth: 0,
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <Trophy
            size={22}
            strokeWidth={1.75}
            aria-hidden="true"
            style={{ color: "#D4AF37", flexShrink: 0 }}
          />
          <div>
          <h1
            style={{
              color: "#D4AF37",
              fontSize: "22px",
              letterSpacing: "-0.01em",
              margin: 0,
            }}
          >
            WorldCupOS
          </h1>
          <p
            style={{
              color: "rgba(255,255,255,0.55)",
              fontSize: "12px",
              marginTop: 6,
              marginBottom: 0,
            }}
          >
            Autonomous Operations Platform
          </p>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              backgroundColor: "rgba(255,255,255,0.04)",
              color: "rgba(255,255,255,0.80)",
              border: "1px solid rgba(255,255,255,0.10)",
              padding: "9px 14px",
              borderRadius: "999px",
              fontSize: "11px",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            <Activity
              size={14}
              strokeWidth={2}
              aria-hidden="true"
              style={{ color: "rgba(74,222,128,0.85)" }}
            />
            SYSTEM ACTIVE
          </div>

          <button
            type="button"
            aria-expanded={expanded}
            aria-controls="top-nav-panel"
            aria-label={expanded ? "Collapse navigation" : "Expand navigation"}
            onClick={() => setExpanded((v) => !v)}
            style={{
              appearance: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
              padding: "9px 14px",
              borderRadius: "999px",
              border: "1px solid rgba(255,255,255,0.10)",
              backgroundColor: "rgba(255,255,255,0.04)",
              color: "rgba(255,255,255,0.80)",
              fontSize: "11px",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.08)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.04)";
            }}
          >
            <ChevronDown
              size={14}
              aria-hidden="true"
              style={{
                transition: "transform 0.2s ease",
                transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
              }}
            />
            <Menu size={14} aria-hidden="true" />
            Menu
          </button>
        </div>
      </header>

      <div
        id="top-nav-panel"
        style={{
          display: "grid",
          gridTemplateRows: expanded ? "1fr" : "0fr",
          transition: "grid-template-rows 0.25s ease",
        }}
      >
        <nav
          aria-hidden={!expanded}
          style={{
            overflow: "hidden",
            opacity: expanded ? 1 : 0,
            transition: "opacity 0.2s ease",
          }}
        >
          <div
            style={{
              padding: "0 clamp(18px, 2.4vw, 34px) 20px",
              display: "flex",
              flexDirection: "column",
              gap: "18px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "flex-end",
                gap: "20px 32px",
                paddingTop: "4px",
                borderTop: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <StadiumBlock />
              {activeScenario && <SimulationBadge scenario={activeScenario} />}
            </div>

            <div>
              <p
                style={{
                  color: "rgba(255,255,255,0.40)",
                  fontSize: "10px",
                  letterSpacing: "2px",
                  marginBottom: "10px",
                  textTransform: "uppercase",
                }}
              >
                Agents
              </p>
              <div
                style={{
                  display: "flex",
                  gap: "8px",
                  overflowX: "auto",
                  flexWrap: "nowrap",
                  paddingBottom: "4px",
                }}
              >
                {AGENTS.map((agent) => {
                  const agentResult = agentData?.[agent.key];
                  const riskLevel =
                    agentResult?.risk_level ||
                    agentResult?.overall_risk ||
                    "STANDBY";
                  const color = getRiskColor(riskLevel);

                  return (
                    <button
                      key={agent.key}
                      type="button"
                      onClick={() => onAgentSelect?.(agent.key)}
                      style={{
                        appearance: "none",
                        flex: "0 0 auto",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        padding: "8px 12px",
                        borderRadius: "999px",
                        border: "1px solid rgba(255,255,255,0.08)",
                        backgroundColor: "rgba(255,255,255,0.03)",
                        cursor: "pointer",
                        textAlign: "left",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor =
                          "rgba(255,255,255,0.06)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor =
                          "rgba(255,255,255,0.03)";
                      }}
                    >
                      <span
                        aria-hidden="true"
                        style={{
                          width: "7px",
                          height: "7px",
                          borderRadius: "999px",
                          backgroundColor: color,
                          boxShadow: `0 0 0 3px ${hexToRgba(color, 0.12)}`,
                          flex: "0 0 auto",
                        }}
                      />
                      <span
                        style={{
                          color: "rgba(255,255,255,0.75)",
                          fontSize: "12px",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {agent.name}
                      </span>
                      <span
                        style={{
                          color,
                          fontSize: "9px",
                          fontWeight: "bold",
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {riskLevel}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <p
                style={{
                  color: "rgba(255,255,255,0.40)",
                  fontSize: "10px",
                  letterSpacing: "2px",
                  marginBottom: "10px",
                  textTransform: "uppercase",
                }}
              >
                Tools
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                <ToolChip
                  label="What-If Simulation"
                  onClick={onOpenSimulation}
                />
                <ToolChip label="System Status" onClick={onOpenSystem} />
              </div>
            </div>

            <NavProfileSection />
          </div>
        </nav>
      </div>
    </div>
  );
}

function StadiumBlock() {
  return (
    <div
      style={{
        minWidth: 0,
        display: "flex",
        alignItems: "flex-start",
        gap: "12px",
      }}
    >
      <div
        style={{
          position: "relative",
          width: 48,
          height: 48,
          borderRadius: "999px",
          overflow: "hidden",
          border: "1px solid rgba(255,255,255,0.10)",
          flexShrink: 0,
        }}
      >
        <Image
          src="/sidebar/stadium-thumb.jpg"
          alt="MetLife Stadium"
          fill
          sizes="48px"
          style={{ objectFit: "cover" }}
        />
      </div>
      <div>
        <p
          style={{
            color: "rgba(255,255,255,0.40)",
            fontSize: "10px",
            letterSpacing: "2px",
            marginBottom: "8px",
            textTransform: "uppercase",
          }}
        >
          Stadium
        </p>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: "6px 12px",
          }}
        >
          <span
            style={{
              color: "#ffffff",
              fontSize: "13px",
              fontWeight: 600,
              letterSpacing: "-0.01em",
            }}
          >
            MetLife Stadium
          </span>
          <TeamLogoPair size={18} />
          <span style={{ color: "rgba(255,255,255,0.55)", fontSize: "11px" }}>
            Brazil vs France
          </span>
          <span style={{ color: "rgba(255,255,255,0.50)", fontSize: "11px" }}>
            75,000 / 89,000
          </span>
        </div>
      </div>
    </div>
  );
}

function TeamLogoPair({ size = 18 }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
      <Image
        src="/teams/brazil.svg"
        alt="Brazil"
        width={size}
        height={size}
        style={{ objectFit: "contain" }}
      />
      <Image
        src="/teams/france.svg"
        alt="France"
        width={size}
        height={size}
        style={{ objectFit: "contain" }}
      />
    </span>
  );
}

function NavProfileSection() {
  return (
    <div
      style={{
        position: "relative",
        borderRadius: "12px",
        overflow: "hidden",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div style={{ position: "relative", height: "72px" }}>
        <Image
          src="/sidebar/crowd.jpg"
          alt=""
          fill
          sizes="400px"
          aria-hidden
          style={{ objectFit: "cover" }}
        />
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(7,7,7,0.2), rgba(7,7,7,0.85))",
          }}
        />
      </div>
      <div
        style={{
          position: "relative",
          marginTop: "-28px",
          padding: "0 12px 12px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: "999px",
            overflow: "hidden",
            border: "2px solid rgba(255,255,255,0.12)",
            backgroundColor: "rgba(255,255,255,0.06)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <User
            size={20}
            strokeWidth={1.75}
            aria-hidden="true"
            style={{ color: "rgba(255,255,255,0.55)" }}
          />
        </div>
        <div style={{ minWidth: 0 }}>
          <p
            style={{
              margin: 0,
              color: "rgba(255,255,255,0.90)",
              fontSize: "12px",
              fontWeight: 600,
            }}
          >
            Alexander Morgan
          </p>
          <p
            style={{
              margin: "2px 0 0",
              color: "rgba(255,255,255,0.50)",
              fontSize: "11px",
            }}
          >
            Stadium Operations Lead
          </p>
        </div>
      </div>
    </div>
  );
}

function SimulationBadge({ scenario }) {
  return (
    <div
      style={{
        backgroundColor: "rgba(239,68,68,0.10)",
        border: "1px solid rgba(239,68,68,0.28)",
        borderRadius: "12px",
        padding: "10px 14px",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      <p
        style={{
          color: "rgba(239,68,68,0.85)",
          fontSize: "10px",
          fontWeight: "bold",
          marginBottom: "4px",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
        }}
      >
        Simulation active
      </p>
      <p
        style={{
          color: "rgba(255,255,255,0.72)",
          fontSize: "11px",
          margin: 0,
        }}
      >
        {scenario.toUpperCase().replace("_", " ")}
      </p>
    </div>
  );
}

function ToolChip({ label, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        appearance: "none",
        display: "flex",
        alignItems: "center",
        gap: "8px",
        padding: "8px 14px",
        borderRadius: "999px",
        border: "1px solid rgba(255,255,255,0.08)",
        backgroundColor: "rgba(255,255,255,0.03)",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.06)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.03)";
      }}
    >
      {label === "What-If Simulation" ? (
        <Layers size={14} aria-hidden="true" style={{ opacity: 0.65 }} />
      ) : null}
      <span style={{ color: "rgba(255,255,255,0.68)", fontSize: "12px" }}>
        {label}
      </span>
      <ArrowRight
        size={14}
        aria-hidden="true"
        style={{ color: "rgba(255,255,255,0.32)" }}
      />
    </button>
  );
}

function hexToRgba(hex, alpha) {
  const cleaned = String(hex || "").replace("#", "");
  if (cleaned.length !== 6) return `rgba(255,255,255,${alpha})`;
  const r = parseInt(cleaned.slice(0, 2), 16);
  const g = parseInt(cleaned.slice(2, 4), 16);
  const b = parseInt(cleaned.slice(4, 6), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

function getRiskColor(riskLevel) {
  switch (riskLevel) {
    case "CRITICAL":
      return "rgba(239,68,68,0.85)";
    case "HIGH":
      return "rgba(239,68,68,0.70)";
    case "MEDIUM":
      return "rgba(212,175,55,0.75)";
    case "LOW":
      return "rgba(255,255,255,0.55)";
    default:
      return "rgba(255,255,255,0.35)";
  }
}

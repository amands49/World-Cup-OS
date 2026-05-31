"use client";

import { useEffect, useState } from "react";
import { getMCPStats } from "../../lib/api";

export default function SystemStatusDrawer() {
  const [mcpStats, setMcpStats] = useState(null);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    getMCPStats()
      .then((data) => {
        setMcpStats(data);
        setLoadError(false);
      })
      .catch(() => setLoadError(true));
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
      <section>
        <SectionLabel>Platform</SectionLabel>
        <StatusRow label="Backend" value="Online" />
        <StatusRow label="Database" value="Connected" />
        <StatusRow label="Model" value="Active" />
        <StatusRow label="WorldCupOS" value="Operational" />
      </section>

      <section>
        <SectionLabel>MongoDB MCP</SectionLabel>
        {loadError ? (
          <p
            style={{
              margin: 0,
              color: "rgba(255,255,255,0.48)",
              fontSize: "13px",
            }}
          >
            MCP stats unavailable. Ensure backend is running.
          </p>
        ) : mcpStats ? (
          <>
            <MetricRow label="Incidents" value={mcpStats.incidents} />
            <MetricRow label="Operational States" value={mcpStats.operational_states} />
            <MetricRow label="Recommendations" value={mcpStats.recommendations} />
            <MetricRow label="Simulations" value={mcpStats.simulations} />
          </>
        ) : (
          <p
            style={{
              margin: 0,
              color: "rgba(255,255,255,0.48)",
              fontSize: "13px",
            }}
          >
            Loading diagnostics…
          </p>
        )}
      </section>

      <section>
        <SectionLabel>Diagnostics</SectionLabel>
        <p
          style={{
            margin: 0,
            color: "rgba(255,255,255,0.52)",
            fontSize: "12px",
            lineHeight: 1.55,
          }}
        >
          System telemetry is available on demand. Core operational views remain
          on the broadcast canvas.
        </p>
      </section>
    </div>
  );
}

function SectionLabel({ children }) {
  return (
    <div
      style={{
        color: "rgba(255,255,255,0.46)",
        fontSize: "10px",
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        marginBottom: "10px",
      }}
    >
      {children}
    </div>
  );
}

function StatusRow({ label, value }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "12px",
        padding: "10px 0",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <span style={{ color: "rgba(255,255,255,0.62)", fontSize: "12px" }}>
        {label}
      </span>
      <span
        style={{
          color: "rgba(255,255,255,0.82)",
          fontSize: "11px",
          fontWeight: 600,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
        }}
      >
        {value}
      </span>
    </div>
  );
}

function MetricRow({ label, value }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "12px",
        padding: "9px 0",
        borderBottom: "1px solid rgba(255,255,255,0.04)",
      }}
    >
      <span style={{ color: "rgba(255,255,255,0.55)", fontSize: "12px" }}>
        {label}
      </span>
      <span
        style={{
          color: "rgba(255,255,255,0.82)",
          fontSize: "12px",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {value ?? "—"}
      </span>
    </div>
  );
}

"use client";

// Horizontal scrollable strip of live telemetry KPI readouts.
// Each cell shows an icon, label, accent dot, and value from buildTelemetryReadouts.
import {
  Activity,
  Bus,
  ClipboardList,
  Clock,
  Shield,
  ShoppingCart,
  Users,
} from "lucide-react";

const TELEMETRY_ICONS = {
  posture: Activity,
  kickoff: Clock,
  incidents: Shield,
  transport: Bus,
  vendor: ShoppingCart,
  crowd: Users,
  recommendations: ClipboardList,
};

const ACCENT_DOT = {
  critical: "rgba(239,68,68,0.75)",
  elevated: "rgba(212,175,55,0.70)",
  watch: "rgba(212,175,55,0.50)",
  stable: "rgba(255,255,255,0.42)",
  neutral: "rgba(255,255,255,0.28)",
};

export default function TelemetryStrip({ readouts = [] }) {
  // Renders the KPI bar between hero and live ops stream when readouts exist.
  if (readouts.length === 0) return null;

  return (
    <section
      aria-label="Telemetry readouts"
      style={{
        marginBottom: "16px",
        borderRadius: "12px",
        backgroundColor: "rgba(255,255,255,0.025)",
        border: "1px solid rgba(255,255,255,0.07)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "stretch",
          overflowX: "auto",
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none",
        }}
      >
        {readouts.map((readout, index) => (
          <TelemetryCell
            key={readout.id}
            readout={readout}
            showDivider={index < readouts.length - 1}
          />
        ))}
      </div>
    </section>
  );
}

function TelemetryCell({ readout, showDivider }) {
  // Individual KPI cell with icon, label, accent dot, and truncated value.
  const dotColor = ACCENT_DOT[readout.accent] || ACCENT_DOT.neutral;
  const Icon = TELEMETRY_ICONS[readout.id];

  return (
    <div
      style={{
        flex: "1 1 0",
        minWidth: "96px",
        padding: "10px 14px",
        display: "flex",
        flexDirection: "column",
        gap: "5px",
        position: "relative",
      }}
    >
      {showDivider ? (
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            right: 0,
            top: "20%",
            height: "60%",
            width: "1px",
            backgroundColor: "rgba(255,255,255,0.06)",
          }}
        />
      ) : null}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
        }}
      >
        {Icon ? (
          <Icon
            size={14}
            strokeWidth={1.75}
            aria-hidden="true"
            style={{ color: "rgba(255,255,255,0.42)", flexShrink: 0 }}
          />
        ) : null}
        <span
          style={{
            color: "rgba(255,255,255,0.46)",
            fontSize: "10px",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            whiteSpace: "nowrap",
          }}
        >
          {readout.label}
        </span>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "7px",
          minWidth: 0,
        }}
      >
        <span
          aria-hidden="true"
          style={{
            width: "4px",
            height: "4px",
            borderRadius: "999px",
            backgroundColor: dotColor,
            flexShrink: 0,
          }}
        />
        <span
          style={{
            color: "rgba(255,255,255,0.88)",
            fontSize: "13px",
            fontWeight: 600,
            fontVariantNumeric: "tabular-nums",
            letterSpacing: "0.01em",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
          title={readout.value}
        >
          {readout.value}
        </span>
      </div>
    </div>
  );
}

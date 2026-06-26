"use client";

// Filterable live operations stream showing agent recommendations by severity.
// Splits pinned (critical/high/executive) items from the chronological feed.
import { useMemo, useState } from "react";

const FILTERS = [
  { id: "all", label: "All" },
  { id: "crowd", label: "Crowd" },
  { id: "transport", label: "Transport" },
  { id: "vendor", label: "Vendors" },
  { id: "emergency", label: "Emergency" },
  { id: "executive", label: "Executive" },
];

const SEVERITY_DOT = {
  critical: "rgba(239,68,68,0.90)",
  high: "rgba(239,68,68,0.70)",
  medium: "rgba(212,175,55,0.75)",
  low: "rgba(74,222,128,0.70)",
  info: "rgba(255,255,255,0.38)",
};

const SEVERITY_BADGE = {
  critical: {
    color: "rgba(239,68,68,0.98)",
    bg: "rgba(239,68,68,0.12)",
    border: "rgba(239,68,68,0.36)",
  },
  high: {
    color: "rgba(239,68,68,0.92)",
    bg: "rgba(239,68,68,0.10)",
    border: "rgba(239,68,68,0.30)",
  },
  medium: {
    color: "rgba(212,175,55,0.98)",
    bg: "rgba(212,175,55,0.11)",
    border: "rgba(212,175,55,0.33)",
  },
  low: {
    color: "rgba(74,222,128,0.98)",
    bg: "rgba(74,222,128,0.10)",
    border: "rgba(74,222,128,0.30)",
  },
  info: {
    color: "rgba(255,255,255,0.78)",
    bg: "rgba(255,255,255,0.05)",
    border: "rgba(255,255,255,0.14)",
  },
};

export default function LiveOpsStream({ streamItems = [], onItemSelect }) {
  // Renders category tabs and a severity-sorted list of agent action items.
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredItems = useMemo(() => {
    if (activeFilter === "all") return streamItems;
    return streamItems.filter((item) => item.category === activeFilter);
  }, [streamItems, activeFilter]);

  const pinnedItems = filteredItems.filter((item) => item.pinned);
  const streamList = filteredItems.filter((item) => !item.pinned);

  return (
    <section
      aria-label="Live operations stream"
      style={{
        borderRadius: "16px",
        backgroundColor: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.08)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        overflow: "hidden",
      }}
    >
      <header
        style={{
          padding: "14px 16px 12px",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "baseline",
          justifyContent: "space-between",
          gap: "12px",
        }}
      >
        <div>
          <div
            style={{
              color: "rgba(255,255,255,0.54)",
              fontSize: "11px",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              marginBottom: "4px",
            }}
          >
            Operational Channel
          </div>
          <h2
            style={{
              margin: 0,
              color: "rgba(255,255,255,0.92)",
              fontSize: "15px",
              fontWeight: 600,
              letterSpacing: "-0.01em",
            }}
          >
            Live Ops Stream
          </h2>
        </div>

        <div
          role="tablist"
          aria-label="Filter stream"
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "6px",
          }}
        >
          {FILTERS.map((filter) => {
            const isActive = activeFilter === filter.id;
            return (
              <button
                key={filter.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveFilter(filter.id)}
                style={{
                  appearance: "none",
                  border: `1px solid ${
                    isActive
                      ? "rgba(212,175,55,0.38)"
                      : "rgba(255,255,255,0.10)"
                  }`,
                  backgroundColor: isActive
                    ? "rgba(212,175,55,0.10)"
                    : "rgba(255,255,255,0.03)",
                  color: isActive
                    ? "rgba(255,255,255,0.92)"
                    : "rgba(255,255,255,0.58)",
                  padding: "6px 10px",
                  borderRadius: "999px",
                  fontSize: "11px",
                  fontWeight: isActive ? 600 : 500,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                }}
              >
                {filter.label}
              </button>
            );
          })}
        </div>
      </header>

      {streamItems.length === 0 ? (
        <div style={{ padding: "20px 16px" }}>
          <p
            style={{
              margin: 0,
              color: "rgba(255,255,255,0.48)",
              fontSize: "13px",
              lineHeight: 1.5,
            }}
          >
            Run agents to populate the live operations stream.
          </p>
        </div>
      ) : filteredItems.length === 0 ? (
        <div style={{ padding: "20px 16px" }}>
          <p
            style={{
              margin: 0,
              color: "rgba(255,255,255,0.48)",
              fontSize: "13px",
            }}
          >
            No items match this filter.
          </p>
        </div>
      ) : (
        <div>
          {pinnedItems.length > 0 ? (
            <div
              style={{
                padding: "10px 12px 8px",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
                backgroundColor: "rgba(255,255,255,0.02)",
              }}
            >
              <div
                style={{
                  color: "rgba(255,255,255,0.42)",
                  fontSize: "10px",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  marginBottom: "6px",
                  paddingLeft: "4px",
                }}
              >
                Pinned
              </div>
              {pinnedItems.map((item) => (
                <StreamRow
                  key={item.id}
                  item={item}
                  pinned
                  onSelect={onItemSelect}
                />
              ))}
            </div>
          ) : null}

          {streamList.length > 0 ? (
            <div style={{ padding: "8px 12px 12px" }}>
              {streamList.map((item) => (
                <StreamRow key={item.id} item={item} onSelect={onItemSelect} />
              ))}
            </div>
          ) : null}
        </div>
      )}
    </section>
  );
}

function StreamRow({ item, pinned = false, onSelect }) {
  // Single stream entry row with severity badge and optional click-to-open drawer.
  const severityKey = String(item.severity ?? "info").toLowerCase();
  const dotColor = SEVERITY_DOT[severityKey] || SEVERITY_DOT.info;
  const badge = SEVERITY_BADGE[severityKey] || SEVERITY_BADGE.info;
  const isInteractive = Boolean(onSelect);

  return (
    <article
      role={isInteractive ? "button" : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      onClick={isInteractive ? () => onSelect(item) : undefined}
      onKeyDown={
        isInteractive
          ? (event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                onSelect(item);
              }
            }
          : undefined
      }
      style={{
        display: "grid",
        gridTemplateColumns: "10px minmax(0, 1fr) auto",
        gap: "10px 12px",
        alignItems: "start",
        padding: "10px 8px",
        borderRadius: "10px",
        backgroundColor: pinned
          ? "rgba(255,255,255,0.04)"
          : "transparent",
        border: pinned
          ? "1px solid rgba(255,255,255,0.08)"
          : "1px solid transparent",
        marginBottom: "4px",
        cursor: isInteractive ? "pointer" : "default",
        transition: "background-color 160ms ease, border-color 160ms ease",
      }}
      onMouseEnter={(e) => {
        if (!isInteractive) return;
        e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.05)";
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.10)";
      }}
      onMouseLeave={(e) => {
        if (!isInteractive) return;
        e.currentTarget.style.backgroundColor = pinned
          ? "rgba(255,255,255,0.04)"
          : "transparent";
        e.currentTarget.style.borderColor = pinned
          ? "rgba(255,255,255,0.08)"
          : "transparent";
      }}
    >
      <span
        aria-hidden="true"
        style={{
          width: "6px",
          height: "6px",
          borderRadius: "999px",
          backgroundColor: dotColor,
          marginTop: "6px",
          marginLeft: "2px",
          boxShadow: pinned ? `0 0 8px ${dotColor}` : "none",
        }}
      />

      <div style={{ minWidth: 0 }}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "baseline",
            gap: "8px",
            marginBottom: "4px",
          }}
        >
          <span
            style={{
              color: "rgba(255,255,255,0.62)",
              fontSize: "11px",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            {item.agent}
          </span>
        </div>

        <p
          style={{
            margin: 0,
            color: "rgba(255,255,255,0.88)",
            fontSize: "14px",
            lineHeight: 1.45,
          }}
        >
          {item.action}
        </p>

        {item.detail ? (
          <p
            style={{
              margin: "4px 0 0",
              color: "rgba(255,255,255,0.42)",
              fontSize: "12px",
              lineHeight: 1.4,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
            title={item.detail}
          >
            {item.detail}
          </p>
        ) : null}
      </div>

      <span
        style={{
          color: badge.color,
          backgroundColor: badge.bg,
          border: `1px solid ${badge.border}`,
          boxSizing: "border-box",
          fontSize: "11px",
          fontWeight: 700,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          whiteSpace: "nowrap",
          padding: "4px 8px",
          borderRadius: "999px",
          marginTop: "2px",
        }}
      >
        {severityKey.toUpperCase()}
      </span>
    </article>
  );
}

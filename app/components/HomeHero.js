"use client";

import Image from "next/image";
import {
  Bus,
  ShieldAlert,
  ShoppingCart,
  Users,
} from "lucide-react";

export default function HomeHero({
  loading,
  onRunAgents,
  title = "MetLife Stadium Operations",
  subtitle = "Brazil vs France • Kickoff in 2 hours",
  topPriority,
  kpis = [
    { label: "Capacity", value: "89,000" },
    { label: "Attendance", value: "75,000" },
    { label: "Ingress", value: "Stable" },
    { label: "Transit", value: "Moderate" },
  ],
}) {
  return (
    <section
      aria-label="Stadium overview"
      style={{
        position: "relative",
        borderRadius: "16px",
        overflow: "hidden",
        backgroundColor: "#070707",
        border: "1px solid rgba(255,255,255,0.08)",
        minHeight: "calc(100vh - 72px)",
        marginBottom: "24px",
      }}
    >
      {/* Background image */}
      <div style={{ position: "absolute", inset: 0 }}>
        <Image
          src="/hero/stadium-hero.jpg"
          alt="MetLife Stadium under lights"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 75vw"
          style={{
            objectFit: "cover",
            filter: "saturate(1.04) contrast(1.04) brightness(0.90)",
            transform: "scale(1.02)",
          }}
        />
      </div>

      {/* Cinematic overlays */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(1200px 700px at 18% 22%, rgba(212,175,55,0.12), rgba(0,0,0,0) 62%), radial-gradient(900px 520px at 78% 36%, rgba(96,165,250,0.09), rgba(0,0,0,0) 58%), linear-gradient(180deg, rgba(7,7,7,0.40), rgba(7,7,7,0.74) 72%, rgba(7,7,7,0.86))",
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.12,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(closest-side at 50% 35%, rgba(0,0,0,1), rgba(0,0,0,0))",
          WebkitMaskImage:
            "radial-gradient(closest-side at 50% 35%, rgba(0,0,0,1), rgba(0,0,0,0))",
          transform: "translate3d(0,0,0)",
          animation: "wc_gridDrift 18s linear infinite",
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          padding: "clamp(20px, 3vw, 36px)",
          height: "100%",
          display: "grid",
          gridTemplateColumns: "minmax(0, 1.3fr) minmax(0, 0.9fr)",
          gap: "clamp(16px, 2.6vw, 28px)",
          alignItems: "end",
        }}
      >
        <div style={{ maxWidth: "820px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              padding: "8px 12px",
              borderRadius: "999px",
              backgroundColor: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.10)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              color: "rgba(255,255,255,0.78)",
              fontSize: "12px",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              marginBottom: "14px",
              animation: "wc_fadeUp 700ms ease-out both",
            }}
          >
            <span style={{ color: "#D4AF37", fontWeight: 700 }}>
              Live Operations
            </span>
            <span style={{ opacity: 0.55 }}>•</span>
            <span style={{ opacity: 0.85 }}>Stadium Telemetry</span>
          </div>

          <h2
            style={{
              margin: 0,
              color: "#ffffff",
              fontSize: "clamp(30px, 4vw, 56px)",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              fontWeight: 700,
              textShadow: "0 10px 40px rgba(0,0,0,0.55)",
              animation: "wc_fadeUp 780ms ease-out both",
              animationDelay: "40ms",
            }}
          >
            {title}
          </h2>

          <div
            style={{
              margin: "12px 0 0 0",
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: "10px",
              maxWidth: "58ch",
              animation: "wc_fadeUp 820ms ease-out both",
              animationDelay: "90ms",
            }}
          >
            <TeamLogoPair size={24} />
            <p
              style={{
                margin: 0,
                color: "rgba(255,255,255,0.72)",
                fontSize: "clamp(14px, 1.35vw, 18px)",
                lineHeight: 1.6,
              }}
            >
              {subtitle}
            </p>
          </div>

          {topPriority ? (
            <div
              style={{
                marginTop: "14px",
                display: "flex",
                gap: "10px",
                alignItems: "baseline",
                padding: "10px 12px",
                borderRadius: "12px",
                backgroundColor: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.10)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                boxShadow: "0 18px 60px rgba(0,0,0,0.35)",
                animation: "wc_fadeUp 850ms ease-out both",
                animationDelay: "120ms",
                maxWidth: "820px",
              }}
            >
              <span
                style={{
                  color: "rgba(255,255,255,0.62)",
                  fontSize: "11px",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  whiteSpace: "nowrap",
                }}
              >
                Top Priority
              </span>
              <span style={{ opacity: 0.35 }}>—</span>
              <span
                style={{
                  color: "rgba(255,255,255,0.86)",
                  fontSize: "13px",
                  lineHeight: 1.35,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  minWidth: 0,
                }}
                title={topPriority}
              >
                {topPriority}
              </span>
            </div>
          ) : null}

          <div
            style={{
              marginTop: topPriority ? "14px" : "18px",
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
              alignItems: "center",
              animation: "wc_fadeUp 860ms ease-out both",
              animationDelay: "140ms",
            }}
          >
            <button
              onClick={onRunAgents}
              disabled={loading}
              style={{
                appearance: "none",
                border: "1px solid rgba(212,175,55,0.50)",
                background:
                  loading
                    ? "rgba(255,255,255,0.06)"
                    : "linear-gradient(180deg, rgba(212,175,55,1), rgba(180,145,46,1))",
                color: loading ? "rgba(255,255,255,0.60)" : "#070707",
                padding: "12px 18px",
                borderRadius: "14px",
                fontSize: "13px",
                fontWeight: 700,
                letterSpacing: "0.02em",
                cursor: loading ? "not-allowed" : "pointer",
                boxShadow: loading
                  ? "none"
                  : "0 16px 52px rgba(0,0,0,0.45), 0 8px 28px rgba(212,175,55,0.16)",
                transform: "translateZ(0)",
                transition:
                  "transform 180ms ease, box-shadow 180ms ease, filter 180ms ease",
              }}
              onMouseEnter={(e) => {
                if (loading) return;
                e.currentTarget.style.transform = "translateY(-1px)";
                e.currentTarget.style.filter = "brightness(1.04)";
                e.currentTarget.style.boxShadow =
                  "0 18px 62px rgba(0,0,0,0.52), 0 12px 36px rgba(212,175,55,0.18)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.filter = "none";
                e.currentTarget.style.boxShadow = loading
                  ? "none"
                  : "0 16px 52px rgba(0,0,0,0.45), 0 8px 28px rgba(212,175,55,0.16)";
              }}
            >
              {loading ? "Analyzing…" : "Run Agents"}
            </button>

            <span
              style={{
                color: "rgba(255,255,255,0.62)",
                fontSize: "12px",
              }}
            >
              Subtle recommendations update as telemetry changes.
            </span>
          </div>
        </div>

        <div
          style={{
            justifySelf: "stretch",
            display: "grid",
            gap: "12px",
          }}
        >
          <GlassPanel title="Match Context">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "12px",
              }}
            >
              <TeamLogoPair size={40} />
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                gap: "10px 12px",
              }}
            >
              {kpis.map((kpi) => (
                <div key={kpi.label} style={{ minWidth: 0 }}>
                  <div
                    style={{
                      color: "rgba(255,255,255,0.54)",
                      fontSize: "11px",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      marginBottom: "6px",
                    }}
                  >
                    {kpi.label}
                  </div>
                  <div
                    style={{
                      color: "rgba(255,255,255,0.92)",
                      fontSize: "13px",
                      fontWeight: 600,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {kpi.value}
                  </div>
                </div>
              ))}
            </div>
          </GlassPanel>

          <GlassPanel title="Signal Summary">
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              <Chip
                label="Crowd"
                value="Standby"
                tone="neutral"
                icon={Users}
              />
              <Chip
                label="Vendors"
                value="Standby"
                tone="neutral"
                icon={ShoppingCart}
              />
              <Chip
                label="Transport"
                value="Standby"
                tone="neutral"
                icon={Bus}
              />
              <Chip
                label="Emergency"
                value="Standby"
                tone="neutral"
                icon={ShieldAlert}
              />
            </div>
          </GlassPanel>

          <div
            style={{
              position: "relative",
              borderRadius: "16px",
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.10)",
              minHeight: "140px",
            }}
          >
            <Image
              src="/media/football-action.jpg"
              alt="Brazil vs France match action"
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              style={{ objectFit: "cover" }}
            />
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(180deg, rgba(7,7,7,0.05), rgba(7,7,7,0.55))",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function GlassPanel({ title, children }) {
  return (
    <div
      style={{
        borderRadius: "16px",
        backgroundColor: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.10)",
        boxShadow: "0 18px 70px rgba(0,0,0,0.45)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        padding: "14px 14px 12px 14px",
        transition: "transform 180ms ease, box-shadow 180ms ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-1px)";
        e.currentTarget.style.boxShadow = "0 22px 86px rgba(0,0,0,0.52)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 18px 70px rgba(0,0,0,0.45)";
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          gap: "10px",
          marginBottom: "10px",
        }}
      >
        <div
          style={{
            color: "rgba(255,255,255,0.70)",
            fontSize: "11px",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
          }}
        >
          {title}
        </div>
        <div
          style={{
            width: "54px",
            height: "1px",
            background:
              "linear-gradient(90deg, rgba(212,175,55,0.65), rgba(255,255,255,0))",
            opacity: 0.9,
          }}
        />
      </div>
      {children}
    </div>
  );
}

function TeamLogoPair({ size = 24 }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
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
    </div>
  );
}

function Chip({ label, value, tone, icon: Icon }) {
  const stylesByTone = {
    neutral: {
      border: "1px solid rgba(255,255,255,0.14)",
      backgroundColor: "rgba(17,17,17,0.55)",
      color: "rgba(255,255,255,0.82)",
      valueColor: "rgba(255,255,255,0.92)",
    },
    info: {
      border: "1px solid rgba(96,165,250,0.28)",
      backgroundColor: "rgba(96,165,250,0.12)",
      color: "rgba(255,255,255,0.84)",
      valueColor: "#60A5FA",
    },
    warning: {
      border: "1px solid rgba(212,175,55,0.32)",
      backgroundColor: "rgba(212,175,55,0.10)",
      color: "rgba(255,255,255,0.84)",
      valueColor: "#D4AF37",
    },
    danger: {
      border: "1px solid rgba(239,68,68,0.32)",
      backgroundColor: "rgba(239,68,68,0.10)",
      color: "rgba(255,255,255,0.84)",
      valueColor: "#EF4444",
    },
  };

  const s = stylesByTone[tone] || stylesByTone.neutral;

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "10px",
        padding: "9px 10px",
        borderRadius: "999px",
        ...s,
      }}
    >
      {Icon ? (
        <Icon
          size={14}
          strokeWidth={1.75}
          aria-hidden="true"
          style={{ opacity: 0.72, flexShrink: 0 }}
        />
      ) : null}
      <span
        style={{
          fontSize: "11px",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          opacity: 0.72,
        }}
      >
        {label}
      </span>
      <span style={{ fontSize: "12px", fontWeight: 700, color: s.valueColor }}>
        {value}
      </span>
    </div>
  );
}


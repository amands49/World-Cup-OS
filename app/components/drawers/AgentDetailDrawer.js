const RISK_ACCENT = {
  CRITICAL: "rgba(239,68,68,0.75)",
  HIGH: "rgba(239,68,68,0.60)",
  MEDIUM: "rgba(212,175,55,0.65)",
  LOW: "rgba(255,255,255,0.45)",
  STANDBY: "rgba(255,255,255,0.28)",
};

export default function AgentDetailDrawer({ detail }) {
  if (!detail) {
    return (
      <p style={{ margin: 0, color: "rgba(255,255,255,0.48)", fontSize: "13px" }}>
        Run agents to view agent detail.
      </p>
    );
  }

  const accent = RISK_ACCENT[detail.riskLevel] || RISK_ACCENT.STANDBY;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
      <DetailBlock label="Agent" value={detail.name} />

      <DetailBlock
        label="Risk Level"
        value={detail.riskLevel}
        accent={accent}
      />

      {detail.recommendation ? (
        <DetailBlock label="Recommendation" value={detail.recommendation} large />
      ) : null}

      {detail.affectedAreas ? (
        <DetailBlock label="Affected Areas" value={detail.affectedAreas} />
      ) : null}

      {detail.reasoning ? (
        <DetailBlock label="Supporting Reasoning" value={detail.reasoning} muted />
      ) : null}

      {detail.confidence != null ? (
        <DetailBlock
          label="Confidence"
          value={`${detail.confidence}%`}
          tabular
        />
      ) : null}
    </div>
  );
}

function DetailBlock({ label, value, accent, large = false, muted = false, tabular = false }) {
  return (
    <div>
      <div
        style={{
          color: "rgba(255,255,255,0.46)",
          fontSize: "10px",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          marginBottom: "6px",
        }}
      >
        {label}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: "8px",
        }}
      >
        {accent ? (
          <span
            aria-hidden="true"
            style={{
              width: "5px",
              height: "5px",
              borderRadius: "999px",
              backgroundColor: accent,
              flexShrink: 0,
            }}
          />
        ) : null}
        <p
          style={{
            margin: 0,
            color: muted ? "rgba(255,255,255,0.58)" : "rgba(255,255,255,0.88)",
            fontSize: large ? "14px" : "13px",
            lineHeight: 1.5,
            fontVariantNumeric: tabular ? "tabular-nums" : "normal",
          }}
        >
          {value}
        </p>
      </div>
    </div>
  );
}

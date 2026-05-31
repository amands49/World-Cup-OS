export default function AgentFeed({ agentData }) {
  if (!agentData) {
    return (
      <div
        style={{
          backgroundColor: "#111111",
          border: "1px solid #222222",
          borderRadius: "8px",
          padding: "24px",
          marginTop: "24px",
        }}
      >
        <h2
          style={{
            color: "#444444",
            fontSize: "16px",
            marginBottom: "8px",
          }}
        >
          🤖 AGENT FEED
        </h2>
        <p style={{ color: "#333333", fontSize: "12px" }}>
          Run agents to see live reasoning feed...
        </p>
      </div>
    );
  }

  const feedItems = [
    {
      agent: "CrowdFlow",
      icon: "👥",
      color: "#FFD700",
      action: agentData.crowd?.recommendation,
      status: agentData.crowd?.risk_level,
      detail: agentData.crowd?.affected_zones?.join(", "),
    },
    {
      agent: "VendorOps",
      icon: "🍔",
      color: "#00aaff",
      action: agentData.vendor?.recommendation,
      status: agentData.vendor?.risk_level,
      detail: agentData.vendor?.low_inventory_items?.join(", "),
    },
    {
      agent: "Emergency",
      icon: "🚨",
      color: "#00ff00",
      action: agentData.emergency?.recommendation,
      status: agentData.emergency?.risk_level,
      detail:
        agentData.emergency?.active_incidents?.join(", ") || "No incidents",
    },
    {
      agent: "Transport",
      icon: "🚇",
      color: "#ff4444",
      action: agentData.transport?.recommendation,
      status: agentData.transport?.risk_level,
      detail: agentData.transport?.congested_routes?.join(", "),
    },
    {
      agent: "Executive",
      icon: "🧠",
      color: "#aa44ff",
      action: agentData.executive?.top_priority,
      status: agentData.executive?.overall_risk,
      detail: agentData.executive?.summary,
    },
  ];

  return (
    <div
      style={{
        backgroundColor: "#111111",
        border: "1px solid #222222",
        borderRadius: "8px",
        padding: "24px",
        marginTop: "24px",
      }}
    >
      <h2
        style={{
          color: "#ffffff",
          fontSize: "16px",
          marginBottom: "16px",
        }}
      >
        🤖 AGENT FEED — Live Reasoning
      </h2>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        {feedItems.map((item, index) => (
          <div
            key={index}
            style={{
              backgroundColor: "#0d0d0d",
              borderLeft: `3px solid ${item.color}`,
              borderRadius: "4px",
              padding: "12px 16px",
              display: "flex",
              gap: "16px",
              alignItems: "flex-start",
            }}
          >
            <span style={{ fontSize: "20px" }}>{item.icon}</span>

            <div style={{ flex: 1 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "4px",
                }}
              >
                <span
                  style={{
                    color: item.color,
                    fontSize: "12px",
                    fontWeight: "bold",
                  }}
                >
                  {item.agent}
                </span>
                <span
                  style={{
                    color: item.color,
                    fontSize: "10px",
                    backgroundColor: "#1a1a1a",
                    padding: "2px 8px",
                    borderRadius: "4px",
                  }}
                >
                  {item.status}
                </span>
              </div>

              <p
                style={{
                  color: "#ffffff",
                  fontSize: "12px",
                  marginBottom: "4px",
                }}
              >
                → {item.action}
              </p>

              {item.detail && (
                <p
                  style={{
                    color: "#555555",
                    fontSize: "11px",
                  }}
                >
                  {item.detail}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

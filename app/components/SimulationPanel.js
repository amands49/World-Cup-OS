// Crisis scenario picker grid for what-if simulation runs.
// Can render standalone or embedded inside the simulation drawer.

export default function SimulationPanel({ onSimulate, loading, embedded = false }) {
  // Displays four crisis scenarios as clickable cards that trigger backend /simulate.
  const scenarios = [
    {
      id: "heavy_rain",
      label: "Heavy Rain",
      description: "Severe weather emergency",
    },
    {
      id: "crowd_surge",
      label: "Crowd Surge",
      description: "Dangerous gate density",
    },
    {
      id: "train_delay",
      label: "Train Delay",
      description: "All metro lines suspended",
    },
    {
      id: "power_outage",
      label: "Power Outage",
      description: "Main grid failure",
    },
  ];

  return (
    <div
      style={{
        backgroundColor: embedded ? "transparent" : "#111111",
        border: embedded ? "none" : "1px solid #333333",
        borderRadius: embedded ? 0 : "8px",
        padding: embedded ? 0 : "24px",
        marginBottom: embedded ? 0 : "24px",
      }}
    >
      {!embedded ? (
        <>
          <h2
            style={{
              color: "#ffffff",
              fontSize: "16px",
              marginBottom: "8px",
            }}
          >
            Crisis Simulation Engine
          </h2>
          <p
            style={{
              color: "#666666",
              fontSize: "12px",
              marginBottom: "16px",
            }}
          >
            Trigger a scenario to test agent coordination
          </p>
        </>
      ) : null}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
          gap: "10px",
        }}
      >
        {scenarios.map((scenario) => (
          <button
            key={scenario.id}
            type="button"
            onClick={() => onSimulate(scenario.id)}
            disabled={loading}
            style={{
              appearance: "none",
              backgroundColor: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.10)",
              borderRadius: "12px",
              padding: "14px 12px",
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.5 : 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "6px",
              textAlign: "left",
              transition: "border-color 160ms ease, background-color 160ms ease",
            }}
            onMouseEnter={(e) => {
              if (loading) return;
              e.currentTarget.style.borderColor = "rgba(212,175,55,0.32)";
              e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.10)";
              e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.03)";
            }}
          >
            <span
              style={{
                color: "rgba(255,255,255,0.88)",
                fontSize: "12px",
                fontWeight: 600,
                letterSpacing: "0.02em",
              }}
            >
              {scenario.label}
            </span>
            <span
              style={{
                color: "rgba(255,255,255,0.46)",
                fontSize: "11px",
                lineHeight: 1.4,
              }}
            >
              {scenario.description}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

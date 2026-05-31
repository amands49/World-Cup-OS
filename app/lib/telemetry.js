function accentFromRisk(riskLevel) {
  switch (riskLevel) {
    case "CRITICAL":
      return "critical";
    case "HIGH":
      return "elevated";
    case "MEDIUM":
      return "watch";
    case "LOW":
      return "stable";
    default:
      return "neutral";
  }
}

function countActiveRecommendations(agentData) {
  if (!agentData) return 0;

  const domains = ["crowd", "vendor", "emergency", "transport", "executive"];
  return domains.filter((key) => {
    const domain = agentData[key];
    if (!domain) return false;
    return Boolean(domain.recommendation || domain.top_priority);
  }).length;
}

export function buildTelemetryReadouts(agentData, options = {}) {
  const kickoff = options.kickoff ?? "2h";

  if (!agentData) {
    return [
      { id: "posture", label: "Posture", value: "Standby", accent: "neutral" },
      { id: "kickoff", label: "Kickoff", value: kickoff, accent: "neutral" },
      { id: "incidents", label: "Incidents", value: "0", accent: "neutral" },
      { id: "transport", label: "Transport", value: "0 routes", accent: "neutral" },
      { id: "vendor", label: "Shortages", value: "0 items", accent: "neutral" },
      { id: "crowd", label: "Crowd", value: "0 zones", accent: "neutral" },
      {
        id: "recommendations",
        label: "Recs",
        value: "0 active",
        accent: "neutral",
      },
    ];
  }

  const incidentCount = agentData.emergency?.active_incidents?.length ?? 0;
  const congestedRoutes = agentData.transport?.congested_routes?.length ?? 0;
  const shortageCount = agentData.vendor?.low_inventory_items?.length ?? 0;
  const crowdZones = agentData.crowd?.affected_zones?.length ?? 0;
  const recCount = countActiveRecommendations(agentData);

  return [
    {
      id: "posture",
      label: "Posture",
      value: agentData.executive?.overall_risk ?? "—",
      accent: accentFromRisk(agentData.executive?.overall_risk),
    },
    {
      id: "kickoff",
      label: "Kickoff",
      value: kickoff,
      accent: "neutral",
    },
    {
      id: "incidents",
      label: "Incidents",
      value: String(incidentCount),
      accent: incidentCount > 0 ? "elevated" : "stable",
    },
    {
      id: "transport",
      label: "Transport",
      value: `${congestedRoutes} route${congestedRoutes === 1 ? "" : "s"}`,
      accent: accentFromRisk(agentData.transport?.risk_level),
    },
    {
      id: "vendor",
      label: "Shortages",
      value: `${shortageCount} item${shortageCount === 1 ? "" : "s"}`,
      accent: accentFromRisk(agentData.vendor?.risk_level),
    },
    {
      id: "crowd",
      label: "Crowd",
      value: `${crowdZones} zone${crowdZones === 1 ? "" : "s"}`,
      accent: accentFromRisk(agentData.crowd?.risk_level),
    },
    {
      id: "recommendations",
      label: "Recs",
      value: `${recCount} active`,
      accent: recCount >= 3 ? "watch" : "neutral",
    },
  ];
}

const SEVERITY_WEIGHT = {
  critical: 0,
  high: 1,
  medium: 2,
  low: 3,
  info: 4,
};

function riskToSeverity(riskLevel) {
  switch (riskLevel) {
    case "CRITICAL":
      return "critical";
    case "HIGH":
      return "high";
    case "MEDIUM":
      return "medium";
    case "LOW":
      return "low";
    default:
      return "info";
  }
}

function shouldPin(severity, category) {
  return severity === "critical" || severity === "high" || category === "executive";
}

export function buildStreamItems(agentData) {
  if (!agentData) return [];

  const items = [
    {
      id: "executive",
      category: "executive",
      agent: "Executive",
      action: agentData.executive?.top_priority,
      detail: agentData.executive?.summary,
      status: agentData.executive?.overall_risk,
      severity: riskToSeverity(agentData.executive?.overall_risk),
    },
    {
      id: "transport",
      category: "transport",
      agent: "Transport",
      action: agentData.transport?.recommendation,
      detail: agentData.transport?.congested_routes?.join(", "),
      status: agentData.transport?.risk_level,
      severity: riskToSeverity(agentData.transport?.risk_level),
    },
    {
      id: "crowd",
      category: "crowd",
      agent: "Crowd Flow",
      action: agentData.crowd?.recommendation,
      detail: agentData.crowd?.affected_zones?.join(", "),
      status: agentData.crowd?.risk_level,
      severity: riskToSeverity(agentData.crowd?.risk_level),
    },
    {
      id: "vendor",
      category: "vendor",
      agent: "Vendor Ops",
      action: agentData.vendor?.recommendation,
      detail: agentData.vendor?.low_inventory_items?.join(", "),
      status: agentData.vendor?.risk_level,
      severity: riskToSeverity(agentData.vendor?.risk_level),
    },
    {
      id: "emergency",
      category: "emergency",
      agent: "Emergency",
      action: agentData.emergency?.recommendation,
      detail:
        agentData.emergency?.active_incidents?.join(", ") || "No active incidents",
      status: agentData.emergency?.risk_level,
      severity: riskToSeverity(agentData.emergency?.risk_level),
    },
  ]
    .filter((item) => item.action)
    .map((item) => ({
      ...item,
      pinned: shouldPin(item.severity, item.category),
    }));

  return items.sort((a, b) => {
    if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
    return SEVERITY_WEIGHT[a.severity] - SEVERITY_WEIGHT[b.severity];
  });
}

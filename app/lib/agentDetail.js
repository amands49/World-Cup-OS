// Normalizes agent domain data into a drawer-friendly detail object.
// Resolves display labels and domain-specific affected-area fields.

const AGENT_LABELS = {
  crowd: "Crowd Flow",
  vendor: "Vendor Ops",
  emergency: "Emergency",
  transport: "Transport",
  executive: "Executive",
};

function getAffectedAreas(categoryKey, domain) {
  // Extracts the relevant "affected areas" string per agent domain type.
  if (!domain) return null;

  switch (categoryKey) {
    case "crowd":
      return domain.affected_zones?.length
        ? domain.affected_zones.join(", ")
        : null;
    case "vendor":
      return domain.low_inventory_items?.length
        ? domain.low_inventory_items.join(", ")
        : null;
    case "transport":
      return domain.congested_routes?.length
        ? domain.congested_routes.join(", ")
        : null;
    case "emergency":
      return domain.active_incidents?.length
        ? domain.active_incidents.join(", ")
        : "No active incidents";
    case "executive":
      if (!domain.systems_status) return null;
      return Object.entries(domain.systems_status)
        .map(([key, value]) => `${key}: ${value}`)
        .join(" · ");
    default:
      return null;
  }
}

export function getAgentDetail(agentData, categoryKey) {
  // Builds structured detail payload for the AgentDetailDrawer component.
  if (!agentData || !categoryKey) return null;

  const domain = agentData[categoryKey];
  if (!domain) return null;

  const riskLevel = domain.risk_level || domain.overall_risk || "STANDBY";
  const recommendation = domain.recommendation || domain.top_priority;
  const reasoning = domain.status || domain.summary || null;

  return {
    category: categoryKey,
    name: domain.agent || AGENT_LABELS[categoryKey] || categoryKey,
    riskLevel,
    recommendation,
    affectedAreas: getAffectedAreas(categoryKey, domain),
    reasoning,
    confidence: domain.confidence ?? null,
  };
}

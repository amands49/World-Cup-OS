// HTTP client for the WorldCupOS FastAPI backend.
// Exposes fetch wrappers for agent runs, simulations, and MCP diagnostics.
const BACKEND_URL = "http://localhost:8000";

export async function runAgents() {
  // POST /run-agents — triggers multi-agent analysis on baseline telemetry.
  const response = await fetch(`${BACKEND_URL}/run-agents`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to run agents");
  }

  const data = await response.json();
  return data;
}

export async function getStadiumStatus() {
  // GET /stadium-status — returns stadium metadata and MongoDB counts.
  const response = await fetch(`${BACKEND_URL}/stadium-status`);

  if (!response.ok) {
    throw new Error("Failed to get stadium status");
  }

  const data = await response.json();
  return data;
}

export async function runSimulation(scenario) {
  // POST /simulate — runs agents against a named crisis scenario.
  const response = await fetch(`${BACKEND_URL}/simulate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ scenario: scenario }),
  });

  if (!response.ok) {
    throw new Error("Simulation failed");
  }

  const data = await response.json();
  return data;
}

export async function getMCPStats() {
  // GET /mcp/stats — returns MongoDB collection document counts.
  const response = await fetch(`${BACKEND_URL}/mcp/stats`);
  if (!response.ok) throw new Error("Failed to get MCP stats");
  return await response.json();
}

const BACKEND_URL = "http://localhost:8000";

export async function runAgents() {
  // MUST use backticks ` ` here, NOT regular single or double quotes
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
  // MUST use backticks ` ` here too
  const response = await fetch(`${BACKEND_URL}/stadium-status`);

  if (!response.ok) {
    throw new Error("Failed to get stadium status");
  }

  const data = await response.json();
  return data;
}

export async function runSimulation(scenario) {
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
  const response = await fetch(`${BACKEND_URL}/mcp/stats`);
  if (!response.ok) throw new Error("Failed to get MCP stats");
  return await response.json();
}

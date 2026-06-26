"use client";

// Main dashboard page — orchestrates agent runs, telemetry, stream, and drawer state.
// Composes TopNav, HomeHero, TelemetryStrip, LiveOpsStream, and AppDrawers.
import { useState } from "react";
import LiveOpsStream from "./components/LiveOpsStream";
import TopNav from "./components/TopNav";
import HomeHero from "./components/HomeHero";
import TelemetryStrip from "./components/TelemetryStrip";
import AppDrawers from "./components/AppDrawers";
import { runAgents, runSimulation } from "./lib/api";
import { buildStreamItems } from "./lib/streamItems";
import { buildTelemetryReadouts } from "./lib/telemetry";

export default function Home() {
  const [agentData, setAgentData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeScenario, setActiveScenario] = useState(null);
  const [drawer, setDrawer] = useState(null);

  function openDrawer(type, payload = {}) {
    // Opens a right-side drawer by type (agent, simulation, or system).
    setDrawer({ type, ...payload });
  }

  function closeDrawer() {
    // Dismisses the active drawer.
    setDrawer(null);
  }

  async function handleRunAgents() {
    // Triggers baseline multi-agent analysis against the FastAPI backend.
    setLoading(true);
    setError(null);

    try {
      const data = await runAgents();
      setAgentData(data);
    } catch (err) {
      setError("Failed to connect to backend. Make sure it is running.");
    } finally {
      setLoading(false);
    }
  }

  async function handleSimulate(scenarioId) {
    // Runs a what-if crisis scenario and refreshes agent data from the response.
    setLoading(true);
    setError(null);
    setActiveScenario(scenarioId);

    try {
      const data = await runSimulation(scenarioId);
      setAgentData(data);
    } catch (err) {
      setError("Simulation failed. Make sure backend is running.");
    } finally {
      setLoading(false);
    }
  }

  const topPriority = agentData
    ? activeScenario
      ? `Simulation: ${activeScenario.toUpperCase().replace("_", " ")} — ${agentData.executive.summary}`
      : agentData.executive.summary
    : null;

  const streamItems = buildStreamItems(agentData);
  const telemetryReadouts = buildTelemetryReadouts(agentData, { kickoff: "2h" });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <TopNav
        agentData={agentData}
        activeScenario={activeScenario}
        onAgentSelect={(category) => openDrawer("agent", { category })}
        onOpenSimulation={() => openDrawer("simulation")}
        onOpenSystem={() => openDrawer("system")}
      />

      <div style={{ flex: 1, overflow: "auto" }}>
        <div style={{ padding: "clamp(18px, 2.4vw, 32px)" }}>
          <HomeHero
            agentData={agentData}
            loading={loading}
            onRunAgents={handleRunAgents}
            title="MetLife Stadium Operations"
            subtitle="Brazil vs France • Kickoff in 2 hours"
            topPriority={topPriority}
            kpis={[
              { label: "Capacity", value: "89,000" },
              { label: "Attendance", value: "75,000" },
              { label: "Kickoff", value: "2 hours" },
              { label: "Venue", value: "MetLife Stadium" },
            ]}
          />

          {error && (
            <div
              style={{
                backgroundColor: "#330000",
                border: "1px solid #ff4444",
                borderRadius: "8px",
                padding: "16px",
                marginBottom: "16px",
                color: "#ff4444",
              }}
            >
              ⚠️ {error}
            </div>
          )}

          <TelemetryStrip readouts={telemetryReadouts} />

          <LiveOpsStream
            streamItems={streamItems}
            onItemSelect={(item) => openDrawer("agent", { category: item.id })}
          />
        </div>
      </div>

      <AppDrawers
        drawer={drawer}
        onClose={closeDrawer}
        agentData={agentData}
        loading={loading}
        onSimulate={handleSimulate}
      />
    </div>
  );
}

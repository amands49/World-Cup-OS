"use client";

// Router for right-side drawer content — agent detail, simulation, or system status.
// Selects the correct drawer body based on the active drawer.type from page state.
import RightDrawer from "./RightDrawer";
import AgentDetailDrawer from "./drawers/AgentDetailDrawer";
import SystemStatusDrawer from "./drawers/SystemStatusDrawer";
import SimulationPanel from "./SimulationPanel";
import { getAgentDetail } from "../lib/agentDetail";

const DRAWER_META = {
  agent: { overline: "Agent Detail", title: "Operational Detail" },
  simulation: { overline: "What-If", title: "Simulation" },
  system: { overline: "Diagnostics", title: "System Status" },
};

export default function AppDrawers({
  drawer,
  onClose,
  agentData,
  loading,
  onSimulate,
}) {
  // Mounts RightDrawer with agent detail, simulation, or system status content.
  if (!drawer) return null;

  const meta = DRAWER_META[drawer.type] || DRAWER_META.agent;
  const agentDetail =
    drawer.type === "agent"
      ? getAgentDetail(agentData, drawer.category)
      : null;

  const title =
    drawer.type === "agent" && agentDetail
      ? agentDetail.name
      : meta.title;

  return (
    <RightDrawer
      isOpen
      onClose={onClose}
      title={title}
      overline={meta.overline}
    >
      {drawer.type === "agent" ? (
        <AgentDetailDrawer detail={agentDetail} />
      ) : null}

      {drawer.type === "simulation" ? (
        <div>
          <p
            style={{
              margin: "0 0 16px",
              color: "rgba(255,255,255,0.52)",
              fontSize: "12px",
              lineHeight: 1.5,
            }}
          >
            Trigger a scenario to test agent coordination without leaving the
            broadcast view.
          </p>
          <SimulationPanel
            onSimulate={onSimulate}
            loading={loading}
            embedded
          />
        </div>
      ) : null}

      {drawer.type === "system" ? <SystemStatusDrawer /> : null}
    </RightDrawer>
  );
}

# FastAPI application entry point and REST routes for WorldCupOS.
# Orchestrates agent runs, crisis simulations, and MongoDB persistence.

# FastAPI application entry point for WorldCupOS stadium operations.
# Exposes REST routes that orchestrate AI agents, simulations, and MCP persistence.
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from pymongo import MongoClient
from datetime import datetime
from mcp_tools import (
    mcp_save_operational_state,
    mcp_get_recent_incidents,
    mcp_save_recommendation,
    mcp_get_historical_context,
    mcp_save_simulation,
    mcp_get_all_collections_stats,
)
import os

load_dotenv()

mongodb_uri = os.getenv("MONGODB_URI")
client = MongoClient(mongodb_uri)
db = client["worldcup2026"]
matches_collect = db["matches"]
teams_collect = db["teams"]
incidents_collect = db["incidents"]


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
# Root health probe for load balancers and quick sanity checks.
def root():
    return {"status": "World CupOS is Running..."}


@app.get("/health")
# Returns structured health payload for monitoring integrations.
def health():
    return {"status": "online", "system": "WorldCupOS", "version": "1.0"}


@app.get("/stadium-status")
# Aggregates MongoDB document counts with static stadium metadata.
def stadium_status():
    total_teams = teams_collect.count_documents({})
    total_matches = matches_collect.count_documents({})
    total_incidents = incidents_collect.count_documents({})

    return {
        "stadium": "MetLife Stadium",
        "capacity": 90000,
        "total_teams": total_teams,
        "total_matches": total_matches,
        "total_incidents": total_incidents,
        "status": "operational",
    }


@app.post("/run-agents")
# Runs all domain agents on baseline telemetry and persists results to MongoDB.
def run_all_agents():
    from agents import run_all_agents_call

    stadium_data = {
        "stadium": "MetLife Stadium",
        "capacity": 89000,
        "current_attendance": 75000,
        "match": "Brazil vs France",
        "weather": "Clear, 24°C",
        "time_to_kickoff": "2 hours",
        "active_gates": ["A", "B", "C", "D"],
        "vendor_inventory": {"food": "67%", "beverages": "45%", "merchandise": "82%"},
        "transport": {"metro_load": "85%", "bus_load": "92%", "parking": "78%"},
    }

    historical_context = mcp_get_historical_context()

    if historical_context:
        stadium_data["historical_context"] = historical_context

    result = run_all_agents_call(stadium_data)

    mcp_save_operational_state("MetLife Stadium", result)

    for agent_key in ["crowd", "vendor", "emergency", "transport"]:
        if agent_key in result:
            mcp_save_recommendation(
                agent_name=result[agent_key].get("agent"),
                recommendation=result[agent_key].get("recommendation"),
                risk_level=result[agent_key].get("risk_level"),
                scenario="normal",
            )

    incident = {
        "timestamp": str(datetime.now()),
        "stadium_data": stadium_data,
        "agent_results": result,
        "source": "WorldCupOS MCP Agent",
    }
    incidents_collect.insert_one(incident)

    return result


@app.post("/simulate")
# Applies a crisis scenario overlay, runs agents, and saves the simulation run.
def run_simulation(scenario: dict):
    from agents import run_all_agents_call

    scenario_name = scenario.get("scenario", "normal")

    base_stadium_data = {
        "stadium": "MetLife Stadium",
        "capacity": 89000,
        "current_attendance": 75000,
        "match": "Brazil vs France",
        "active_gates": ["A", "B", "C", "D"],
        "vendor_inventory": {"food": "67%", "beverages": "45%", "merchandise": "82%"},
        "transport": {"metro_load": "85%", "bus_load": "92%", "parking": "78%"},
    }

    scenarios = {
        "heavy_rain": {
            "weather": "Heavy rain, 12°C, severe flooding risk",
            "emergency_alert": "Weather emergency declared",
            "crisis": "HEAVY RAIN — all outdoor areas at risk",
        },
        "crowd_surge": {
            "weather": "Clear, 24°C",
            "current_attendance": 87000,
            "gate_pressure": "CRITICAL — Gate C barrier breach imminent",
            "crisis": "CROWD SURGE — dangerous density at Gate C",
        },
        "train_delay": {
            "weather": "Clear, 24°C",
            "transport": {
                "metro_load": "100%",
                "bus_load": "100%",
                "parking": "100%",
                "metro_status": "ALL LINES SUSPENDED",
            },
            "crisis": "TRAIN DELAY — all metro lines suspended",
        },
        "power_outage": {
            "weather": "Clear, 24°C",
            "power_status": "CRITICAL — Main grid failure",
            "emergency_lighting": "Backup generators active",
            "affected_systems": ["Vendor POS", "Gate scanners", "Scoreboard"],
            "crisis": "POWER OUTAGE — main grid failure",
        },
    }

    if scenario_name in scenarios:
        # Merge crisis-specific telemetry overrides into the baseline stadium payload.
        base_stadium_data.update(scenarios[scenario_name])

    historical = mcp_get_historical_context(scenario_name)
    if historical:
        base_stadium_data["past_responses"] = historical

    base_stadium_data["simulation_active"] = True
    base_stadium_data["scenario"] = scenario_name

    result = run_all_agents_call(base_stadium_data)
    result["scenario"] = scenario_name
    result["simulation"] = True

    mcp_save_simulation(scenario_name, base_stadium_data, result)
    mcp_save_operational_state("MetLife Stadium", result)

    return result


@app.get("/mcp/stats")
# Returns document counts across all MCP MongoDB collections.
def get_mcp_stats():
    stats = mcp_get_all_collections_stats()
    return stats


@app.get("/mcp/recent-incidents")
# Fetches the most recent incident records from MongoDB.
def get_recent_incidents():
    incidents = mcp_get_recent_incidents(limit=10)
    return {"incidents": incidents, "count": len(incidents)}


@app.get("/mcp/historical/{scenario}")
# Retrieves past simulation summaries for a given scenario type.
def get_historical(scenario: str):
    history = mcp_get_historical_context(scenario)
    return {"history": history, "scenario": scenario}

# MongoDB persistence layer (MCP-style tools) for WorldCupOS operational data.
# Read/write helpers for incidents, states, recommendations, and simulations.
from pymongo import MongoClient
from datetime import datetime
import os
from dotenv import load_dotenv

load_dotenv()

client = MongoClient(os.getenv("MONGODB_URI"))
db = client["worldcup2026"]

incidents_collection = db["incidents"]
operational_states_collection = db["operational_states"]
recommendations_collection = db["recommendations"]
simulations_collection = db["simulations"]


def mcp_save_operational_state(stadium_name, agent_results):
    # Snapshots current risk levels and top priority into operational_states.
    print("[MCP] Saving operational state to MongoDB...")

    state = {
        "timestamp": str(datetime.now()),
        "stadium": stadium_name,
        "crowd_risk": agent_results.get("crowd", {}).get("risk_level"),
        "vendor_risk": agent_results.get("vendor", {}).get("risk_level"),
        "emergency_risk": agent_results.get("emergency", {}).get("risk_level"),
        "transport_risk": agent_results.get("transport", {}).get("risk_level"),
        "overall_risk": agent_results.get("executive", {}).get("overall_risk"),
        "top_priority": agent_results.get("executive", {}).get("top_priority"),
        "source": "WorldCupOS MCP Agent",
    }

    result = operational_states_collection.insert_one(state)
    print(f"[MCP] Operational state saved: {result.inserted_id}")
    return str(result.inserted_id)


def mcp_get_recent_incidents(limit=5):
    # Returns the latest incident documents, newest first.
    print("[MCP] Retrieving recent incidents from MongoDB...")

    incidents = list(
        incidents_collection.find({}, {"_id": 0}).sort("timestamp", -1).limit(limit)
    )

    print(f"[MCP] Retrieved {len(incidents)} recent incidents")
    return incidents


def mcp_save_recommendation(agent_name, recommendation, risk_level, scenario=None):
    # Persists a single agent recommendation with risk level and scenario tag.
    print(f"[MCP] Saving {agent_name} recommendation to MongoDB...")

    rec = {
        "timestamp": str(datetime.now()),
        "agent": agent_name,
        "recommendation": recommendation,
        "risk_level": risk_level,
        "scenario": scenario or "normal",
        "source": "WorldCupOS MCP Agent",
    }

    result = recommendations_collection.insert_one(rec)
    print(f"[MCP] Recommendation saved: {result.inserted_id}")
    return str(result.inserted_id)


def mcp_get_historical_context(scenario=None):
    # Loads recent simulation executive summaries for agent prompt enrichment.
    print("[MCP] Fetching historical context from MongoDB...")

    query = {}
    if scenario:
        query["scenario"] = scenario

    recent = list(
        simulations_collection.find(
            query,
            {
                "_id": 0,
                "agent_results.executive.summary": 1,
                "scenario": 1,
                "timestamp": 1,
            },
        )
        .sort("timestamp", -1)
        .limit(3)
    )

    print(f"[MCP] Found {len(recent)} historical records")
    return recent


def mcp_save_simulation(scenario, stadium_data, agent_results):
    # Stores a full what-if simulation run including input data and agent output.
    print(f"[MCP] Saving simulation '{scenario}' to MongoDB...")

    sim = {
        "timestamp": str(datetime.now()),
        "scenario": scenario,
        "stadium_data": stadium_data,
        "agent_results": agent_results,
        "source": "WorldCupOS MCP Agent",
    }

    result = simulations_collection.insert_one(sim)
    print(f"[MCP] Simulation saved: {result.inserted_id}")
    return str(result.inserted_id)


def mcp_get_all_collections_stats():
    # Returns document counts for all MCP collections (diagnostics endpoint).
    print("[MCP] Getting MongoDB collection statistics...")

    stats = {
        "incidents": incidents_collection.count_documents({}),
        "operational_states": operational_states_collection.count_documents({}),
        "recommendations": recommendations_collection.count_documents({}),
        "simulations": simulations_collection.count_documents({}),
        "source": "WorldCupOS MCP",
    }

    print(f"[MCP] Stats: {stats}")
    return stats

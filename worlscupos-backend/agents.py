
# Sends stadium telemetry to Gemini and parses structured JSON agent responses.
from google import genaiimport os
import json
from datetime import datetime
from dotenv import load_dotenv

load_dotenv()

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))


def run_all_agents_call(stadium_data):
    # Prompts Gemini to analyze telemetry as five domain agents and return JSON.
    print("WorldCupOS Multi-Agent System running...")

    prompt = f"""
    You are WorldCupOS, an autonomous AI operations system 
    for the 2026 FIFA World Cup managing multiple specialized agents.
    
    Current stadium data:
    {stadium_data}
    
    Analyze this data as 5 specialized agents and respond in this 
    EXACT JSON format with no other text:
    {{
        "crowd": {{
            "agent": "CrowdFlow",
            "risk_level": "MEDIUM",
            "status": "Gate C showing 85% capacity",
            "recommendation": "Open Gate E immediately",
            "affected_zones": ["Gate C", "Zone 4"],
            "confidence": 87
        }},
        "vendor": {{
            "agent": "VendorOps",
            "risk_level": "LOW",
            "status": "All vendors operational",
            "recommendation": "Restock Zone 4 beverages",
            "low_inventory_items": ["Water", "Beer"],
            "confidence": 92
        }},
        "emergency": {{
            "agent": "Emergency",
            "risk_level": "LOW",
            "status": "No active incidents",
            "recommendation": "Maintain current medical staffing",
            "active_incidents": [],
            "confidence": 95
        }},
        "transport": {{
            "agent": "Transport",
            "risk_level": "HIGH",
            "status": "Metro Line 3 at 92% capacity",
            "recommendation": "Activate bus overflow routes",
            "congested_routes": ["Metro Line 3", "Bus Route 7"],
            "confidence": 88
        }},
        "executive": {{
            "agent": "Executive",
            "overall_risk": "MEDIUM",
            "summary": "Operations are stable with transport pressure building. Immediate action needed on Gate C crowd flow and Metro Line 3 congestion.",
            "top_priority": "Activate Gate E and bus overflow routes",
            "systems_status": {{
                "crowd": "WARNING",
                "vendor": "OK",
                "emergency": "OK",
                "transport": "CRITICAL"
            }},
            "confidence": 90
        }}
    }}
    
    Use the actual stadium data provided to generate realistic 
    specific values. Return ONLY the JSON.
    """

    response = client.models.generate_content(model="gemini-3-flash-preview", contents=prompt)

    text = response.text.strip()
    # Strip markdown fences Gemini sometimes wraps around JSON output.
    text = text.replace("```json", "").replace("```", "").strip()
    result = json.loads(text)

    for agent_key in result:
        result[agent_key]["timestamp"] = str(datetime.now())

    return result

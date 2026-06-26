# WorldCupOS

**AI-powered match day operations dashboard for a World Cup stadium command center.**

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat&logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat&logo=react&logoColor=black)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=flat&logo=fastapi&logoColor=white)
![Python](https://img.shields.io/badge/Python-3.12+-3776AB?style=flat&logo=python&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white)
![Gemini](https://img.shields.io/badge/Gemini-AI-8E75B2?style=flat&logo=google&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?style=flat&logo=tailwindcss&logoColor=white)

---

## The Problem

Running a World Cup match involves a coordinated effort across crowd safety, weather, transport, vendors, and emergency response. Operations teams need a single view of live conditions, prioritized actions, and AI-backed recommendations — not scattered spreadsheets and radio chatter.

WorldCupOS simulates that command-center experience: a dark, broadcast-style dashboard where specialized AI agents analyze stadium telemetry and surface what matters most before kickoff.

---

## How It Works

```
Stadium telemetry (simulated) → FastAPI backend → Gemini multi-agent analysis → MongoDB persistence → Next.js dashboard
```

1. **Telemetry ingest** — The backend holds simulated match-day data: attendance, gate pressure, weather, transport load, vendor inventory, and crisis flags.
2. **Multi-agent analysis** — A single Gemini prompt orchestrates five domain agents (CrowdFlow, VendorOps, Emergency, Transport, Executive) and returns structured JSON with risk levels, recommendations, and confidence scores.
3. **MCP persistence** — Results are written to MongoDB via MCP-style helpers: operational states, recommendations, incidents, and simulation runs.
4. **Dashboard** — The Next.js frontend calls `/run-agents` or `/simulate`, then renders a hero overview, telemetry strip, and filterable live ops stream. Drawers expose agent detail, what-if scenarios, and system diagnostics.

---

## Tech Stack


Frontend: Next.js 16, React 19, Tailwind CSS 4, Lucide icons 

Backend: FastAPI, Uvicorn 

AI: Google Gemini (`gemini-3-flash-preview`)

Database: MongoDB Atlas


---

## Run Locally

### Prerequisites

- Node.js 18+
- Python 3.12+
- MongoDB Atlas cluster (or local MongoDB)
- [Google AI Studio](https://aistudio.google.com/) API key

### Backend

```bash
cd worlscupos-backend
python -m venv venv
venv\Scripts\activate          # For Windows
# source venv/bin/activate     # macOS / Linux

pip install fastapi uvicorn python-dotenv pymongo google-genai

cp .env.example .env           # then fill in your keys
uvicorn main:app --reload
```

API runs at **http://localhost:8000** — try `GET /health` to confirm.

### Frontend

```bash
# from project root
npm install
npm run dev
```

Dashboard runs at **http://localhost:3000**. Click **Run Agents** on the hero panel to trigger analysis.

---

## Environment Variables

Create `worlscupos-backend/.env` from the example below:

```env
# Google Gemini API key — https://aistudio.google.com/apikey
GEMINI_API_KEY=your_gemini_api_key_here

# MongoDB connection string (database: worldcup2026)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/worldcup2026
```

The frontend expects the backend at `http://localhost:8000` (see `app/lib/api.js`).

---

## Key Features

- **Five AI domain agents** — Crowd flow, vendor ops, emergency, transport, and executive summary with unified risk posture
- **Live ops stream** — Severity-sorted, filterable feed of agent recommendations; critical items pinned
- **Telemetry strip** — At-a-glance KPIs: posture, incidents, transport congestion, shortages, crowd zones
- **What-if simulations** — Heavy rain, crowd surge, train delay, and power outage scenarios with historical context from past runs
- **Agent detail drawers** — Drill into any agent for recommendation, affected areas, reasoning, and confidence
- **MongoDB MCP layer** — Persists operational states, recommendations, incidents, and simulation history


---

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/health` | Health check |
| `GET` | `/stadium-status` | Stadium + DB counts |
| `POST` | `/run-agents` | Run all agents on baseline telemetry |
| `POST` | `/simulate` | Run agents on a crisis scenario (`{"scenario": "heavy_rain"}`) |
| `GET` | `/mcp/stats` | MongoDB collection counts |
| `GET` | `/mcp/recent-incidents` | Latest incident records |
| `GET` | `/mcp/historical/{scenario}` | Past simulation summaries |

---

## Project Structure

```
worldcupos/
├── app/                    # Next.js frontend
│   ├── components/         # UI components + drawers
│   ├── lib/                # API client, stream/telemetry builders
│   └── page.js             # Main dashboard page
├── worlscupos-backend/     # FastAPI backend
│   ├── main.py             # Routes + orchestration
│   ├── agents.py           # Gemini multi-agent prompt
│   └── mcp_tools.py        # MongoDB persistence helpers
└── public/                 # Stadium imagery, team logos
```

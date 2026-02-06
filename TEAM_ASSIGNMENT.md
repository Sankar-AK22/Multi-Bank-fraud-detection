# 👥 Team Assignment - Component Ownership

## How This Works
Each person owns specific components. Only edit YOUR assigned files to avoid merge conflicts.

---

## 👤 PERSON 1 (YOU) - Frontend & Visualization

### Your Components:
| File | Description |
|------|-------------|
| `src/components/HeroSection.tsx` | Hero section with animated background |
| `src/components/TransactionFlow.tsx` | Money flow visualization diagram |
| `src/components/RiskScore.tsx` | Circular risk meter with AI reasons |
| `src/pages/HomePage.tsx` | Home page wrapper |
| `src/pages/TransactionsPage.tsx` | Transactions page wrapper |
| `src/pages/RiskPage.tsx` | Risk page wrapper |

### Your Focus:
- ✨ Animations and visual effects
- 📊 Data visualization
- 🎨 Hero section styling

---

## 👤 PERSON 2 (FRIEND) - Data & Intelligence

### Their Components:
| File | Description |
|------|-------------|
| `src/components/MultiBankPanel.tsx` | Bank login cards (HDFC, ICICI, SBI) |
| `src/components/IntelligencePanel.tsx` | IP & Device intelligence analysis |
| `src/components/AgentWorkflow.tsx` | AI agent pipeline visualization |
| `src/pages/BanksPage.tsx` | Banks page wrapper |
| `src/pages/IntelligencePage.tsx` | Intelligence page wrapper |
| `src/pages/WorkflowPage.tsx` | Workflow page wrapper |
| `src/data/mockData.ts` | All mock data |
| `src/api/webhooks.ts` | API integration |

### Their Focus:
- 🏦 Bank integration UI
- 🔍 Intelligence & detection
- 🤖 AI workflow pipeline
- 📡 API connections

---

## 🤝 Shared Files (Coordinate Before Editing)
| File | Owner |
|------|-------|
| `src/App.tsx` | Both (coordinate) |
| `src/components/Navbar.tsx` | Both (coordinate) |
| `src/components/Footer.tsx` | Both (coordinate) |
| `src/index.css` | Both (coordinate) |

---

## 📋 Git Workflow

### Initial Setup (Each Person)
```bash
git clone <your-repo-url>
cd multibankfrauddetection
npm install
npm run dev
```

### Daily Workflow
```bash
# 1. Pull latest changes BEFORE starting work
git pull origin main

# 2. Work on YOUR components only

# 3. Commit your changes
git add .
git commit -m "feat: describe your change"

# 4. Pull again before pushing (in case friend pushed)
git pull origin main

# 5. Push your changes
git push origin main
```

### Commit Message Format
- `feat: add new feature`
- `fix: bug fix`
- `style: UI/styling changes`
- `refactor: code improvement`

---

## 🚨 Conflict Prevention Rules

1. **ONLY edit YOUR assigned files**
2. **Always `git pull` before starting work**
3. **Always `git pull` before pushing**
4. **Communicate on WhatsApp/Discord before editing shared files**
5. **Small, frequent commits are better than large commits**

---

## 📱 Prompt for Your Friend

Copy and send this to your friend:

---

**Hey! Here's the project setup:**

1. I'll add you as collaborator on GitHub
2. Clone the repo: `git clone <URL>`
3. Install: `npm install`
4. Run: `npm run dev`

**Your assigned components (see TEAM_ASSIGNMENT.md):**
- MultiBankPanel.tsx (Bank cards)
- IntelligencePanel.tsx (IP/Device analysis)
- AgentWorkflow.tsx (AI pipeline)
- mockData.ts (data)
- webhooks.ts (API)

**My components:**
- HeroSection.tsx
- TransactionFlow.tsx  
- RiskScore.tsx

**Rules:**
- Only edit YOUR files
- Always `git pull` before work
- Always `git pull` before push

Let's coordinate on shared files (App.tsx, Navbar, Footer) before editing!

---

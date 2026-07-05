# 🚀 DevLaunch AI — Premium Full-Stack AI Software Architect & Virtual CTO

**DevLaunch AI** is an elite, portfolio-grade full-stack AI software planning compiler and virtual CTO. It leverages advanced Google Gemini API reasoning to transform startup and application ideas into highly structured, launch-ready engineering blueprints.

This version is designed with a **production-ready serverless architecture**, ensuring 100% compatibility with **Vercel Serverless Functions** and **Supabase (Auth & PostgreSQL)**.

---

## ✨ Features

### 1. 📝 Comprehensive Product Requirements Document (PRD)
* **Executive Summary & Vision**: Instantly captures high-level objectives, business metrics, and core value propositions.
* **Target Personas**: Highly descriptive profiles mapping user roles, goals, realistic quotes, and primary pain points.
* **Market Differential Matrix**: Structured competitor analyses highlighting your strategic advantage.

### 2. 🗄️ Production-Ready Technical Design & Database Architecture
* **PostgreSQL Schema (DDL)**: Fully normalized, production-ready SQL DDL statements detailing primary/foreign keys, indexes, and triggers.
* **Database Design Specs**: Comprehensive structural overview of relational requirements and tables.
* **API Route Blueprints**: Clear REST endpoint routes complete with JSON request bodies and `200 OK` responses.
* **System Folder Topology**: Clean ASCII-style visual repository layout mappings.

### 3. 📅 Agile Project Execution & Sprints
* **Gantt Milestones**: Realistic multi-phase timelines detailing target durations and critical deliverables.
* **Monthly Operational Costs**: Breakdown of expected cloud resource (compute, db, storage, DNS) monthly fees.
* **Risk Mitigation Sagas**: Analytical tables evaluating system threats and tactical neutralization playbooks.
* **Agile Sprint Backlog**: Actionable multi-week sprint milestones complete with user stories and acceptance criteria.

### 4. 🔒 Enterprise Security & Administration Controls
* **Operations Command Dashboard**: Admin panel allowing you to monitor system-wide statistics, customize Gemini active models, tweak prompt parameter presets, and configure user credit limits.
* **Security Audits**: Pre-launch checklists covering encryption, session handling, and environment secret injections.

---

## 🛠️ Tech Stack & Architecture

DevLaunch AI utilizes a robust, modern serverless architecture built for rapid cloud scalability:

* **Frontend**: [React 19](https://react.dev/) + [Vite](https://vite.dev/) styled with a custom high-contrast dark dashboard aesthetic using [Tailwind CSS](https://tailwindcss.com/) and [Lucide React](https://lucide.dev/) icons.
* **Database & Auth**: [Supabase](https://supabase.com/) client-side SDK integration protected with secure **Row-Level Security (RLS)**.
* **Serverless Backend**: Hosted entirely within **Vercel Serverless Functions** (under `/api/*`), keeping sensitive operations proxy-protected.
* **AI Core**: `@google/genai` (Official modern Google Gemini TypeScript SDK) running server-side to hide API keys from the browser.
* **Dual Runtime Modes**:
  * **Cloud Mode**: Dynamically connects to your Supabase PostgreSQL database and Supabase Auth when credentials are provided.
  * **Offline Mock Mode**: Automatically falls back to a clean client-side engine (utilizing `localStorage`) when running without secrets, enabling instant zero-config testing.

---

## 🚀 Local Installation & Setup

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (v18 or higher) installed.

### 1. Extract & Open
Extract the project files and open the project directory in your terminal or **VSCode**:
```bash
cd devlaunch-ai
```

### 2. Install Dependencies
Install the required packages:
```bash
npm install
```

### 3. Configure Local Environment Secrets
Create a `.env` file in the root directory and specify your secrets. If you want to run in **Offline Mock Mode**, you only need `GEMINI_API_KEY`:

```env
# Required for AI generation (obtain for free from https://aistudio.google.com/)
GEMINI_API_KEY="YOUR_GEMINI_API_KEY"

# Optional: Provide these to connect to your live Supabase cloud database
VITE_SUPABASE_URL="YOUR_SUPABASE_PROJECT_URL"
VITE_SUPABASE_ANON_KEY="YOUR_SUPABASE_ANON_KEY"
SUPABASE_SERVICE_ROLE_KEY="YOUR_SUPABASE_SERVICE_ROLE_KEY"
```

### 4. Migrate your Supabase Database
If using live Cloud Mode, navigate to your **Supabase Dashboard**:
1. Go to the **SQL Editor** tab.
2. Create a new query.
3. Open the file `supabase-schema.sql` located in this project root.
4. Copy its contents, paste them into the SQL Editor, and click **Run**.
*(This creates all tables, unique constraints, indices, automatic auth user triggers, and seeds the global settings).*

### 5. Start the Local Server
Launch the development environment:
```bash
npm run dev
```
Open **`http://localhost:3000`** in your browser. The local development environment proxies serverless endpoints dynamically!

---

## ☁️ Vercel Serverless Deployment

Deploying DevLaunch AI to **Vercel** with fully functional serverless routes is incredibly simple:

### Step 1: Install Vercel CLI (Optional)
If you wish to deploy from the command line:
```bash
npm install -g vercel
vercel login
```

### Step 2: Set up Environment Variables in Vercel
Whether deploying via Vercel CLI or linking your GitHub repo:
1. Navigate to your project on the **Vercel Dashboard** -> **Settings** -> **Environment Variables**.
2. Add the following keys:
   * `GEMINI_API_KEY` (Required for AI generation)
   * `VITE_SUPABASE_URL` (Required for live Supabase)
   * `VITE_SUPABASE_ANON_KEY` (Required for live Supabase)
   * `SUPABASE_SERVICE_ROLE_KEY` (Required for secure cloud writes)
   * `JWT_SECRET` (Secure long random string for auth session safety)

### Step 3: Deploy
Run the deploy command:
```bash
vercel --prod
```
Vercel will build your static SPA, compile the `/api/generate.ts` serverless handler, configure URL rewrite overrides under `vercel.json` (routing any non-api requests back to the index page so browser refreshes work flawlessly), and yield your live URL!

---

## 📦 How to Push to GitHub from VSCode

### Step 1: Initialize Git Local Repository
```bash
git init
```

### Step 2: Stage & Commit Your Files
```bash
git add .
git commit -m "feat: complete portfolio-grade serverless DevLaunch AI system"
```

### Step 3: Create a Repository on GitHub
1. Navigate to [GitHub](https://github.com/) and create a new repository named `devlaunch-ai`.
2. Leave all initialization files (README, .gitignore, License) **UNCHECKED**.
3. Copy the instructions to push an existing repository.

### Step 4: Link & Push
```bash
git branch -M main
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/devlaunch-ai.git
git push -u origin main
```

---

## 📄 License
This project is proprietary and for startup deployment prototyping. Feel free to customize prompts and schemas to fit your specific deployment architecture.

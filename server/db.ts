import fs from "fs";
import path from "path";
import postgres from "postgres";

const DATABASE_URL = process.env.DATABASE_URL;

let sql: postgres.Sql | null = null;
if (DATABASE_URL) {
  try {
    sql = postgres(DATABASE_URL, {
      ssl: "require",
      max: 10,
      idle_timeout: 20,
      connect_timeout: 30,
    });
    console.log("[Database] Connected to PostgreSQL successfully via DATABASE_URL");
  } catch (err) {
    console.error("[Database] Failed to initialize PostgreSQL client:", err);
  }
} else {
  console.log("[Database] DATABASE_URL not set. Falling back to local devlaunch_db.json");
}

const DB_FILE = path.join(process.cwd(), "devlaunch_db.json");

const DEFAULT_SETTINGS = {
  aiModelName: "gemini-3.5-flash",
  systemPromptPreset: "You are DevLaunch AI, a world-class Elite Startup Architect, CTO, and Product Strategist. Generate highly detailed, professional, and launch-ready software plans.",
  freeTierLimit: 3,
  proTierLimit: 50,
};

const SEED_PROJECTS = [
  {
    id: "seed-bitespeed",
    name: "BiteSpeed Pakistan",
    industry: "Logistics & Food Delivery",
    country: "Pakistan",
    targetAudience: "Urban middle-income consumers and local restaurant partners",
    budget: "$25,000 MVP",
    timeline: "3 Months",
    description: "A hyper-localized food and grocery delivery platform for Pakistan focusing on low-tier mobile devices, low-bandwidth optimization, and local digital wallet integrations.",
    goals: "Achieve 500 daily deliveries in Lahore within 60 days of launch; establish relationships with 150 local eateries.",
    createdAt: "2026-07-03T10:00:00Z",
    isSaved: true,
    generatedContent: {
      prd: {
        executiveSummary: "BiteSpeed is a hyper-localized delivery solution tailored for Pakistani urban centers. By optimizing for low-end Android smartphones and integrating local payment ecosystems, BiteSpeed bridges the gap between digital delivery services and the mass market.",
        projectOverview: "The platform features a lightweight client-side React app, a high-performance Express/Node API, and localized dispatch algorithms that coordinate motorcycle riders in dense urban areas.",
        targetUsers: "Urban consumers aged 18-45 who require convenient food solutions, and small-scale street food vendors who lack digital distribution channels.",
        userPersonas: [
          {
            name: "Zainab Ahmed",
            role: "Busy Corporate Professional",
            goals: "Wants premium clean food delivered in under 35 minutes to her office in Gulberg, Lahore.",
            painPoints: "High delivery charges on global apps, lack of reliable cash-on-delivery tracking, riders getting lost in complex street layouts.",
            quote: "I just need my lunch delivered on time without having to call the rider five times to give directions."
          },
          {
            name: "Muhammad Tariq",
            role: "Local Restaurant Owner (Dhaba operator)",
            goals: "Increase daily sales by listing popular Pakistani BBQ on a delivery platform.",
            painPoints: "High commission rates (up to 30%) on legacy apps, complicated onboarding, delayed weekly payouts.",
            quote: "If someone can handle deliveries with low commissions and daily cash payouts, my kitchen will run day and night."
          }
        ],
        marketAnalysis: "Pakistan's food delivery sector is ripe for hyper-local disruption. While global players dominate upscale areas, they fail in secondary markets due to high commission models, lack of support for local payment gateways like Easypaisa/JazzCash, and lack of offline SMS fallback dispatching.",
        competitorIdeas: [
          {
            name: "Foodpanda",
            strengths: "Huge market share, massive rider fleet, deep financial backing.",
            weaknesses: "High commissions (25-30%), poor localized customer support, generic global UI.",
            ourAdvantage: "Localized payment, 15% flat commission, dedicated chat-support with Lahore-punjabi/urdu dialects, rider routing adapted to localized landmark naming."
          }
        ]
      },
      features: {
        coreFeatures: [
          { title: "Dual Local Wallet Checkout", description: "Direct payment APIs for Easypaisa, JazzCash, and cash-on-delivery.", priority: "High" },
          { title: "Landmark-Based Rider Routing", description: "Enables customers to pin landmark-based directions to bypass weak GPS coordinates.", priority: "High" },
          { title: "Rider Cash Collection Ledger", description: "Automated calculation of cash-on-delivery balances for immediate rider settlement.", priority: "High" }
        ],
        mvpFeatures: [
          { title: "SMS-Fallback Dispatch", description: "Dispatches orders to riders via structured SMS if cellular internet is unstable.", priority: "High" },
          { title: "Lightweight Web-App UI", description: "Optimized React UI loadable in under 1.5 seconds on 3G connections.", priority: "High" }
        ],
        futureFeatures: [
          { title: "Group Meal Ordering", description: "Split bill food ordering for offices and corporate campuses.", priority: "Medium" },
          { title: "AI-Powered Smart Prep Alerts", description: "Predicts preparation times based on kitchen load history.", priority: "Low" }
        ]
      },
      technicalDesign: {
        databaseDesign: "Normalized PostgreSQL database utilizing separate tables for Users, Restaurants, MenuItems, Orders, Payments, RiderLogs, and landmark guides with B-Tree indexes on coordinates and fast composite primary keys.",
        sqlSchema: `CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  phone VARCHAR(20) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE restaurants (
  id SERIAL PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  city VARCHAR(50) NOT NULL,
  address TEXT NOT NULL,
  commission_rate NUMERIC(4,2) DEFAULT 15.00
);

CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  restaurant_id INT REFERENCES restaurants(id),
  status VARCHAR(30) DEFAULT 'Pending',
  total_amount NUMERIC(10,2) NOT NULL,
  payment_method VARCHAR(20) DEFAULT 'COD',
  landmark_notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_orders_user ON orders(user_id);
CREATE INDEX idx_orders_restaurant ON orders(restaurant_id);`,
        mermaidErDiagram: `erDiagram
    USERS ||--o{ ORDERS : places
    RESTAURANTS ||--o{ ORDERS : fulfills
    ORDERS ||--|| PAYMENTS : processes
    ORDERS ||--o{ ORDER_ITEMS : contains`,
        apiEndpoints: [
          { method: "POST", path: "/api/orders", description: "Create a new local order with payment configuration and landmarks.", requestBody: "{ restaurantId: number, items: Array, paymentMethod: 'Easypaisa' | 'COD', landmarkNotes: string }", response: "{ orderId: number, status: 'Created', expectedDeliveryTime: string }" },
          { method: "GET", path: "/api/restaurants", description: "List restaurants filtered by current city zone and user preferences.", response: "Array of restaurant objects with localized menu ratings" }
        ],
        folderStructure: `bitespeed-root/
├── src/
│   ├── components/       # Optimized layout systems
│   ├── services/         # JazzCash & Easypaisa integrations
│   ├── hooks/            # PWA service worker, cached orders
│   ├── server/           # Express backend router
│   └── database/         # Prisma schemas & indexes
└── README.md`,
        recommendedTechStack: [
          { category: "Frontend", technology: "React 19 + Tailwind CSS", reason: "Maximizes compilation performance, enables tiny JS bundles optimized for sub-3G cellular." },
          { category: "Backend", technology: "Node.js (Express)", reason: "Fast microservices event loop, highly customizable for real-time dispatch systems." },
          { category: "Database", technology: "PostgreSQL", reason: "Reliable spatial querying with PostGIS for rider proximity routing." }
        ],
        systemArchitecture: "Client-Server layered architecture with Redis caching for active menus, an Express dispatch microservice, PostgreSQL, and WebSockets for real-time rider tracking.",
        authFlow: "Lightweight verification code (OTP) via SMS, generating a JWT token stored securely in HttpOnly cookies with 30-day persistence."
      },
      uiux: {
        colorPalette: [
          { name: "Saffron Green", hex: "#15803d", usage: "Primary buttons, fresh status, brand trust." },
          { name: "Jasmine White", hex: "#fafaf9", usage: "Clean canvas background." },
          { name: "Charcoal Slate", hex: "#1c1917", usage: "High-contrast headings, readable text." }
        ],
        adminPanelFeatures: [
          "Real-time dispatch board showing online riders, cash limits, and orders.",
          "Dynamic menu adjustment with direct restaurant portal.",
          "Settlement report exports for restaurant partners."
        ],
        userDashboardFeatures: [
          "Landmark-based address manager.",
          "Live delivery map using leaflet and offline routing logs.",
          "One-click repeat of favorite Pakistani street food items."
        ],
        wireframeSuggestions: [
          { screenName: "Cart Checkout Screen", elements: ["List of items with quantity buttons", "Digital Wallet Quick buttons (JazzCash / Easypaisa / COD)", "Landmark Notes Input", "Estimated Arrival Clock"], layoutStyle: "Simple single-column optimized layout with large touch targets (48px+)." }
        ]
      },
      projectExecution: {
        timelineAndMilestones: [
          { phase: "Phase 1: Setup & API Integration", duration: "Weeks 1-4", deliverables: ["Easypaisa sandbox connection", "Core database schemas", "SMS verification dispatch flow"] },
          { phase: "Phase 2: Rider App & UI", duration: "Weeks 5-8", deliverables: ["Optimized PWA client", "Rider dispatch console", "Map layout testing"] }
        ],
        costEstimation: [
          { item: "SMS Gateway (Twilio/Local)", amount: "$50", frequency: "Monthly" },
          { item: "Cloud Host (Railway/Docker)", amount: "$15", frequency: "Monthly" },
          { item: "Postgres Storage", amount: "$10", frequency: "Monthly" }
        ],
        revenueModel: "Flat 12-15% commission on restaurant order volume, plus a minor fixed delivery surcharge of Rs. 40 paid entirely to riders.",
        monetizationIdeas: [
          { type: "Premium Placement", description: "Restaurants pay a fee to appear at the top of organic searches.", viability: "High" }
        ],
        riskAnalysis: [
          { risk: "Riders getting lost or cellular dropping", severity: "High", mitigation: "Implement landmark SMS dispatch, allowing riders to complete delivery without active GPS." }
        ],
        deploymentStrategy: "Deploy backend on Railway, host client on Vercel with Cloudflare CDN, run PostgreSQL on Neon.",
        testingStrategy: "System testing with automated load injection to simulate 500 concurrent users; physical GPS trials in Lahore streets.",
        securityChecklist: [
          { item: "OTP Rate Limiting", description: "Limit user login requests to 3 per minute.", category: "Auth" }
        ]
      },
      sprintsAndReadme: {
        sprintPlanning: [
          { sprintName: "Sprint 1: Local Integrations", duration: "2 Weeks", goals: ["Connect local wallets", "Setup core user models", "Build landing list screen"] }
        ],
        userStories: [
          { role: "Hungry Student", goal: "order Biryani using Easypaisa", benefit: "I don't need to look for physical cash change when the rider arrives", acceptanceCriteria: ["Payment successful confirmation displayed in app", "SMS order confirmation received"] }
        ],
        readme: `# BiteSpeed Pakistan

Lightweight and hyper-localized food delivery app optimized for mobile connectivity and local payments in Pakistan.

## Getting Started

1. Clone repository
2. Run \`npm install\`
3. Set \`DATABASE_URL\` and \`EASYPAISA_API_KEY\` in your environment.
4. Run \`npm run dev\``
      }
    }
  }
];

export interface User {
  email: string;
  name: string;
  company?: string;
  passwordHash: string;
  tier: "Free" | "Pro" | "Enterprise";
  usageCount: number;
  usageLimit: number;
  verified: boolean;
  createdAt: string;
}

export interface Project {
  id: string;
  userEmail?: string;
  name: string;
  industry: string;
  country: string;
  targetAudience: string;
  budget: string;
  timeline: string;
  description: string;
  goals: string;
  createdAt: string;
  generatedContent: any;
  isSaved: boolean;
}

export interface Settings {
  aiModelName: string;
  systemPromptPreset: string;
  freeTierLimit: number;
  proTierLimit: number;
}

// Ensure database tables or file is ready
let isInitialized = false;

export async function initializeDB() {
  if (isInitialized) return;

  if (sql) {
    try {
      console.log("[Database] Initializing database tables in PostgreSQL...");
      // 1. Create Users Table
      await sql`
        CREATE TABLE IF NOT EXISTS users (
          email VARCHAR(255) PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          company VARCHAR(255),
          password_hash VARCHAR(255) NOT NULL,
          tier VARCHAR(50) DEFAULT 'Free',
          usage_count INT DEFAULT 0,
          usage_limit INT DEFAULT 3,
          verified BOOLEAN DEFAULT false,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        )
      `;

      // 2. Create Projects Table
      await sql`
        CREATE TABLE IF NOT EXISTS projects (
          id VARCHAR(100) PRIMARY KEY,
          user_email VARCHAR(255) REFERENCES users(email) ON DELETE CASCADE,
          name VARCHAR(255) NOT NULL,
          industry VARCHAR(255) NOT NULL,
          country VARCHAR(255) NOT NULL,
          target_audience VARCHAR(255),
          budget VARCHAR(255),
          timeline VARCHAR(255),
          description TEXT NOT NULL,
          goals TEXT,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
          generated_content TEXT NOT NULL,
          is_saved BOOLEAN DEFAULT false
        )
      `;

      // 3. Create Settings Table
      await sql`
        CREATE TABLE IF NOT EXISTS settings (
          key VARCHAR(50) PRIMARY KEY,
          ai_model_name VARCHAR(100) DEFAULT 'gemini-3.5-flash',
          system_prompt_preset TEXT NOT NULL,
          free_tier_limit INT DEFAULT 3,
          pro_tier_limit INT DEFAULT 50
        )
      `;

      // Seed Default Settings if empty
      const existingSettings = await sql`SELECT * FROM settings WHERE key = 'global'`;
      if (existingSettings.length === 0) {
        await sql`
          INSERT INTO settings (key, ai_model_name, system_prompt_preset, free_tier_limit, pro_tier_limit)
          VALUES (
            'global',
            ${DEFAULT_SETTINGS.aiModelName},
            ${DEFAULT_SETTINGS.systemPromptPreset},
            ${DEFAULT_SETTINGS.freeTierLimit},
            ${DEFAULT_SETTINGS.proTierLimit}
          )
        `;
        console.log("[Database] Default settings table seeded.");
      }

      // Seed Seed Project if empty
      const existingSeed = await sql`SELECT * FROM projects WHERE id = 'seed-bitespeed'`;
      if (existingSeed.length === 0) {
        const seed = SEED_PROJECTS[0];
        await sql`
          INSERT INTO projects (id, user_email, name, industry, country, target_audience, budget, timeline, description, goals, created_at, generated_content, is_saved)
          VALUES (
            ${seed.id},
            NULL,
            ${seed.name},
            ${seed.industry},
            ${seed.country},
            ${seed.targetAudience},
            ${seed.budget},
            ${seed.timeline},
            ${seed.description},
            ${seed.goals},
            ${seed.createdAt},
            ${JSON.stringify(seed.generatedContent)},
            ${seed.isSaved}
          )
        `;
        console.log("[Database] Default Pakistan Bitespeed seed project seeded.");
      }

      isInitialized = true;
      console.log("[Database] PostgreSQL tables initialization completed successfully.");
    } catch (err) {
      console.error("[Database] Critical Error initializing PostgreSQL tables:", err);
    }
  } else {
    // Local file fallback
    try {
      if (!fs.existsSync(DB_FILE)) {
        const initialState = {
          users: [
            {
              email: "rayyanaz101@gmail.com",
              name: "Rayyan Az",
              passwordHash: "demo123",
              tier: "Enterprise" as const,
              usageCount: 1,
              usageLimit: 100,
              verified: true,
              createdAt: new Date().toISOString(),
            }
          ],
          projects: SEED_PROJECTS,
          settings: DEFAULT_SETTINGS,
        };
        fs.writeFileSync(DB_FILE, JSON.stringify(initialState, null, 2));
        console.log("[Database] Initial local JSON database seeded.");
      }
      isInitialized = true;
    } catch (err) {
      console.error("[Database] Failed local filesystem database init:", err);
    }
  }
}

// Read database helper for local file
function readLocalDB(): { users: User[]; projects: any[]; settings: Settings } {
  try {
    const data = fs.readFileSync(DB_FILE, "utf-8");
    const parsed = JSON.parse(data);
    return {
      users: parsed.users || [],
      projects: parsed.projects || [],
      settings: parsed.settings || DEFAULT_SETTINGS,
    };
  } catch (err) {
    return { users: [], projects: SEED_PROJECTS, settings: DEFAULT_SETTINGS };
  }
}

function writeLocalDB(state: any) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(state, null, 2));
  } catch (err) {
    console.error("[Database] Failed writing to local JSON DB:", err);
  }
}

// Core Database APIs

export async function getSettings(): Promise<Settings> {
  await initializeDB();
  if (sql) {
    const rows = await sql`SELECT * FROM settings WHERE key = 'global'`;
    if (rows.length > 0) {
      return {
        aiModelName: rows[0].ai_model_name,
        systemPromptPreset: rows[0].system_prompt_preset,
        freeTierLimit: rows[0].free_tier_limit,
        proTierLimit: rows[0].pro_tier_limit,
      };
    }
  }
  const local = readLocalDB();
  return local.settings;
}

export async function saveSettings(settings: Partial<Settings>): Promise<Settings> {
  await initializeDB();
  if (sql) {
    const current = await getSettings();
    const updated = { ...current, ...settings };
    await sql`
      UPDATE settings
      SET ai_model_name = ${updated.aiModelName},
          system_prompt_preset = ${updated.systemPromptPreset},
          free_tier_limit = ${updated.freeTierLimit},
          pro_tier_limit = ${updated.proTierLimit}
      WHERE key = 'global'
    `;
    return updated;
  }
  const local = readLocalDB();
  local.settings = { ...local.settings, ...settings };
  writeLocalDB(local);
  return local.settings;
}

export async function getUsers(): Promise<User[]> {
  await initializeDB();
  if (sql) {
    const rows = await sql`SELECT * FROM users ORDER BY created_at DESC`;
    return rows.map(r => ({
      email: r.email,
      name: r.name,
      company: r.company || undefined,
      passwordHash: r.password_hash,
      tier: r.tier as any,
      usageCount: r.usage_count,
      usageLimit: r.usage_limit,
      verified: r.verified,
      createdAt: r.created_at.toISOString ? r.created_at.toISOString() : r.created_at,
    }));
  }
  return readLocalDB().users;
}

export async function getUserByEmail(email: string): Promise<User | null> {
  await initializeDB();
  if (!email) return null;
  const emailLower = email.toLowerCase();
  if (sql) {
    const rows = await sql`SELECT * FROM users WHERE LOWER(email) = ${emailLower}`;
    if (rows.length > 0) {
      const r = rows[0];
      return {
        email: r.email,
        name: r.name,
        company: r.company || undefined,
        passwordHash: r.password_hash,
        tier: r.tier as any,
        usageCount: r.usage_count,
        usageLimit: r.usage_limit,
        verified: r.verified,
        createdAt: r.created_at.toISOString ? r.created_at.toISOString() : r.created_at,
      };
    }
    return null;
  }
  const local = readLocalDB();
  return local.users.find(u => u.email.toLowerCase() === emailLower) || null;
}

export async function createUser(user: Omit<User, "usageCount" | "usageLimit" | "verified" | "createdAt" | "tier">): Promise<User> {
  await initializeDB();
  const settings = await getSettings();
  const newUser: User = {
    ...user,
    email: user.email.toLowerCase(),
    tier: "Free",
    usageCount: 0,
    usageLimit: settings.freeTierLimit,
    verified: false,
    createdAt: new Date().toISOString(),
  };

  if (sql) {
    await sql`
      INSERT INTO users (email, name, company, password_hash, tier, usage_count, usage_limit, verified, created_at)
      VALUES (
        ${newUser.email},
        ${newUser.name},
        ${newUser.company || null},
        ${newUser.passwordHash},
        ${newUser.tier},
        ${newUser.usageCount},
        ${newUser.usageLimit},
        ${newUser.verified},
        ${newUser.createdAt}
      )
    `;
    return newUser;
  }

  const local = readLocalDB();
  local.users.push(newUser);
  writeLocalDB(local);
  return newUser;
}

export async function updateUser(email: string, fields: Partial<User>): Promise<User | null> {
  await initializeDB();
  const emailLower = email.toLowerCase();
  const current = await getUserByEmail(emailLower);
  if (!current) return null;

  const updated = { ...current, ...fields };

  if (sql) {
    await sql`
      UPDATE users
      SET name = ${updated.name},
          company = ${updated.company || null},
          password_hash = ${updated.passwordHash},
          tier = ${updated.tier},
          usage_count = ${updated.usageCount},
          usage_limit = ${updated.usageLimit},
          verified = ${updated.verified}
      WHERE LOWER(email) = ${emailLower}
    `;
    return updated;
  }

  const local = readLocalDB();
  local.users = local.users.map(u => u.email.toLowerCase() === emailLower ? updated : u);
  writeLocalDB(local);
  return updated;
}

export async function getProjects(userEmail?: string): Promise<Project[]> {
  await initializeDB();
  if (sql) {
    let rows;
    if (userEmail) {
      const emailLower = userEmail.toLowerCase();
      // Fetch user's own projects plus seed projects (user_email is null)
      rows = await sql`
        SELECT * FROM projects 
        WHERE LOWER(user_email) = ${emailLower} OR user_email IS NULL 
        ORDER BY created_at DESC
      `;
    } else {
      // Return public / seed projects only if not logged in
      rows = await sql`
        SELECT * FROM projects 
        WHERE user_email IS NULL 
        ORDER BY created_at DESC
      `;
    }

    return rows.map(r => ({
      id: r.id,
      userEmail: r.user_email || undefined,
      name: r.name,
      industry: r.industry,
      country: r.country,
      targetAudience: r.target_audience,
      budget: r.budget,
      timeline: r.timeline,
      description: r.description,
      goals: r.goals,
      createdAt: r.created_at.toISOString ? r.created_at.toISOString() : r.created_at,
      generatedContent: typeof r.generated_content === "string" ? JSON.parse(r.generated_content) : r.generated_content,
      isSaved: r.is_saved,
    }));
  }

  const local = readLocalDB();
  if (userEmail) {
    const emailLower = userEmail.toLowerCase();
    // In local JSON, match projects created by this user or are seed projects
    return local.projects.filter(p => !p.userEmail || p.userEmail.toLowerCase() === emailLower);
  }
  return local.projects;
}

export async function addProject(project: Omit<Project, "createdAt">): Promise<Project> {
  await initializeDB();
  const newProject: Project = {
    ...project,
    createdAt: new Date().toISOString(),
  };

  if (sql) {
    await sql`
      INSERT INTO projects (id, user_email, name, industry, country, target_audience, budget, timeline, description, goals, created_at, generated_content, is_saved)
      VALUES (
        ${newProject.id},
        ${newProject.userEmail || null},
        ${newProject.name},
        ${newProject.industry},
        ${newProject.country},
        ${newProject.targetAudience},
        ${newProject.budget},
        ${newProject.timeline},
        ${newProject.description},
        ${newProject.goals},
        ${newProject.createdAt},
        ${JSON.stringify(newProject.generatedContent)},
        ${newProject.isSaved}
      )
    `;
    return newProject;
  }

  const local = readLocalDB();
  local.projects.unshift(newProject);
  writeLocalDB(local);
  return newProject;
}

export async function toggleSaveProject(projectId: string, userEmail?: string): Promise<boolean | null> {
  await initializeDB();
  if (sql) {
    const rows = await sql`SELECT * FROM projects WHERE id = ${projectId}`;
    if (rows.length > 0) {
      const currentSaved = rows[0].is_saved;
      const updatedSaved = !currentSaved;
      await sql`UPDATE projects SET is_saved = ${updatedSaved} WHERE id = ${projectId}`;
      return updatedSaved;
    }
    return null;
  }

  const local = readLocalDB();
  const project = local.projects.find(p => p.id === projectId);
  if (project) {
    project.isSaved = !project.isSaved;
    writeLocalDB(local);
    return project.isSaved;
  }
  return null;
}

export async function deleteProject(projectId: string, userEmail?: string): Promise<boolean> {
  await initializeDB();
  if (sql) {
    const result = await sql`DELETE FROM projects WHERE id = ${projectId}`;
    return true; // Simple confirmation
  }

  const local = readLocalDB();
  const initialLength = local.projects.length;
  local.projects = local.projects.filter(p => p.id !== projectId);
  if (local.projects.length < initialLength) {
    writeLocalDB(local);
    return true;
  }
  return false;
}

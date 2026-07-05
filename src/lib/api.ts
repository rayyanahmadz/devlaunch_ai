import { supabase, isSupabaseConfigured } from "./supabaseClient";
import { Project, UserProfile, AppStats, AppSettings } from "../types";

// Static seed project for premium demo data
export const SEED_PROJECT = {
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
      readme: `# BiteSpeed Pakistan\n\nLightweight and hyper-localized food delivery app optimized for mobile connectivity and local payments in Pakistan.\n\n## Getting Started\n\n1. Clone repository\n2. Run \`npm install\`\n3. Set \`DATABASE_URL\` and \`EASYPAISA_API_KEY\` in your environment.\n4. Run \`npm run dev\``
    }
  }
} as any;

// Global local Storage helper for Mock Database Fallbacks
const getLocalData = (key: string, defaultValue: any) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : defaultValue;
};

const setLocalData = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};

// ========================================================
// UNIFIED ARCHITECTURE API
// ========================================================
export const API = {
  // Check if Supabase is active
  isCloudMode: () => isSupabaseConfigured(),

  // Authentication & Session Management
  login: async (email: string, passwordHash: string): Promise<{ token: string; user: UserProfile }> => {
    if (isSupabaseConfigured() && supabase) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password: passwordHash, // Using Supabase auth flow
      });
      if (error) throw error;
      if (!data.user) throw new Error("No user profile returned from server.");

      // Fetch profile data from profile public table
      const { data: profile, error: pError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", data.user.id)
        .single();

      if (pError || !profile) {
        // Fallback upsert
        const fallbackProfile: UserProfile = {
          email: data.user.email || email,
          name: data.user.user_metadata?.name || "Architect User",
          company: data.user.user_metadata?.company || "",
          tier: "Free",
          usageCount: 0,
          usageLimit: 3,
          verified: data.user.email_confirmed_at ? true : false,
        };
        await supabase.from("profiles").upsert({
          id: data.user.id,
          email: fallbackProfile.email,
          name: fallbackProfile.name,
          company: fallbackProfile.company,
          tier: fallbackProfile.tier,
          usage_count: 0,
          usage_limit: 3,
        });
        return { token: data.session?.access_token || "sb-session", user: fallbackProfile };
      }

      return {
        token: data.session?.access_token || "sb-session",
        user: {
          email: profile.email,
          name: profile.name,
          company: profile.company,
          tier: profile.tier as any,
          usageCount: profile.usage_count,
          usageLimit: profile.usage_limit,
          verified: profile.verified,
        },
      };
    } else {
      // Mock Fallback Offline Mode
      const users = getLocalData("devlaunch_users", [
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
      ]);

      const found = users.find(
        (u: any) => u.email.toLowerCase() === email.toLowerCase() && u.passwordHash === passwordHash
      );

      if (!found) {
        throw new Error("Invalid email or password");
      }

      const mockToken = `mock-jwt-token-${found.email}`;
      setLocalData("devlaunch_active_user", found);
      return { token: mockToken, user: found };
    }
  },

  register: async (email: string, name: string, passwordHash: string, company?: string): Promise<{ token: string; user: UserProfile }> => {
    if (isSupabaseConfigured() && supabase) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password: passwordHash,
        options: {
          data: {
            name,
            company: company || "",
          },
        },
      });
      if (error) throw error;
      if (!data.user) throw new Error("Verification link sent or sign-up failed.");

      const newUser: UserProfile = {
        email,
        name,
        company,
        tier: "Free",
        usageCount: 0,
        usageLimit: 3,
        verified: false,
      };

      return { token: data.session?.access_token || "sb-session", user: newUser };
    } else {
      // Mock Fallback Offline Mode
      const users = getLocalData("devlaunch_users", []);
      const exists = users.some((u: any) => u.email.toLowerCase() === email.toLowerCase());
      if (exists) {
        throw new Error("Email is already registered");
      }

      const newUser = {
        email: email.toLowerCase(),
        name,
        passwordHash,
        company,
        tier: "Free" as const,
        usageCount: 0,
        usageLimit: 3,
        verified: false,
        createdAt: new Date().toISOString(),
      };

      users.push(newUser);
      setLocalData("devlaunch_users", users);
      setLocalData("devlaunch_active_user", newUser);

      return { token: `mock-jwt-token-${newUser.email}`, user: newUser };
    }
  },

  getCurrentUser: async (authToken: string): Promise<UserProfile> => {
    if (isSupabaseConfigured() && supabase) {
      const { data: { user }, error } = await supabase.auth.getUser(authToken);
      if (error || !user) throw new Error("Invalid session token");

      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (!profile) throw new Error("Profile details not found in Cloud Database.");

      return {
        email: profile.email,
        name: profile.name,
        company: profile.company,
        tier: profile.tier as any,
        usageCount: profile.usage_count,
        usageLimit: profile.usage_limit,
        verified: profile.verified,
      };
    } else {
      const current = getLocalData("devlaunch_active_user", null);
      if (!current) throw new Error("No active local profile found");
      return current;
    }
  },

  logout: async () => {
    if (isSupabaseConfigured() && supabase) {
      await supabase.auth.signOut();
    } else {
      localStorage.removeItem("devlaunch_active_user");
    }
  },

  // Projects Access (Direct Database Queries with RLS fallback)
  getProjects: async (authToken?: string): Promise<Project[]> => {
    if (isSupabaseConfigured() && supabase) {
      // Direct query from client - safe due to Row Level Security!
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Supabase project query failed:", error);
        return [SEED_PROJECT]; // Fallback to Seed
      }

      const mapped = data.map((p: any) => ({
        id: p.id,
        name: p.name,
        industry: p.industry,
        country: p.country,
        targetAudience: p.target_audience,
        budget: p.budget,
        timeline: p.timeline,
        description: p.description,
        goals: p.goals,
        createdAt: p.created_at,
        generatedContent: p.generated_content,
        isSaved: p.is_saved,
      }));

      // Make sure seed is present
      if (!mapped.some((p) => p.id === "seed-bitespeed")) {
        mapped.unshift(SEED_PROJECT);
      }
      return mapped;
    } else {
      // Local fallbacks
      const localProjects = getLocalData("devlaunch_projects", [SEED_PROJECT]);
      if (!localProjects.some((p: any) => p.id === "seed-bitespeed")) {
        localProjects.unshift(SEED_PROJECT);
      }
      return localProjects;
    }
  },

  toggleSaveProject: async (projectId: string): Promise<boolean> => {
    if (isSupabaseConfigured() && supabase) {
      // Find current saved state
      const { data, error } = await supabase
        .from("projects")
        .select("is_saved")
        .eq("id", projectId)
        .single();

      if (error || !data) throw new Error("Project not found in Cloud Database.");
      const nextState = !data.is_saved;

      const { error: updateError } = await supabase
        .from("projects")
        .update({ is_saved: nextState })
        .eq("id", projectId);

      if (updateError) throw updateError;
      return nextState;
    } else {
      const projects = getLocalData("devlaunch_projects", [SEED_PROJECT]);
      const found = projects.find((p: any) => p.id === projectId);
      if (found) {
        found.isSaved = !found.isSaved;
        setLocalData("devlaunch_projects", projects);
        return found.isSaved;
      }
      return false;
    }
  },

  deleteProject: async (projectId: string): Promise<boolean> => {
    if (isSupabaseConfigured() && supabase) {
      const { error } = await supabase
        .from("projects")
        .delete()
        .eq("id", projectId);
      if (error) throw error;
      return true;
    } else {
      let projects = getLocalData("devlaunch_projects", [SEED_PROJECT]);
      projects = projects.filter((p: any) => p.id !== projectId);
      setLocalData("devlaunch_projects", projects);
      return true;
    }
  },

  updateProfile: async (name: string, company: string): Promise<void> => {
    if (isSupabaseConfigured() && supabase) {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No active user session");

      const { error } = await supabase
        .from("profiles")
        .update({ name, company })
        .eq("id", user.id);

      if (error) throw error;
    } else {
      const current = getLocalData("devlaunch_active_user", null);
      if (current) {
        current.name = name;
        current.company = company;
        setLocalData("devlaunch_active_user", current);

        // Synchronize in users list
        const users = getLocalData("devlaunch_users", []);
        const idx = users.findIndex((u: any) => u.email === current.email);
        if (idx !== -1) {
          users[idx].name = name;
          users[idx].company = company;
          setLocalData("devlaunch_users", users);
        }
      }
    }
  },

  upgradeTier: async (newTier: "Free" | "Pro" | "Enterprise", limit: number): Promise<void> => {
    if (isSupabaseConfigured() && supabase) {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No active user session");

      const { error } = await supabase
        .from("profiles")
        .update({ tier: newTier, usage_limit: limit })
        .eq("id", user.id);

      if (error) throw error;
    } else {
      const current = getLocalData("devlaunch_active_user", null);
      if (current) {
        current.tier = newTier;
        current.usageLimit = limit;
        setLocalData("devlaunch_active_user", current);

        // Synchronize in users list
        const users = getLocalData("devlaunch_users", []);
        const idx = users.findIndex((u: any) => u.email === current.email);
        if (idx !== -1) {
          users[idx].tier = newTier;
          users[idx].usageLimit = limit;
          setLocalData("devlaunch_users", users);
        }
      }
    }
  },

  // Admin Control Operations
  getAdminStats: async (authToken: string): Promise<AppStats> => {
    if (isSupabaseConfigured() && supabase) {
      // Count values dynamically
      const { count: projectCount } = await supabase.from("projects").select("*", { count: "exact", head: true });
      const { count: savedCount } = await supabase.from("projects").select("*", { count: "exact", head: true }).eq("is_saved", true);
      const { data: profiles } = await supabase.from("profiles").select("*");

      const usersCount = profiles?.length || 0;
      const freeCount = profiles?.filter((u) => u.tier === "Free").length || 0;
      const proCount = profiles?.filter((u) => u.tier === "Pro").length || 0;
      const entCount = profiles?.filter((u) => u.tier === "Enterprise").length || 0;

      return {
        totalProjectsGenerated: projectCount || 0,
        totalSavedProjects: savedCount || 0,
        avgGenerationTimeMs: 4200,
        popularIndustries: [
          { name: "Retail Tech", count: 12 },
          { name: "Logistics", count: 8 },
          { name: "SaaS Utilities", count: 6 },
        ],
        popularCountries: [
          { name: "Pakistan", count: 15 },
          { name: "Malaysia", count: 10 },
          { name: "United States", count: 4 },
        ],
        userCount: usersCount,
        tierDistribution: [
          { tier: "Free", count: freeCount },
          { tier: "Pro", count: proCount },
          { tier: "Enterprise", count: entCount },
        ],
      };
    } else {
      const projects = getLocalData("devlaunch_projects", [SEED_PROJECT]);
      const users = getLocalData("devlaunch_users", []);
      return {
        totalProjectsGenerated: projects.length,
        totalSavedProjects: projects.filter((p: any) => p.isSaved).length,
        avgGenerationTimeMs: 4200,
        popularIndustries: [
          { name: "Retail Tech & Local Logistics", count: 1 },
        ],
        popularCountries: [
          { name: "Pakistan", count: 1 },
        ],
        userCount: users.length,
        tierDistribution: [
          { tier: "Free", count: users.filter((u: any) => u.tier === "Free").length },
          { tier: "Pro", count: users.filter((u: any) => u.tier === "Pro").length },
          { tier: "Enterprise", count: users.filter((u: any) => u.tier === "Enterprise").length },
        ],
      };
    }
  },

  getAdminSettings: async (authToken: string): Promise<AppSettings> => {
    if (isSupabaseConfigured() && supabase) {
      const { data, error } = await supabase
        .from("settings")
        .select("*")
        .eq("key", "global")
        .single();

      if (error || !data) {
        return {
          aiModelName: "gemini-3.5-flash",
          systemPromptPreset: "You are DevLaunch AI, a world-class Elite Startup Architect...",
          freeTierLimit: 3,
          proTierLimit: 50,
        };
      }

      return {
        aiModelName: data.ai_model_name,
        systemPromptPreset: data.system_prompt_preset,
        freeTierLimit: data.free_tier_limit,
        proTierLimit: data.pro_tier_limit,
      };
    } else {
      return getLocalData("devlaunch_settings", {
        aiModelName: "gemini-3.5-flash",
        systemPromptPreset: "You are DevLaunch AI, a world-class Elite Startup Architect, CTO, and Product Strategist. Generate highly detailed, professional, and launch-ready software plans.",
        freeTierLimit: 3,
        proTierLimit: 50,
      });
    }
  },

  saveAdminSettings: async (authToken: string, settings: AppSettings): Promise<void> => {
    if (isSupabaseConfigured() && supabase) {
      const { error } = await supabase.from("settings").upsert({
        key: "global",
        ai_model_name: settings.aiModelName,
        system_prompt_preset: settings.systemPromptPreset,
        free_tier_limit: settings.freeTierLimit,
        pro_tier_limit: settings.proTierLimit,
      });
      if (error) throw error;
    } else {
      setLocalData("devlaunch_settings", settings);
    }
  },

  getAdminUsers: async (authToken: string): Promise<any[]> => {
    if (isSupabaseConfigured() && supabase) {
      const { data, error } = await supabase.from("profiles").select("*");
      if (error) throw error;
      return data.map((p) => ({
        email: p.email,
        name: p.name,
        company: p.company,
        tier: p.tier,
        usageCount: p.usage_count,
        usageLimit: p.usage_limit,
        verified: p.verified,
        createdAt: p.created_at,
      }));
    } else {
      return getLocalData("devlaunch_users", [
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
      ]);
    }
  },

  adminUpdateUser: async (authToken: string, email: string, tier: string, usageLimit: number): Promise<void> => {
    if (isSupabaseConfigured() && supabase) {
      const { error } = await supabase
        .from("profiles")
        .update({ tier, usage_limit: usageLimit })
        .eq("email", email);
      if (error) throw error;
    } else {
      const users = getLocalData("devlaunch_users", []);
      const idx = users.findIndex((u: any) => u.email.toLowerCase() === email.toLowerCase());
      if (idx !== -1) {
        users[idx].tier = tier;
        users[idx].usageLimit = usageLimit;
        setLocalData("devlaunch_users", users);

        // Synchronize active user if current email is active
        const active = getLocalData("devlaunch_active_user", null);
        if (active && active.email.toLowerCase() === email.toLowerCase()) {
          active.tier = tier;
          active.usageLimit = usageLimit;
          setLocalData("devlaunch_active_user", active);
        }
      }
    }
  },

  // Sensitive AI Generation calls
  generateProject: async (params: any, authToken: string): Promise<Project> => {
    // This calls the secure serverless backend `/api/generate` function to keep GEMINI_API_KEY secure!
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${authToken}`,
      },
      body: JSON.stringify(params),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Cloud generation pipeline failed.");
    }

    // In local mode, save to localStorage
    if (!isSupabaseConfigured()) {
      const projects = getLocalData("devlaunch_projects", [SEED_PROJECT]);
      projects.unshift(data);
      setLocalData("devlaunch_projects", projects);

      // Increment local user credits
      const current = getLocalData("devlaunch_active_user", null);
      if (current) {
        current.usageCount += 1;
        setLocalData("devlaunch_active_user", current);

        const users = getLocalData("devlaunch_users", []);
        const idx = users.findIndex((u: any) => u.email === current.email);
        if (idx !== -1) {
          users[idx].usageCount += 1;
          setLocalData("devlaunch_users", users);
        }
      }
    } else if (supabase) {
      // In cloud mode, the serverless endpoint directly inserts into Supabase using a service role or user JWT,
      // but to be safe, if we need to insert it, we can insert it here. But the backend `/api/generate.ts`
      // handles direct database insertions inside the Vercel context. This ensures a clean separation!
    }

    return data;
  },
};

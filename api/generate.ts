import { createClient } from "@supabase/supabase-js";
import { GoogleGenAI } from "@google/genai";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "devlaunch-ai-jwt-super-secret-default-key-2026";

// Instantiate Supabase Admin Client using Service Key or Anon Key for server-side operations
const supabaseUrl = process.env.VITE_SUPABASE_URL || "";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY || "";

const supabaseAdmin = supabaseUrl && supabaseServiceKey 
  ? createClient(supabaseUrl, supabaseServiceKey)
  : null;

// Initialize Gemini Client
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not configured in environment variables / system Secrets.");
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

export default async function handler(req: any, res: any) {
  // Allow options method for CORS preflight
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized: Missing authentication token" });
  }

  const token = authHeader.split(" ")[1];
  let userEmail = "";
  let userId = "";
  let currentUsage = 0;
  let usageLimit = 3;
  let isCloudUser = false;

  try {
    if (supabaseAdmin && token && !token.startsWith("mock-jwt-token-")) {
      // Live Supabase Authenticated User Session
      const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(token);
      if (authError || !user) {
        return res.status(401).json({ message: "Unauthorized: Invalid cloud session token" });
      }

      userId = user.id;
      userEmail = user.email || "";
      isCloudUser = true;

      // Query Profile details to get credits and tier
      const { data: profile } = await supabaseAdmin
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (profile) {
        currentUsage = profile.usage_count || 0;
        usageLimit = profile.usage_limit || 3;
      }
    } else {
      // Mock Fallback Offline authentication
      try {
        const decoded = jwt.verify(token, JWT_SECRET) as { email: string };
        userEmail = decoded.email;
      } catch (err) {
        // Fallback email parsing if token is a direct text like "mock-jwt-token-test@example.com"
        if (token.includes("mock-jwt-token-")) {
          userEmail = token.replace("mock-jwt-token-", "");
        } else {
          return res.status(401).json({ message: "Unauthorized: Invalid mock token" });
        }
      }
      currentUsage = 0; // Handled client-side in offline fallback
      usageLimit = 100;
    }

    // Verify Credits
    if (isCloudUser && currentUsage >= usageLimit) {
      return res.status(403).json({
        message: `Subscription Credit Limit Exceeded. You have used ${currentUsage}/${usageLimit} compiles. Upgrade your subscription tier.`,
      });
    }

    const { name, industry, country, targetAudience, budget, timeline, description, goals } = req.body;
    if (!name || !industry || !description) {
      return res.status(400).json({ message: "Missing required parameters: Name, Industry, and Description." });
    }

    // 1. Fetch System Config (from settings table if live, else fallback)
    let aiModel = "gemini-3.5-flash";
    let systemInstruction = "You are DevLaunch AI, a world-class Elite Startup Architect, CTO, and Product Strategist. Generate highly detailed, professional, and launch-ready software plans.";

    if (isCloudUser && supabaseAdmin) {
      const { data: settings } = await supabaseAdmin
        .from("settings")
        .select("*")
        .eq("key", "global")
        .single();
      if (settings) {
        aiModel = settings.ai_model_name || aiModel;
        systemInstruction = settings.system_prompt_preset || systemInstruction;
      }
    }

    // 2. Format Prompt for Gemini
    const prompt = `
Generate a complete, elite-tier SaaS software planning package based on these parameters:
- Project Name: "${name}"
- Industry: "${industry}"
- Country / Geo-target: "${country || "Global"}"
- Target Audience: "${targetAudience || "General Users"}"
- Budget / Funding Level: "${budget || "Bootstrapped / MVP"}"
- Target Timeline: "${timeline || "Not specified"}"
- Core Description: "${description}"
- Main Goals: "${goals || "Not specified"}"

You must return a raw JSON object matching the exact structure below. Do not wrap it in any Markdown code blocks or any explanation text. It must be valid JSON ready for JSON.parse().

JSON Structure to populate:
{
  "prd": {
    "executiveSummary": "A stunning, high-level summary selling the vision and business rationale.",
    "projectOverview": "Detailed description of the app, problem solved, and key unique value propositions.",
    "targetUsers": "Summary statement describing the user demographics and needs.",
    "userPersonas": [
      {
        "name": "Jane Doe",
        "role": "Role Title",
        "goals": "Core objective they want to achieve with the app.",
        "painPoints": "Primary obstacles they face today.",
        "quote": "A catchy, realistic direct quote that sums up their vibe."
      }
    ],
    "marketAnalysis": "Detailed assessment of the target market size, geography, trends, and entry points.",
    "competitorIdeas": [
      {
        "name": "Competitor X",
        "strengths": "What they do well.",
        "weaknesses": "Where they fall flat.",
        "ourAdvantage": "How our app exploits their weakness."
      }
    ]
  },
  "features": {
    "coreFeatures": [
      { "title": "Feature Title", "description": "Highly descriptive functional mechanism.", "priority": "High" }
    ],
    "mvpFeatures": [
      { "title": "Feature Title", "description": "Core value feature required for day 1 launch.", "priority": "High" }
    ],
    "futureFeatures": [
      { "title": "Feature Title", "description": "Post-launch, scaled-up scaling mechanism.", "priority": "Medium" }
    ]
  },
  "technicalDesign": {
    "databaseDesign": "Textual overview of the database topology, primary storage technology, and relational requirements.",
    "sqlSchema": "A series of valid DDL SQL statements (CREATE TABLE, ALTER TABLE, CREATE INDEX, etc.) suitable for Postgres that sets up the database schema for the core features.",
    "mermaidErDiagram": "A valid Mermaid.js Entity-Relationship diagram representing the data relations. Format must be: erDiagram\\n  USER ||--o{ ORDER : places... (use standard mermaid formatting).",
    "apiEndpoints": [
      {
        "method": "POST",
        "path": "/api/v1/resource",
        "description": "Clear explanation of what the route does, required headers, and permission levels.",
        "requestBody": "JSON string showing an example request body.",
        "response": "JSON string showing an example successful response."
      }
    ],
    "folderStructure": "An elegant, production-ready ASCII folder tree displaying folders, files, utilities, layouts, routes, controllers, and middlewares.",
    "recommendedTechStack": [
      { "category": "Frontend", "technology": "Tech Name", "reason": "Specific commercial rationale for selection." }
    ],
    "systemArchitecture": "Detailed description of the server, load balancing, caching layer, worker nodes, and CDN strategy.",
    "authFlow": "Comprehensive technical description of the user authentication, security keys, JWT signing, password hashing, and token rotation."
  },
  "uiux": {
    "colorPalette": [
      { "name": "Deep Indigo", "hex": "#4f46e5", "usage": "Interactive buttons, main accents, active tabs." }
    ],
    "adminPanelFeatures": [
      "Feature 1 - descriptive string.",
      "Feature 2 - descriptive string."
    ],
    "userDashboardFeatures": [
      "Dashboard element 1 - description.",
      "Dashboard element 2 - description."
    ],
    "wireframeSuggestions": [
      {
        "screenName": "Primary Dashboard",
        "elements": ["Header banner", "Quick action bento grids", "Activity lists", "Sidebar options"],
        "layoutStyle": "Detailed spacing, visual balance, and CSS flex/grid layout guidelines."
      }
    ]
  },
  "projectExecution": {
    "timelineAndMilestones": [
      { "phase": "Phase 1: Planning", "duration": "Week 1-2", "deliverables": ["List of deliverable outcomes", "Deliverable 2"] }
    ],
    "costEstimation": [
      { "item": "Cloud compute nodes", "amount": "$45", "frequency": "Monthly" }
    ],
    "revenueModel": "Description of pricing tiers, enterprise licenses, or transaction-based models.",
    "monetizationIdeas": [
      { "type": "SaaS Subscription", "description": "Details about subscription packages.", "viability": "High" }
    ],
    "riskAnalysis": [
      { "risk": "Description of technical or market risk.", "severity": "High", "mitigation": "How we neutralize this risk." }
    ],
    "deploymentStrategy": "Detailed CI/CD pipeline steps, environment splitting (dev/staging/prod), and container orchestration.",
    "testingStrategy": "Unit testing framework choice, coverage requirements, integration testing suites, and manual QA pass procedures.",
    "securityChecklist": [
      { "item": "Secure Headers", "description": "Configure Helmet or other express headers.", "category": "Network" }
    ]
  },
  "sprintsAndReadme": {
    "sprintPlanning": [
      { "sprintName": "Sprint 1: Bootstrap", "duration": "2 Weeks", "goals": ["Goal 1", "Goal 2"] }
    ],
    "userStories": [
      {
        "role": "As an Authenticated User",
        "goal": "I want to do X",
        "benefit": "So that I achieve Y",
        "acceptanceCriteria": ["Criteria 1", "Criteria 2"]
      }
    ],
    "readme": "# Markdown format README content... include elegant titles, installation instructions, environment files, local startup commands, and API instructions."
  }
}
`;

    // 3. Request Gemini compilation
   let result;

for (let attempt = 1; attempt <= 3; attempt++) {
  try {
    result = await gemini.models.generateContent({
      model: aiModel,
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
      },
    });

    break;
  } catch (err: any) {
    console.error(`Gemini attempt ${attempt} failed`, err);

    if (err.status === 503 && attempt < 3) {
      await new Promise(resolve => setTimeout(resolve, attempt * 2000));
      continue;
    }

    throw err;
  }
}

    const parsedContent = JSON.parse((result.text || "{}").trim());

    const projectId = `proj-${Date.now()}`;
    const compiledProject = {
      id: projectId,
      name,
      industry,
      country: country || "Global",
      targetAudience: targetAudience || "General Users",
      budget: budget || "Not specified",
      timeline: timeline || "Not specified",
      description,
      goals: goals || "Not specified",
      createdAt: new Date().toISOString(),
      generatedContent: parsedContent,
      isSaved: false,
    };

    // 4. Save to Cloud database if active
    if (isCloudUser && supabaseAdmin) {
      const { error: dbError } = await supabaseAdmin.from("projects").insert({
        id: projectId,
        user_id: userId,
        name,
        industry,
        country: country || "Global",
        target_audience: targetAudience || "General Users",
        budget: budget || "Not specified",
        timeline: timeline || "Not specified",
        description,
        goals: goals || "Not specified",
        created_at: compiledProject.createdAt,
        generated_content: parsedContent,
        is_saved: false,
      });

      if (dbError) {
        console.error("Failed to insert compiled project in Supabase:", dbError);
      }

      // Update Credits consumed
      const { error: updateError } = await supabaseAdmin
        .from("profiles")
        .update({ usage_count: currentUsage + 1 })
        .eq("id", userId);

      if (updateError) {
        console.error("Failed to increment user credit counters:", updateError);
      }
    }

    return res.status(200).json(compiledProject);
  } catch (err: any) {
  console.error("CTO compiler pipeline failed:", err);

  if (err.status === 503) {
    return res.status(503).json({
      message: "The AI service is currently busy. Please try again in a few moments.",
    });
  }

  return res.status(500).json({
    message: err.message || "An unexpected server error occurred.",
  });
}
}

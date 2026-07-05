export interface UserPersona {
  name: string;
  role: string;
  goals: string;
  painPoints: string;
  quote: string;
}

export interface CompetitorIdea {
  name: string;
  strengths: string;
  weaknesses: string;
  ourAdvantage: string;
}

export interface CoreFeature {
  title: string;
  description: string;
  priority: 'High' | 'Medium' | 'Low';
}

export interface ApiEndpoint {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  path: string;
  description: string;
  requestBody?: string;
  response?: string;
}

export interface TechStackItem {
  category: string;
  technology: string;
  reason: string;
}

export interface ColorPaletteItem {
  name: string;
  hex: string;
  usage: string;
}

export interface WireframeSuggestion {
  screenName: string;
  elements: string[];
  layoutStyle: string;
}

export interface Milestone {
  phase: string;
  duration: string;
  deliverables: string[];
}

export interface CostEstimationItem {
  item: string;
  amount: string;
  frequency: string;
}

export interface MonetizationIdea {
  type: string;
  description: string;
  viability: 'High' | 'Medium' | 'Low';
}

export interface RiskItem {
  risk: string;
  severity: 'High' | 'Medium' | 'Low';
  mitigation: string;
}

export interface SecurityChecklistItem {
  item: string;
  description: string;
  category: string;
}

export interface Sprint {
  sprintName: string;
  duration: string;
  goals: string[];
}

export interface UserStory {
  role: string;
  goal: string;
  benefit: string;
  acceptanceCriteria: string[];
}

export interface ProjectContent {
  prd: {
    executiveSummary: string;
    projectOverview: string;
    targetUsers: string;
    userPersonas: UserPersona[];
    marketAnalysis: string;
    competitorIdeas: CompetitorIdea[];
  };
  features: {
    coreFeatures: CoreFeature[];
    mvpFeatures: CoreFeature[];
    futureFeatures: CoreFeature[];
  };
  technicalDesign: {
    databaseDesign: string;
    sqlSchema: string;
    mermaidErDiagram: string;
    apiEndpoints: ApiEndpoint[];
    folderStructure: string;
    recommendedTechStack: TechStackItem[];
    systemArchitecture: string;
    authFlow: string;
  };
  uiux: {
    colorPalette: ColorPaletteItem[];
    adminPanelFeatures: string[];
    userDashboardFeatures: string[];
    wireframeSuggestions: WireframeSuggestion[];
  };
  projectExecution: {
    timelineAndMilestones: Milestone[];
    costEstimation: CostEstimationItem[];
    revenueModel: string;
    monetizationIdeas: MonetizationIdea[];
    riskAnalysis: RiskItem[];
    deploymentStrategy: string;
    testingStrategy: string;
    securityChecklist: SecurityChecklistItem[];
  };
  sprintsAndReadme: {
    sprintPlanning: Sprint[];
    userStories: UserStory[];
    readme: string;
  };
}

export interface Project {
  id: string;
  name: string;
  industry: string;
  country: string;
  targetAudience: string;
  budget: string;
  timeline: string;
  description: string;
  goals: string;
  createdAt: string;
  generatedContent: ProjectContent;
  isSaved?: boolean;
}

export interface UserProfile {
  email: string;
  name: string;
  company?: string;
  tier: 'Free' | 'Pro' | 'Enterprise';
  usageCount: number;
  usageLimit: number;
  verified?: boolean;
}

export interface AppStats {
  totalProjectsGenerated: number;
  totalSavedProjects: number;
  avgGenerationTimeMs: number;
  popularIndustries: { name: string; count: number }[];
  popularCountries: { name: string; count: number }[];
  userCount: number;
  tierDistribution: { tier: string; count: number }[];
}

export interface AppSettings {
  aiModelName: string;
  systemPromptPreset: string;
  freeTierLimit: number;
  proTierLimit: number;
}

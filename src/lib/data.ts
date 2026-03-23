export type InvestigationStatus = "Completed" | "In Progress" | "Roadmap";

export interface Investigation {
  id: string;
  year: string;
  status: InvestigationStatus;
  title: string;
  type: string;
  focus: string;
  environment: string;
  short: string;
  long: string;
  objectives: string[];
  workflow: string[];
  findings: string[];
  nextStep: string;
  analystValue: string;
  tech: string[];
  repo: string | null;
  live: string | null;
  tags: string[];
}

export interface ToolkitCategory {
  category: string;
  icon: string;
  description: string;
  items: string[];
}

export interface Principle {
  title: string;
  description: string;
}

export interface Highlight {
  value: string;
  label: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface EducationItem {
  label: string;
  title: string;
  summary: string;
  details: string[];
}

export interface RoadmapItem {
  title: string;
  status: InvestigationStatus;
  timeline: string;
  summary: string;
  items: string[];
}

export const personalInfo = {
  name: "Dikshita Konwar",
  title: "Cybersecurity Student Analyst",
  headline: "Dikshita Konwar",
  subheadline:
    "Cybersecurity student building toward SOC and blue-team analyst roles through hands-on security projects, structured learning, and clear technical communication.",
  intro:
    "I am developing analyst-ready habits through defensive tooling, vulnerability-focused project work, and a growing home-lab roadmap centered on investigation, documentation, and continuous improvement.",
  bio: [
    "I am a cybersecurity-focused student who enjoys understanding how systems behave, where security weaknesses appear, and how defenders can respond with clarity and discipline. Blue-team work stands out to me because it blends observation, technical reasoning, and practical communication.",
    "My goal is to grow into an entry-level SOC or security analyst role where I can contribute to monitoring, triage, investigation support, and reporting. I am especially interested in building a strong foundation in security operations, network behavior, and repeatable analyst workflows.",
  ],
  location: "India",
  email: "",
  resumeUrl: "/resume.pdf",
  avatarUrl: "/images/avatar-placeholder.svg",
  availability:
    "Open to internships, student programs, and entry-level cybersecurity analyst opportunities.",
  status:
    "Open to SOC internships, blue-team learning opportunities, and analyst-focused collaborations.",
  highlights: [
    { value: "Blue Team", label: "Career direction" },
    { value: "Hands-On", label: "Projects and labs" },
    { value: "Student", label: "Growing foundation" },
  ] satisfies Highlight[],
  focusAreas: [
    "SOC fundamentals, investigation flow, and analyst-style triage habits.",
    "Security projects that strengthen vulnerability analysis, scripting, and defensive reasoning.",
    "Clear documentation that turns technical observations into concise, recruiter-friendly evidence.",
  ],
  principles: [
    {
      title: "Investigate methodically",
      description:
        "I value structured workflows, careful observation, and understanding what a signal means before jumping to conclusions.",
    },
    {
      title: "Document clearly",
      description:
        "Security work is more useful when findings, context, and next steps are explained in a way that others can act on quickly.",
    },
    {
      title: "Keep building foundations",
      description:
        "I focus on steady skill growth through projects, labs, and repeatable practice instead of relying on vague claims.",
    },
  ] satisfies Principle[],
};

export const investigations: Investigation[] = [
  {
    id: "passvault",
    year: "2025",
    status: "Completed",
    title: "PassVault",
    type: "Security Utility",
    focus: "Credential hygiene and privacy-first browser tooling",
    environment: "Zero-backend static web application running entirely in the browser",
    short:
      "A privacy-first password generator designed to work without server-side storage or external dependencies.",
    long: "PassVault is a security utility built around the idea that simple tools can still reflect strong defensive thinking. By keeping password generation entirely client-side, the project focuses on privacy, low deployment complexity, and reducing unnecessary data exposure while maintaining a straightforward experience for the user.",
    objectives: [
      "Generate strong passwords without sending data to a backend service.",
      "Keep the tool simple to deploy on static hosting and easy to use.",
      "Reinforce safer credential practices through a low-friction interface.",
    ],
    workflow: [
      "Designed the application as a browser-only utility so password creation stays local to the user.",
      "Built interface controls around strength, length, and copy actions to keep the experience clear and predictable.",
      "Positioned the project as a lightweight defensive tool that prioritizes privacy and transparency.",
    ],
    findings: [
      "Client-side security utilities can reduce unnecessary data movement and simplify trust boundaries.",
      "Even small security tools benefit from clear explanations so users understand the safety model.",
      "Defensive-minded projects become stronger when usability and security are treated together.",
    ],
    nextStep:
      "Expand the project with password policy presets, strength guidance, and more user education around credential hygiene.",
    analystValue:
      "Shows how I think about privacy, attack-surface reduction, and communicating secure behavior through simple tooling.",
    tech: ["HTML", "CSS", "JavaScript", "Static Hosting"],
    repo: "https://github.com/itsdikshitaa/PassVault",
    live: "https://vault.dikshitaa.tech/",
    tags: ["completed", "security utility", "web"],
  },
  {
    id: "blueborne-scanner",
    year: "2025",
    status: "Completed",
    title: "Blueborne Scanner",
    type: "Vulnerability Assessment Tool",
    focus: "Bluetooth exposure discovery and wireless security analysis",
    environment: "Python-based scanner for Bluetooth device discovery and response analysis",
    short:
      "A Python project for discovering Bluetooth devices and exploring risk patterns related to BlueBorne-style exposure.",
    long: "Blueborne Scanner is a hands-on security project built to explore wireless attack surface and device discovery in a defensive context. The work focuses on automation, Python-based analysis, and turning raw technical output into something that supports vulnerability understanding rather than exaggerated claims.",
    objectives: [
      "Discover nearby Bluetooth devices and surface indicators relevant to BlueBorne-style risk analysis.",
      "Practice Python scripting within a vulnerability-focused security project.",
      "Strengthen defensive assessment thinking around wireless technologies and exposure review.",
    ],
    workflow: [
      "Automated Bluetooth discovery and protocol-aware checks in Python.",
      "Structured the project around repeatable analysis steps instead of one-off observations.",
      "Used the scanner output to reason about exposure and follow-up review rather than claiming exploit validation.",
    ],
    findings: [
      "Wireless attack surface can be overlooked when device behavior and discoverability are not reviewed carefully.",
      "Security tooling is most helpful when technical output is translated into analyst-friendly context.",
      "The project reinforced how scripting can support structured vulnerability analysis and documentation.",
    ],
    nextStep:
      "Improve reporting, add safer test guidance, and structure remediation notes for future assessment iterations.",
    analystValue:
      "Demonstrates hands-on vulnerability analysis, protocol curiosity, and the habit of converting technical behavior into defensive insight.",
    tech: ["Python", "Bluetooth", "Networking", "Security Research"],
    repo: "https://github.com/itsdikshitaa/Blueborne-scanner-master",
    live: null,
    tags: ["completed", "wireless security", "python"],
  },
  {
    id: "soc-lab-roadmap",
    year: "2026",
    status: "Roadmap",
    title: "SOC Learning Lab Roadmap",
    type: "Home Lab Roadmap",
    focus: "SOC workflows, log analysis, and defensive investigation practice",
    environment: "Planned local and virtual lab setup for blue-team exercises and analyst repetition",
    short:
      "An intentionally labeled in-progress roadmap for building stronger SOC habits through repeatable home-lab exercises.",
    long: "This roadmap represents the next stage of my cybersecurity growth: building consistent analyst workflows through hands-on lab practice. The emphasis is on learning how to review signals, document observations, and turn technical activity into structured notes without presenting unfinished work as completed experience.",
    objectives: [
      "Build a lightweight home-lab setup for security telemetry and defensive practice.",
      "Practice reading alerts, reviewing logs, and writing concise investigation notes.",
      "Create a foundation for future finished lab write-ups that can become full case studies.",
    ],
    workflow: [
      "Plan lab scenarios around defensive analysis rather than flashy offensive demonstrations.",
      "Track each exercise with scope, observations, and what I would validate next as an analyst.",
      "Use the roadmap as a transparent learning artifact so progress stays honest and measurable.",
    ],
    findings: [
      "The current priority is consistency in workflow and documentation, not collecting unsupported claims.",
      "Roadmap labeling helps keep the portfolio honest while still showing direction and intent.",
      "Strong future case studies will depend on repeatable lab practice and clear reporting structure.",
    ],
    nextStep:
      "Complete foundational log-analysis and triage labs, then promote the strongest finished exercises into documented investigations.",
    analystValue:
      "Represents the direction of my training: analyst workflow discipline, defensive curiosity, and steady skill building.",
    tech: ["SOC Fundamentals", "Log Analysis", "Home Lab", "Documentation"],
    repo: null,
    live: null,
    tags: ["roadmap", "blue team", "in progress"],
  },
];

export const toolkit: ToolkitCategory[] = [
  {
    category: "SOC Foundations",
    icon: "shield",
    description:
      "Core analyst habits focused on triage, defensive thinking, and understanding how findings should be communicated.",
    items: [
      "Alert triage mindset",
      "Security fundamentals",
      "Risk-aware reasoning",
      "Investigation notes",
    ],
  },
  {
    category: "Networking & Protocol Analysis",
    icon: "network",
    description:
      "Developing a stronger understanding of how systems and wireless communication expose security signals.",
    items: [
      "TCP/IP basics",
      "Bluetooth behavior",
      "Exposure review",
      "Protocol curiosity",
    ],
  },
  {
    category: "Scripting & Automation",
    icon: "code",
    description:
      "Using code to automate checks, prototype utilities, and support hands-on security exploration.",
    items: ["Python", "JavaScript", "Security scripts", "Tool prototyping"],
  },
  {
    category: "Security Tooling & Labs",
    icon: "radar",
    description:
      "Applying projects and lab work to strengthen defensive observation and repeatable workflows.",
    items: [
      "Vulnerability scanning",
      "Browser-based utilities",
      "Home-lab planning",
      "Git and GitHub",
    ],
  },
  {
    category: "Reporting & Communication",
    icon: "report",
    description:
      "Turning technical details into concise explanations that recruiters and technical reviewers can both understand.",
    items: [
      "Technical writing",
      "Project documentation",
      "Clear summaries",
      "Next-step framing",
    ],
  },
];

export const education: EducationItem[] = [
  {
    label: "Student Context",
    title: "Cybersecurity-focused student journey",
    summary:
      "I am building toward analyst work through self-driven projects, guided practice, and consistent skills development.",
    details: [
      "Using project work as proof of curiosity, discipline, and technical follow-through.",
      "Strengthening foundations in defensive reasoning, networking concepts, and security communication.",
    ],
  },
  {
    label: "Current Study Areas",
    title: "Learning themes for SOC readiness",
    summary:
      "My current study time is centered on defensive workflows and the fundamentals that support junior analyst growth.",
    details: [
      "Log review, signal interpretation, and investigation structure.",
      "Vulnerability analysis, scripting, and translating findings into actionable notes.",
    ],
  },
  {
    label: "Lab Themes",
    title: "How I am turning study into practice",
    summary:
      "I am pairing theory with small, repeatable exercises so the work becomes more analyst-ready over time.",
    details: [
      "Hands-on security utilities and Python-based security tooling.",
      "Roadmap-driven lab planning that can evolve into finished write-ups.",
    ],
  },
];

export const learningRoadmap: RoadmapItem[] = [
  {
    title: "SOC Lab Foundations",
    status: "In Progress",
    timeline: "Current focus",
    summary:
      "Building repeatable practice around logs, alerts, and documenting what to validate next.",
    items: [
      "Lightweight blue-team lab scenarios",
      "Alert review and triage habits",
      "Short investigation note templates",
    ],
  },
  {
    title: "Defensive Documentation Workflow",
    status: "In Progress",
    timeline: "Developing now",
    summary:
      "Improving how I turn raw technical output into concise, readable analyst summaries.",
    items: [
      "Observation-to-summary structure",
      "Finding and next-step formatting",
      "Cleaner project evidence presentation",
    ],
  },
  {
    title: "Certification Preparation Path",
    status: "Roadmap",
    timeline: "Planned next",
    summary:
      "Foundational certification preparation will follow after more lab consistency and deeper review of core concepts.",
    items: [
      "Security fundamentals revision",
      "Networking and system security review",
      "Exam-oriented study planning",
    ],
  },
];

export const socialLinks: SocialLink[] = [];

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Profile", href: "#profile" },
  { label: "Investigations", href: "#investigations" },
  { label: "Toolkit", href: "#toolkit" },
  { label: "Learning", href: "#learning" },
  { label: "Resume", href: "#resume" },
  { label: "Contact", href: "#contact" },
];

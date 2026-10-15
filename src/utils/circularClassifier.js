/**
 * Utility to classify circulars and generate dynamic event poster assets,
 * AI event action plans, and examination timetables.
 */

export function isEventCircular(circular) {
  if (!circular) return false;

  const category = (circular.category || "").toLowerCase().trim();
  if (
    category === "events" ||
    category === "event" ||
    category === "cultural" ||
    category === "sports" ||
    category === "workshop"
  ) {
    return true;
  }

  const text = `${circular.title || ""} ${circular.description || ""}`.toLowerCase();
  const eventKeywords = [
    "festival",
    "fest",
    "utsav",
    "navratri",
    "diwali",
    "holi",
    "eid",
    "christmas",
    "garba",
    "dandiya",
    "hackathon",
    "workshop",
    "webinar",
    "seminar",
    "competition",
    "contest",
    "sports",
    "tournament",
    "carnival",
    "exhibition",
    "celebration",
    "annual day",
    "freshers",
    "farewell",
    "cultural",
    "concert",
    "bootcamp",
    "dance",
    "music fest",
    "techfest",
    "summit",
  ];

  return eventKeywords.some((kw) => new RegExp(`\\b${kw}\\b`, "i").test(text));
}

export function isExamCircular(circular) {
  if (!circular) return false;
  const category = (circular.category || "").toLowerCase().trim();
  if (category === "examination" || category === "exam") return true;

  const text = `${circular.title || ""} ${circular.description || ""}`.toLowerCase();
  const examKeywords = [
    "exam",
    "examination",
    "mid-term",
    "midterm",
    "timetable",
    "time-table",
    "date sheet",
    "datesheet",
    "internal test",
    "semester exam",
    "admit card",
    "hall ticket",
  ];

  return examKeywords.some((kw) => new RegExp(`\\b${kw}\\b`, "i").test(text));
}

// Curated ultra-high resolution real photographic event poster artwork & themes
const CURATED_EVENT_ARTWORK = {
  diwali: {
    heroImage: "https://images.unsplash.com/photo-1605647540924-852290f6b0d5?auto=format&fit=crop&w=1400&q=85",
    badge: "DIWALI UTSAV CELEBRATION",
    tagline: "Festival of Lights, Diyas & Campus Deepotsav",
    accent: "#f59e0b",
    secondary: "#ea580c",
    gradient: "linear-gradient(135deg, rgba(69, 26, 3, 0.7) 0%, rgba(120, 53, 15, 0.5) 50%, rgba(217, 119, 6, 0.6) 100%)",
  },
  navratri: {
    heroImage: "https://images.unsplash.com/photo-1601659728441-2c0eb4e5e4fe?auto=format&fit=crop&w=1400&q=85",
    badge: "NAVRATRI MAHOTSAV",
    tagline: "Dandiya Raas & Traditional Garba Night",
    accent: "#fbbf24",
    secondary: "#e11d48",
    gradient: "linear-gradient(135deg, rgba(88, 10, 28, 0.7) 0%, rgba(153, 27, 27, 0.5) 50%, rgba(217, 119, 6, 0.6) 100%)",
  },
  holi: {
    heroImage: "https://images.unsplash.com/photo-1582738411706-bfc8e691d1c2?auto=format&fit=crop&w=1400&q=85",
    badge: "HOLI UTSAV CELEBRATION",
    tagline: "Colors of Joy & Spring Campus Fest",
    accent: "#f43f5e",
    secondary: "#8b5cf6",
    gradient: "linear-gradient(135deg, rgba(131, 24, 67, 0.7) 0%, rgba(190, 24, 93, 0.5) 50%, rgba(124, 58, 237, 0.6) 100%)",
  },
  hackathon: {
    heroImage: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1400&q=85",
    badge: "36-HR TECH HACKATHON",
    tagline: "Code • Build • Deploy • Innovate",
    accent: "#38bdf8",
    secondary: "#6366f1",
    gradient: "linear-gradient(135deg, rgba(9, 13, 22, 0.75) 0%, rgba(30, 27, 75, 0.55) 50%, rgba(2, 132, 199, 0.6) 100%)",
  },
  workshop: {
    heroImage: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1400&q=85",
    badge: "INTERACTIVE WORKSHOP & LAB",
    tagline: "Skill Development & Hands-on Training",
    accent: "#60a5fa",
    secondary: "#7c3aed",
    gradient: "linear-gradient(135deg, rgba(30, 16, 53, 0.7) 0%, rgba(76, 29, 149, 0.5) 50%, rgba(37, 99, 235, 0.6) 100%)",
  },
  sports: {
    heroImage: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1400&q=85",
    badge: "ANNUAL SPORTS CHAMPIONSHIP",
    tagline: "Inter-Department Athletic Tournament",
    accent: "#34d399",
    secondary: "#059669",
    gradient: "linear-gradient(135deg, rgba(2, 44, 34, 0.7) 0%, rgba(6, 95, 70, 0.5) 50%, rgba(217, 119, 6, 0.6) 100%)",
  },
  concert: {
    heroImage: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1400&q=85",
    badge: "LIVE CONCERT & DJ NIGHT",
    tagline: "Music Carnival & Stage Extravaganza",
    accent: "#c084fc",
    secondary: "#ec4899",
    gradient: "linear-gradient(135deg, rgba(59, 7, 100, 0.7) 0%, rgba(112, 26, 117, 0.5) 50%, rgba(219, 39, 119, 0.6) 100%)",
  },
  cultural: {
    heroImage: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1400&q=85",
    badge: "COLLEGE CULTURAL GALA",
    tagline: "Celebrity Night, Dance & Theater Fest",
    accent: "#fb7185",
    secondary: "#db2777",
    gradient: "linear-gradient(135deg, rgba(88, 28, 135, 0.7) 0%, rgba(157, 23, 77, 0.5) 50%, rgba(225, 29, 72, 0.6) 100%)",
  },
  freshers: {
    heroImage: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1400&q=85",
    badge: "FRESHERS WELCOME CELEBRATION",
    tagline: "Welcome to Campus Life & Induction Fiesta",
    accent: "#fbbf24",
    secondary: "#f43f5e",
    gradient: "linear-gradient(135deg, rgba(67, 20, 7, 0.7) 0%, rgba(159, 18, 57, 0.5) 50%, rgba(245, 158, 11, 0.6) 100%)",
  },
  christmas: {
    heroImage: "https://images.unsplash.com/photo-1512474932049-78ac69eed10c?auto=format&fit=crop&w=1400&q=85",
    badge: "CHRISTMAS & NEW YEAR GALA",
    tagline: "Winter Festival of Joy & Carols",
    accent: "#ef4444",
    secondary: "#16a34a",
    gradient: "linear-gradient(135deg, rgba(127, 29, 29, 0.7) 0%, rgba(20, 83, 45, 0.5) 50%, rgba(220, 38, 38, 0.6) 100%)",
  },
  eid: {
    heroImage: "https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=1400&q=85",
    badge: "EID MILAN CELEBRATION",
    tagline: "Peace, Brotherhood & Festive Harmony",
    accent: "#2dd4bf",
    secondary: "#d97706",
    gradient: "linear-gradient(135deg, rgba(19, 78, 74, 0.7) 0%, rgba(15, 118, 110, 0.5) 50%, rgba(217, 119, 6, 0.6) 100%)",
  },
  carnival: {
    heroImage: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1400&q=85",
    badge: "ANNUAL CAMPUS CARNIVAL",
    tagline: "Food Stalls, Games & Campus Mela",
    accent: "#f59e0b",
    secondary: "#ea580c",
    gradient: "linear-gradient(135deg, rgba(124, 45, 18, 0.7) 0%, rgba(194, 65, 12, 0.5) 50%, rgba(234, 88, 12, 0.6) 100%)",
  },
  default: {
    heroImage: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1400&q=85",
    badge: "OFFICIAL CAMPUS CELEBRATION",
    tagline: "College Cultural & Community Fest",
    accent: "#fbbf24",
    secondary: "#6366f1",
    gradient: "linear-gradient(135deg, rgba(30, 27, 75, 0.7) 0%, rgba(49, 46, 129, 0.5) 50%, rgba(180, 83, 9, 0.6) 100%)",
  },
};

export function getEventPosterArtwork(circular) {
  const text = `${circular.title || ""} ${circular.description || ""}`.toLowerCase();

  let categoryKey = "default";
  if (text.includes("diwali") || text.includes("deepavali") || text.includes("diya") || text.includes("light")) {
    categoryKey = "diwali";
  } else if (text.includes("navratri") || text.includes("garba") || text.includes("dandiya")) {
    categoryKey = "navratri";
  } else if (text.includes("holi") || text.includes("dhuleti") || text.includes("rang")) {
    categoryKey = "holi";
  } else if (text.includes("hackathon") || text.includes("code") || text.includes("coding") || text.includes("programming") || text.includes("techfest")) {
    categoryKey = "hackathon";
  } else if (text.includes("workshop") || text.includes("webinar") || text.includes("seminar") || text.includes("bootcamp") || text.includes("training")) {
    categoryKey = "workshop";
  } else if (text.includes("sport") || text.includes("cricket") || text.includes("football") || text.includes("tournament") || text.includes("badminton") || text.includes("athletics")) {
    categoryKey = "sports";
  } else if (text.includes("music") || text.includes("concert") || text.includes("dj") || text.includes("band") || text.includes("singing")) {
    categoryKey = "concert";
  } else if (text.includes("freshers") || text.includes("welcome party") || text.includes("induction")) {
    categoryKey = "freshers";
  } else if (text.includes("christmas") || text.includes("xmas") || text.includes("new year")) {
    categoryKey = "christmas";
  } else if (text.includes("eid") || text.includes("ramadan")) {
    categoryKey = "eid";
  } else if (text.includes("carnival") || text.includes("mela") || text.includes("food fest") || text.includes("bazaar")) {
    categoryKey = "carnival";
  } else if (text.includes("cultural") || text.includes("fest") || text.includes("dance") || text.includes("drama") || text.includes("annual day") || text.includes("farewell")) {
    categoryKey = "cultural";
  }

  const baseConfig = CURATED_EVENT_ARTWORK[categoryKey] || CURATED_EVENT_ARTWORK.default;

  return {
    ...baseConfig,
    categoryKey,
    heroImage: baseConfig.heroImage,
    fallbackUrl: baseConfig.heroImage,
  };
}

/**
 * Realistic Student Action & Entry Guidelines:
 * Generates clean, professional, stylish attendee instructions.
 */
export function generateAiEventAction(circular) {
  const text = `${circular.title || ""} ${circular.description || ""}`.toLowerCase();
  const existingAction = circular.actionRequired ? String(circular.actionRequired).trim() : "";

  let guidelines = [];

  if (text.includes("diwali") || text.includes("deepavali") || text.includes("diya")) {
    guidelines = [
      "🪔 Traditional festive ethnic wear is recommended for all students, staff, and guests.",
      "🎨 Pre-register your team at the Student Activity Desk for the Rangoli & Diya showcase before 4:00 PM.",
      "🆔 Valid College Student ID card is mandatory for campus entry and celebration coupons.",
    ];
  } else if (text.includes("navratri") || text.includes("garba") || text.includes("dandiya")) {
    guidelines = [
      "💃 Traditional attire (Chaniya Choli / Kurta Pyjama) is mandatory inside the Garba pavilion.",
      "🥢 Bring your personal Dandiya sticks or claim complimentary sticks at the gate counter.",
      "🎫 Claim your official security entry wristband from the Student Council desk before 5:00 PM.",
    ];
  } else if (text.includes("hackathon") || text.includes("code") || text.includes("coding")) {
    guidelines = [
      "💻 Confirm your 2–4 member team registration and ensure development machines have required SDKs pre-installed.",
      "🚀 Submit repository URLs on the portal before opening keynote; stay present for evaluation sprint checkpoints.",
      "🆔 College Student Photo ID and team registration receipt are compulsory at the security check.",
    ];
  } else if (text.includes("workshop") || text.includes("seminar") || text.includes("webinar") || text.includes("training")) {
    guidelines = [
      "💻 Bring a fully charged laptop and notebook for the hands-on practical lab modules.",
      "📜 Verified digital Certificate of Participation will be issued upon checkout to active attendees.",
      "⏰ Occupy your designated lab seat 15 minutes before the scheduled keynote session.",
    ];
  } else if (text.includes("sports") || text.includes("tournament") || text.includes("cricket") || text.includes("football")) {
    guidelines = [
      "🏅 Report in official college sports kit to the central pavilion 30 minutes before kickoff.",
      "📋 Submit squad roster and student ID verification at the referee control desk.",
      "👟 Clean sports footwear is mandatory for entry onto the synthetic sports turf.",
    ];
  } else if (text.includes("concert") || text.includes("music") || text.includes("dj")) {
    guidelines = [
      "🎟️ Collect reserved student concert passes from your Class Representative before 4:00 PM.",
      "🆔 Physical College Student ID card must be presented at the auditorium turnstiles.",
      "⭐ Bags and outside food items are strictly prohibited inside the main concert arena.",
    ];
  } else if (text.includes("cultural") || text.includes("dance") || text.includes("annual day") || text.includes("fest")) {
    guidelines = [
      "🎭 Submit your performance stage requirements and audio tracks to the Cultural Desk in advance.",
      "🎟️ Collect reserved student auditorium passes from your Class Representative before 3:00 PM.",
      "⭐ Adhere to college decorum and ensure valid identity badges are displayed at all times.",
    ];
  } else {
    guidelines = [
      "📌 Pre-register your participation at the Department Student Desk before the closing deadline.",
      "🆔 Carry your physical College Student ID card for campus gate entry and attendance credit.",
      "🤝 Adhere to official campus guidelines and coordinate with student volunteers for a smooth experience.",
    ];
  }

  if (existingAction && !existingAction.toLowerCase().includes("action for:")) {
    return [
      `👉 Primary Requirement: ${existingAction}`,
      ...guidelines.slice(0, 2),
    ];
  }

  return guidelines;
}

/**
 * Extract Real Examination Notice Data from Admin Inputs:
 * Uses the exact dates entered in Description or Deadline by Admin,
 * without any hardcoded/fake courses or subjects.
 */
export function getExamNoticeData(circular) {
  if (!circular) return {};

  const desc = (circular.description || "").trim();
  const issueDate = circular.date || circular.issuedDate || "14 Oct 2026";

  // Date regex matching expressions like:
  // "20 Oct 2026", "20 October 2026", "20th October", "20/10/2026", "20-10-2026", "2026-10-20"
  const dateRegex = /\b(\d{1,2}(?:st|nd|rd|th)?\s+(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)(?:\s+\d{2,4})?|\d{1,2}[/-]\d{1,2}[/-]\d{2,4}|\d{4}-\d{2}-\d{2})\b/gi;

  const foundDates = [];
  const matches = desc.match(dateRegex) || [];
  matches.forEach((m) => {
    if (!foundDates.includes(m)) foundDates.push(m);
  });

  // Primary Exam Date to display prominently:
  // 1. Admin's explicit deadline field (if set)
  // 2. Or the first date mentioned in the description
  // 3. Or circular date
  let rawDate = null;
  if (circular.deadline && circular.deadline !== "—" && circular.deadline !== "Not set") {
    rawDate = circular.deadline;
  } else if (foundDates.length > 0) {
    rawDate = foundDates[0];
  } else {
    rawDate = circular.date || "Refer to notification details";
  }

  let examDate = rawDate;
  if (/^\d{4}-\d{2}-\d{2}$/.test(rawDate)) {
    const dt = new Date(rawDate);
    if (!isNaN(dt.getTime())) {
      examDate = dt.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    }
  }

  // Split description into clean lines for clean schedule display
  let lines = desc.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);

  // If admin typed multiple dates on a single line, split into readable bullet items
  if (lines.length === 1 && foundDates.length > 1) {
    const parts = [];
    let lastIdx = 0;
    const multiRegex = new RegExp(dateRegex.source, "gi");
    let match;
    while ((match = multiRegex.exec(desc)) !== null) {
      if (match.index > 0 && parts.length === 0) {
        parts.push(desc.substring(0, match.index).trim());
      } else if (parts.length > 0) {
        parts[parts.length - 1] = desc.substring(lastIdx, match.index).trim();
      }
      lastIdx = match.index;
      parts.push(desc.substring(lastIdx).trim());
    }
    const cleanParts = parts.filter(Boolean);
    if (cleanParts.length > 1) {
      lines = cleanParts;
    }
  }

  const circNumber =
    circular.circularNumber ||
    `C2A/EXAM/${String(circular.id || circular._id || "501").slice(-3).padStart(3, "0")}`;

  return {
    title: circular.title || "Examination Schedule & Notice",
    description: desc,
    lines,
    examDate,
    foundDates,
    audience: circular.audience || circular.targetAudience || "All Students",
    actionRequired: circular.actionRequired || "",
    priority: circular.priority || "High",
    issueDate,
    circularNumber: circNumber,
  };
}

export function generateExamTimetable(circular) {
  return getExamNoticeData(circular);
}

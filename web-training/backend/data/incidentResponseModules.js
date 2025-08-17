// Incident Response Training Modules
// 6 modules total: 2 per difficulty level (beginner, intermediate, advanced)

const incidentResponseModules = [
  // BEGINNER LEVEL - 2 modules
  {
    title: "Incident Response Fundamentals",
    description: "Introduction to incident response concepts, incident lifecycle, and basic response procedures.",
    category: "incident-response",
    difficulty: "beginner",
    duration: 130,
    overview: {
      objectives: [
        "Understand incident response fundamentals",
        "Learn incident classification and prioritization",
        "Master basic response procedures",
        "Develop incident documentation skills"
      ],
      prerequisites: [
        "Basic cybersecurity knowledge",
        "Understanding of common security threats"
      ],
      outcomes: [
        "Can identify and classify security incidents",
        "Understands incident response lifecycle",
        "Can execute basic response procedures"
      ]
    },
    tags: ["incident-fundamentals", "incident-lifecycle", "response-procedures", "documentation", "classification"],
    isPublished: true
  },
  {
    title: "Digital Forensics Basics",
    description: "Introduction to digital forensics, evidence handling, basic forensic tools, and investigation procedures.",
    category: "incident-response", 
    difficulty: "beginner",
    duration: 145,
    overview: {
      objectives: [
        "Master digital forensics fundamentals",
        "Learn evidence handling and chain of custody",
        "Use basic forensic tools and techniques",
        "Conduct preliminary investigations"
      ]
    },
    tags: ["digital-forensics", "evidence-handling", "forensic-tools", "investigation", "chain-of-custody"],
    isPublished: true
  },
  
  // INTERMEDIATE LEVEL - 2 modules
  {
    title: "Advanced Threat Hunting",
    description: "Proactive threat hunting methodologies, advanced detection techniques, and threat intelligence integration.",
    category: "incident-response",
    difficulty: "intermediate", 
    duration: 170,
    overview: {
      objectives: [
        "Implement proactive threat hunting programs",
        "Master advanced detection techniques", 
        "Integrate threat intelligence effectively",
        "Develop hunting hypotheses and campaigns"
      ]
    },
    tags: ["threat-hunting", "proactive-detection", "threat-intelligence", "hunting-methodologies", "siem"],
    isPublished: true
  },
  {
    title: "Malware Analysis and Reverse Engineering",
    description: "Comprehensive malware analysis techniques, reverse engineering methods, and malware family identification.",
    category: "incident-response",
    difficulty: "intermediate",
    duration: 185,
    overview: {
      objectives: [
        "Perform static and dynamic malware analysis",
        "Master reverse engineering techniques",
        "Identify malware families and capabilities", 
        "Develop indicators of compromise"
      ]
    },
    tags: ["malware-analysis", "reverse-engineering", "static-analysis", "dynamic-analysis", "iocs"],
    isPublished: true
  },
  
  // ADVANCED LEVEL - 2 modules
  {
    title: "Enterprise Incident Response Management",
    description: "Advanced incident response leadership, crisis management, legal considerations, and organizational coordination.",
    category: "incident-response",
    difficulty: "advanced",
    duration: 205,
    overview: {
      objectives: [
        "Lead enterprise-scale incident response",
        "Manage crisis communications effectively",
        "Navigate legal and regulatory requirements",
        "Coordinate complex multi-team responses"
      ]
    },
    tags: ["incident-management", "crisis-leadership", "legal-compliance", "enterprise-response", "coordination"],
    isPublished: true
  },
  {
    title: "Advanced Forensics and Recovery",
    description: "Expert-level forensic techniques, system recovery procedures, and post-incident analysis methodologies.",
    category: "incident-response",
    difficulty: "advanced", 
    duration: 195,
    overview: {
      objectives: [
        "Master advanced forensic techniques",
        "Lead complex recovery operations",
        "Conduct thorough post-incident analysis",
        "Implement lessons learned programs"
      ]
    },
    tags: ["advanced-forensics", "system-recovery", "post-incident-analysis", "lessons-learned", "expert-techniques"],
    isPublished: true
  }
];

module.exports = incidentResponseModules;

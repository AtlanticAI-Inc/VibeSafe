// Network Security Training Modules
// 6 modules total: 2 per difficulty level (beginner, intermediate, advanced)

const networkSecurityModules = [
  // BEGINNER LEVEL - 2 modules
  {
    title: "Network Security Fundamentals",
    description: "Introduction to network protocols, security concepts, and basic network protection mechanisms.",
    category: "network-security", 
    difficulty: "beginner",
    duration: 135,
    overview: {
      objectives: [
        "Understand fundamental network concepts",
        "Learn about TCP/IP and network protocols",
        "Identify common network threats",
        "Implement basic network security measures"
      ],
      prerequisites: [
        "Basic understanding of computer networks",
        "Familiarity with internet concepts"
      ],
      outcomes: [
        "Can identify network security risks",
        "Understands network protocol security implications", 
        "Can implement basic network protections"
      ]
    },
    tags: ["network-fundamentals", "tcp-ip", "protocols", "network-threats", "basic-security"],
    isPublished: true
  },
  {
    title: "Firewalls and Network Access Control", 
    description: "Comprehensive guide to firewall technologies, network segmentation, and access control mechanisms.",
    category: "network-security",
    difficulty: "beginner", 
    duration: 120,
    overview: {
      objectives: [
        "Master firewall concepts and technologies",
        "Implement network access controls",
        "Design network segmentation strategies", 
        "Configure basic firewall rules"
      ]
    },
    tags: ["firewalls", "network-segmentation", "access-control", "iptables", "network-policies"],
    isPublished: true
  },
  
  // INTERMEDIATE LEVEL - 2 modules
  {
    title: "VPN and Secure Communications",
    description: "Deep dive into VPN technologies, secure tunneling protocols, and encrypted communications.",
    category: "network-security",
    difficulty: "intermediate",
    duration: 165,
    overview: {
      objectives: [
        "Master VPN technologies and protocols",
        "Implement secure communication channels",
        "Understand IPSec, SSL/TLS VPNs",
        "Design secure remote access solutions"
      ]
    },
    tags: ["vpn", "ipsec", "ssl-vpn", "tunneling", "secure-communications"],
    isPublished: true
  },
  {
    title: "Intrusion Detection and Prevention",
    description: "Advanced IDS/IPS systems, network monitoring, threat detection, and incident response.",
    category: "network-security",
    difficulty: "intermediate",
    duration: 155,
    overview: {
      objectives: [
        "Deploy IDS/IPS systems effectively",
        "Implement comprehensive network monitoring",
        "Develop threat detection capabilities",
        "Create incident response procedures"
      ]
    },
    tags: ["ids-ips", "network-monitoring", "threat-detection", "snort", "security-monitoring"],
    isPublished: true
  },
  
  // ADVANCED LEVEL - 2 modules  
  {
    title: "Advanced Network Attacks and Defense",
    description: "Sophisticated attack techniques including ARP poisoning, DNS attacks, and advanced persistent threats.",
    category: "network-security",
    difficulty: "advanced",
    duration: 195,
    overview: {
      objectives: [
        "Master advanced network attack techniques", 
        "Understand APT tactics and techniques",
        "Implement advanced defensive measures",
        "Lead network security initiatives"
      ]
    },
    tags: ["advanced-attacks", "apt", "arp-poisoning", "dns-security", "network-forensics"],
    isPublished: true
  },
  {
    title: "Network Penetration Testing",
    description: "Comprehensive network penetration testing methodologies, tools, and advanced exploitation techniques.",
    category: "network-security", 
    difficulty: "advanced",
    duration: 210,
    overview: {
      objectives: [
        "Conduct professional network penetration tests",
        "Master advanced exploitation techniques",
        "Use industry-standard testing tools",
        "Develop comprehensive security assessments"
      ]
    },
    tags: ["penetration-testing", "nmap", "metasploit", "network-exploitation", "security-assessment"],
    isPublished: true
  }
];

module.exports = networkSecurityModules;

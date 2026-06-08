/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Job, CandidateProfile, JobApplication, Message, EmployerProfile, HRTeamMember, CollaborationNote } from "../types";

export const initialEmployerProfile: EmployerProfile = {
  name: "TalentHub Solutions Inc.",
  industry: "Technology / SaaS",
  size: "250-500 employees",
  website: "https://talenthub.workspace",
  location: "San Francisco, CA (Hybrid)",
  description: "TalentHub Solutions is an industry-leading provider of workspace productivity software. We build scalable tools to help remote and hybrid engineering teams collaborate with ease.",
  logo: "bg-blue-600 text-white"
};

export const initialJobs: Job[] = [
  {
    id: "job-1",
    title: "Senior Full Stack Engineer (React & Node)",
    companyName: "TalentHub Solutions Inc.",
    companyLogo: "bg-blue-600 text-white",
    location: "San Francisco, CA (Hybrid)",
    industry: "SaaS",
    contractType: "Full-time",
    experienceLevel: "Senior",
    salaryMin: 140000,
    salaryMax: 180000,
    salaryCurrency: "$",
    datePosted: "2026-06-05",
    description: "We are seeking an experienced Senior Full Stack Engineer to spearhead our collaboration dashboard division. In this position, you will own critical microservices, build sleek user interfaces with React, and mentor junior colleagues in engineering best practices.",
    requirements: [
      "5+ years of production experience with React, TypeScript, and Node.js.",
      "Proven history of managing scalable cloud resources (AWS, GCP, or Azure).",
      "Proficiency in building secure, RESTful and GraphQL API layers.",
      "Strong background in relational databases (PostgreSQL, MySQL) and ORMs.",
      "Passion for elegant typography, smooth interactions, and performant web systems."
    ],
    responsibilities: [
      "Architect and implement durable modular client-side apps using modern React.",
      "Maintain, monitor, and optimize robust backend services in TypeScript.",
      "Collaborate with Product Managers and Product Designers to deliver a world-class UI.",
      "Define schema migrations and secure database structures.",
      "Conduct thorough code reviews and facilitate knowledge-sharing sessions."
    ],
    benefits: [
      "Competitive base salary with quarterly equity grants.",
      "Comprehensive medical, dental, and vision insurance with 100% premium coverage.",
      "401(k) retirement plan with 4.5% employer matching.",
      "Flexible PTO, plus 12 official paid company holidays.",
      "Annual $2,000 professional learning/development stipend.",
      "High-end corporate equipment (MacBook Pro, 4K monitor, ergonomic chair)."
    ],
    companyDescription: "TalentHub Solutions is an established cloud software enterprise. We pride ourselves on clean engineering, dynamic teamwork, and a supportive engineering culture.",
    applicantsCount: 14,
    saved: false,
    applied: false
  },
  {
    id: "job-2",
    title: "Lead UI/UX Designer",
    companyName: "CreativeFlow Studio",
    companyLogo: "bg-purple-600 text-white",
    location: "New York, NY (Remote)",
    industry: "Design & Creative",
    contractType: "Remote",
    experienceLevel: "Lead",
    salaryMin: 120000,
    salaryMax: 160000,
    salaryCurrency: "$",
    datePosted: "2026-06-06",
    description: "Join the CreativeFlow Studio team as a Lead UI/UX Designer! You will lead high-profile digital redesigns for Fortune 500 brands, construct robust design systems, and craft immersive customer journeys across web and mobile surfaces.",
    requirements: [
      "6+ years of professional UX/UI experience with digital platforms.",
      "Exemplary portfolio showcasing advanced typography, spatial design, and responsive flows.",
      "Expert skills in Figma, including component libraries, auto-layout, and high-fidelity prototyping.",
      "Deep understanding of design heuristics, accessibility (WCAG), and responsive layout grids.",
      "Excellent narrative skills to present ideas clearly to cross-functional stakeholders."
    ],
    responsibilities: [
      "Lead client discovery sessions to gather user experience goals and technical criteria.",
      "Build wireframes, interactive prototypes, and production-ready layout concepts.",
      "Own, extend, and audit the design system for digital consistency.",
      "Partner with developers to verify beautiful and accurate front-end execution.",
      "Conduct usability studies and translate analytics into structural optimizations."
    ],
    benefits: [
      "Work-from-anywhere home office allowance ($1,500 startup fund).",
      "Generous health, wellness, and mental fitness memberships.",
      "Flexible schedule with mandatory core-collaboration window.",
      "Unlimited paid time off with a mandated 2-week annual minimum.",
      "Co-working space allowance or fully paid membership."
    ],
    companyDescription: "CreativeFlow Studio is a boutique design consultancy. We craft gorgeous digital products for top-tier companies, focusing on emotional branding and pixel-perfect layouts.",
    applicantsCount: 8,
    saved: true,
    applied: false
  },
  {
    id: "job-3",
    title: "Healthcare Data Analyst",
    companyName: "MediCare Analytics",
    companyLogo: "bg-teal-600 text-white",
    location: "Chicago, IL (Hybrid)",
    industry: "Healthcare",
    contractType: "Full-time",
    experienceLevel: "Mid Level",
    salaryMin: 90000,
    salaryMax: 115000,
    salaryCurrency: "$",
    datePosted: "2026-06-07",
    description: "We are on the lookout for a Healthcare Data Analyst to translate clinical data into actionable patient intelligence. You will analyze large health datasets, prepare beautiful interactive charts, and deliver dashboards to major hospital networks.",
    requirements: [
      "3+ years of clinical or data analysis experience in a professional setting.",
      "Strong command of SQL queries, data warehousing, and relational logic.",
      "Deep experience with D3, Tableau, or PowerBI visualizations.",
      "Python data science stack proficiency (Pandas, Numpy, Matplotlib).",
      "Familiarity with medical compliance guidelines (HIPAA, HL7)."
    ],
    responsibilities: [
      "Ingest, clean, and consolidate complex health record logs from partner providers.",
      "Formulate interactive SQL reports to monitor clinical outcomes and provider efficiency.",
      "Deconstruct database trends to locate cost savings and optimize patient pipelines.",
      "Present regular dashboard summaries to operations managers and chief medical officers.",
      "Verify complete data governance compliance across cloud databases."
    ],
    benefits: [
      "Comprehensive hospital premium coverage and health savings accounts.",
      "Generous pension plan contributions.",
      "On-site fitness center, organic cafeteria, and commuter assistance.",
      "Annual conference allowance and certification sponsorships."
    ],
    companyDescription: "MediCare Analytics builds statistical platforms to raise healthcare quality and reduce clinical costs in modern hospital networks.",
    applicantsCount: 6,
    saved: false,
    applied: false
  },
  {
    id: "job-4",
    title: "Product Marketing Manager",
    companyName: "Apollo FinTech",
    companyLogo: "bg-emerald-600 text-white",
    location: "Austin, TX (Hybrid)",
    industry: "Finance",
    contractType: "Full-time",
    experienceLevel: "Mid Level",
    salaryMin: 105000,
    salaryMax: 135000,
    salaryCurrency: "$",
    datePosted: "2026-06-01",
    description: "Apollo FinTech is recruiting a Product Marketing Manager to champion public launches for our expanding consumer banking products. You will design product messaging, coordinate multichannel go-to-market strategies, and optimize conversion metrics.",
    requirements: [
      "3-5 years of product marketing experience within technology or finance.",
      "Outstanding copywriting abilities emphasizing clear value propositions.",
      "Proven analytics skills with funnel platforms, A/B testing, and search metrics.",
      "Comfort in highly dynamic startup settings with quick release cycles.",
      "Strong collaborative spirit to partner across Product, PR, and Sales teams."
    ],
    responsibilities: [
      "Author messaging frameworks and customer segmentation criteria for new releases.",
      "Create high-converting landing pages, educational videos, and PR announcement campaigns.",
      "Measure customer engagement post-launch to tune landing page messaging.",
      "Structure competitive pricing reviews and analyze competitor product features.",
      "Empower sales and support teams with detailed customer guides and release notes."
    ],
    benefits: [
      "Exceptional base salary + annual performance bonuses.",
      "Full family coverage options for comprehensive health plans.",
      "Flexible schedule with remote options.",
      "Free gourmet snacks, barista service, and social team events."
    ],
    companyDescription: "Apollo FinTech is on a mission to democratize advanced wealth management tools, helping millions of active users plan a stable financial future.",
    applicantsCount: 19,
    saved: false,
    applied: true
  },
  {
    id: "job-5",
    title: "Intern Software Engineer",
    companyName: "TalentHub Solutions Inc.",
    companyLogo: "bg-blue-600 text-white",
    location: "San Francisco, CA (Hybrid)",
    industry: "SaaS",
    contractType: "Internship",
    experienceLevel: "Entry Level",
    salaryMin: 40000,
    salaryMax: 60000,
    salaryCurrency: "$",
    datePosted: "2026-06-04",
    description: "Start your engineering career with TalentHub Solutions! As an Intern Software Developer, you will work hands-on alongside senior engineers on production services, learn modern web methodologies, and build user-facing utilities.",
    requirements: [
      "Currently pursuing or recently completed a degree in Computer Science, or equivalent code academy.",
      "Fundamental coding competence in JavaScript, TypeScript, or Python.",
      "Basic understanding of document models (DOM), CSS, and React APIs.",
      "Familiarity with version control (Git) and command line setups.",
      "Inquisitive mind with a hunger to learn from structured code reviews."
    ],
    responsibilities: [
      "Write clean, responsive HTML/CSS structures and simple React components.",
      "Implement basic unit tests and debug client problems.",
      "Participate actively in team standups, planning sessions, and architecture design reviews.",
      "Contribute directly to company documentation and helper libraries."
    ],
    benefits: [
      "Competitive hourly compensation.",
      "Direct weekly mentorship sessions with staff and principal engineers.",
      "Convertible path to high-paying full-time employment.",
      "All necessary workspace hardware provided."
    ],
    companyDescription: "TalentHub Solutions builds enterprise-grade cloud dashboards to foster remote productivity. We emphasize learning, psychological safety, and growth.",
    applicantsCount: 32,
    saved: false,
    applied: false
  },
  {
    id: "job-6",
    title: "Junior Backend Developer",
    companyName: "CloudPillar Tech",
    companyLogo: "bg-sky-600 text-white",
    location: "Denver, CO (Remote)",
    industry: "SaaS",
    contractType: "Part-time",
    experienceLevel: "Entry Level",
    salaryMin: 70000,
    salaryMax: 90000,
    salaryCurrency: "$",
    datePosted: "2026-06-08",
    description: "CloudPillar Tech is looking for an entry-level Backend Developer to join our Cloud Optimization squad. You will help maintain Node/Express APIs, write automated tests, and streamline database indexing.",
    requirements: [
      "1-2 years of experience with Node.js and Express.",
      "Clear understanding of SQL database concepts (PostgreSQL preferred).",
      "Experience with API testing suites (Jest, Postman, or similar).",
      "Familiarity with cloud platforms and serverless setups.",
      "Eagerness to receive technical feedback and grow."
    ],
    responsibilities: [
      "Code dynamic and clean server-side endpoints in Express.",
      "Prepare clean databases schemas and optimize complex table queries.",
      "Write detailed regression, integration, and performance tests.",
      "Review telemetry logs to locate bottlenecks."
    ],
    benefits: [
      "Flexible part-time scheduling.",
      "Health spending credits and wellness program grants.",
      "Dedicated computer equipment package.",
      "Stipend for learning materials and online courses."
    ],
    companyDescription: "CloudPillar Tech offers automated infrastructure tuning to trim server bills by up to 50% without downtime.",
    applicantsCount: 11,
    saved: false,
    applied: false
  }
];

export const initialCandidateProfile: CandidateProfile = {
  id: "cand-1",
  fullName: "Alex Rivera",
  email: "alex.rivera@workspace.com",
  phone: "+1 (555) 321-9876",
  avatar: "AR",
  title: "Frontend Developer & UI Specialist",
  bio: "Passionate Frontend Developer with 4 years of experience crafting beautiful, responsive, and performance-driven web products. Deeply in love with Tailwind CSS, React, and modular architecture. Focused on high accessibility compliance and outstanding visual hierarchies.",
  resumeName: "Alex_Rivera_CV_2026.pdf",
  skills: ["React", "TypeScript", "JavaScript", "Tailwind CSS", "Vite", "Node.js", "Express", "REST APIs", "Git", "Figma", "Redux Toolkit", "SVG Animations"],
  education: [
    {
      school: "University of California, Berkeley",
      degree: "B.S. in Computer Science",
      year: "2500 - 2024"
    },
    {
      school: "Interaction Design Foundation",
      degree: "Certified Advanced Interaction Specialist",
      year: "2025"
    }
  ],
  certifications: [
    "AWS Certified Cloud Practitioner (2025)",
    "Meta Professional Frontend Developer Certificate (2024)",
    "Scrum Alliance Product Owner (CSPO) (2025)"
  ],
  workExperience: [
    {
      company: "ByteCraft Studio",
      role: "Frontend Engineer",
      duration: "2024 - Present",
      description: "Designed and developed highly responsive dashboards for local commerce, cutting page load time by 34% through layout optimization and image lazy-loading. Built custom interface elements integrated cleanly with Figma schemas."
    },
    {
      company: "DesignGrid Agency",
      role: "Junior Web Developer",
      duration: "2022 - 2024",
      description: "Crafted semantic HTML layouts, managed CSS files for multi-page themes, and programmed interactive maps and calculators with pure JavaScript and React."
    }
  ],
  portfolioLinks: [
    { label: "Personal Portfolio", url: "https://alexrivera.dev" },
    { label: "GitHub Profile", url: "https://github.com/alexrivera-dev" },
    { label: "LinkedIn", url: "https://linkedin.com/in/alexrivera-dev" }
  ],
  languages: [
    { language: "English", proficiency: "Native / Bilingual" },
    { language: "Spanish", proficiency: "Professional Work Proficiency" },
    { language: "Japanese", proficiency: "Elementary" }
  ]
};

export const initialApplications: JobApplication[] = [
  {
    id: "app-1",
    jobId: "job-1",
    jobTitle: "Senior Full Stack Engineer (React & Node)",
    companyName: "TalentHub Solutions Inc.",
    candidateId: "cand-2",
    candidateName: "Sophia Martinez",
    candidateTitle: "Senior Software Architect",
    candidateEmail: "sophia.m@example.com",
    status: "Interviewing",
    appliedDate: "2026-06-03",
    coverLetter: "I'm extremely excited about the Senior Full Stack Engineer opening at TalentHub! I have built large enterprise microservices and led React migrations for 6 years, and I believe my background matches perfectly with your current initiatives.",
    notes: "Sophia performed outstandingly in the React whiteboard task. Technical depth is top-tier.",
    rating: 5,
    interviewDate: "2026-06-10T14:00:00Z",
    interviewLink: "https://talenthub.workspace/room/interview-sophia"
  },
  {
    id: "app-2",
    jobId: "job-1",
    jobTitle: "Senior Full Stack Engineer (React & Node)",
    companyName: "TalentHub Solutions Inc.",
    candidateId: "cand-3",
    candidateName: "Jonathan Zhao",
    candidateTitle: "Full Stack Engineer",
    candidateEmail: "j.zhao@example.com",
    status: "Screening",
    appliedDate: "2026-06-05",
    coverLetter: "I would love to contribute to TalentHub Solutions' scaling tools. I have a solid command of Node databases and custom Express APIs.",
    notes: "Review resume content for GCP deployment experience.",
    rating: 4
  },
  {
    id: "app-3",
    jobId: "job-1",
    jobTitle: "Senior Full Stack Engineer (React & Node)",
    companyName: "TalentHub Solutions Inc.",
    candidateId: "cand-1", // Logged-in user Alex Rivera
    candidateName: "Alex Rivera",
    candidateTitle: "Frontend Developer & UI Specialist",
    candidateEmail: "alex.rivera@workspace.com",
    status: "Applied",
    appliedDate: "2026-06-07",
    coverLetter: "I have 4 years of experience creating highly accessible and polished React applications with Tailwind CSS. I would love to bring my skills to TalentHub Solutions!"
  },
  {
    id: "app-4",
    jobId: "job-2",
    jobTitle: "Lead UI/UX Designer",
    companyName: "CreativeFlow Studio",
    candidateId: "cand-4",
    candidateName: "Emma Watson",
    candidateTitle: "Senior Product Designer",
    candidateEmail: "emma.watson@example.com",
    status: "Offered",
    appliedDate: "2026-06-01",
    coverLetter: "Dynamic user environments are my ultimate passion. I've designed interactive SaaS dashboards that increased active user engagement metrics by 50%. Let's create experiences that matter.",
    notes: "Approved by VP of Product Design. Finalizing salary package numbers.",
    rating: 5
  },
  {
    id: "app-5",
    jobId: "job-3",
    jobTitle: "Healthcare Data Analyst",
    companyName: "MediCare Analytics",
    candidateId: "cand-5",
    candidateName: "David Kim",
    candidateTitle: "Clinical Analyst & SQL Specialist",
    candidateEmail: "d.kim@example.com",
    status: "Rejected",
    appliedDate: "2026-05-28",
    coverLetter: "Data analysis in medical contexts is my specialty. I manage complex SQL configurations and run hospital trend calculations with Python.",
    notes: "Lacked sufficient patient compliance certifications (HIPAA/HL7). Keep on file for future non-clinical roles.",
    rating: 2
  },
  {
    id: "app-6",
    jobId: "job-5",
    jobTitle: "Intern Software Engineer",
    companyName: "TalentHub Solutions Inc.",
    candidateId: "cand-6",
    candidateName: "Marcus Vance",
    candidateTitle: "CS Sophomore",
    candidateEmail: "mvance@student.edu",
    status: "Interviewing",
    appliedDate: "2026-06-04",
    coverLetter: "I am a Computer Science student searching for a summer internship to challenge myself and gain real development experience.",
    notes: "Passed basic python quiz. Call scheduled with Team Lead.",
    rating: 3,
    interviewDate: "2026-06-09T10:30:00Z",
    interviewLink: "https://talenthub.workspace/room/interview-marcus"
  }
];

export const initialMessages: Message[] = [
  {
    id: "m1",
    senderId: "employer",
    senderName: "Charlotte (TalentHub Solutions Lead Recruiter)",
    receiverId: "cand-1",
    text: "Hi Alex! Thank you for applying for our Senior Full Stack Engineer opening. We were very impressed by your visual portfolio. Are you available for a 30-minute screening call next Tuesday?",
    timestamp: "2026-06-07T15:30:00Z",
    isRead: false
  },
  {
    id: "m2",
    senderId: "cand-1",
    senderName: "Alex Rivera",
    receiverId: "employer",
    text: "Hi Charlotte, absolutely! I am available on Tuesday from 10 AM to 3 PM Pacific Time. I look forward to speaking with the team!",
    timestamp: "2026-06-07T16:12:00Z",
    isRead: true
  },
  {
    id: "m3",
    senderId: "employer",
    senderName: "Charlotte (TalentHub Solutions Lead Recruiter)",
    receiverId: "cand-1",
    text: "Great! I have scheduled our call for Tuesday at 11:00 AM PT. I will send a calendar link right away.",
    timestamp: "2026-06-07T16:45:00Z",
    isRead: false
  },
  {
    id: "m4",
    senderId: "hr",
    senderName: "Marcus Smith (Head of HR / TalentHub)",
    receiverId: "employer",
    text: "Sophia Martinez just passed her technical interview. I am pasting her notes on our internal HR pipeline board now.",
    timestamp: "2026-06-06T09:15:00Z",
    isRead: true
  }
];

export const initialHRTeam: HRTeamMember[] = [
  { id: "hr-1", name: "Marcus Smith", role: "Head of HR & Talent", avatar: "MS" },
  { id: "hr-2", name: "Charlotte Dupond", role: "Lead Dev Recruiter", avatar: "CD" },
  { id: "hr-3", name: "Tyler Henderson", role: "Sourcing Specialist", avatar: "TH" }
];

export const initialCollaborationNotes: CollaborationNote[] = [
  {
    id: "n-1",
    author: "Charlotte Dupond",
    text: "Need to expedite interviews for the Senior Full Stack role. Candidates are receiving multiple active offers from competitors.",
    date: "2026-06-06"
  },
  {
    id: "n-2",
    author: "Marcus Smith",
    text: "We approved some budget extension for relocation support if Sophia Martinez is the final hire.",
    date: "2026-06-07"
  }
];

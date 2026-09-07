import avatarPhoto from "./avatar.jpg";
import cvPdf from "./CV_FullStack_Cao_Manh_Tan.pdf";

// ─── INTERFACES ──────────────────────────────────────────────────────────────

export interface Social {
  github: string;
  email?: string;
  facebook?: string;
}

export interface Profile {
  name: string;
  title: string;
  tagline: string;
  email: string;
  phone: string;
  location: string;
  /** URL ảnh đại diện (import từ src/data hoặc đường dẫn public) */
  avatar: string;
  /** Chữ hiển thị khi ảnh chưa tải được */
  avatarInitials: string;
  avatarColor: string;
  bio: string;
  social: Social;
  /** File CV local (import PDF) */
  cvFile: string;
  /** Tên file khi tải xuống */
  cvFileName: string;
}

export interface Stat {
  label: string;
  value: string;
}

export interface TechnicalSkill {
  name: string;
  level: number;
  color: string;
}

export interface Skills {
  technical: TechnicalSkill[];
  tools: string[];
  soft: string[];
}

export interface ProjectGithubLink {
  label: string;
  url: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  image: string;
  color: string;
  demo: string;
  github?: string;
  githubLinks?: ProjectGithubLink[];
  featured: boolean;
}

export interface TimelineItem {
  year: string;
  type: "work" | "project" | "education";
  title: string;
  organization: string;
  description: string;
  icon: string;
}

export type TechBgKind = "react" | "scss" | "code";

export interface TechBgItem {
  id: string;
  kind: TechBgKind;
  code?: string;
  top: string;
  left?: string;
  right?: string;
  size?: number;
  duration?: number;
  delay?: number;
}

export interface ContactChannel {
  id: string;
  label: string;
  hint: string;
  value: string;
  href: string;
  icon: string;
  primary?: boolean;
}

export interface PortfolioData {
  profile: Profile;
  stats: Stat[];
  skills: Skills;
  projects: Project[];
  timeline: TimelineItem[];
}

function phoneToIntl(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  return digits.startsWith("0") ? `84${digits.slice(1)}` : digits;
}

/** Kênh liên hệ (Zalo, email, gọi điện) — không cần backend */
export function getContactChannels(profile: Profile): ContactChannel[] {
  const phoneIntl = phoneToIntl(profile.phone);
  const phoneTel = profile.phone.replace(/\s/g, "");
  const firstName = profile.name.trim().split(/\s+/).pop() ?? profile.name;
  const mailSubject = encodeURIComponent(
    `Contact from Portfolio — ${profile.name}`,
  );
  const mailBody = encodeURIComponent(
    `Hi ${firstName},\n\nI'm reaching out via your portfolio because:\n\n`,
  );

  return [
    {
      id: "zalo",
      label: "Message on Zalo",
      hint: "Fastest response",
      value: profile.phone,
      href: `https://zalo.me/${phoneIntl}`,
      icon: "💬",
      primary: true,
    },
    {
      id: "email",
      label: "Send Email",
      hint: "Open your mail app",
      value: profile.email,
      href: `mailto:${profile.email}?subject=${mailSubject}&body=${mailBody}`,
      icon: "📧",
    },
    {
      id: "phone",
      label: "Call",
      hint: "Direct call on mobile",
      value: profile.phone,
      href: `tel:${phoneTel}`,
      icon: "📱",
    },
  ];
}

const portfolioData: PortfolioData = {
  profile: {
    name: "CAO MANH TAN",
    title: "Fullstack Developer — ReactJS & NestJS",
    tagline:
      "Building scalable, high-performance web applications from interactive frontend to robust backend architecture.",
    email: "caotancaotan2206@gmail.com",
    phone: "0335 072 781",
    location: "Phuong Liet, Ha Noi",
    avatar: avatarPhoto,
    avatarInitials: "CT",
    avatarColor: "#6C63FF",
    bio: "Fullstack Developer and Computer Engineering student at Hanoi University of Science and Technology (HUST). Specializing in ReactJS (18/19) with modern state management (TanStack Query, Zustand) on the frontend, and NestJS 11 with Domain-Driven Design (DDD), TypeORM, and MySQL on the backend. Experienced in developing real-time architectures (SSE, Socket.IO), atomic transaction concurrency control, and payment webhook integrations. Proven through hands-on company internship at TechTack and production-grade reservation and booking platforms.",
    social: {
      github: "https://github.com/cmtan04",
      email: "caotancaotan2206@gmail.com",
      facebook: "https://www.facebook.com/tanishere.204",
    },
    cvFile: cvPdf,
    cvFileName: "CV_FullStack_Cao_Manh_Tan.pdf",
  },

  stats: [
    { label: "Projects", value: "3+" },
    { label: "Moths of Experience", value: "3+" },
    { label: "Technologies", value: "10+" },
    { label: "GitHub Commits", value: "300+" },
  ],

  skills: {
    technical: [
      // --- 1. CORE STACK (NỀN TẢNG CHÍNH: 78% - 82%) ---
      { name: "NestJS 11", level: 82, color: "#E0234E" },
      { name: "ReactJS (18/19)", level: 80, color: "#61DAFB" },
      { name: "TypeScript", level: 80, color: "#3178C6" },
      { name: "Node.js", level: 75, color: "#339933" },
      { name: "HTML5 / CSS3 / SCSS", level: 78, color: "#E34F26" },

      // --- 2. ADVANCED PATTERNS (ĐIỂM SÁNG KỸ THUẬT: 80% - 85%) ---
      // Điểm cao nhất 85% dành cho kỹ thuật khó nhất bạn đã tự giải quyết
      { name: "Atomic Locking & Transactions", level: 85, color: "#8E44AD" },
      { name: "TanStack Query v5 (Cache Sync)", level: 82, color: "#FF4154" },
      {
        name: "Axios Client (Silent Refresh Queue)",
        level: 82,
        color: "#5A29E4",
      },
      { name: "payOS & Webhook Idempotency", level: 80, color: "#00D26A" },
      { name: "Dual JWT & Token Blacklist", level: 78, color: "#D35400" },

      // --- 3. DATABASE & REALTIME (75% - 76%) ---
      { name: "MySQL 8.0", level: 76, color: "#00758F" },
      { name: "Server-Sent Events (SSE)", level: 76, color: "#00B4D8" },
      { name: "TypeORM & Migrations", level: 75, color: "#FE0C05" },

      // --- 4. UI LIBS & INTEGRATIONS (70% - 72%) ---
      { name: "Zustand (Draft Booking Store)", level: 72, color: "#443E38" },
      { name: "Ant Design (antd)", level: 70, color: "#147F92" },
      { name: "Leaflet Interactive Maps", level: 70, color: "#199900" },
    ],

    tools: [
      "Git",
      "GitHub",
      "Vite",
      "Postman",
      "VS Code",
      "Swagger / OpenAPI 3.0",
      "Jira",
      "Cloudinary",
      "Ngrok",
      "Figma",
    ],

    soft: [
      "Logical Thinking & Problem Solving",
      "Teamwork & Git Flow Collaboration",
      "Technical English (TOEIC 755/990)",
      "Effective Technical Communication",
      "Self-Learning & Fast Adaptability",
      "Time Management",
    ],
  },

  projects: [
    {
      id: 1,
      title: "Hosting — Travel Stay & Hospitality Reservation Platform",
      description:
        "Fullstack travel stay reservation system structured with DDD NestJS 11 and Feature-Based ReactJS. Implemented Atomic Database Transactions with typeorm-transactional to eliminate race conditions, integrated payOS dynamic VietQR with asynchronous SHA-256 Webhook and instant SSE payment notifications, and managed client state with TanStack Query v5 & Zustand.",
      tech: [
        "ReactJS",
        "NestJS 11",
        "TypeScript",
        "MySQL 8.0",
        "TypeORM",
        "TanStack Query v5",
        "Zustand",
        "payOS",
        "SSE",
        "Leaflet",
        "RBAC",
        "Nodemailer",
      ],
      image: "🏡",
      color: "#6C63FF",
      demo: "https://cmtan.id.vn/",
      github: "https://github.com/cmtan04",
      githubLinks: [
        {
          label: "Frontend Repo",
          url: "https://github.com/cmtan04",
        },
        {
          label: "Backend Repo",
          url: "https://github.com/cmtan04",
        },
      ],
      featured: true,
    },
    {
      id: 2,
      title: "GoRide — Online Bus Booking & Fleet Management Platform",
      description:
        "Intercity bus ticketing platform featuring dynamic 2D coach seat layout matrices with real-time seat hold locking and price computation. Engineered bidirectional customer support chat via Socket.IO, optimized high-performance joins with custom TypeORM QueryBuilders, and built 6-digit email OTP recovery with Resend API.",
      tech: [
        "React 19",
        "NestJS 11",
        "TypeScript",
        "MySQL 8.0",
        "TypeORM",
        "Socket.IO",
        "Ant Design 6",
        "Resend",
        "Swagger",
      ],
      image: "🚌",
      color: "#4ECDC4",
      demo: "https://fe-bookings-sigma.vercel.app/",
      github: "https://github.com/cmtan04",
      githubLinks: [
        {
          label: "Frontend Repo (React 19 & Socket.IO)",
          url: "https://github.com/cmtan04",
        },
        {
          label: "Backend Repo (NestJS 11 & Resend API)",
          url: "https://github.com/cmtan04",
        },
      ],
      featured: true,
    },
  ],

  timeline: [
    {
      year: "Feb 2026 – May 2026",
      type: "work",
      title: "Software Engineer Intern",
      organization: "TECHTACK LIMITED COMPANY",
      description:
        "Developed ENSOGO (Internal HR Management Web & App) building responsive admin dashboards, data tables with debounce search & server-side pagination using ReactJS, TypeScript & Ant Design; built RESTful CRUD APIs with Node.js and optimized MySQL composite queries (latency reduced by 40%). Developed TechTack Internal time-tracking and attendance app with standardized Axios interceptors and automated JWT token management.",
      icon: "💼",
    },
    {
      year: "Sep 2022 – Present",
      type: "education",
      title: "Bachelor of Computer Engineering",
      organization: "Ha Noi University of Science & Technology (HUST)",
      description:
        "Majoring in Computer Engineering (Kỹ thuật Máy tính). Relevant Coursework: System Analysis and Design, Object-Oriented Programming (OOP), Data Structures and Algorithms, Database Systems, Web Technologies and Cloud Services.",
      icon: "🎓",
    },
  ],
};

export const techBackgroundItems: TechBgItem[] = [
  {
    id: "react-1",
    kind: "react",
    top: "14%",
    left: "6%",
    size: 72,
    duration: 11,
    delay: 0,
  },
  {
    id: "react-2",
    kind: "react",
    top: "68%",
    right: "7%",
    size: 56,
    duration: 13,
    delay: 1.5,
  },
  {
    id: "react-3",
    kind: "react",
    top: "38%",
    right: "12%",
    size: 40,
    duration: 10,
    delay: 0.8,
  },
  {
    id: "scss-1",
    kind: "scss",
    top: "22%",
    right: "10%",
    size: 80,
    duration: 12,
    delay: 0.3,
  },
  {
    id: "scss-2",
    kind: "scss",
    top: "72%",
    left: "10%",
    size: 64,
    duration: 14,
    delay: 2,
  },
  {
    id: "code-react",
    kind: "code",
    code: "import { useState } from 'react'",
    top: "28%",
    left: "4%",
    duration: 15,
    delay: 1,
  },
  {
    id: "code-jsx",
    kind: "code",
    code: "export default function App()",
    top: "52%",
    left: "3%",
    duration: 16,
    delay: 0.5,
  },
  {
    id: "code-nest",
    kind: "code",
    code: "@Controller('users') export class UsersController {}",
    top: "18%",
    left: "22%",
    duration: 13,
    delay: 1.8,
  },
  {
    id: "code-scss-mixin",
    kind: "code",
    code: "@mixin flex-center { ... }",
    top: "58%",
    right: "5%",
    duration: 14,
    delay: 0.2,
  },
  {
    id: "code-scss-nest",
    kind: "code",
    code: ".hero { &__title { } }",
    top: "78%",
    right: "18%",
    duration: 12,
    delay: 2.5,
  },
  {
    id: "code-hook",
    kind: "code",
    code: "const [open, setOpen] = useState(false)",
    top: "44%",
    right: "4%",
    duration: 17,
    delay: 1.2,
  },
];

export default portfolioData;

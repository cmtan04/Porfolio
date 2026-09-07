import { useState, useEffect, useRef } from "react";
import portfolioData, {
  getContactChannels,
  type Profile,
  type Project,
  type TechnicalSkill,
  type TimelineItem,
} from "@/data/data";
import PortfolioLogo from "./PortfolioLogo";
import TechBackground from "./TechBackground";
import "./style.scss";

const AVATAR_FALLBACK = "/avatar.svg";

function resolveAssetUrl(path: string): string {
  if (!path) return "";
  if (
    path.startsWith("http") ||
    path.startsWith("data:") ||
    path.includes("/static/")
  ) {
    return path;
  }
  const base = process.env.PUBLIC_URL ?? "";
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

interface ProfileAvatarProps {
  className: string;
  profile?: Profile;
}

function ProfileAvatar({
  className,
  profile = portfolioData.profile,
}: ProfileAvatarProps) {
  const { avatar, avatarInitials, name, avatarColor } = profile;
  const primarySrc = resolveAssetUrl(avatar);
  const fallbackSrc = resolveAssetUrl(AVATAR_FALLBACK);
  const [src, setSrc] = useState(primarySrc);

  useEffect(() => {
    setSrc(primarySrc);
  }, [primarySrc]);

  return (
    <div
      className={className}
      style={{ ["--avatar-accent" as string]: avatarColor }}
    >
      {src ? (
        <img
          src={src}
          alt={`Profile photo of ${name}`}
          loading="lazy"
          decoding="async"
          onError={() => {
            if (src === primarySrc && primarySrc !== fallbackSrc) {
              setSrc(fallbackSrc);
            } else {
              setSrc("");
            }
          }}
        />
      ) : (
        <span className="profile-avatar__initials">{avatarInitials}</span>
      )}
    </div>
  );
}

function useActiveSection(sections: string[]): string {
  const [active, setActive] = useState(sections[0]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { threshold: 0.4 },
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return active;
}

function useIntersectionObserver(threshold = 0.3) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}

const NAV_ITEMS = [
  "hero",
  "about",
  "skills",
  "projects",
  "timeline",
  "contact",
] as const;
const NAV_LABELS: Record<string, string> = {
  hero: "Home",
  about: "About",
  skills: "Skills",
  projects: "Projects",
  timeline: "Experience",
  contact: "Contact",
};

function scrollToSection(id: string): void {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

async function downloadCv(fileUrl: string, fileName: string): Promise<void> {
  try {
    const response = await fetch(fileUrl);
    const blob = await response.blob();
    const blobUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(blobUrl);
  } catch {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = fileName;
    link.click();
  }
}

interface SectionTitleProps {
  tag: string;
  title: string;
}

function SectionTitle({ tag, title }: SectionTitleProps) {
  return (
    <div className="section-title">
      <div className="section-title__tag">{tag}.</div>
      <h2 className="section-title__heading">{title}</h2>
      <div className="section-title__divider" />
    </div>
  );
}

interface NavBarProps {
  activeSection: string;
}

function NavBar({ activeSection }: NavBarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="navbar__inner">
        <button
          type="button"
          className="navbar__brand"
          onClick={() => scrollToSection("hero")}
        >
          <PortfolioLogo size={38} className="navbar__logo-mark" />
          <span className="navbar__wordmark">
            <span className="navbar__wordmark-name">
              {portfolioData.profile.name.split(" ").pop()}
            </span>
            <span className="navbar__wordmark-tag">Portfolio</span>
          </span>
        </button>
        <div className="navbar__links">
          {NAV_ITEMS.slice(1).map((id) => (
            <button
              key={id}
              className={`navbar__btn ${activeSection === id ? "active" : ""}`}
              onClick={() => scrollToSection(id)}
            >
              {NAV_LABELS[id]}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}

function HeroSection() {
  const [typed, setTyped] = useState("");
  const fullText = portfolioData.profile.title;

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setTyped(fullText.slice(0, i + 1));
      i++;
      if (i >= fullText.length) clearInterval(interval);
    }, 60);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero" className="hero">
      <TechBackground variant="hero" />
      <div className="hero__bg-dots" />
      <div className="hero__glow hero__glow--left" />
      <div className="hero__glow hero__glow--right" />

      <div className="hero__content">
        <ProfileAvatar className="hero__avatar" />

        <p className="hero__greeting">Hi, I'm</p>

        <h1 className="hero__name">{portfolioData.profile.name}</h1>

        <h2 className="hero__title">
          {typed}
          <span className="hero__cursor">|</span>
        </h2>

        <p className="hero__tagline">"{portfolioData.profile.tagline}"</p>

        <div className="hero__stats">
          {portfolioData.stats.map((stat) => (
            <div key={stat.label} className="hero__stat-card">
              <div className="hero__stat-card-value">{stat.value}</div>
              <div className="hero__stat-card-label">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="hero__actions">
          <button
            className="hero__btn-primary"
            onClick={() => scrollToSection("contact")}
          >
            Get in touch →
          </button>
          <button
            type="button"
            className="hero__btn-secondary"
            onClick={() =>
              downloadCv(
                portfolioData.profile.cvFile,
                portfolioData.profile.cvFileName,
              )
            }
          >
            Download CV ↓
          </button>
        </div>

        <div className="hero__social">
          {(
            [
              ["GitHub", "⌥", portfolioData.profile.social.github],
              ["Email", "@", `mailto:${portfolioData.profile.email}`],
              ["Facebook", "f", portfolioData.profile.social.facebook],
            ] as [string, string, string][]
          ).map(([name, icon, href]) => (
            <a
              key={name}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="hero__social-link"
            >
              <span className="hero__social-link-icon">{icon}</span>
              {name}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── ABOUT SECTION ────────────────────────────────────────────────────────────

function AboutSection() {
  const { profile, skills } = portfolioData;

  const infoRows: [string, string, string][] = [
    ["📧 Email", "Email", profile.email],
    ["📱 Phone", "Phone", profile.phone],
    ["📍 Location", "Location", profile.location],
    ["🕐 Status", "Status", "Open to work"],
  ];

  return (
    <section id="about" className="about">
      <div className="about__inner">
        <SectionTitle tag="02" title="About Me" />
        <div className="about__grid">
          <div className="about__photo">
            <ProfileAvatar className="about__photo-avatar about__photo-avatar--large" />
            <div className="about__photo-location">📍 {profile.location}</div>
            <div className="about__photo-status">Available for work ✓</div>
          </div>

          <div>
            <p className="about__bio">{profile.bio}</p>

            <div className="about__info-grid">
              {infoRows.map(([key, label, value]) => (
                <div key={key} className="about__info-card">
                  <div className="about__info-card-label">{label}</div>
                  <div className="about__info-card-value">{value}</div>
                </div>
              ))}
            </div>

            <div className="about__soft-skills">
              <div className="about__soft-skills-label">Soft Skills</div>
              <div className="about__soft-skills-tags">
                {skills.soft.map((skill) => (
                  <span key={skill} className="about__soft-skills-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── SKILL BAR ────────────────────────────────────────────────────────────────

interface SkillBarProps {
  skill: TechnicalSkill;
  index: number;
}

function SkillBar({ skill, index }: SkillBarProps) {
  const { ref, isVisible } = useIntersectionObserver();

  return (
    <div ref={ref} className="skills__bar-item">
      <div className="skills__bar-item-header">
        <span className="skills__bar-item-name">{skill.name}</span>
        <span className="skills__bar-item-percent">{skill.level}%</span>
      </div>
      <div className="skills__bar-item-track">
        <div
          className="skills__bar-item-fill"
          style={{
            width: isVisible ? `${skill.level}%` : "0%",
            background: `linear-gradient(90deg, ${skill.color}, ${skill.color}88)`,
            boxShadow: `0 0 8px ${skill.color}66`,
            transition: `width 0.8s ease ${index * 0.08}s`,
          }}
        />
      </div>
    </div>
  );
}

// ─── SKILLS SECTION ───────────────────────────────────────────────────────────

const LEARNING_ITEMS = ["Docker", "Redis", "Message Queue", "CI/CD"];

function SkillsSection() {
  const { skills } = portfolioData;

  return (
    <section id="skills" className="skills">
      <div className="skills__inner">
        <SectionTitle tag="03" title="Skills" />
        <div className="skills__grid">
          <div>
            <h3 className="skills__subtitle">Technical Skills</h3>
            {skills.technical.map((skill, i) => (
              <SkillBar key={skill.name} skill={skill} index={i} />
            ))}
          </div>

          <div>
            <h3 className="skills__subtitle">Tools & More</h3>
            <div className="skills__tools">
              {skills.tools.map((tool) => (
                <div key={tool} className="skills__tool-tag">
                  {tool}
                </div>
              ))}
            </div>

            <div className="skills__learning">
              <div className="skills__learning-label">Currently learning</div>
              {LEARNING_ITEMS.map((item) => (
                <div key={item} className="skills__learning-item">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── PROJECT CARD ─────────────────────────────────────────────────────────────

interface ProjectCardProps {
  project: Project;
}

function ProjectCard({ project }: ProjectCardProps) {
  const [hovered, setHovered] = useState(false);
  const [isGithubExpanded, setIsGithubExpanded] = useState(false);

  const hasMultipleRepos = Boolean(
    project.githubLinks && project.githubLinks.length > 0,
  );

  return (
    <div
      className={`project-card ${isGithubExpanded ? "project-card--expanded" : ""}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderColor:
          hovered || isGithubExpanded
            ? `${project.color}55`
            : "rgba(255,255,255,0.08)",
      }}
    >
      {project.featured && (
        <span
          className="project-card__badge"
          style={{
            background: `${project.color}22`,
            border: `1px solid ${project.color}44`,
            color: project.color,
          }}
        >
          ⭐ Featured
        </span>
      )}

      <div className="project-card__image">{project.image}</div>
      <h3 className="project-card__title">{project.title}</h3>
      <p className="project-card__desc">{project.description}</p>

      <div className="project-card__tech">
        {project.tech.map((tech) => (
          <span
            key={tech}
            className="project-card__tech-tag"
            style={{
              background: `${project.color}15`,
              border: `1px solid ${project.color}30`,
              color: project.color,
            }}
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="project-card__links">
        {project.demo && project.demo !== "#" ? (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="project-card__link project-card__link--demo"
          >
            🔗 Demo
          </a>
        ) : (
          <span
            className="project-card__link project-card__link--demo project-card__link--disabled"
            title="Local / Enterprise System"
          >
            🔗 Demo (Internal)
          </span>
        )}

        {hasMultipleRepos ? (
          <button
            type="button"
            className={`project-card__link project-card__link--github project-card__link--toggle ${
              isGithubExpanded ? "is-active" : ""
            }`}
            onClick={(e) => {
              e.preventDefault();
              setIsGithubExpanded((prev) => !prev);
            }}
            aria-expanded={isGithubExpanded}
            aria-label="Toggle GitHub repositories"
          >
            <span>⌥ GitHub ({project.githubLinks?.length})</span>
            <span
              className={`project-card__toggle-icon ${
                isGithubExpanded ? "open" : ""
              }`}
            >
              {isGithubExpanded ? "▲" : "▼"}
            </span>
          </button>
        ) : project.github ? (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="project-card__link project-card__link--github"
          >
            ⌥ GitHub ↗
          </a>
        ) : null}
      </div>

      {hasMultipleRepos && (
        <div
          className={`project-card__github-drawer ${
            isGithubExpanded ? "project-card__github-drawer--open" : ""
          }`}
        >
          <div className="project-card__github-drawer-inner">
            <span className="project-card__github-drawer-title">
              Repositories ({project.githubLinks?.length}):
            </span>
            <div className="project-card__github-list">
              {project.githubLinks?.map((repo, idx) => (
                <a
                  key={idx}
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-card__github-item"
                >
                  <span className="project-card__github-item-prefix">⌥</span>
                  <span className="project-card__github-item-name">
                    {repo.label}
                  </span>
                  <span className="project-card__github-item-arrow">↗</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── PROJECTS SECTION ─────────────────────────────────────────────────────────

function ProjectsSection() {
  return (
    <section id="projects" className="projects">
      <div className="projects__inner">
        <SectionTitle tag="04" title="Projects" />
        <div className="projects__grid">
          {portfolioData.projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── TIMELINE SECTION ─────────────────────────────────────────────────────────

function TimelineSection() {
  return (
    <section id="timeline" className="timeline">
      <div className="timeline__inner">
        <SectionTitle tag="05" title="Experience & Education" />
        <div className="timeline__list">
          <div className="timeline__line" />
          {portfolioData.timeline.map((item: TimelineItem, i: number) => (
            <div key={i} className="timeline__item">
              <div className="timeline__dot">{item.icon}</div>
              <div className="timeline__card">
                <div className="timeline__card-header">
                  <h3 className="timeline__card-title">{item.title}</h3>
                  <span className="timeline__card-year">{item.year}</span>
                </div>
                <div className="timeline__card-org">{item.organization}</div>
                <p className="timeline__card-desc">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CONTACT SECTION ──────────────────────────────────────────────────────────

function ContactSection() {
  const { profile } = portfolioData;
  const channels = getContactChannels(profile);

  const socialLinks: [string, string, string][] = [
    ["GitHub", "⌥", profile.social.github],
    ["Email", "@", `mailto:${profile.email}`],
    ["Facebook", "f", profile.social.facebook],
  ];

  return (
    <section id="contact" className="contact">
      <div className="contact__inner">
        <SectionTitle tag="06" title="Contact" />
        <p className="contact__subtitle">
          No server-side form — tap a button below to message on Zalo, send an
          email, or call directly. I'll get back to you as soon as I can.
        </p>

        <div className="contact__grid">
          <div className="contact__channels">
            {channels.map((channel) => (
              <a
                key={channel.id}
                href={channel.href}
                target={channel.id === "phone" ? undefined : "_blank"}
                rel={channel.id === "phone" ? undefined : "noreferrer"}
                className={`contact__channel contact__channel--${channel.id}${
                  channel.primary ? " contact__channel--primary" : ""
                }`}
              >
                <span className="contact__channel-icon">{channel.icon}</span>
                <div className="contact__channel-body">
                  <div className="contact__channel-label">{channel.label}</div>
                  <div className="contact__channel-value">{channel.value}</div>
                  <div className="contact__channel-hint">{channel.hint}</div>
                </div>
                <span className="contact__channel-arrow" aria-hidden>
                  →
                </span>
              </a>
            ))}
          </div>

          <div>
            <h3 className="contact__info-title">Info</h3>
            <div className="contact__info-row">
              <span className="contact__info-row-icon">📍</span>
              <div>
                <div className="contact__info-row-label">Location</div>
                <div className="contact__info-row-value">
                  {profile.location}
                </div>
              </div>
            </div>
            <div className="contact__info-row">
              <span className="contact__info-row-icon">🕐</span>
              <div>
                <div className="contact__info-row-label">Status</div>
                <div className="contact__info-row-value">Open to work</div>
              </div>
            </div>

            <div className="contact__social">
              <h3 className="contact__social-title">Social</h3>
              <div className="contact__social-icons">
                {socialLinks.map(([name, icon, href]) => (
                  <a
                    key={name}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="contact__social-icon"
                    title={name}
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__brand">
        <PortfolioLogo size={28} className="footer__logo" />
        <p>
          © {new Date().getFullYear()} {portfolioData.profile.name} · Built with
          ⚛️ ReactJS & SCSS
        </p>
      </div>
    </footer>
  );
}

const SECTIONS = ["hero", "about", "skills", "projects", "timeline", "contact"];

export default function App() {
  const activeSection = useActiveSection(SECTIONS);

  return (
    <div className="portfolio">
      <TechBackground variant="page" />
      <NavBar activeSection={activeSection} />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <TimelineSection />
      <ContactSection />
      <Footer />
    </div>
  );
}

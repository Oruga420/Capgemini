import Head from "next/head";
import BlobCanvas from "../components/BlobCanvas";

const contactLinks = [
  { label: "Phone", value: "+1 437 243 3693" },
  { label: "Email", value: "alex@seshwithfriends.org", href: "mailto:alex@seshwithfriends.org" },
  { label: "LinkedIn", value: "linkedin.com/in/amorac", href: "https://www.linkedin.com/in/amorac/" },
  { label: "Website", value: "eloruga.com/about", href: "https://www.eloruga.com/about/index.html" },
  { label: "GitHub", value: "github.com/Oruga420", href: "https://github.com/Oruga420" },
];

const experiences = [
  {
    role: "AI Solutions Architect",
    company: "Assent",
    location: "Canada (Remote)",
    dates: "Feb 2025 – Present",
    bullets: [
      "Architected and deployed secure, scalable GenAI solutions within a regulated compliance platform, utilizing live RAG and custom MCP servers on GCP and AWS.",
      "Designed agentic workflows that autonomously coordinate multi-step processes, saving over 20,000 man-hours in a single year.",
      "Drove internal AI adoption from 47% to 97% by establishing governance, security protocols, and reusable development patterns.",
      "Achieved over $1 million in operational savings by applying AI/ML for process optimization and automation.",
    ],
  },
  {
    role: "AI Solutions Architect",
    company: "Sesh | Ai Solutions",
    location: "Toronto, Ontario",
    dates: "Nov 2021 – Present",
    bullets: [
      "Designed the technical architecture for 120+ GenAI applications in production across 30+ clients.",
      "Built and shipped 90+ chatbots using modern RAG techniques and automation backends.",
      "Provided architectural leadership enabling small businesses to implement GenAI-powered workflows within existing CRMs.",
      "Led training and workshops for Latinas in Tech and Somos Latinos in Tech Ottawa, turning complex AI concepts into actionable skills.",
    ],
  },
  {
    role: "Salesforce Consultant (AI & Agentforce)",
    company: "Online Business Systems",
    location: "Toronto, Ontario",
    dates: "Jun 2024 – Nov 2024",
    bullets: [
      "Led architecture and configuration of Salesforce Agentforce AI assistants, defining use cases, prompts, and actions for scalable deployment.",
      "Designed end-to-end setups for Marketing Cloud Account Engagement ensuring data integrity and alignment between sales and marketing automation.",
      "Created reusable configuration patterns to speed up onboarding and maintain architectural consistency.",
    ],
  },
  {
    role: "Salesforce Manager & AI Lead",
    company: "Globalization Partners",
    location: "Ontario, Canada",
    dates: "Nov 2018 – Nov 2023",
    bullets: [
      "Evolved from Salesforce Manager to leading internal GenAI development, designing 'GIA' for operational efficiency.",
      "Architected GenAI workflows for Jira integration and AI-assisted development with governed patterns.",
      "Managed a complex Salesforce ecosystem with 1,000+ licenses, ensuring high availability and scalability.",
    ],
  },
];

const education = [
  {
    title: "Ingenieria en Sistemas (Systems Engineering)",
    school: "Universidad Marista de MAcrida",
    dates: "2004 – 2007",
    extras: "",
  },
];

export default function Home() {
  return (
    <>
      <Head>
        <title>Alejandro De La Mora | GenAI Architect</title>
        <meta
          name="description"
          content="AI/GenAI Architect with end-to-end delivery across GCP, AWS, and Vercel. 120+ GenAI apps shipped, 20k+ hours saved via agentic workflows."
        />
      </Head>
      <main>
        <div className="card">
          <BlobCanvas />
          <header className="header">
            <div>
              <h1 className="name">Alejandro De La Mora</h1>
              <p className="role">AI/GenAI Architect</p>
              <p className="summary-box">
                Experienced AI/GenAI Architect with over a decade of technical leadership and deep expertise in designing end-to-end AI
                architectures on GCP, AWS, and Vercel. Proven track record of deploying 120+ productive GenAI applications and driving AI
                adoption from 47% to 97%. Bridges strategic goals with scalable execution, saving $1M+ and reclaiming 20,000 man-hours
                annually through agentic workflows—while teaching a 100+ person community and maintaining open-source GenAI demos.
              </p>
            </div>
            <aside className="contact" aria-label="Contact">
              <h3 className="contact-title">Reach me</h3>
              <ul className="contact-list">
                {contactLinks.map((item) => (
                  <li className="contact-item" key={item.label}>
                    <span>{item.label}:</span>
                    {item.href ? (
                      <a href={item.href} target="_blank" rel="noreferrer">
                        {item.value}
                      </a>
                    ) : (
                      <span>{item.value}</span>
                    )}
                  </li>
                ))}
              </ul>
            </aside>
          </header>

          <section className="section" aria-label="Areas of expertise">
            <h2>Areas of Expertise</h2>
            <div className="pill-row">
              {[
                "GenAI Architecture",
                "Agentic Workflows",
                "RAG",
                "Process Optimization",
                "Technical Strategy",
                "GCP / AWS / Vercel",
                "Next.js",
                "Salesforce Agentforce",
                "Python",
                "Security & Governance",
                "Cross-functional Leadership",
                "Mentorship & Education",
                "Open Source Demos",
              ].map((tag) => (
                <span className="pill" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
          </section>

          <section className="section" aria-label="Work experience">
            <h2>Work Experience</h2>
            {experiences.map((exp) => (
              <article className="experience-card" key={`${exp.company}-${exp.role}`}>
                <div className="exp-header">
                  <h3 className="exp-title">
                    {exp.role} | {exp.company}
                  </h3>
                  <span className="tagline">{exp.dates}</span>
                </div>
                <p className="exp-meta">{exp.location}</p>
                <ul className="bullets">
                  {exp.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </article>
            ))}
          </section>

          <section className="section" aria-label="Education">
            <h2>Education</h2>
            <div className="edu-grid">
              {education.map((edu) => (
                <div className="edu-card" key={edu.title}>
                  <h3 className="exp-title">{edu.title}</h3>
                  <p className="exp-meta">
                    {edu.school} | {edu.dates}
                  </p>
                  {edu.extras ? <p>{edu.extras}</p> : null}
                </div>
              ))}
            </div>
          </section>
        </div>
        <button className="pdf-button" onClick={() => window.print()} aria-label="Download this page as PDF">
          Download as PDF
        </button>
      </main>
    </>
  );
}

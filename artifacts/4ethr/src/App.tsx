import { useEffect, useRef, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ArrowRight, Check, Github, Instagram, Linkedin, Mail, Menu, Moon, Sun, X } from 'lucide-react';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';

const queryClient = new QueryClient();

const navigation = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'team', label: 'Team' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
];

const team = [
  {
    index: '01',
    name: 'Tanvi Tapase',
    role: '[EDITABLE ROLE]',
    bio: '[Editable member introduction — add a concise point of view here.]',
    tags: ['[SKILL]', '[SKILL]', '[SKILL]'],
  },
  {
    index: '02',
    name: 'Sharanya Mestry',
    role: '[EDITABLE ROLE]',
    bio: '[Editable member introduction — add a concise point of view here.]',
    tags: ['[SKILL]', '[SKILL]', '[SKILL]'],
  },
  {
    index: '03',
    name: 'Yash Kharat',
    role: '[EDITABLE ROLE]',
    bio: '[Editable member introduction — add a concise point of view here.]',
    tags: ['[SKILL]', '[SKILL]', '[SKILL]'],
  },
];

const projects = [
  {
    number: '01',
    title: '[PROJECT TITLE]',
    description: '[Editable project description. Describe the problem, the idea, and the part your team built.]',
    label: '[EDITABLE PROJECT SLOT]',
  },
  {
    number: '02',
    title: '[PROJECT TITLE]',
    description: '[Editable project description. Add context, process, and the outcome you want visitors to understand.]',
    label: '[EDITABLE PROJECT SLOT]',
  },
];

const skills = [
  ['01', 'HTML', 'HTML'],
  ['02', 'CSS', 'CSS'],
  ['03', 'JavaScript', 'JS'],
  ['04', 'React', 'REACT'],
  ['05', 'Git', 'GIT'],
  ['06', 'GitHub', 'GH'],
];

function Loader() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setDone(true), 1250);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className={`loader ${done ? 'done' : ''}`} aria-label="Loading 4ETHR">
      <div className="loader-mark">
        <div className="loader-word"><span className="brand-mark">4</span>ETHR <b>/</b> TEAM</div>
        <div className="loader-meta"><span>Initializing / 4ETHR</span><span>00—100</span></div>
        <div className="loader-track"><div className="loader-fill" /></div>
      </div>
    </div>
  );
}

function SiteNav({ theme, onThemeToggle }: { theme: 'dark' | 'light'; onThemeToggle: () => void }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState('home');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && setActive(entry.target.id)),
      { rootMargin: '-35% 0px -55% 0px' },
    );
    navigation.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, []);

  const closeMenu = () => setMobileOpen(false);

  return (
    <header className="nav" data-testid="site-navigation">
      <div className="nav-inner">
        <a className="brand" href="#home" onClick={closeMenu} data-testid="link-brand">
          <span className="brand-mark">4</span><span>ETHR</span>
        </a>
        <nav className="nav-links" aria-label="Primary navigation">
          {navigation.map((item) => (
            <a
              className={`nav-link ${active === item.id ? 'active' : ''}`}
              href={`#${item.id}`}
              key={item.id}
              data-testid={`link-nav-${item.id}`}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="nav-actions">
          <button className="icon-button theme-button" onClick={onThemeToggle} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`} data-testid="button-theme-toggle">
            {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
          </button>
          <button className="icon-button mobile-toggle" onClick={() => setMobileOpen((value) => !value)} aria-label="Toggle navigation menu" aria-expanded={mobileOpen} data-testid="button-mobile-menu">
            {mobileOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>
      <nav className="mobile-menu" hidden={!mobileOpen} aria-label="Mobile navigation">
        {navigation.map((item) => (
          <a href={`#${item.id}`} key={item.id} onClick={closeMenu} data-testid={`link-mobile-${item.id}`}>{item.label}</a>
        ))}
      </nav>
    </header>
  );
}

function OrbitVisual() {
  const stageRef = useRef<HTMLDivElement>(null);

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const stage = stageRef.current;
    if (!stage || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const bounds = stage.getBoundingClientRect();
    const turn = ((event.clientX - bounds.left) / bounds.width - 0.5) * 10;
    const tilt = ((event.clientY - bounds.top) / bounds.height - 0.5) * -8;
    stage.style.setProperty('--turn', `${turn}deg`);
    stage.style.setProperty('--tilt', `${tilt}deg`);
  };

  const resetPointer = () => {
    stageRef.current?.style.setProperty('--turn', '0deg');
    stageRef.current?.style.setProperty('--tilt', '0deg');
  };

  return (
    <div className="orbit-stage" ref={stageRef} onPointerMove={handlePointerMove} onPointerLeave={resetPointer} aria-label="Interactive connected orbit diagram">
      <div className="orbit-system">
        <div className="orbit-ring" />
        <div className="orbit-line line-one" /><div className="orbit-line line-two" />
        <div className="orbit-line line-three" /><div className="orbit-line line-four" />
        <div className="orbit-node node-one" aria-label="Tanvi Tapase node" /><div className="orbit-node node-two" aria-label="Sharanya Mestry node" /><div className="orbit-node node-three" aria-label="Yash Kharat node" />
        <div className="orbit-core" aria-label="4ETHR core" />
        <span className="orbit-label label-one">BUILD / EXPLORE</span><span className="orbit-label label-two">DESIGN / TEST</span><span className="orbit-label label-three">THINK / SHIP</span>
        <span className="orbit-signal signal-a" /><span className="orbit-signal signal-b" /><span className="orbit-signal signal-c" /><span className="orbit-signal signal-d" />
      </div>
    </div>
  );
}

function Reveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        node.classList.add('visible');
        observer.disconnect();
      }
    }, { threshold: 0.12 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>;
}

function SectionIntro({ number, title, accent, copy }: { number: string; title: string; accent?: string; copy: string }) {
  return (
    <div className="section-heading">
      <div>
        <div className="eyebrow">{number} / 06</div>
        <h2 className="section-title">{title} {accent && <em>{accent}</em>}</h2>
      </div>
      <p className="section-copy">{copy}</p>
    </div>
  );
}

function ProjectVisual({ second = false }: { second?: boolean }) {
  return (
    <div className="project-visual" aria-hidden="true">
      <div className="visual-grid" />
      <div className="browser-frame">
        <div className="browser-top"><i /><i /><i /></div>
        <div className="browser-content">
          <div className="wire-title" /><div className="wire-sub" />
          <div className="wire-blocks"><span /><span /><span /></div>
        </div>
      </div>
      <span className="visual-label">{second ? 'SYSTEM / 02' : 'SYSTEM / 01'}</span>
    </div>
  );
}

function ContactForm() {
  const [sent, setSent] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
  };

  if (sent) {
    return (
      <div className="form-success" role="status" data-testid="status-contact-success">
        <div>
          <div className="success-mark"><Check size={25} /></div>
          <h3>Signal received.</h3>
          <p>This is a frontend-only success state. Connect the form to a backend when the submission flow is ready.</p>
          <button className="reset-form" onClick={() => setSent(false)} data-testid="button-reset-contact">Send another signal →</button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} data-testid="form-contact">
      <div className="form-row">
        <div className="field"><label htmlFor="contact-name">Your name</label><input id="contact-name" value={name} onChange={(event) => setName(event.target.value)} placeholder="Name" required data-testid="input-contact-name" /></div>
        <div className="field"><label htmlFor="contact-email">Your email</label><input id="contact-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="name@domain.com" required data-testid="input-contact-email" /></div>
      </div>
      <div className="field"><label htmlFor="contact-message">Your message</label><textarea id="contact-message" value={message} onChange={(event) => setMessage(event.target.value)} placeholder="What are you building?" required data-testid="input-contact-message" /></div>
      <button className="form-submit" type="submit" data-testid="button-submit-contact">Send message <ArrowRight size={13} /></button>
    </form>
  );
}

function Home() {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => (localStorage.getItem('4ethr-theme') as 'dark' | 'light') || 'dark');
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('4ethr-theme', theme);
  }, [theme]);

  useEffect(() => {
    const updateProgress = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const percent = max > 0 ? (window.scrollY / max) * 100 : 0;
      document.documentElement.style.setProperty('--scroll-progress', `${percent}%`);
      const progress = document.querySelector<HTMLElement>('.page-progress');
      if (progress) progress.style.width = `${percent}%`;
    };
    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  useEffect(() => {
    if (!selectedProject) return;
    const closeWithEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedProject(null);
    };
    document.addEventListener('keydown', closeWithEscape);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', closeWithEscape);
      document.body.style.overflow = '';
    };
  }, [selectedProject]);

  const toggleTheme = () => setTheme((value) => value === 'dark' ? 'light' : 'dark');

  return (
    <>
      <Loader />
      <div className="page-progress" aria-hidden="true" />
      <div className="site-shell">
        <SiteNav theme={theme} onThemeToggle={toggleTheme} />
        <main>
          <section id="home" className="hero" data-testid="section-home">
            <Reveal className="hero-copy">
              <div className="hero-kicker"><span className="status-dot" /> 3 minds / 1 shared orbit</div>
              <h1 className="hero-title"><span className="outline">W E</span><br /><span className="accent">4</span>ETHR</h1>
              <p className="hero-lede">A three-person hackathon team turning open questions into clear, useful digital experiences.</p>
              <a href="#projects" className="hero-cta" data-testid="link-hero-projects">Explore our work <span className="cta-arrow"><ArrowRight size={14} /></span></a>
              <div className="hero-note"><span>Team portfolio</span><span>Frontend / UI / Ideas</span></div>
            </Reveal>
            <Reveal className="delay-2"><OrbitVisual /></Reveal>
          </section>

          <section id="about" className="section" data-testid="section-about">
            <Reveal><SectionIntro number="02" title="About" accent="4ETHR" copy="Three different minds, one shared purpose. Meet the people behind the orbit." /></Reveal>
            <Reveal className="delay-1">
              <div className="about-layout">
                <div className="about-visual" aria-label="4ETHR geometric identity visual">
                  <div className="about-visual-core"><span>4</span></div>
                  <div className="about-coordinates"><span>AXIS 00° 00′</span><span>4ETHR / CORE</span><span>VECTOR 00° 00′</span></div>
                </div>
                <div className="about-copy">
                  <h3>Different perspectives make better <em>systems.</em></h3>
                  <p>We are a team of three people who come together to build, explore, and create digital experiences. The specifics of our practice are still being written — this is the space for your story.</p>
                  <div className="spec-list">
                    <div className="spec-row"><span>Mode</span><span>Collaborative</span></div>
                    <div className="spec-row"><span>Focus</span><span>Ideas → Interfaces</span></div>
                    <div className="spec-row"><span>Current signal</span><span>Open to possibilities</span></div>
                  </div>
                </div>
              </div>
            </Reveal>
          </section>

          <section id="team" className="section" data-testid="section-team">
            <Reveal><SectionIntro number="03" title="Our" accent="Team" copy="Three different minds, one shared purpose. Add the people, roles, and voice that make 4ETHR yours." /></Reveal>
            <div className="team-grid">
              {team.map((member, index) => (
                <Reveal className={`delay-${index + 1}`} key={member.name}>
                  <article className="team-card" data-testid={`card-team-${member.index}`}>
                    <div className="member-art"><span className="member-index">{member.index}</span><span className="member-signal" /></div>
                    <div className="team-card-content">
                      <h3 className="member-name" data-testid={`text-member-${member.index}`}>{member.name}</h3>
                      <div className="member-role">{member.role}</div>
                      <p className="member-bio">{member.bio}</p>
                      <div className="tag-row">{member.tags.map((tag, tagIndex) => <span className="tag" key={`${member.index}-${tag}-${tagIndex}`}>{tag}</span>)}</div>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </section>

          <section id="projects" className="section projects" data-testid="section-projects">
            <Reveal><SectionIntro number="04" title="Featured" accent="Projects" copy="A showcase of what we build, explore, and experiment with. Project content is ready for your edits." /></Reveal>
            <div className="project-stack">
              {projects.map((project, index) => (
                <Reveal className={`delay-${index + 1}`} key={project.number}>
                  <article className="project-card" data-testid={`card-project-${project.number}`}>
                    <div className="project-info">
                      <div><div className="project-number">{project.number}</div><h3 className="project-title">{project.title}</h3><p className="project-desc">{project.description}</p></div>
                      <div><div className="tag-row"><span className="tag">[TECH]</span><span className="tag">[TECH]</span><span className="tag">[YEAR]</span></div><div className="project-editable">{project.label}</div><button className="project-link" onClick={() => setSelectedProject(project.number)} data-testid={`button-project-${project.number}`}>View project <ArrowRight size={13} /></button></div>
                    </div>
                    <ProjectVisual second={index === 1} />
                  </article>
                </Reveal>
              ))}
            </div>
          </section>

          <section id="skills" className="section" data-testid="section-skills">
            <Reveal><div className="skills-layout"><div><div className="eyebrow">05 / 06</div><h2 className="section-title">Our <em>Skills</em></h2><p className="skills-lede">Tools and practices we work with — editable to reflect the exact stack behind your next submission.</p><div className="section-rule" /></div><div className="skill-grid">{skills.map(([index, name, mark]) => <div className="skill-tile" key={index} data-testid={`tile-skill-${index}`}><span className="skill-icon">{mark}</span><span className="skill-name">{name}</span><span className="skill-note">active</span></div>)}</div></div></Reveal>
          </section>

          <section id="contact" className="section" data-testid="section-contact">
            <Reveal><div className="contact-panel"><div className="contact-copy"><div className="eyebrow">06 / 06</div><h2>Let&apos;s build<br /><span>something.</span></h2><p>Have an idea, a project, or a question to connect? We&apos;d love to hear from you.</p><div className="contact-meta"><a href="#contact" data-testid="link-contact-email"><Mail size={12} /> [EDITABLE EMAIL]</a><span><Github size={12} /> [GITHUB URL]</span><span><Linkedin size={12} /> [LINKEDIN URL]</span><span><Instagram size={12} /> [INSTAGRAM URL]</span></div></div><div className="contact-form-wrap"><ContactForm /></div></div></Reveal>
          </section>
        </main>
        {selectedProject && (
          <div className="project-modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setSelectedProject(null)}>
            <div className="project-modal" role="dialog" aria-modal="true" aria-labelledby="project-modal-title" data-testid="dialog-project">
              <button className="icon-button project-modal-close" onClick={() => setSelectedProject(null)} aria-label="Close project preview" data-testid="button-close-project"><X size={16} /></button>
              <div className="eyebrow">PROJECT / {selectedProject}</div>
              <h2 id="project-modal-title">{projects.find((project) => project.number === selectedProject)?.title}</h2>
              <p>This project preview is ready for your final content. Add the live URL, a cover image, a short case study, and the technologies used by the team.</p>
              <div className="modal-placeholder">[EDITABLE PROJECT URL]</div>
              <button className="hero-cta" onClick={() => setSelectedProject(null)} data-testid="button-return-projects">Return to projects <span className="cta-arrow"><ArrowRight size={14} /></span></button>
            </div>
          </div>
        )}
        <footer className="footer"><span><strong>4ETHR</strong> / team portfolio</span><span>Built for the next idea <a href="#home" data-testid="link-back-top">↑ back to top</a></span></footer>
      </div>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ErrorBoundary>
          <Home />
        </ErrorBoundary>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
import React, { useState, useEffect, useRef, useContext, createContext, useCallback } from 'react';
import { createRoot } from 'react-dom/client';
import { motion, AnimatePresence, MotionConfig, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, ArrowDown, ArrowRight, Play, X, Menu, Mail, Phone, MapPin, Instagram, Youtube, Github, Linkedin, Download, Pause, Search, Plus, Minus, ChevronLeft, ChevronRight, ExternalLink, MessageCircle } from 'lucide-react';
import './styles.css';

const MotionContext = createContext(true);
const EASE = [0.22, 1, 0.36, 1];
const EMAIL = 'abrarnoorhashmi@gmail.com';
const WHATSAPP = 'https://wa.me/923440167840';
const PHONE = '+92 344 0167840';

const categories = ['All', 'Facebook', 'Websites', 'Video', 'Automation'];
const projects = [
  { title: 'Abrar Hashmi Studios', category: 'Websites', type: 'Website', role: 'Founder & Creator', desc: 'The studio home for Abrar Hashmi — video editing, AI content creation, social media marketing, SEO, web development and virtual assistant support.', link: 'https://abrarhashmi.site', art: 'AHS', img: 'https://i.postimg.cc/YS6bLFPt/309702-8-gbyk.jpg' },
  { title: 'Abrar Series', category: 'Websites', type: 'Website', role: 'Creator', desc: 'A cinematic series-style portfolio site for Abrar Hashmi Studios.', link: 'https://abrar-series.vercel.app', art: 'SER', img: 'https://i.postimg.cc/W3S8Xvjk/309705-9-d8sn.jpg' },
  { title: 'AI Cinematic Ads', category: 'Video', type: 'Video', role: 'AI Video Creator', desc: 'AI-directed promotional films — scenes, pacing and sound designed to hold attention to the final frame.', link: '', art: 'ADS', img: 'https://i.postimg.cc/SsVdDhqf/309706-10-iu8s.jpg' },
  { title: 'Storm Hunters', category: 'Facebook', type: 'Facebook Page', role: 'Page by Abrar Hashmi Studios', desc: 'A Facebook page run by Abrar Hashmi Studios.', link: 'https://www.facebook.com/share/17goszk982/', art: 'SH' },
  { title: 'Deep Blue Tales', category: 'Facebook', type: 'Facebook Page', role: 'Page by Abrar Hashmi Studios', desc: 'A Facebook page run by Abrar Hashmi Studios.', link: 'https://www.facebook.com/share/17goszk982/', art: 'DBT' },
  { title: 'Future Arsenal', category: 'Facebook', type: 'Facebook Page', role: 'Page by Abrar Hashmi Studios', desc: 'A Facebook page run by Abrar Hashmi Studios.', link: 'https://www.facebook.com/share/17goszk982/', art: 'FA' },
  { title: "Mermaid's Cove", category: 'Facebook', type: 'Facebook Page', role: 'Page by Abrar Hashmi Studios', desc: 'A Facebook page run by Abrar Hashmi Studios.', link: 'https://www.facebook.com/share/17goszk982/', art: 'MC' },
  { title: 'Soldier Spirit', category: 'Facebook', type: 'Facebook Page', role: 'Page by Abrar Hashmi Studios', desc: 'A Facebook page run by Abrar Hashmi Studios.', link: 'https://www.facebook.com/share/17goszk982/', art: 'SS' },
  { title: 'NextGen Arsenal', category: 'Facebook', type: 'Facebook Page', role: 'Page by Abrar Hashmi Studios', desc: 'A Facebook page run by Abrar Hashmi Studios.', link: 'https://www.facebook.com/share/17goszk982/', art: 'NG' },
  { title: 'Wolf Mind', category: 'Facebook', type: 'Facebook Page', role: 'Page by Abrar Hashmi Studios', desc: 'A Facebook page run by Abrar Hashmi Studios.', link: 'https://www.facebook.com/share/17goszk982/', art: 'WM' },
  { title: 'ResumeCraft', category: 'Websites', type: 'Website', role: 'Creator', desc: 'A free, local-first resume builder with selectable-text PDF export.', link: 'https://resumecraft-ecru.vercel.app', art: 'RC' },
  { title: 'YouTube Automation Channels', category: 'Automation', type: 'Automation', role: 'YouTube Automation Specialist', desc: 'Faceless channel systems, end to end — research, scripts, production and publishing.', link: '', art: 'YT' },
  { title: 'AI Adventure / AI Vlogs', category: 'Video', type: 'Video', role: 'AI Video Creator', desc: 'AI travel stories — directed AI footage, scenes and stories.', link: '', art: 'VLOG' },
  { title: 'Product Promo Videos', category: 'Video', type: 'Video', role: 'Video Editor', desc: 'Showcase videos made for conversion — product, pacing and sound working together.', link: '', art: 'PRO' },
  { title: 'Portfolio Websites', category: 'Websites', type: 'Website', role: 'Web Developer', desc: 'Fast, responsive websites and interactive experiences for creators and studios.', link: 'https://abrarhashmi.site', art: 'WEB' },
  { title: 'Automation Systems', category: 'Automation', type: 'Automation', role: 'Digital Builder', desc: 'Workflows that remove repetitive work — so a small team can publish at scale.', link: '', art: 'AUTO' },
];
const featured = projects.slice(0, 3);
const certificates = [
  { title: 'Maximize Productivity With AI Tools', org: 'Google', year: '2026', detail: 'Coursera certificate, July 2026.', id: 'W970ANS0QBNW', verify: 'https://coursera.org/verify/W970ANS0QBNW', img: 'https://i.postimg.cc/ZY9QcwCZ/google-certificate.png', logo: './Asset/img/logo-google.svg' },
  { title: 'Generative AI: Introduction and Applications', org: 'IBM', year: '2026', detail: 'Coursera certificate, July 2026.', id: 'R8HY2BF7LNQ8', verify: 'https://coursera.org/verify/R8HY2BF7LNQ8', img: 'https://i.postimg.cc/rFxP6z11/ibm-certificate.png', logo: './Asset/img/logo-ibm.svg' },
  { title: 'Design Fundamentals with AI', org: 'Adobe', year: '2026', detail: 'Coursera certificate, July 2026.', id: 'QVZFD4ZUNF40', verify: 'https://coursera.org/verify/QVZFD4ZUNF40', img: 'https://i.postimg.cc/0yCXQ3Hz/adobe-certificate.png', logo: './Asset/img/logo-adobe.svg' },
];
const experiences = [
  { date: '2025 — PRESENT', title: 'AI Video Production Expert', place: 'Abrar Hashmi Studios', text: 'Advanced AI tools for cinematic video production — directed AI footage, scenes, ads and stories.' },
  { date: '2023', title: 'YouTube Automation Specialist', place: 'Abrar Hashmi Studios', text: 'Built and ran faceless YouTube channel systems, end to end.' },
  { date: '2022', title: 'Freelance Video Editor', place: 'Freelance', text: 'Turned editing into a professional freelance practice — cinematic cuts, pacing and sound.' },
  { date: '2021', title: 'Content Creator', place: 'Abrar Hashmi Studios', text: 'Started learning digital content and design, and building a studio practice around them.' },
];
const processSteps = [
  ['01', 'THE IDEA', 'Tell me the story. We agree the message, the visual direction and the feeling it should carry.'],
  ['02', 'THE PLAN', 'Concept, references and a workflow matched to the production — no wasted shoots, no wasted edits.'],
  ['03', 'THE CRAFT', 'Editing, AI generation and compositing. Every detail shaped into one story.'],
  ['04', 'THE POLISH', 'Colour, rhythm and sound, so every frame works the way it should.'],
  ['05', 'THE FINAL FRAME', 'Review together, final touches, then a result ready to meet its audience.'],
];
const skillBanners = [
  { title: 'VIDEO EDITING', img: 'https://i.postimg.cc/CxjT4mrf/309795-18-hpsi.jpg' },
  { title: 'AI VIDEO GENERATION', img: 'https://i.postimg.cc/KYN664yf/309796-19-l2x5.jpg' },
  { title: 'CONTENT CREATION', img: 'https://i.postimg.cc/GmRrxSQ6/311969-2-znwe.jpg' },
  { title: 'PROMPT ENGINEERING', img: 'https://i.postimg.cc/gJ2Cmdz3/309798-21-80nt.jpg' },
  { title: 'GRAPHIC DESIGNING', img: 'https://i.postimg.cc/MpYwPb3W/311970-3-v0b3.jpg' },
  { title: 'YOUTUBE AUTOMATION', img: 'https://i.postimg.cc/9QHszymN/309801-23-x9ks.jpg' },
  { title: 'WEB DEVELOPMENT', img: 'https://i.postimg.cc/dVFvjSBB/1793883282294-1-riom.jpg' },
  { title: 'SOCIAL MEDIA MARKETING', img: 'https://i.postimg.cc/LX5bGTDX/309803-25-i396.jpg' },
  { title: 'GUEST POSTING & SEO', img: 'https://i.postimg.cc/KvBxLynj/1793883276770-0-0csz.jpg' },
];
const services = ['AI Video Creation', 'Video Editing', 'Graphic Design', 'Website Development', 'YouTube Automation', 'Social Media Marketing', 'Meta Ads Management', 'Guest Posting & SEO'];
const tools = ['CapCut', 'Alight Motion', 'ElevenLabs', 'Google Flow', 'Sora', 'React', 'Tailwind CSS'];
const roles = [
  { title: 'Video Editor', img: 'https://i.postimg.cc/hGPy7rHs/309777-11-cjdn.jpg' },
  { title: 'Web Developer', img: 'https://i.postimg.cc/jjg86fTN/309778-12-jfez.jpg' },
  { title: 'Content Creator', img: 'https://i.postimg.cc/sXbwqR1b/309779-13-lrz4.jpg' },
  { title: 'AI Video Creator', img: 'https://i.postimg.cc/66GHRTms/309780-14-2hq4.jpg' },
  { title: 'AI Creator & Digital Builder', img: 'https://i.postimg.cc/MK29YxC7/309781-15-sum8.jpg' },
  { title: 'YouTube Automation Specialist', img: 'https://i.postimg.cc/Dw75t6yS/309782-16-r59n.jpg' },
  { title: 'Social Media Manager', img: 'https://i.postimg.cc/yNdjNNZw/309783-17-lmnv.jpg' },
];

function Reveal({ children, className = '', delay = 0, as = 'div' }) {
  const enabled = useContext(MotionContext);
  const C = motion[as];
  return <C className={className} initial={enabled ? { opacity: 0, y: 32 } : false} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.12 }} transition={{ duration: enabled ? 0.75 : 0, delay, ease: EASE }}>{children}</C>;
}
function Magnetic({ children, className = '', href = '#portfolio', ...props }) {
  const enabled = useContext(MotionContext);
  const x = useSpring(0, { stiffness: 220, damping: 20 });
  const y = useSpring(0, { stiffness: 220, damping: 20 });
  return <motion.a href={href} className={className} style={{ x, y }} onPointerMove={e => { if (!enabled || e.pointerType !== 'mouse') return; const r = e.currentTarget.getBoundingClientRect(); x.set((e.clientX - r.left - r.width / 2) * 0.12); y.set((e.clientY - r.top - r.height / 2) * 0.2); }} onPointerLeave={() => { x.set(0); y.set(0); }} {...props}>{children}</motion.a>;
}
function Header({ enabled, onToggle, onSwarm }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('home');
  useEffect(() => {
    const obs = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) setActive(e.target.id); }), { rootMargin: '-15% 0px -65% 0px' });
    document.querySelectorAll('main > section[id]').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
  useEffect(() => { const k = e => { if (e.key === 'Escape') setOpen(false); }; window.addEventListener('keydown', k); return () => window.removeEventListener('keydown', k); }, []);
  const links = [['portfolio', 'Work'], ['about', 'About'], ['recognition', 'Recognition'], ['roles', 'Roles'], ['experience', 'Journey'], ['contact', 'Contact']];
  return <header className="site-header">
    <a className="wordmark" href="#home" aria-label="Abrar Hashmi, home">ABRAR HASHMI<b>.</b></a>
    <nav className="nav" aria-label="Main navigation">{links.map(([id, label]) => <a key={id} href={`#${id}`} className={active === id ? 'on' : ''}>{label}</a>)}</nav>
    <div className="head-actions">
      <button className="motion-btn" onClick={onToggle} aria-pressed={!enabled} aria-label={enabled ? 'Turn motion off' : 'Turn motion on'}>{enabled ? <Pause size={13} /> : <Play size={13} />}<span>Motion {enabled ? 'on' : 'off'}</span></button>
      <button className="swarm-btn" onClick={onSwarm}>▶ Play Swarm Build</button>
      <a className="talk" href="#contact">Let&rsquo;s talk <ArrowUpRight size={16} /></a>
      <button className="icon-btn menu-btn" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? 'Close menu' : 'Open menu'}>{open ? <X /> : <Menu />}</button>
    </div>
    <AnimatePresence>{open && <motion.nav id="mobile-menu" className="mobile-nav" aria-label="Mobile navigation" initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>{[['home', 'Home'], ...links].map(([id, label], i) => <a key={id} href={`#${id}`} onClick={() => setOpen(false)}><span>0{i + 1}</span>{label}<ArrowUpRight size={18} /></a>)}</motion.nav>}</AnimatePresence>
  </header>;
}
function Hero({ onProject }) {
  const ref = useRef(null);
  const enabled = useContext(MotionContext);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const titleY = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, 85]);
  const portraitScale = useTransform(scrollYProgress, [0, 1], [1, 1.07]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -55]);
  return <section id="home" className="hero" ref={ref} data-swarm="Hero">
    <div className="hero-top"><span><span className="role">AI CONTENT CREATOR<br /></span><span className="muted">VIDEO EDITOR / WEB DEVELOPER</span></span><span className="avail"><i />AVAILABLE FOR COLLABORATION</span></div>
    <motion.div className="hero-word display" aria-hidden="true" style={enabled ? { y: titleY } : {}} initial={enabled ? { clipPath: 'inset(0 0 100% 0)' } : false} animate={{ clipPath: 'inset(0 0 0% 0)' }} transition={{ duration: 1.4, ease: EASE }}>PORTFOLIO</motion.div>
    <motion.div className="hero-portrait" style={enabled ? { y: portraitY, scale: portraitScale } : {}} initial={enabled ? { opacity: 0 } : false} animate={{ opacity: 1 }} transition={{ duration: 1.2, delay: 0.2 }}><img src="https://i.postimg.cc/YCQBGfsL/abrar-portrait.png" alt="Abrar Hashmi, transparent cut-out portrait in a dark suit with a red tie and red rim light" width="1376" height="768" fetchPriority="high" /></motion.div>
    <motion.div className="hero-intro" style={enabled ? { y: copyY } : {}} initial={enabled ? { opacity: 0, x: -35 } : false} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, delay: 0.35, ease: EASE }}>
      <p className="hand">Hello, I&rsquo;m</p><h1 className="display">ABRAR<br />HASHMI<span>.</span></h1>
      <p className="hero-role">AI CONTENT CREATOR &amp;<br />VIDEO EDITOR</p>
      <p className="hero-desc">Ideas into visuals. Stories into experiences.<br />I turn concepts into cinematic content, digital campaigns and responsive websites.</p>
      <Magnetic href="#portfolio" className="cta">See my work <ArrowDown size={17} /></Magnetic>
      <span className="hero-loc"><MapPin size={12} /> PAKISTAN</span>
    </motion.div>
    <motion.div className="hero-side" initial={enabled ? { opacity: 0, x: 30 } : false} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.55, ease: EASE }}>
      <div className="manifesto"><span className="dot" aria-hidden="true">✳</span><p>Create with purpose.<br />Build beyond limits.</p></div>
      <div>
        <div className="stat"><span className="num display">9</span><p>CORE DIGITAL<br />SKILLS</p></div>
        <div className="stat"><span className="num display">8</span><p>DIGITAL<br />SERVICES</p></div>
        <div className="stat"><span className="num display">5+</span><p>YEARS<br />CREATING</p></div>
        <a className="cv-link" href={WHATSAPP} target="_blank" rel="noopener noreferrer"><MessageCircle size={16} /><span>ASK FOR MY CV ON WHATSAPP</span></a>
      </div>
    </motion.div>
    <div className="hero-bottom"><button className="reel-btn" onClick={() => onProject(projects[2])}><span className="play-ring"><Play size={12} fill="currentColor" /></span>PLAY FEATURED WORK<span className="muted">AI / VIDEO</span></button><span className="scroll-hint">SCROLL TO DISCOVER <ArrowDown size={13} /></span><span className="muted">SELECTED WORK / 2021 — PRESENT</span></div>
  </section>;
}
function Card({ project, index, onOpen }) {
  const enabled = useContext(MotionContext);
  return <motion.article className="card" layout initial={enabled ? { opacity: 0, y: 32 } : false} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.08 }} transition={{ duration: enabled ? 0.6 : 0, delay: (index % 3) * 0.06, ease: EASE }} exit={{ opacity: 0, scale: 0.96 }}>
    <button className="card-open" onClick={() => onOpen(project)} aria-label={`View ${project.title}`}>
      <span className="card-art">{project.img ? <><img className="card-img" src={project.img} alt="" loading="lazy" /><span className="card-shade" /><span className="tag">{project.role}</span></> : <><span className="big display">{project.art}</span><span className="tag">{project.role}</span></>}</span>
      <span className="card-type">{project.type.toUpperCase()}</span>
      <span className="card-hover"><ArrowUpRight size={22} /></span>
    </button>
    <button className="card-cap" onClick={() => onOpen(project)}><span className="card-num display">{String(index + 1).padStart(2, '0')}</span><span style={{ flex: 1, minWidth: 0 }}><h3>{project.title}</h3><span className="card-cat">{project.category}</span></span><ArrowUpRight size={20} /></button>
  </motion.article>;
}
function Portfolio({ onProject }) {
  const [category, setCategory] = useState('All');
  const [query, setQuery] = useState('');
  const [expanded, setExpanded] = useState(false);
  const [limit, setLimit] = useState(9);
  const results = projects.filter(p => (category === 'All' || p.category === category) && `${p.title} ${p.category} ${p.role}`.toLowerCase().includes(query.toLowerCase()));
  const list = expanded || category !== 'All' || query ? results.slice(0, limit) : featured;
  return <section id="portfolio" className="wrap" data-swarm="Selected Work">
    <Reveal className="sec-head"><div><span className="eyebrow muted">01 / Selected Work</span><h2>WORK THAT SPEAKS<span className="accent">.</span></h2></div><button className="text-link" onClick={() => { if (expanded) { setExpanded(false); setCategory('All'); setQuery(''); } else { setExpanded(true); setLimit(9); } }}>{expanded ? 'FEATURED WORK' : 'ALL WORK'}<ArrowRight size={21} /></button></Reveal>
    <Reveal className="toolbar">
      <div className="filters" role="group" aria-label="Work categories">{categories.map(c => <button key={c} className={category === c ? 'sel' : ''} aria-pressed={category === c} onClick={() => { setCategory(c); setExpanded(true); setLimit(9); }}>{c}{c === category && <motion.span className="filter-line" layoutId="filter-line" />}</button>)}</div>
      <label className="search"><Search size={15} /><span>Search</span><input aria-label="Search work" type="search" placeholder="Title or category…" value={query} onChange={e => { setQuery(e.target.value); setExpanded(true); setLimit(9); }} /></label>
    </Reveal>
    <motion.div className="grid" layout><AnimatePresence mode="popLayout">{list.map((p, i) => <Card key={p.title} project={p} index={i} onOpen={onProject} />)}</AnimatePresence></motion.div>
    {list.length === 0 && <div className="empty"><p>No work found for “{query}”.</p><button className="text-link" onClick={() => { setQuery(''); setCategory('All'); }}>Reset search <X size={15} /></button></div>}
    {expanded && results.length > limit && <div className="load-more"><button className="outline-btn" onClick={() => setLimit(v => v + 9)}>Show more work <Plus size={16} /></button><span>{list.length} of {results.length} projects</span></div>}
  </section>;
}
function Recognition() {
  const [active, setActive] = useState(0);
  const [popped, setPopped] = useState(null);
  const popTimer = useRef(null);
  const pop = (i) => {
    setActive(i);
    setPopped(i);
    if (popTimer.current) clearTimeout(popTimer.current);
    popTimer.current = setTimeout(() => setPopped(null), 650);
  };
  return <section id="recognition" className="wrap recognition" data-swarm="Recognition">
    <Reveal><span className="eyebrow muted">Recognition &amp; Certificates</span><h2 className="display">THE WORK.<br /><span className="accent">THE PROOF.</span></h2><p>Work made with care, backed by real learning — not invented awards. These are the certificates on my profile. Hover a card to lift it, click it to pop it.</p><div className="cert-total"><span className="num display">3<span>+</span></span><span>COURSERA<br />CERTIFICATES</span></div></Reveal>
    <div className="cert-tabs" role="group" aria-label="Choose certificate">{certificates.map((c, i) => <button key={c.id} type="button" className={active === i ? 'sel' : ''} onClick={() => pop(i)}>{c.org}</button>)}</div>
    <div className="cert-stack" onMouseLeave={() => setActive(0)}>
      {certificates.map((c, i) => {
        const isActive = active === i;
        const isPopped = popped === i;
        return <motion.button key={c.id} type="button" className="cert-card" aria-label={`${c.title} — ${c.org}`}
          initial={{ opacity: 0, y: 48, rotate: 0 }}
          whileInView={{ opacity: 1, rotate: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: i * 0.14, ease: EASE }}
          animate={{
            y: isPopped ? -26 : (isActive ? -18 : 0),
            scale: isPopped ? 1.07 : (isActive ? 1.04 : 1),
            x: 0,
            rotate: 0,
            boxShadow: isActive || isPopped ? '0 24px 60px rgba(227,43,60,.35), 0 8px 30px rgba(0,0,0,.6)' : '0 10px 30px rgba(0,0,0,.45)',
          }}
          style={{ zIndex: isActive || isPopped ? 30 : 20 - i }}
          onMouseEnter={() => setActive(i)}
          onFocus={() => setActive(i)}
          onClick={() => pop(i)}>
          <span className="cert-badge"><img className="cert-logo" src={c.logo} alt={`${c.org} official logo, recoloured to the site theme`} />{c.org}</span>
          <img className="cert-img" src={c.img} alt={`${c.title} certificate`} loading="lazy" />
          <span className="cert-meta"><strong>{c.title}</strong><span>{c.org} · July 2026 · ID {c.id}</span><a href={c.verify} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>Verify on Coursera <ExternalLink size={12} /></a></span>
        </motion.button>;
      })}
    </div>
  </section>;
}
function Process() {
  return <section id="process" className="wrap process-sec" data-swarm="Process">
    <Reveal><span className="eyebrow muted">From Idea to Final Frame</span><h2 className="display">FROM IDEA.<br /><span className="accent">TO FINAL FRAME.</span></h2><p>One clear workflow, whether it is a video, an AI film, a channel system or a website.</p></Reveal>
    <div className="process-steps">{processSteps.map(([n, t, d]) => <Reveal key={n} className="step"><span className="n display">{n}</span><div><h4>{t}</h4><p>{d}</p></div></Reveal>)}</div>
  </section>;
}
function About() {
  return <section id="about" className="wrap" data-swarm="About">
    <Reveal className="about-lead"><div><span className="eyebrow muted">02 / Behind the Frames</span><h2 className="display">NOT JUST VISUALS.<br />A WAY OF <span className="accent">TELLING STORIES.</span></h2></div><p>I&rsquo;m Abrar Hashmi, founder of Abrar Hashmi Studios from Pakistan. I work across video editing, AI video, YouTube automation and web development — combining the creative and the technical to build stories that hold attention.</p></Reveal>
    <div className="studio">
      <Reveal className="panel"><h3>EDUCATION &amp; LANGUAGES</h3><p className="eyebrow accent">EDUCATION</p><div className="edu"><strong>Punjab College Lahore</strong><span>Intermediate</span><p>No degree or graduation year is claimed — graduation is not complete.</p></div><p className="eyebrow accent" style={{ marginTop: 22 }}>LANGUAGES</p><p style={{ fontSize: 12, marginTop: 8 }}>Urdu — Native · Punjabi — Native · English — Full professional</p><p className="tools">TOOLS: {tools.join(' · ')}</p></Reveal>
      <Reveal className="panel"><h3>SERVICES</h3><div className="tags">{services.map(s => <span key={s}>{s}</span>)}</div><p style={{ fontSize: 12, color: 'var(--muted)', marginTop: 18 }}>Services are remote. Contact me for pricing — no prices are invented here.</p></Reveal>
      <Reveal className="panel quote"><span className="mark display">&ldquo;</span><blockquote>From a vague idea<br />to a repeatable system —<br /><em>and visuals that feel cinematic.</em></blockquote><span className="hand">Abrar Hashmi</span><div className="quote-foot">LET&rsquo;S MAKE<br />THE NEXT FRAME COUNT.<span style={{ color: '#ff4255', fontSize: 26 }}> ✳</span></div></Reveal>
    </div>
    <Reveal className="skills-full"><h3>SKILLS</h3><div className="skill-strips-full">{skillBanners.map(b => <figure key={b.title} className="skill-item"><img className="skill-strip" src={b.img} alt={b.title} loading="lazy" /></figure>)}</div></Reveal>
  </section>;
}
function Roles() {
  return <section id="roles" className="wrap roles-sec" data-swarm="Roles">
    <Reveal className="roles-full"><h3>ROLES</h3><div className="role-strip" role="list" aria-label="Roles">{roles.map(r => <button key={r.title} type="button" className="role-item" role="listitem" aria-label={r.title}><img src={r.img} alt={r.title} loading="lazy" /><span>{r.title}</span></button>)}</div></Reveal>
  </section>;
}
function Journey() {
  const [open, setOpen] = useState(0);
  return <section id="experience" className="wrap" data-swarm="Journey">
    <Reveal className="sec-head"><div><span className="eyebrow muted">03 / The Journey</span><h2>KEEP MOVING. KEEP CREATING<span className="accent">.</span></h2></div><a className="text-link" href={WHATSAPP} target="_blank" rel="noopener noreferrer">ASK FOR RESUME <ArrowUpRight size={18} /></a></Reveal>
    <div className="journey-grid"><div>{experiences.map((job, i) => <Reveal className="exp" key={job.title}><button aria-expanded={open === i} aria-controls={`job-${i}`} onClick={() => setOpen(open === i ? null : i)}><span className="exp-date">{job.date}</span><span><h3>{job.title}</h3><span className="exp-place">{job.place}</span></span>{open === i ? <Minus size={18} /> : <Plus size={18} />}</button><AnimatePresence initial={false}>{open === i && <motion.div id={`job-${i}`} initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease: EASE }}><p>{job.text}</p></motion.div>}</AnimatePresence></Reveal>)}</div>
    <Reveal className="side-panel"><p className="eyebrow muted">A FEW MILESTONES</p><h3 className="display">LITTLE WINS.<br /><span className="accent">BIG MEANING.</span></h3><ul>{certificates.map(c => <li key={c.title}>{c.title}<small>{c.org} · {c.year}</small></li>)}</ul></Reveal></div>
  </section>;
}
function Contact({ onProject }) {
  const [sent, setSent] = useState(false);
  const send = e => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const text = `Hello Abrar, I am ${data.get('name')}.\n\nProject type: ${data.get('type')}\n${data.get('message')}`;
    window.open(`${WHATSAPP}?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
    setSent(true);
  };
  return <section id="contact" className="wrap" data-swarm="Contact">
    <div className="contact-grid">
      <Reveal><span className="eyebrow muted">04 / Your Next Story</span><h2 className="display">LET&rsquo;S WORK<br />TOGETHER<span className="accent">.</span></h2><p>Have a story you want to bring to life?<br />Let&rsquo;s make something worth watching.</p><Magnetic href={WHATSAPP} className="contact-cta"><span className="round-arrow"><ArrowUpRight size={21} /></span>START A CONVERSATION</Magnetic></Reveal>
      <Reveal delay={0.1} className="contact-links">
        <a href={`mailto:${EMAIL}`}><Mail /><span><small>EMAIL</small>{EMAIL}</span><ArrowUpRight size={16} /></a>
        <a href="https://www.instagram.com/abrarhashmi_era/" target="_blank" rel="noopener noreferrer"><Instagram /><span><small>INSTAGRAM</small>@abrarhashmi_era</span><ArrowUpRight size={16} /></a>
        <a href="https://youtube.com/@toxic_hashmi_editx" target="_blank" rel="noopener noreferrer"><Youtube /><span><small>YOUTUBE</small>@toxic_hashmi_editx</span><ArrowUpRight size={16} /></a>
        <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"><Phone /><span><small>PHONE / WHATSAPP</small>{PHONE}</span><ArrowUpRight size={16} /></a>
        <div><MapPin /><span><small>BASED IN</small>Pakistan · Lahore, Punjab</span></div>
      </Reveal>
      <Reveal className="reel-card" delay={0.2}><button onClick={() => onProject(projects[0])} aria-label="Open Abrar Hashmi Studios work"><div className="reel-box"><span className="top">ABRAR HASHMI®<span>STUDIO / SHOWCASE</span></span><img src="https://i.postimg.cc/YCQBGfsL/abrar-portrait.png" alt="Abrar Hashmi" /><span className="title display">MAKE IT<br /><span>FEEL REAL.</span></span><span className="play-ring"><Play size={18} fill="currentColor" /></span></div><span className="reel-cap">PRESS TO OPEN THE STUDIO WORK.</span></button></Reveal>
    </div>
    <Reveal><details className="brief"><summary>Tell me about your project <Plus size={19} /></summary><form onSubmit={send}><label>Your name<input name="name" required placeholder="Your name or brand" autoComplete="name" maxLength="100" /></label><label>Project type<select name="type"><option>Video Editing</option><option>AI Video Creation</option><option>YouTube Automation</option><option>Website Development</option><option>Graphic Design</option><option>Social Media Marketing</option><option>Meta Ads Management</option><option>Guest Posting &amp; SEO</option><option>Other collaboration</option></select></label><label className="full">About the project<textarea name="message" required rows="3" placeholder="Tell me the idea, what you need, and the rough timeline…" maxLength="3000" /></label><button className="solid-btn" type="submit">Continue to WhatsApp <ArrowUpRight size={18} /></button><p className="form-note" role="status">{sent ? 'Draft message ready in WhatsApp. Press Send there to start the conversation.' : 'Your brief will open as a draft message in WhatsApp.'}</p></form></details></Reveal>
  </section>;
}
function Dialog({ project, onClose }) {
  const ref = useRef(null);
  useEffect(() => {
    const prev = document.activeElement; const old = document.body.style.overflow; document.body.style.overflow = 'hidden'; ref.current?.focus();
    const onKey = e => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = old; window.removeEventListener('keydown', onKey); prev?.focus(); };
  }, [onClose]);
  return <motion.div className="backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
    <motion.div ref={ref} className="dialog" role="dialog" aria-modal="true" aria-labelledby="dialog-title" tabIndex={-1} initial={{ y: 45, scale: 0.97 }} animate={{ y: 0, scale: 1 }} exit={{ y: 20, opacity: 0 }} transition={{ duration: 0.35, ease: EASE }}>
      <div className="dialog-head"><span className="eyebrow accent">{project.category} · {project.type}</span><button className="icon-btn" onClick={onClose} aria-label="Close work"><X /></button></div>
      <div className="dialog-art">{project.img ? <><img className="dialog-img" src={project.img} alt={project.title} /><span className="dialog-shade" /></> : <><span className="big display">{project.art}</span></>}</div>
      <div className="dialog-body"><div><h2 id="dialog-title">{project.title}</h2><span className="accent" style={{ fontSize: 12 }}>{project.role}</span><p>{project.desc}</p></div>{project.link && <a className="outline-btn" href={project.link} target="_blank" rel="noopener noreferrer">Open original <ExternalLink size={15} /></a>}</div>
    </motion.div>
  </motion.div>;
}
/* Swarm preview — v9 build, restored (2026-11-06 revert).
   The user rejected v10/v11 outright: back to the v9 build exactly
   as it was — parallel 12 lanes, 18 cursors working together within
   each section, ~55s, camera follows the section, drag-and-drop
   frames, visible typing, grayscale-to-colour reveal, snap pop.
   Restored from the actual v9 bundle (commit d51a76fc), not from
   memory: timings, lane structure, cursor shape/colours and the
   veil copy are v9's. ONLY TWO changes vs v9:
   1. The name tags above the cursors are REMOVED — plain cursors
      only, no names anywhere (the reference video has no names).
      Cursor colours stay v9's, cursor shape stays v9's classic
      white arrow with a black outline.
   2. BLACK-SCREEN INTRO with a proper Framer Motion entrance: when
      Play is pressed the screen goes black, "BUILDING." animates in
      letter by letter (Renando's reveal — opacity 0, y 32, ease
      [.25,.1,.35,1], staggered), then the veil fades out with
      Framer Motion and the v9 build runs on the blank page.
   Motion sources studied 2026-11-06 (study only, nothing copied):
   - DhvanilPatel/swarm-cursors (tribute to Joel Califa's Swarm):
     page fades out, cursors orbit then fan out; arc hops with a
     bowed midpoint (80-120ms); easeOut cubic for drags, easeInOut
     for short drags; rects crosshair-dragged with a placeholder,
     fill fades in; text dragged into a box and typed with an
     I-beam + blinking caret, big headings stepping up from small;
     images sweep top to bottom. v9 already moves this way (arc
     hops 80-120ms, ease-out drags, drag-in frames, grayscale-to-
     colour reveal, blinking caret) — kept as-is.
   - Renando's site (renando.duingzcreative.site, public bundle):
     Framer Motion Reveal — initial {opacity:0, y:32},
     whileInView {opacity:1, y:0}, viewport {once:false,
     amount:.12}, duration .75, ease [.25,.1,.35,1]; cards
     duration .6 with (index%3)*.06 stagger, exit {opacity:0,
     scale:.96}. Our site's Reveal/Card already use this pattern;
     the swarm veil entrance uses Renando's exact ease + y-32
     reveal + stagger. No Renando assets, copy, photos, logos or
     contact details are used, and no external script is loaded. */
// v9 cursor colours, in v9 order — colours only, NO names anywhere
// (the reference video has plain small cursors, nothing written
// above them).
const CURSOR_COLORS = ['#ff5d65', '#ffd166', '#7dd3fc', '#c4b5fd', '#86efac', '#fda4af', '#fbbf24', '#67e8f9', '#f0abfc', '#a3e635', '#fb923c', '#93c5fd', '#fca5a5', '#5eead4', '#d8b4fe', '#fde68a', '#6ee7b7', '#f9a8d4'];
const FRAME_SEL = '.card-open, .panel, .step, .exp, .cert-row, .cert-card, .role-item, .skill-item, .hero-portrait, .reel-box';
const sleep = ms => new Promise(r => setTimeout(r, ms));
const rnd = (a, b) => a + Math.random() * (b - a);
const PHASE_ORDER = ['Header', 'Hero', 'Selected Work', 'Process', 'About', 'Skills', 'Recognition', 'Roles', 'Journey', 'Contact', 'Footer'];
// Renando's reveal ease, used for the black-screen intro.
const VEIL_EASE = [0.25, 0.1, 0.35, 1];
function phaseOf(el) {
  if (el.closest('.skills-full')) return 'Skills';
  if (el.closest('header')) return 'Header';
  if (el.closest('footer')) return 'Footer';
  const sec = el.closest('main > section');
  return sec ? (sec.dataset.swarm || sec.id || 'Section') : 'Page';
}
function Swarm({ onDone }) {
  const [veil, setVeil] = useState(true);
  const [status, setStatus] = useState('Starting from a blank page…');
  const [pos, setPos] = useState(CURSOR_COLORS.map(() => ({ x: -100, y: -100 })));
  const [active, setActive] = useState([]);
  const lastPosRef = useRef(CURSOR_COLORS.map(() => ({ x: -100, y: -100 })));
  const doneRef = useRef(false);
  const restoreRef = useRef(null);
  const doneCountRef = useRef(0);
  const totalRef = useRef(0);
  const setStatusCount = useCallback((phase) => {
    setStatus(`Building ${phase} — ${doneCountRef.current} of ${totalRef.current} items, all together, 12 lanes`);
  }, []);
  const finish = useCallback(async () => {
    if (doneRef.current) return; doneRef.current = true;
    if (restoreRef.current) restoreRef.current();
    document.body.classList.remove('swarm-building', 'swarm-wireframe');
    setActive([]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    await sleep(700);
    onDone();
  }, [onDone]);
  useEffect(() => {
    let cancelled = false;
    const clampX = x => Math.min(Math.max(8, x), window.innerWidth - 170);
    const clampY = y => Math.min(Math.max(8, y), window.innerHeight - 60);
    const moveCursor = (idx, x, y) => {
      lastPosRef.current[idx] = { x: clampX(x), y: clampY(y) };
      setPos(prev => prev.map((p, i) => i === idx ? { x: clampX(x), y: clampY(y) } : p));
    };
    // Arc travel (swarm-cursors style): bow upward through a midpoint
    // between where the cursor actually is and its target — 80-120ms
    // hops, no straight-line jumps.
    const arcMove = async (idx, x, y) => {
      const cur = lastPosRef.current[idx] || { x, y };
      const midX = (cur.x + x) / 2 + rnd(-60, 60);
      const midY = Math.min(cur.y, y) - rnd(50, 110);
      moveCursor(idx, midX, midY);
      await sleep(Math.round(rnd(80, 120)));
      moveCursor(idx, x, y);
    };
    const run = async () => {
      // Snapshot every visible text node in header/main/footer.
      const roots = [document.querySelector('header'), document.querySelector('main'), document.querySelector('footer')].filter(Boolean);
      const textUnits = [];
      roots.forEach(root => {
        const tw = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, { acceptNode(n) {
          const t = n.nodeValue.trim();
          if (!t) return NodeFilter.FILTER_REJECT;
          const par = n.parentElement;
          if (!par) return NodeFilter.FILTER_REJECT;
          if (par.closest('select') || par.closest('.swarm-bar') || par.closest('.swarm-veil') || par.closest('.mobile-nav')) return NodeFilter.FILTER_REJECT;
          if (getComputedStyle(par).display === 'none') return NodeFilter.FILTER_REJECT;
          return NodeFilter.FILTER_ACCEPT;
        }});
        let n; while ((n = tw.nextNode())) textUnits.push({ node: n, parent: n.parentElement, text: n.nodeValue, phase: phaseOf(n.parentElement) });
      });
      // Frames: boxed elements that are dragged in empty, then their texts are typed.
      const frameEls = Array.from(document.querySelectorAll(FRAME_SEL)).filter(el => !el.closest('.swarm-bar') && el.getBoundingClientRect().width > 0);
      const frameSet = new Set(frameEls);
      const frameOf = el => { let c = el; while (c) { if (frameSet.has(c)) return c; c = c.parentElement; } return null; };
      // Clear all text, hide frames, images and icons. Nothing is visible yet.
      textUnits.forEach(u => { u.node.nodeValue = ''; });
      const imgs = Array.from(document.querySelectorAll('header img, main img, footer img'));
      const svgs = Array.from(document.querySelectorAll('header svg, main svg, footer svg'));
      imgs.forEach(i => { i.style.opacity = '0'; });
      svgs.forEach(s => { s.style.opacity = '0'; });
      frameEls.forEach(el => {
        el.setAttribute('data-swarm-hidden', '1');
        el.style.transition = 'transform 450ms cubic-bezier(.22,1,.36,1), opacity 450ms';
        el.style.transform = `translate(${Math.round(rnd(-220, -120))}px, ${Math.round(rnd(80, 150))}px) scale(.9)`;
        el.style.opacity = '0';
      });
      // Footer social links have no text: they are icon-only drag units.
      const iconUnits = Array.from(document.querySelectorAll('footer .socials a')).map(el => ({ kind: 'icon', el, phase: 'Footer' }));
      restoreRef.current = () => {
        textUnits.forEach(u => { try { u.node.nodeValue = u.text; } catch {} u.parent.classList.remove('swarm-typing'); });
        frameEls.forEach(el => { el.removeAttribute('data-swarm-hidden'); el.style.opacity = ''; el.style.transform = ''; el.style.transition = ''; el.classList.remove('swarm-drawing', 'swarm-snap', 'swarm-lift'); delete el.dataset.swarmDone; });
        imgs.forEach(i => { i.style.opacity = ''; });
        svgs.forEach(s => { s.style.opacity = ''; });
      };
      document.body.classList.add('swarm-building');
      window.scrollTo(0, 0);
      // Black screen holds long enough for the BUILDING entrance
      // (letters stagger in over ~1.1s) to actually be seen, then the
      // veil fades out with Framer Motion and the build runs.
      await sleep(1100); if (cancelled || doneRef.current) return;
      setVeil(false);
      // Build groups: a frame + its inner text units = one group; a text unit
      // outside any frame = its own group. Groups are atomic for a lane.
      const groups = [];
      const groupByFrame = new Map();
      const standaloneByKey = new Map();
      textUnits.forEach(u => {
        const f = frameOf(u.parent);
        if (f) {
          if (!groupByFrame.has(f)) groupByFrame.set(f, { frame: f, texts: [], phase: phaseOf(f), top: 0 });
          groupByFrame.get(f).texts.push(u);
        } else {
          const container = u.parent.closest('.filters, .nav, .socials');
          let keyEl = container;
          if (!keyEl) {
            keyEl = u.parent;
            while (keyEl && ['SPAN', 'B', 'I', 'EM', 'SMALL', 'STRONG'].includes(keyEl.tagName)) keyEl = keyEl.parentElement;
            keyEl = keyEl || u.parent;
          }
          const key = keyEl;
          if (!standaloneByKey.has(key)) standaloneByKey.set(key, { frame: null, texts: [], phase: u.phase, top: 0 });
          standaloneByKey.get(key).texts.push(u);
        }
      });
      groupByFrame.forEach(g => groups.push(g));
      standaloneByKey.forEach(g => groups.push(g));
      // Frames with no text at all (hero portrait) must still be built.
      frameEls.forEach(el => { if (!groupByFrame.has(el)) groups.push({ frame: el, texts: [], phase: phaseOf(el), top: 0 }); });
      // Footer social icons: ONE group, one cursor revealing them in
      // sequence, not 5 parallel cursors clustered on 44px icons.
      if (iconUnits.length) groups.push({ frame: null, texts: [], phase: 'Footer', top: 0, iconEls: iconUnits.map(u => u.el) });
      groups.forEach(g => {
        const el = g.frame || (g.texts[0] && g.texts[0].parent);
        g.top = el ? el.getBoundingClientRect().top + window.scrollY : 0;
      });
      // Order groups by phase, then by document top within the phase.
      const ordered = [];
      PHASE_ORDER.forEach(ph => {
        const list = groups.filter(g => g.phase === ph).sort((a, b) => a.top - b.top);
        ordered.push(...list);
      });
      groups.forEach(g => { if (!ordered.includes(g)) ordered.push(g); });
      totalRef.current = textUnits.length + frameEls.length + iconUnits.length;
      doneCountRef.current = 0;
      // ensureVisible: scroll smoothly so the element sits CENTRED in
      // the viewport before anyone works on it. A scroll guard (one
      // scroll per 500ms) stops parallel lanes fighting the camera.
      let lastScrollAt = 0;
      const ensureVisible = async (el) => {
        if (!el || cancelled || doneRef.current) return;
        const r = el.getBoundingClientRect();
        const vh = window.innerHeight;
        if (r.top < 120 || r.bottom > vh - 120) {
          const now = Date.now();
          if (now - lastScrollAt < 500) return;
          lastScrollAt = now;
          const targetTop = Math.max(0, r.top + window.scrollY - vh / 2 + r.height / 2);
          window.scrollTo({ top: targetTop, behavior: 'smooth' });
          await sleep(220);
        }
      };
      // focusTeam (v9): each group gets a lead + 2 helpers working on
      // the SAME current item, rotating through all 18 cursors — and
      // the team is ADDED to the visible set and stays visible: all
      // 12 lanes work at once, so up to 18 cursors are visible
      // together, each doing its own job in this section.
      let teamSeq = 0;
      const focusTeam = (el) => {
        const lead = teamSeq % CURSOR_COLORS.length; teamSeq += 1;
        const helpers = [(lead + 1) % CURSOR_COLORS.length, (lead + 2) % CURSOR_COLORS.length];
        const team = [lead, ...helpers];
        setActive(prev => Array.from(new Set([...prev, ...team])));
        return { lead, helpers };
      };
      const parkHelpers = (helpers, el) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        helpers.forEach((h, k) => {
          const x = k === 0 ? r.right - 30 : r.left + 30;
          const y = k === 0 ? r.top + 20 : r.bottom - 20;
          moveCursor(h, x, y);
        });
      };
      // buildGroup: one group, start to finish, by the focus team.
      const buildGroup = async (g) => {
        if (cancelled || doneRef.current) return;
        const targetEl = g.frame || (g.texts[0] && g.texts[0].parent) || (g.iconEls && g.iconEls[0]);
        if (!targetEl) return;
        await ensureVisible(targetEl);
        if (cancelled || doneRef.current) return;
        const hero = g.phase === 'Hero';
        const { lead, helpers } = focusTeam(targetEl);
        const cIdx = lead;
        if (g.iconEls) {
          for (const iconEl of g.iconEls) {
            if (cancelled || doneRef.current) return;
            await ensureVisible(iconEl);
            const rotI = focusTeam(iconEl);
            const r = iconEl.getBoundingClientRect();
            moveCursor(rotI.lead, r.left + rnd(-40, 40), r.top + rnd(-30, 30));
            await sleep(Math.round(hero ? rnd(120, 180) : rnd(150, 220))); if (cancelled || doneRef.current) return;
            moveCursor(rotI.lead, r.left + 6, r.top + 6);
            iconEl.querySelectorAll('svg').forEach(x => { x.style.opacity = ''; });
            try { iconEl.animate([{ transform: 'scale(.4) rotate(-12deg)', opacity: 0 }, { transform: 'scale(1) rotate(0deg)', opacity: 1 }], { duration: 380, easing: 'cubic-bezier(.22,1,.36,1)' }); } catch {}
            doneCountRef.current += 1; setStatusCount(g.phase);
            await sleep(Math.round(hero ? rnd(80, 120) : rnd(100, 150)));
          }
          return;
        }
        if (g.frame && !g.frame.dataset.swarmDone) {
          g.frame.dataset.swarmDone = '1';
          const r = g.frame.getBoundingClientRect();
          // Helpers take the other corners of THIS same frame.
          parkHelpers(helpers, g.frame);
          moveCursor(cIdx, r.left + rnd(-160, 160), r.top + rnd(-90, 90));
          await sleep(Math.round(hero ? rnd(120, 180) : rnd(200, 300))); if (cancelled || doneRef.current) return;
          // DRAG CARRY: grab the frame at its offset spot, LIFT it
          // (shadow + outline), reveal it there, then carry it visibly
          // into place in two steps with the cursor — the frame travels
          // with the cursor, it does not just appear at the end.
          g.frame.classList.add('swarm-drawing', 'swarm-lift');
          g.frame.removeAttribute('data-swarm-hidden');
          g.frame.style.opacity = '1';
          try { g.frame.animate([{ backgroundColor: CURSOR_COLORS[cIdx] + '55' }, { backgroundColor: 'transparent' }], { duration: 500, easing: 'ease-out' }); } catch {}
          await sleep(200); if (cancelled || doneRef.current) return;
          moveCursor(cIdx, (r.left + r.left + 10) / 2 + rnd(-40, 40), Math.min(r.top, r.top + 10) - rnd(40, 80));
          g.frame.style.transform = 'translate(-70px, 35px) scale(.96)';
          await sleep(300); if (cancelled || doneRef.current) return;
          moveCursor(cIdx, r.left + 10, r.top + 10);
          g.frame.style.transform = '';
          await sleep(300); if (cancelled || doneRef.current) return;
          g.frame.querySelectorAll('img, svg').forEach(x => { x.style.opacity = ''; x.style.filter = 'grayscale(1) brightness(.6)'; try { x.animate([{ filter: 'grayscale(1) brightness(.6)' }, { filter: 'grayscale(0) brightness(1)' }], { duration: 650, easing: 'ease-out' }); } catch {} setTimeout(() => { x.style.filter = ''; }, 670); });
          await sleep(Math.round(hero ? rnd(160, 240) : rnd(300, 450))); if (cancelled || doneRef.current) return;
          g.frame.classList.remove('swarm-drawing');
          g.frame.classList.add('swarm-snap');
          // Clear DROP SNAP: 1.08 -> 0.98 -> 1 over 380ms.
          try { g.frame.animate([{ transform: 'scale(1.08)' }, { transform: 'scale(0.98)', offset: 0.6 }, { transform: 'scale(1)' }], { duration: 380, easing: 'ease-out' }); } catch {}
          await sleep(150);
          g.frame.classList.remove('swarm-snap', 'swarm-lift');
          g.frame.style.transition = '';
          doneCountRef.current += 1; setStatusCount(g.phase);
        }
        for (const u of g.texts) {
          if (cancelled || doneRef.current) return;
          const par = u.parent;
          const r = par.getBoundingClientRect();
          if (r.width === 0 && r.height === 0) { u.node.nodeValue = u.text; continue; }
          // If the text scrolled out of the central band, re-centre it.
          await ensureVisible(par);
          if (cancelled || doneRef.current) return;
          const holder = par.closest('a, button') || par;
          holder.querySelectorAll('svg, img').forEach(x => { x.style.opacity = ''; });
          // ROTATION: every text unit is typed by the NEXT cursor in
          // turn — no single cursor does all the typing, and every
          // cursor gets its turn across the build.
          const rot = focusTeam(par);
          const tIdx = rot.lead;
          parkHelpers(rot.helpers, par);
          moveCursor(tIdx, r.left + rnd(-120, 120), r.top + rnd(-60, 60));
          await sleep(Math.round(hero ? rnd(120, 180) : rnd(150, 220))); if (cancelled || doneRef.current) return;
          await arcMove(tIdx, r.left + 6, r.top + 6); if (cancelled || doneRef.current) return;
          par.classList.add('swarm-typing');
          const words = u.text.trim().split(/\s+/);
          const letterMode = words.length === 1 && words[0].length >= 5;
          if (letterMode) {
            const w = words[0];
            for (let k = 1; k <= w.length; k++) {
              if (cancelled || doneRef.current) return;
              u.node.nodeValue = w.slice(0, k);
              await sleep(Math.round(hero ? rnd(50, 80) : rnd(45, 70)));
            }
          } else {
            const wordMs = hero ? [60, 90] : (words.length > 10 ? [80, 120] : [70, 110]);
            const chunk = words.length > 10 ? 3 : 1;
            for (let k = chunk; k <= words.length; k += chunk) {
              if (cancelled || doneRef.current) return;
              u.node.nodeValue = words.slice(0, k).join(' ') + (k < words.length ? ' ' : '');
              await sleep(Math.round(rnd(wordMs[0], wordMs[1])));
            }
          }
          u.node.nodeValue = u.text;
          par.classList.remove('swarm-typing');
          try { par.animate([{ transform: 'scale(1.06)' }, { transform: 'scale(1)' }], { duration: 300, easing: 'ease-out' }); } catch {}
          doneCountRef.current += 1; setStatusCount(g.phase);
          await sleep(Math.round(hero ? rnd(60, 90) : rnd(80, 130)));
        }
      };
      // PARALLEL run (v9): sections in order, but WITHIN each section
      // all groups build at once in 12 lanes — every cursor doing its
      // own work, all together, in the same section. The camera scrolls
      // to the section first, then follows the team inside it.
      window.scrollTo(0, 0);
      await sleep(200); if (cancelled || doneRef.current) return;
      const LANE_COUNT = 12;
      for (const ph of PHASE_ORDER) {
        if (cancelled || doneRef.current) return;
        const phaseGroups = ordered.filter(g => g.phase === ph);
        if (!phaseGroups.length) continue;
        const firstEl = phaseGroups[0].frame || (phaseGroups[0].texts[0] && phaseGroups[0].texts[0].parent) || (phaseGroups[0].iconEls && phaseGroups[0].iconEls[0]);
        await ensureVisible(firstEl);
        if (cancelled || doneRef.current) return;
        setStatusCount(ph);
        const lanes = Array.from({ length: Math.min(LANE_COUNT, phaseGroups.length) }, () => []);
        phaseGroups.forEach((g, i) => lanes[i % lanes.length].push(g));
        await Promise.all(lanes.map(lane => (async () => {
          for (const g of lane) {
            if (cancelled || doneRef.current) return;
            await buildGroup(g);
          }
        })()));
      }
      setStatus('Done — back to the real page…');
      await sleep(700);
      if (!cancelled) finish();
    };
    const p = run();
    return () => { cancelled = true; document.body.classList.remove('swarm-building', 'swarm-wireframe'); };
  }, [finish]);
  return <>
    <AnimatePresence>
      {veil && (
        <motion.div className="swarm-veil" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.6, ease: VEIL_EASE } }} transition={{ duration: 0.45, ease: VEIL_EASE }}>
          <motion.span className="eyebrow muted" initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0, ease: VEIL_EASE }}>SWARM BUILD · PREVIEW ONLY</motion.span>
          <span className="big display" aria-hidden="true">{'BUILDING'.split('').map((ch, i) => (
            <motion.span key={i} style={{ display: 'inline-block' }} initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.12 + i * 0.05, ease: VEIL_EASE }}>{ch}</motion.span>
          ))}<motion.span className="accent" style={{ display: 'inline-block' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, delay: 0.55 }}>.</motion.span></span>
          <motion.p className="muted" initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.3, ease: VEIL_EASE }}>Starting from a blank page. All the cursors build together, at once — and the camera follows the section.</motion.p>
        </motion.div>
      )}
    </AnimatePresence>
    {CURSOR_COLORS.map((color, i) => active.includes(i) && (
      <div key={i} className="swarm-cursor" style={{ left: pos[i]?.x ?? -100, top: pos[i]?.y ?? -100, '--red': color }}>
        <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 2 L20 11.5 L13.5 12.8 L17.5 20.5 L13.8 22 L9.8 14.3 L5 17.5 Z" fill="#ffffff" stroke="#000000" strokeWidth="1.4" strokeLinejoin="round" /></svg>
      </div>
    ))}
    <div className="swarm-bar"><span>SWARM BUILD · PREVIEW</span><span className="status">{status}</span><button className="outline-btn" onClick={finish}>Skip</button></div>
  </>;
}

function App() {
  const reduced = useReducedMotion();
  const [motionOn, setMotionOn] = useState(() => { try { return localStorage.getItem('abrar-motion') !== 'off'; } catch { return true; } });
  const enabled = motionOn && !reduced;
  const [project, setProject] = useState(null);
  const [swarm, setSwarm] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 28, restDelta: 0.001 });
  useEffect(() => { document.documentElement.dataset.motion = enabled ? 'on' : 'off'; }, [enabled]);
  const toggle = () => { setMotionOn(!motionOn); try { localStorage.setItem('abrar-motion', motionOn ? 'off' : 'on'); } catch {} };
  const close = useCallback(() => setProject(null), []);
  return <MotionContext.Provider value={enabled}>
    <MotionConfig reducedMotion={enabled ? 'user' : 'always'} transition={{ ease: EASE }}>
      <a className="skip" href="#portfolio">Skip to work</a>
      <motion.div className="progress" style={{ scaleX: enabled ? progress : scrollYProgress }} />
      <Header enabled={enabled} onToggle={toggle} onSwarm={() => setSwarm(true)} />
      <main>
        <Hero onProject={setProject} />
        <Portfolio onProject={setProject} />
        <Process />
        <About />
        <Recognition />
        <Roles />
        <Journey />
        <Contact onProject={setProject} />
      </main>
      <footer className="footer" data-swarm="Footer">
        <a className="wordmark" href="#home">ABRAR HASHMI<b>.</b></a>
        <span>© {new Date().getFullYear()} ABRAR HASHMI STUDIOS. EVERY FRAME HAS A PURPOSE.</span>
        <div className="socials">
          <a href="https://youtube.com/@toxic_hashmi_editx" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><Youtube size={17} /></a>
          <a href="https://www.instagram.com/abrarhashmi_era/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Instagram size={17} /></a>
          <a href="https://github.com/Abrar9666" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><Github size={17} /></a>
          <a href="https://www.linkedin.com/in/abrar-hashmi-studios" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Linkedin size={17} /></a>
          <a href="#home" aria-label="Back to top"><ArrowUpRight size={18} /></a>
        </div>
      </footer>
      <AnimatePresence>{project && <Dialog key={project.title} project={project} onClose={close} />}</AnimatePresence>
      {swarm && <Swarm onDone={() => setSwarm(false)} />}
    </MotionConfig>
  </MotionContext.Provider>;
}
createRoot(document.getElementById('root')).render(<App />);

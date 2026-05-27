import { useState, useEffect, useRef, Suspense } from 'react';
import {
  motion, useInView, useMotionValue, useTransform,
  AnimatePresence, useSpring,
} from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';

// ═══════════════════════════════════════════════════════ DATA ══════════════════
const CYAN    = '#22D3EE';
const CYAN10  = 'rgba(34,211,238,0.1)';
const CYAN18  = 'rgba(34,211,238,0.2)';
const VIOLET  = '#818CF8';
const BG      = '#04080F';
const BG2     = '#070E1A';
const WHITE   = '#F1F5F9';
const MUTED   = 'rgba(241,245,249,0.5)';
const FD      = 'var(--font-display)';

const CV = {
  line1: 'JORGE', line2: 'RODRÍGUEZ',
  fullName: 'Jorge Rodríguez',
  role: 'Backend Developer',
  stack: '.NET  ·  SQL Server  ·  Azure  ·  APIs REST',
  photo: '/jorge.jpg',
  email: 'jrodri1493@gmail.com',
  phone: '+506 6196-9427',
  linkedin: 'https://www.linkedin.com/in/jorge-rodr%C3%ADguez-9b9684211',
  github: 'https://github.com/JRODRI22',
  wa: 'https://wa.me/50661969427',
  loc: 'Venecia, San Carlos — Costa Rica',
  about:
    'Ingeniero de Software con 9+ años construyendo soluciones backend empresariales de alto rendimiento. ' +
    'Especializado en C# (.NET / .NET Core), SQL Server, APIs RESTful y automatización de procesos críticos. ' +
    'Arquitecturas multi-capa, integración ERP, facturación electrónica y soluciones cloud en Microsoft Azure. ' +
    'Actualmente cursando Máster en Desarrollo con Inteligencia Artificial — implementando LLMs en flujos de negocio reales.',
  stats: [
    { v: '9+',  l: 'Años de\nexperiencia' },
    { v: '2',   l: 'Empresas\nposición senior' },
    { v: '10+', l: 'Certificaciones\noficiales' },
    { v: '3+',  l: 'Sistemas\nentregados' },
  ],
  radar: [
    { label: '.NET / C#',   v: 0.92 },
    { label: 'SQL Server',  v: 0.88 },
    { label: 'Azure',       v: 0.72 },
    { label: 'REST APIs',   v: 0.85 },
    { label: 'Power BI',    v: 0.75 },
    { label: 'Python / IA', v: 0.65 },
  ],
  exp: [
    {
      id: 'tpf', hot: true,
      role: 'Analista de Sistemas / Backend Developer',
      company: 'Tropical Paradise Fruits',
      loc: 'Muelle, San Carlos',
      period: 'Jun 2021 — Feb 2026',
      items: [
        'Diseño e implementación de soluciones de automatización en C# .NET y Python.',
        'Administración avanzada SQL Server: stored procedures, indexing, modelado, SQL Profiler.',
        'Dashboards estratégicos en Power BI para toma de decisiones gerenciales.',
        'Integración de sistemas ERP y facturación electrónica (normativa Hacienda CR).',
        'Automatización de flujos con Power Automate y Power Apps.',
        'Gestión de seguridad de la información y control de accesos.',
      ],
      wins: [
        'Reducción de tiempos operativos mediante automatización de procesos manuales críticos.',
        'Optimización de consultas SQL — mejora significativa de rendimiento empresarial.',
        'Trazabilidad end-to-end implementada en procesos operativos clave.',
      ],
      tech: ['C# .NET Core', 'SQL Server', 'Power BI', 'Power Automate', 'Azure', 'Python'],
    },
    {
      id: 'gme', hot: false,
      role: 'Técnico en Informática / Desarrollador',
      company: 'Ganadera María Elida',
      loc: 'Río Cuarto, Grecia',
      period: 'Feb 2018 — Abr 2021',
      items: [
        'Gestión y estructuración de datos empresariales.',
        'Herramientas C# para automatización de procesos internos.',
        'Implementación de facturación electrónica conforme normativa fiscal.',
        'Administración y mantenimiento de infraestructura tecnológica.',
        'Soporte técnico multipunto.',
      ],
      wins: [
        'Facturación electrónica implementada exitosamente según normativa Hacienda CR.',
        'Reducción de tiempos de respuesta ante incidencias tecnológicas.',
      ],
      tech: ['C# .NET', 'SQL Server', 'Facturación Electrónica', 'IT Infrastructure'],
    },
  ],
  skills: [
    { cat: 'Backend & .NET',     items: ['C# .NET Framework', 'ASP.NET Core', 'APIs RESTful', 'Web Services / SOAP', 'Python', 'OOP', 'Clean Architecture'] },
    { cat: 'Bases de Datos',     items: ['SQL Server 2016+', 'T-SQL', 'Stored Procedures', 'Optimización', 'Modelado', 'SQL Profiler', 'Oracle Database'] },
    { cat: 'Cloud & Microsoft',  items: ['Microsoft Azure', 'Power BI', 'Power Automate', 'Power Apps', 'Softland ERP', 'Facturación Electrónica'] },
    { cat: 'DevOps & Dev Tools', items: ['Visual Studio 2022', 'Git & GitHub', 'Docker', 'Postman', 'Azure DevOps', 'React (fundamentos)'] },
  ],
  projects: [
    {
      n: '01', name: 'Facturación Electrónica',
      desc: 'Backend C# .NET integrado con servicios fiscales del Ministerio de Hacienda. Automatización de validaciones, generación XML y gestión de documentos electrónicos conforme normativa.',
      tech: ['C# .NET', 'SQL Server', 'REST APIs', 'XML'],
    },
    {
      n: '02', name: 'Automatización de Procesos',
      desc: 'Suite interna con Python, C# y Power Automate. Eliminación de tareas manuales críticas y dashboards Power BI para toma de decisiones gerenciales en tiempo real.',
      tech: ['Python', 'C#', 'Power Automate', 'SQL Server'],
    },
    {
      n: '03', name: 'Integración ERP',
      desc: 'Capa de integración entre Softland ERP, SQL Server y plataformas internas. Optimización SQL de alto impacto en operaciones empresariales críticas.',
      tech: ['C# .NET', 'Softland ERP', 'SQL Server', 'Azure'],
    },
  ],
  edu: [
    { d: 'Máster en Desarrollo con Inteligencia Artificial', i: 'En curso',      y: '2025–',  hot: true  },
    { d: 'Bachillerato — Ingeniería en Informática',         i: 'UNED Costa Rica', y: '~2026', hot: false },
    { d: 'Técnico en Programación',                         i: 'UTN',             y: '',       hot: false },
  ],
  certs: [
    { n: 'Azure Fundamentals',       org: 'Microsoft',              ic: '☁️' },
    { n: 'Azure Data Fundamentals',  org: 'Microsoft',              ic: '🗄️' },
    { n: 'Cybersecurity Essentials', org: 'UTN',                    ic: '🔐' },
    { n: 'PCAP — Python Essentials', org: 'Cisco / Python Inst.',   ic: '🐍' },
    { n: 'Power BI Analytics',       org: 'Microsoft',              ic: '📊' },
    { n: 'Power Apps & Automate',    org: 'Microsoft',              ic: '⚡' },
    { n: 'Softland ERP Admin',       org: 'Softland',               ic: '🏭' },
    { n: 'Ciencia de Datos',         org: 'Especialización',        ic: '🔬' },
    { n: 'Blockchain',               org: 'Especialización',        ic: '⛓️' },
    { n: 'Grandstream Networking',   org: 'Grandstream',            ic: '🌐' },
  ],
};

// ══════════════════════════════════════════ PRINT / ATS STYLES ════════════════
function PrintStyles() {
  return (
    <style>{`
      @media print {
        body { background:#fff!important; color:#111!important; font-family:Arial,sans-serif!important; }
        [data-no-print], nav, canvas { display:none!important; }
        h1 { font-size:28pt!important; color:#000!important; }
        h2 { font-size:14pt!important; color:#003366!important; margin-top:12pt; border-bottom:1pt solid #003366; padding-bottom:2pt; }
        h3 { font-size:11pt!important; color:#000!important; }
        p,li,span { font-size:10pt!important; color:#222!important; }
        a  { color:#003366!important; }
        section { page-break-inside:avoid; margin-bottom:16pt; }
      }
      /* Mobile responsive overrides */
      @media (max-width: 639px) {
        .cv-name-h1 { font-size: clamp(1.45rem, 8.5vw, 2.4rem) !important; }
        .cv-photo-frame { width: min(56vw, 200px) !important; margin: 0 auto; }
        .cv-status-badge { letter-spacing: 0.12em !important; }
        .cv-hablemos { font-size: clamp(1.8rem, 9.5vw, 3rem) !important; }
      }
    `}</style>
  );
}

// ══════════════════════════════════════════════════ UTILS ═════════════════════
function useRM() {
  const [rm, setRm] = useState(false);
  useEffect(() => {
    const mq = matchMedia('(prefers-reduced-motion:reduce)');
    setRm(mq.matches);
    const h = e => setRm(e.matches);
    mq.addEventListener('change', h);
    return () => mq.removeEventListener('change', h);
  }, []);
  return rm;
}

const SC = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#@!%*';
function useScramble(text, active, delay = 0) {
  const rnd = t => t.split('').map(c => (c.trim() === '' ? c : SC[~~(Math.random() * SC.length)]));
  const [out, setOut] = useState(() => rnd(text));
  const ran = useRef(false);
  const rm = useRM();
  useEffect(() => {
    if (!active || ran.current) return;
    ran.current = true;
    if (rm) { setOut(text.split('')); return; }
    const tid = setTimeout(() => {
      let i = 0;
      const iid = setInterval(() => {
        setOut(text.split('').map((c, idx) => {
          if (c.trim() === '') return c;
          if (idx < i) return c;
          return SC[~~(Math.random() * SC.length)];
        }));
        i++;
        if (i > text.length) clearInterval(iid);
      }, 28);
    }, delay * 1000);
    return () => clearTimeout(tid);
  }, [active]); // eslint-disable-line react-hooks/exhaustive-deps
  return out.join('');
}

// ══════════════════════════════════════════════ THREE.JS ICO ══════════════════
function IcoMesh() {
  const ref = useRef();
  useFrame((_, d) => {
    if (!ref.current) return;
    ref.current.rotation.x += d * 0.09;
    ref.current.rotation.y += d * 0.14;
    ref.current.rotation.z += d * 0.04;
  });
  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[2.2, 1]} />
      <meshBasicMaterial color="#00E5FF" wireframe transparent opacity={0.18} />
    </mesh>
  );
}
function IcoBg() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 5.5], fov: 50 }}
      style={{ background: 'transparent', position: 'absolute', inset: 0, width: '100%', height: '100%' }}
    >
      <Suspense fallback={null}><IcoMesh /></Suspense>
    </Canvas>
  );
}

// ════════════════════════════════════════════ BOOT SCREEN ═════════════════════
const BOOT_LINES = [
  '> NEURAL-CV v2026 INITIALIZING...',
  '> IDENTITY: JORGE RODRÍGUEZ',
  '> ROLE: BACKEND DEVELOPER — .NET · SQL Server',
  '> CLEARANCE: ✓ GRANTED',
];
function BootScreen({ onDone }) {
  const [idx, setIdx] = useState(0);
  const rm = useRM();
  useEffect(() => {
    if (rm) { onDone(); return; }
    if (idx < BOOT_LINES.length) {
      const t = setTimeout(() => setIdx(i => i + 1), 290);
      return () => clearTimeout(t);
    }
    const t = setTimeout(onDone, 300);
    return () => clearTimeout(t);
  }, [idx, rm]); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <motion.div
      key="boot"
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ background: BG }}
      exit={{ opacity: 0 }} transition={{ duration: 0.45 }}
    >
      <div className="font-mono text-xs sm:text-sm leading-loose px-8" style={{ color: CYAN, maxWidth: '36rem' }}>
        {BOOT_LINES.slice(0, idx + 1).map((l, i) => (
          <motion.p key={i} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.2 }}>
            {l}
          </motion.p>
        ))}
        {idx < BOOT_LINES.length && (
          <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.7, repeat: Infinity }}>_</motion.span>
        )}
      </div>
      <button
        onClick={onDone}
        className="absolute bottom-8 right-8 font-mono text-xs transition-colors duration-300"
        style={{ color: 'rgba(240,244,255,0.25)' }}
        onMouseEnter={e => (e.currentTarget.style.color = 'rgba(240,244,255,0.65)')}
        onMouseLeave={e => (e.currentTarget.style.color = 'rgba(240,244,255,0.25)')}
      >
        SKIP ›
      </button>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════ RADAR SVG ════════════════════
function Radar({ data, size = 250 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const rm = useRM();
  const cx = size / 2, cy = size / 2, r = size * 0.36;
  const ang = i => (i * (360 / data.length) - 90) * (Math.PI / 180);
  const pt  = (i, s) => ({ x: cx + r * s * Math.cos(ang(i)), y: cy + r * s * Math.sin(ang(i)) });
  const toPath = pts => pts.map((p, i) => `${i ? 'L' : 'M'}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join('') + 'Z';
  const dataPts = data.map((d, i) => pt(i, d.v));
  return (
    <svg ref={ref} width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
      {[0.25, 0.5, 0.75, 1].map(s => (
        <path key={s} d={toPath(data.map((_, i) => pt(i, s)))}
          fill="none" stroke="rgba(0,229,255,0.07)" strokeWidth="1" />
      ))}
      {data.map((_, i) => {
        const p = pt(i, 1);
        return <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="rgba(0,229,255,0.1)" strokeWidth="1" />;
      })}
      <motion.path
        d={toPath(dataPts)}
        fill="rgba(0,229,255,0.07)" stroke={CYAN} strokeWidth="1.5"
        initial={{ scale: 0.1, opacity: 0 }} animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: rm ? 0 : 1.1, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: `${cx}px ${cy}px` }}
      />
      {dataPts.map((p, i) => (
        <motion.circle key={i} cx={p.x} cy={p.y} r="3.5" fill={CYAN}
          initial={{ scale: 0 }} animate={inView ? { scale: 1 } : {}}
          transition={{ delay: rm ? 0 : 0.8 + i * 0.1, duration: 0.35 }}
          style={{ transformOrigin: `${p.x}px ${p.y}px` }}
        />
      ))}
      {data.map((d, i) => {
        const lp = pt(i, 1.28);
        return (
          <text key={i} x={lp.x} y={lp.y} textAnchor="middle" dominantBaseline="middle"
            fill="rgba(240,244,255,0.5)" fontSize="9.5" fontFamily="monospace" fontWeight="500">
            {d.label}
          </text>
        );
      })}
    </svg>
  );
}

// ════════════════════════════════════════════ TILT CARD 3D ════════════════════
function TiltCard({ children, className, style }) {
  const mx = useMotionValue(0), my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 180, damping: 18 });
  const smy = useSpring(my, { stiffness: 180, damping: 18 });
  const rotX = useTransform(smy, [-80, 80], [8, -8]);
  const rotY = useTransform(smx, [-80, 80], [-8, 8]);
  const rm = useRM();
  return (
    <motion.div
      className={className} style={{ ...style, rotateX: rm ? 0 : rotX, rotateY: rm ? 0 : rotY, transformStyle: 'preserve-3d' }}
      onMouseMove={e => {
        if (rm) return;
        const b = e.currentTarget.getBoundingClientRect();
        mx.set(e.clientX - b.left - b.width / 2);
        my.set(e.clientY - b.top - b.height / 2);
      }}
      onMouseLeave={() => { mx.set(0); my.set(0); }}
    >
      {children}
    </motion.div>
  );
}

// ════════════════════════════════════════════ SECTION LABEL ══════════════════
function SLabel({ children }) {
  return (
    <div className="flex items-center gap-5 mb-12">
      <span className="font-mono uppercase tracking-[0.4em] text-[10px]" style={{ color: CYAN }}>
        {children}
      </span>
      <div className="flex-1 h-px" style={{ background: CYAN18 }} />
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: CYAN }} />
    </div>
  );
}

// ══════════════════════════════════════════════════ NAV ═══════════════════════
const NAV_LINKS = [
  { l: 'Perfil',      h: '#perfil'      },
  { l: 'Experiencia', h: '#experiencia' },
  { l: 'Skills',      h: '#skills'      },
  { l: 'Proyectos',   h: '#proyectos'   },
  { l: 'Educación',   h: '#educacion'   },
];
function CVNav({ ready }) {
  const [scrolled, setScrolled] = useState(false);
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const fn = () => {
      setScrolled(window.scrollY > 50);
      const max = document.body.scrollHeight - window.innerHeight;
      setPct(max > 0 ? (window.scrollY / max) * 100 : 0);
    };
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);
  return (
    <motion.nav
      data-no-print="1"
      className="fixed top-0 inset-x-0 z-50"
      initial={{ opacity: 0, y: -20 }}
      animate={ready ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.2 }}
      style={{ background: scrolled ? 'rgba(4,8,15,0.97)' : 'rgba(4,8,15,0.82)', backdropFilter: 'blur(24px)', borderBottom: `1px solid rgba(34,211,238,0.12)` }}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-12 h-[64px] flex items-center gap-6">

        {/* Candidate name — always visible for recruiter */}
        <a href="#perfil" className="shrink-0 flex items-center gap-2.5 group" style={{ textDecoration: 'none' }}>
          <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
            style={{ background: CYAN10, border: `1px solid rgba(34,211,238,0.35)` }}>
            <span className="font-black text-[10px]" style={{ color: CYAN }}>JR</span>
          </div>
          <div className="hidden sm:block">
            <div className="font-semibold text-xs leading-tight" style={{ color: 'rgba(241,245,249,0.9)' }}>
              Jorge Rodríguez
            </div>
            <div className="font-mono text-[9px] leading-tight" style={{ color: 'rgba(34,211,238,0.7)' }}>
              Backend Developer
            </div>
          </div>
        </a>

        {/* Divider */}
        <div className="hidden sm:block w-px h-5 shrink-0" style={{ background: 'rgba(241,245,249,0.1)' }} />

        {/* Nav links — center, readable */}
        <div className="hidden md:flex items-center gap-1 flex-1">
          {NAV_LINKS.map(({ l, h }) => (
            <a key={l} href={h}
              className="px-3 py-1.5 rounded font-mono text-[11px] uppercase tracking-[0.15em] transition-all duration-200"
              style={{ color: 'rgba(241,245,249,0.55)' }}
              onMouseEnter={e => { e.currentTarget.style.color = 'rgba(241,245,249,0.95)'; e.currentTarget.style.background = 'rgba(241,245,249,0.06)'; }}
              onMouseLeave={e => { e.currentTarget.style.color = 'rgba(241,245,249,0.55)'; e.currentTarget.style.background = 'transparent'; }}
            >
              {l}
            </a>
          ))}
        </div>

        {/* Right actions */}
        <div className="ml-auto flex items-center gap-3 shrink-0">
          <a href="/cv-jorge-rodriguez.pdf" download="CV-Jorge-Rodriguez.pdf"
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] transition-all duration-200"
            style={{ border: `1px solid rgba(34,211,238,0.4)`, color: CYAN, borderRadius: '3px' }}
            onMouseEnter={e => { e.currentTarget.style.background = CYAN10; e.currentTarget.style.borderColor = CYAN; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(34,211,238,0.4)'; }}
          >
            ↓ CV
          </a>

        </div>
      </div>

      {/* Reading progress */}
      <div className="h-[2px] w-full" style={{ background: 'rgba(34,211,238,0.06)' }}>
        <motion.div className="h-full" style={{ width: `${pct}%`, background: CYAN, originX: 0 }}
          transition={{ duration: 0.06 }} />
      </div>
    </motion.nav>
  );
}

// name letter animation
function AnimName({ text, color, delay = 0, ready }) {
  const letters = text.split('');
  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.04, delayChildren: delay } },
  };
  const item = {
    hidden:  { opacity: 0, y: 20, filter: 'blur(6px)' },
    visible: { opacity: 1, y: 0,  filter: 'blur(0px)', transition: { duration: 0.5, ease: [0.16,1,0.3,1] } },
  };
  return (
    <motion.span
      variants={container}
      initial="hidden"
      animate={ready ? 'visible' : 'hidden'}
      style={{ display: 'inline-block', color }}
    >
      {letters.map((c, i) => (
        <motion.span key={i} variants={item} style={{ display: 'inline-block', whiteSpace: c === ' ' ? 'pre' : undefined }}>
          {c}
        </motion.span>
      ))}
    </motion.span>
  );
}

// ══════════════════════════════════════════════════ HERO ══════════════════════
function CVHero({ ready }) {
  return (
    <section className="relative min-h-screen flex items-end overflow-hidden"
      style={{ background: BG, paddingBottom: '4rem' }}>
      {/* Dot grid */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: `radial-gradient(${CYAN10} 1px, transparent 1px)`,
        backgroundSize: '44px 44px',
      }} />
      {/* Bottom fade */}
      <div className="absolute bottom-0 inset-x-0 h-48 pointer-events-none"
        style={{ background: `linear-gradient(to top, ${BG}, transparent)` }} />

      <div className="relative max-w-6xl mx-auto px-6 lg:px-12 w-full pt-24">
        <div className="flex flex-col-reverse sm:flex-row items-start sm:items-end gap-8 sm:gap-16">

          {/* ── TEXT COLUMN ── */}
          <div className="flex-1 min-w-0">
            {/* Status badge */}
            <motion.div className="inline-flex items-center gap-3 mb-6"
              initial={{ opacity: 0, y: 12 }} animate={ready ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.05 }}>
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute h-full w-full rounded-full opacity-50" style={{ background: '#34D399' }} />
                <span className="relative rounded-full h-2.5 w-2.5" style={{ background: '#34D399' }} />
              </span>
              <span className="cv-status-badge font-mono text-[10px] uppercase tracking-[0.25em]" style={{ color: '#34D399' }}>
                Disponible · Buscando oportunidades
              </span>
            </motion.div>

            {/* Name — clean letter animation */}
            <h1 className="cv-name-h1 font-black leading-[0.9] tracking-tight mb-5"
              style={{ fontFamily: FD, fontSize: 'clamp(2rem, 4.5vw, 4.5rem)' }}>
              <AnimName text={CV.line1} color={CYAN}  delay={0.15} ready={ready} />
              <br />
              <AnimName text={CV.line2} color={WHITE} delay={0.4}  ready={ready} />
              <motion.span style={{ color: CYAN }}
                initial={{ opacity: 0 }} animate={ready ? { opacity: 1 } : {}} transition={{ delay: 1.0 }}>.</motion.span>
            </h1>

            {/* Role */}
            <motion.div className="flex flex-wrap items-center gap-2 mb-1.5 font-mono text-sm"
              initial={{ opacity: 0 }} animate={ready ? { opacity: 1 } : {}} transition={{ delay: 0.9 }}>
              <span style={{ color: VIOLET }}>{'>'}</span>
              <span style={{ color: CYAN, fontWeight: 700 }}>Backend Developer</span>
              <span style={{ color: 'rgba(241,245,249,0.3)' }}>— .NET · SQL Server · Azure</span>
            </motion.div>
            <motion.div className="font-mono text-xs mb-7" style={{ color: 'rgba(241,245,249,0.28)' }}
              initial={{ opacity: 0 }} animate={ready ? { opacity: 1 } : {}} transition={{ delay: 1.0 }}>
              9 años construyendo sistemas empresariales de alto rendimiento
            </motion.div>

            {/* Contact chips */}
            <motion.div className="flex flex-wrap gap-2 mb-5"
              initial={{ opacity: 0, y: 12 }} animate={ready ? { opacity: 1, y: 0 } : {}} transition={{ delay: 1.05 }}>
              {[
                { ic: '✉',  l: CV.email,        h: `mailto:${CV.email}` },
                { ic: '📱', l: CV.phone,         h: CV.wa },
                { ic: '🔗', l: 'LinkedIn',       h: CV.linkedin },
                { ic: '⌥',  l: 'GitHub',         h: CV.github },
                { ic: '📍', l: 'San Carlos, CR', h: '#' },
              ].map(({ ic, l, h }) => (
                <a key={l} href={h} target={h.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 font-mono text-[11px] transition-all duration-250"
                  style={{ border: '1px solid rgba(241,245,249,0.1)', color: MUTED, borderRadius: '2px' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = CYAN18; e.currentTarget.style.color = CYAN; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(241,245,249,0.1)'; e.currentTarget.style.color = MUTED; }}
                >
                  <span aria-hidden="true">{ic}</span> {l}
                </a>
              ))}
            </motion.div>

            {/* Download CV */}
            <motion.a
              href="/cv-jorge-rodriguez.pdf"
              download="CV-Jorge-Rodriguez.pdf"
              className="inline-flex items-center gap-2 px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] transition-all duration-300 cursor-pointer"
              style={{ background: CYAN, color: BG, fontWeight: 700, borderRadius: '2px', display: 'inline-flex' }}
              initial={{ opacity: 0 }} animate={ready ? { opacity: 1 } : {}} transition={{ delay: 1.15 }}
              whileHover={{ opacity: 0.9 }}
            >
              ↓ Descargar CV
            </motion.a>
          </div>

          {/* ── PHOTO COLUMN ── */}
          <motion.div
            className="relative shrink-0 self-center sm:self-auto mx-auto sm:mx-0"
            initial={{ opacity: 0, y: 20 }} animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            {/* 3D icosahedron bg */}
            <div className="absolute pointer-events-none" style={{ inset: '-60px', opacity: 0.4 }}>
              <Suspense fallback={null}><IcoBg /></Suspense>
            </div>

            {/* Photo frame */}
            <div className="cv-photo-frame relative" style={{ width: 'clamp(160px, 22vw, 240px)', zIndex: 2 }}>
              {/* Corner accents */}
              {[
                'top-0 left-0 border-t-2 border-l-2',
                'top-0 right-0 border-t-2 border-r-2',
                'bottom-0 left-0 border-b-2 border-l-2',
                'bottom-0 right-0 border-b-2 border-r-2',
              ].map((cls, k) => (
                <div key={k} className={`absolute w-4 h-4 z-10 pointer-events-none ${cls}`}
                  style={{ borderColor: 'rgba(34,211,238,0.5)' }} />
              ))}

              {/* Scan line */}
              <motion.div
                className="absolute inset-x-0 h-[2px] z-10 pointer-events-none"
                style={{ background: `linear-gradient(90deg, transparent, ${CYAN}, transparent)`, opacity: 0.7 }}
                animate={{ top: ['0%', '100%'] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'linear', repeatType: 'reverse' }}
              />

              <img
                src={CV.photo} alt={CV.fullName}
                width="240" height="300" loading="eager"
                className="w-full block object-cover object-top"
                style={{
                  aspectRatio: '4/5', borderRadius: '2px',
                  filter: 'contrast(1.08) saturate(0.75) brightness(0.92)',
                  boxShadow: `0 0 80px rgba(34,211,238,0.18)`,
                }}
              />
              {/* Cyan duotone overlay */}
              <div className="absolute inset-0 pointer-events-none" style={{
                background: `linear-gradient(160deg, rgba(34,211,238,0.10) 0%, transparent 45%, rgba(4,8,15,0.25) 100%)`,
                mixBlendMode: 'color-dodge', borderRadius: '2px',
              }} />
              {/* Edge fades — all 4 sides blend into bg */}
              <div className="absolute inset-x-0 bottom-0 h-24 pointer-events-none"
                style={{ background: `linear-gradient(to top, ${BG} 15%, transparent)` }} />
              <div className="absolute inset-x-0 top-0 h-10 pointer-events-none"
                style={{ background: `linear-gradient(to bottom, ${BG} 0%, transparent)` }} />
              <div className="absolute inset-y-0 left-0 w-8 pointer-events-none"
                style={{ background: `linear-gradient(to right, ${BG} 0%, transparent)` }} />
              <div className="absolute inset-y-0 right-0 w-8 pointer-events-none"
                style={{ background: `linear-gradient(to left, ${BG} 0%, transparent)` }} />
              <div className="absolute bottom-2 left-2.5">
                <div className="font-mono text-[8px] uppercase tracking-[0.18em]"
                  style={{ color: 'rgba(34,211,238,0.5)' }}>JR · 2026</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats strip */}
        <motion.div
          className="mt-14 pt-7 grid grid-cols-2 sm:grid-cols-4 gap-6"
          style={{ borderTop: `1px solid rgba(34,211,238,0.15)` }}
          initial={{ opacity: 0, y: 16 }} animate={ready ? { opacity: 1, y: 0 } : {}} transition={{ delay: 1.3 }}
        >
          {CV.stats.map(({ v, l }) => (
            <div key={l}>
              <div className="font-black leading-none mb-1"
                style={{ fontFamily: FD, fontSize: '2.2rem', color: CYAN }}>{v}</div>
              <div className="font-mono text-[10px] uppercase tracking-wider leading-snug whitespace-pre-line"
                style={{ color: 'rgba(241,245,249,0.3)' }}>{l}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════ PROFILE / ABOUT ══════════════════
function CVAbout() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <section ref={ref} id="perfil" className="py-24"
      style={{ background: BG2, scrollMarginTop: '68px' }}>
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <SLabel>Perfil profesional</SLabel>
        <div className="grid lg:grid-cols-[1fr_260px] gap-12 items-start">
          <motion.p className="text-base leading-relaxed"
            style={{ color: 'rgba(240,244,255,0.7)' }}
            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
            {CV.about}
          </motion.p>

          {/* ATS-friendly keyword block */}
          <div aria-label="Stack técnico">
            {[
              { cat: 'Lenguajes',   kw: 'C#, .NET, Python, T-SQL, JavaScript' },
              { cat: 'Frameworks',  kw: 'ASP.NET Core, Entity Framework, React' },
              { cat: 'Cloud',       kw: 'Azure, Power BI, Power Automate, Softland' },
              { cat: 'Databases',   kw: 'SQL Server, Oracle, T-SQL, Stored Procedures' },
              { cat: 'DevOps',      kw: 'Git, Docker, Azure DevOps, Visual Studio' },
            ].map(({ cat, kw }, i) => (
              <motion.div key={cat} className="mb-4"
                initial={{ opacity: 0, x: 16 }} animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.08, duration: 0.5 }}>
                <div className="font-mono text-[9px] uppercase tracking-[0.35em] mb-1.5"
                  style={{ color: 'rgba(0,229,255,0.5)' }}>{cat}</div>
                <div className="font-mono text-xs" style={{ color: 'rgba(240,244,255,0.5)' }}>{kw}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ═════════════════════════════════════════ EXPERIENCE CARD ════════════════════
function ExpCard({ job, index }) {
  const [open, setOpen] = useState(index === 0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const toggle = () => setOpen(o => !o);
  return (
    <motion.div ref={ref} className="mb-6"
      initial={{ opacity: 0, x: -24 }} animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
      <div
        style={{
          border: `1px solid ${job.hot ? CYAN18 : 'rgba(240,244,255,0.06)'}`,
          borderRadius: '2px',
          background: job.hot ? 'rgba(0,229,255,0.04)' : 'rgba(240,244,255,0.015)',
        }}
      >
        {/* Header */}
        <div
          className="p-6 flex items-start justify-between gap-4 cursor-pointer select-none"
          onClick={toggle}
          role="button" tabIndex={0} aria-expanded={open}
          onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); } }}
        >
          <div className="flex items-start gap-5">
            <div className="shrink-0 w-10 h-10 flex items-center justify-center font-mono text-[9px] font-bold"
              style={{
                border: `1px solid ${job.hot ? CYAN18 : 'rgba(240,244,255,0.1)'}`,
                color: job.hot ? CYAN : MUTED,
                background: job.hot ? CYAN10 : 'transparent',
                borderRadius: '2px',
              }}>
              FILE
            </div>
            <div>
              <h3 className="font-bold leading-snug mb-1"
                style={{ fontFamily: FD, color: WHITE, fontSize: '1.05rem' }}>
                {job.role}
              </h3>
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-xs font-semibold"
                  style={{ color: job.hot ? CYAN : MUTED }}>{job.company}</span>
                <span style={{ color: 'rgba(240,244,255,0.2)' }}>·</span>
                <span className="font-mono text-xs"
                  style={{ color: 'rgba(240,244,255,0.4)' }}>{job.loc}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            {job.hot && (
              <span className="font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 hidden sm:inline"
                style={{ background: 'rgba(16,185,129,0.08)', color: '#10B981', border: '1px solid rgba(16,185,129,0.25)', borderRadius: '2px' }}>
                Reciente
              </span>
            )}
            <span className="font-mono text-xs hidden sm:block"
              style={{ color: 'rgba(240,244,255,0.35)' }}>{job.period}</span>
            <motion.span animate={{ rotate: open ? 90 : 0 }} transition={{ duration: 0.25 }}
              className="font-mono text-base" style={{ color: MUTED, lineHeight: 1 }}>›</motion.span>
          </div>
        </div>

        {/* Period — mobile */}
        <div className="sm:hidden px-6 pb-3 font-mono text-[10px]" style={{ color: 'rgba(240,244,255,0.35)' }}>
          {job.period}
        </div>

        {/* Expandable */}
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="px-6 pb-6" style={{ borderTop: `1px solid ${job.hot ? CYAN18 : 'rgba(240,244,255,0.05)'}` }}>
                <ul className="mt-5 space-y-2.5 mb-5">
                  {job.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-xs mt-0.5 shrink-0" style={{ color: 'rgba(0,229,255,0.4)' }}>›</span>
                      <span className="text-sm leading-relaxed" style={{ color: 'rgba(240,244,255,0.65)' }}>{item}</span>
                    </li>
                  ))}
                </ul>
                {/* Wins */}
                <div className="p-4 mb-5"
                  style={{ background: 'rgba(0,229,255,0.04)', border: `1px solid ${CYAN18}`, borderRadius: '2px' }}>
                  <div className="font-mono text-[9px] uppercase tracking-[0.3em] mb-3"
                    style={{ color: 'rgba(0,229,255,0.55)' }}>✦ Logros destacados</div>
                  {job.wins.map((w, i) => (
                    <div key={i} className="flex items-start gap-3 mb-2">
                      <span className="text-xs mt-0.5 shrink-0" style={{ color: CYAN }}>→</span>
                      <span className="text-xs leading-relaxed" style={{ color: 'rgba(240,244,255,0.75)' }}>{w}</span>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  {job.tech.map(t => (
                    <span key={t} className="px-2.5 py-1 font-mono text-[10px]"
                      style={{ background: 'rgba(240,244,255,0.04)', border: '1px solid rgba(240,244,255,0.08)', color: 'rgba(240,244,255,0.45)', borderRadius: '2px' }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
function CVExperience() {
  return (
    <section id="experiencia" className="py-24"
      style={{ background: BG, scrollMarginTop: '68px' }}>
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <SLabel>Experiencia laboral</SLabel>
        {CV.exp.map((job, i) => <ExpCard key={job.id} job={job} index={i} />)}
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════ SKILLS ═══════════════════════
function CVSkills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <section ref={ref} id="skills" className="py-24"
      style={{ background: BG2, scrollMarginTop: '68px' }}>
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <SLabel>Habilidades técnicas</SLabel>
        <div className="grid lg:grid-cols-[280px_1fr] gap-14 lg:gap-20 items-start">
          {/* Radar */}
          <div className="flex flex-col items-center gap-4">
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.7 }}>
              <Radar data={CV.radar} size={250} />
            </motion.div>
            <div className="font-mono text-[9px] uppercase tracking-[0.35em] text-center"
              style={{ color: 'rgba(0,229,255,0.4)' }}>
              Expertise map
            </div>
          </div>
          {/* Category grid */}
          <div className="grid sm:grid-cols-2 gap-8">
            {CV.skills.map((cat, ci) => (
              <motion.div key={cat.cat}
                initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: ci * 0.1, duration: 0.6 }}>
                <div className="font-mono text-[9px] uppercase tracking-[0.35em] mb-4"
                  style={{ color: 'rgba(0,229,255,0.6)' }}>{cat.cat}</div>
                <div className="flex flex-wrap gap-2">
                  {cat.items.map((item, ii) => (
                    <motion.span key={item}
                      className="inline-flex px-2.5 py-1.5 font-mono text-[10px]"
                      style={{ border: `1px solid rgba(0,229,255,0.15)`, color: 'rgba(0,229,255,0.75)', background: 'rgba(0,229,255,0.04)', borderRadius: '2px' }}
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={inView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: ci * 0.08 + ii * 0.04, duration: 0.35, type: 'spring', stiffness: 200 }}
                      whileHover={{ background: CYAN10, borderColor: CYAN18 }}
                    >
                      {item}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════ PROJECTS ═════════════════════
function CVProjects() {
  return (
    <section id="proyectos" className="py-24"
      style={{ background: BG, scrollMarginTop: '68px' }}>
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <SLabel>Proyectos destacados</SLabel>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" style={{ perspective: '1200px' }}>
          {CV.projects.map((p, i) => (
            <TiltCard key={p.n}>
              <motion.div
                className="h-full p-7 flex flex-col"
                style={{
                  background: BG2, borderRadius: '2px',
                  border: '1px solid rgba(240,244,255,0.07)',
                  boxShadow: '0 4px 40px rgba(0,0,0,0.45)',
                }}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ borderColor: CYAN18, boxShadow: `0 8px 60px rgba(0,229,255,0.08)` }}
              >
                {/* Number badge */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-9 h-9 flex items-center justify-center font-mono text-xs font-bold"
                    style={{ border: `1px solid ${CYAN18}`, color: CYAN, background: CYAN10, borderRadius: '2px' }}>
                    {p.n}
                  </div>
                  <div className="font-mono text-[9px] uppercase tracking-wider"
                    style={{ color: 'rgba(240,244,255,0.2)' }}>Proyecto</div>
                </div>
                <h3 className="font-bold mb-3 leading-snug"
                  style={{ fontFamily: FD, color: WHITE, fontSize: '1rem' }}>
                  {p.name}
                </h3>
                <p className="text-xs leading-relaxed flex-1 mb-5" style={{ color: MUTED }}>
                  {p.desc}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {p.tech.map(t => (
                    <span key={t} className="px-2 py-0.5 font-mono text-[10px]"
                      style={{ background: 'rgba(240,244,255,0.04)', border: '1px solid rgba(240,244,255,0.08)', color: 'rgba(240,244,255,0.4)', borderRadius: '2px' }}>
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════ EDUCATION + CERTS ════════════════════
function CVEducation() {
  return (
    <section id="educacion" className="py-24"
      style={{ background: BG2, scrollMarginTop: '68px' }}>
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">

          {/* Education + AI */}
          <div>
            <SLabel>Educación</SLabel>
            <div className="space-y-6 mb-10">
              {CV.edu.map((e, i) => (
                <motion.div key={e.d} className="flex gap-4"
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.55 }}>
                  <div className="w-0.5 shrink-0 rounded-sm"
                    style={{ background: e.hot ? CYAN : 'rgba(0,229,255,0.2)', minHeight: '44px', marginTop: '4px' }} />
                  <div>
                    <div className="font-semibold text-sm leading-snug mb-1.5"
                      style={{ color: e.hot ? WHITE : 'rgba(240,244,255,0.7)' }}>{e.d}</div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-xs" style={{ color: e.hot ? CYAN : MUTED }}>{e.i}</span>
                      {e.y && <span className="font-mono text-xs" style={{ color: 'rgba(240,244,255,0.3)' }}>{e.y}</span>}
                      {e.hot && (
                        <span className="font-mono text-[9px] uppercase tracking-wider px-1.5 py-0.5"
                          style={{ background: CYAN10, color: CYAN, border: `1px solid ${CYAN18}`, borderRadius: '2px' }}>
                          En curso
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* AI highlight */}
            <motion.div className="p-5"
              style={{ border: '1px solid rgba(124,58,237,0.25)', background: 'rgba(124,58,237,0.05)', borderRadius: '2px' }}
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
              <div className="text-lg mb-3" aria-hidden="true">🤖</div>
              <h3 className="font-bold text-sm mb-3" style={{ fontFamily: FD, color: WHITE }}>
                Máster en Desarrollo con IA — En curso
              </h3>
              {[
                'Integración de LLMs en aplicaciones empresariales .NET',
                'Diseño de flujos automatizados con agentes de IA',
                'Implementación de sistemas multi-agente complejos',
                'IA aplicada a optimización de operaciones empresariales',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2.5 mb-2">
                  <span className="text-xs mt-0.5 shrink-0" style={{ color: VIOLET }}>›</span>
                  <span className="text-xs leading-relaxed" style={{ color: 'rgba(240,244,255,0.6)' }}>{item}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Certifications */}
          <div>
            <SLabel>Certificaciones</SLabel>
            <div className="grid grid-cols-2 gap-3">
              {CV.certs.map((c, i) => (
                <motion.div key={c.n} className="p-4"
                  style={{ border: '1px solid rgba(240,244,255,0.06)', background: BG, borderRadius: '2px' }}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.5 }}
                  whileHover={{ borderColor: CYAN18, background: CYAN10 }}
                >
                  <div className="text-lg mb-2" aria-hidden="true">{c.ic}</div>
                  <div className="text-xs font-semibold leading-snug mb-1"
                    style={{ color: 'rgba(240,244,255,0.85)' }}>{c.n}</div>
                  <div className="font-mono text-[9px] uppercase tracking-wider"
                    style={{ color: 'rgba(240,244,255,0.3)' }}>{c.org}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════ CONTACT ══════════════════════
function CVContact() {
  return (
    <section className="py-28 lg:py-36 relative overflow-hidden" style={{ background: BG }}>
      {/* Ambient glow */}
      <div className="absolute pointer-events-none"
        style={{ top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '700px', height: '500px',
          background: `radial-gradient(ellipse, rgba(0,229,255,0.05) 0%, transparent 65%)` }} />

      <div className="relative max-w-6xl mx-auto px-6 lg:px-12 text-center">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <div className="inline-block font-mono text-[9px] uppercase tracking-[0.4em] mb-6 px-4 py-1.5"
            style={{ color: 'rgba(0,229,255,0.65)', border: `1px solid ${CYAN18}`, borderRadius: '2px' }}>
            Contacto directo
          </div>
          <h2 className="cv-hablemos font-black leading-[0.85] tracking-tight mb-8"
            style={{ fontFamily: FD, fontSize: 'clamp(2.5rem, 6vw, 5.5rem)', color: WHITE }}>
            HABLEMOS<span style={{ color: CYAN }}>.</span>
          </h2>
          <p className="font-mono text-sm mx-auto mb-10" style={{ color: MUTED, maxWidth: '30rem' }}>
            Disponible para posiciones backend, proyectos empresariales o consultoría en .NET / SQL Server.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <a href={CV.wa} target="_blank" rel="noopener noreferrer"
              className="px-8 py-3.5 font-bold text-xs uppercase tracking-[0.25em] transition-all duration-300"
              style={{ background: CYAN, color: BG, borderRadius: '2px' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#33EAFF'; }}
              onMouseLeave={e => { e.currentTarget.style.background = CYAN; }}>
              WhatsApp ↗
            </a>
            <a href={`mailto:${CV.email}`}
              className="px-8 py-3.5 text-xs uppercase tracking-[0.25em] transition-all duration-300"
              style={{ border: '1px solid rgba(240,244,255,0.12)', color: MUTED, borderRadius: '2px' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = CYAN18; e.currentTarget.style.color = CYAN; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(240,244,255,0.12)'; e.currentTarget.style.color = MUTED; }}>
              {CV.email}
            </a>
            <a href={CV.linkedin} target="_blank" rel="noopener noreferrer"
              className="px-8 py-3.5 text-xs uppercase tracking-[0.25em] transition-all duration-300"
              style={{ border: '1px solid rgba(240,244,255,0.12)', color: MUTED, borderRadius: '2px' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = CYAN18; e.currentTarget.style.color = CYAN; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(240,244,255,0.12)'; e.currentTarget.style.color = MUTED; }}>
              LinkedIn ↗
            </a>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4 font-mono text-xs"
            style={{ borderTop: '1px solid rgba(240,244,255,0.05)', color: 'rgba(240,244,255,0.25)' }}>
            <span>{CV.loc}</span>
            <span className="hidden sm:block">·</span>
            <span>{CV.phone}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ════════════════════════════════════════════════════ PAGE ════════════════════
export default function CVPage() {
  const [booted, setBooted] = useState(false);

  useEffect(() => {
    document.title = `${CV.fullName} — CV · Backend Developer`;
    return () => {
      document.title = 'JR Digital Solutions — Software Personalizado para tu Negocio';
    };
  }, []);

  return (
    <>
      <PrintStyles />

      <AnimatePresence mode="wait">
        {!booted && <BootScreen key="boot" onDone={() => setBooted(true)} />}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={booted ? { opacity: 1 } : {}}
        transition={{ duration: 0.6 }}
        style={{ background: BG, minHeight: '100vh' }}
      >
        <CVNav ready={booted} />
        <div style={{ paddingTop: '64px' }}>
          <CVHero ready={booted} />
          <CVAbout />
          <CVExperience />
          <CVSkills />
          <CVProjects />
          <CVEducation />
          <CVContact />
        </div>
      </motion.div>
    </>
  );
}

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import SceneBackground from '../components/v2/SceneBackground';
import WhatsAppFloat from '../components/layout/WhatsAppFloat';
import { PROJECTS, CONTACT, ABOUT_STATS, PROCESS_STEPS, TESTIMONIALS, PROBLEMS, SOLUTIONS, SERVICES } from '../utils/constants';
// ─── UTILS ───────────────────────────────────────────────────────────────────

function CountUp({ raw, duration = 1.8 }) {
  const match = typeof raw === 'string' ? raw.match(/^(\d+)([+%]?)$/) : null;
  const num = match ? parseInt(match[1]) : 0;
  const suffix = match ? match[2] : '';
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / (duration * 1000), 1);
      setCount(Math.round((1 - Math.pow(1 - p, 3)) * num));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, num, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}
// ─── NAV ─────────────────────────────────────────────────────────────────────

const NAV = [
  { label: 'Proyectos', href: '#proyectos' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Proceso',   href: '#proceso'   },
  { label: 'Sobre mí',  href: '#sobre-mi'  },
  { label: 'Contacto',  href: '#contacto'  },
];

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const fn = () => {
      const y = window.scrollY;
      setScrolled(y > 50);
      const max = document.body.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? (y / max) * 100 : 0);
    };
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    const ids = ['proyectos', 'servicios', 'proceso', 'sobre-mi', 'contacto'];
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); });
      },
      { threshold: 0.25, rootMargin: '-68px 0px 0px 0px' }
    );
    ids.forEach((id) => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-[#080808]/90 backdrop-blur-xl border-b border-white/5' : ''
      }`}
    >
      {/* Scroll progress bar */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-white/5">
        <div
          className="h-full bg-gradient-to-r from-indigo-500 via-violet-500 to-indigo-400"
          style={{ width: `${progress}%`, transition: 'width 80ms linear' }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 h-[68px] flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          className="text-white font-black text-lg tracking-[0.25em] uppercase"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          JR
        </a>

        {/* Desktop links */}
        <nav className="hidden md:flex items-center gap-10">
          {NAV.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className={`text-xs uppercase tracking-[0.25em] transition-colors duration-300 ${
                active === href.slice(1) ? 'text-white' : 'text-white/40 hover:text-white'
              }`}
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="/cv"
            className="inline-flex items-center gap-2 px-4 py-2.5 border border-white/10 text-white/50 text-xs uppercase tracking-[0.25em] hover:border-amber-400/40 hover:text-amber-400/80 transition-all duration-300"
          >
            CV
          </a>
          <a
            href={CONTACT.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 border border-white/15 text-white text-xs uppercase tracking-[0.25em] hover:bg-white hover:text-black transition-all duration-300"
          >
            Hablemos
          </a>
        </div>

        {/* Mobile burger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden flex flex-col justify-center gap-1.5 w-8 h-8"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={open}
        >
          <span className={`block h-px bg-white transition-all duration-300 ${open ? 'rotate-45 translate-y-[7px]' : ''}`} />
          <span className={`block h-px bg-white transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
          <span className={`block h-px bg-white transition-all duration-300 ${open ? '-rotate-45 -translate-y-[7px]' : ''}`} />
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#080808]/95 backdrop-blur-xl overflow-hidden border-b border-white/5"
          >
            <div className="px-6 py-8 flex flex-col gap-6" style={{ overscrollBehavior: 'contain' }}>
              {NAV.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  onClick={() => setOpen(false)}
                  className="text-white/60 hover:text-white uppercase tracking-[0.25em] text-sm transition-colors"
                >
                  {label}
                </a>
              ))}
              <a
                href={CONTACT.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 px-6 py-3.5 border border-white/15 text-white text-xs uppercase tracking-[0.25em] text-center hover:bg-white hover:text-black transition-all duration-300"
              >
                Hablemos
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[#080808]"
    >
      {/* Full-screen 3D canvas — absolute behind text */}
      <div className="absolute inset-0 z-0">
        <SceneBackground />
      </div>

      {/* Gradient: fade left so text is readable, fade bottom for transition */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        {/* Fade left so text is readable; right stays dark enough on mobile */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-[#080808]/85 to-transparent" />
        <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-[#080808] to-transparent" />
        <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-[#080808] to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full pt-28 pb-24">
        {/* Label */}
        <motion.div
          className="flex items-center gap-4 mb-10"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <span className="w-10 h-px bg-indigo-500" />
          <span className="text-indigo-400 uppercase tracking-[0.35em] text-xs font-mono">
            Desarrollador de Software
          </span>
        </motion.div>

        {/* Name — fluid clamp from 52px to 130px */}
        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="text-white font-black leading-[0.88] tracking-tight mb-10"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.4rem, 7.8vw, 7.5rem)',
          }}
        >
          JORGE<br />
          RODR{'\u00CD'}GUEZ.
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="text-white/70 text-base sm:text-lg leading-relaxed mb-12"
          style={{ maxWidth: '32rem' }}
        >
          Construyo sistemas de software a la medida que resuelven problemas
          reales para empresas que crecen.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.72 }}
          className="flex flex-wrap gap-4"
        >
          <a
            href="#proyectos"
            className="px-8 py-3.5 bg-white text-black text-xs uppercase tracking-[0.25em] font-bold hover:bg-indigo-500 hover:text-white transition-all duration-300"
          >
            Ver proyectos
          </a>
          <a
            href={CONTACT.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3.5 border border-white/20 text-white text-xs uppercase tracking-[0.25em] hover:border-white/50 transition-all duration-300"
          >
            WhatsApp ↗
          </a>
        </motion.div>

        {/* Location + scroll */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-16 flex items-center gap-3"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-white/25 text-xs font-mono uppercase tracking-widest">
            San Carlos, Costa Rica — Disponible para proyectos
          </span>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-12 bg-gradient-to-b from-white/25 to-transparent"
        />
        <span className="text-white/20 text-[10px] uppercase tracking-[0.4em] font-mono">Scroll</span>
      </motion.div>
    </section>
  );
}

// ─── PROBLEMS ───────────────────────────────────────────────────────────────

function Problems() {
  return (
    <section className="bg-[#0a0a0a] py-28 lg:py-36 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="mb-16 lg:mb-20 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div>
            <span className="block text-white/25 uppercase tracking-[0.35em] text-[11px] font-mono mb-6">
              El problema
            </span>
            <h2
              className="text-white font-black leading-tight"
              style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
            >
              ¿Tu negocio vive alguno<br />
              <span className="text-red-400/90">de estos problemas?</span>
            </h2>
          </div>
          <p className="text-white/60 text-sm shrink-0" style={{ maxWidth: '20rem' }}>
            El software correcto los resuelve — rápido, sin papel, sin Excel.
          </p>
        </div>

        {/* Problem cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 mb-0">
          {PROBLEMS.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: i * 0.09, duration: 0.6 }}
              className="bg-[#0a0a0a] p-8"
            >
              <p.icon className="w-5 h-5 text-red-400/50 mb-6" />
              <h3
                className="text-white font-bold text-sm mb-3"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {p.title}
              </h3>
              <p className="text-white/60 text-sm leading-relaxed">{p.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Solutions strip */}
        <div className="border border-white/5 border-t-0 p-8 bg-[#080808]">
          <span className="block text-white/40 uppercase tracking-[0.35em] text-[10px] font-mono mb-5">
            Con software a la medida, podés tener:
          </span>
          <div className="flex flex-wrap gap-x-8 gap-y-3">
            {SOLUTIONS.map((s, i) => (
              <motion.div
                key={s}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.5 }}
                className="flex items-center gap-2.5"
              >
                <span className="w-1 h-1 rounded-full bg-emerald-400/70 shrink-0" />
                <span className="text-white/75 text-sm">{s}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── PROJECTS ────────────────────────────────────────────────────────────────

function Projects() {
  const [hovered, setHovered] = useState(null);

  return (
    <section id="proyectos" className="bg-[#080808] py-28 lg:py-36">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="flex items-end justify-between pb-10 border-b border-white/8 mb-0">
          <div>
            <span className="block text-white/25 uppercase tracking-[0.35em] text-[11px] font-mono mb-4">
              Selected Work
            </span>
            <h2
              className="text-white font-black leading-none"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem, 5vw, 4.5rem)',
              }}
            >
              Proyectos
            </h2>
          </div>
          <span className="text-white/30 font-mono text-xs hidden sm:block pb-1">
            {PROJECTS.length.toString().padStart(2, '0')} trabajos
          </span>
        </div>

        {/* List */}
        {PROJECTS.map((p, i) => (
          <div
            key={p.title}
            className="border-b border-white/8 group cursor-pointer"
            role="button"
            tabIndex={0}
            aria-expanded={hovered === i}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => setHovered(hovered === i ? null : i)}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setHovered(hovered === i ? null : i); } }}
          >
            <div className="py-8 lg:py-10 grid grid-cols-[44px_1fr_auto] lg:grid-cols-[56px_1fr_260px_40px] gap-4 lg:gap-8 items-start">
              {/* Number */}
              <span className="text-white/35 font-mono text-xs tabular-nums pt-1.5">
                {(i + 1).toString().padStart(2, '0')}
              </span>

              {/* Title + meta */}
              <div>
                <h3
                  className={`font-bold leading-tight transition-colors duration-300 ${
                    hovered === i ? 'text-indigo-400' : 'text-white'
                  }`}
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(1.3rem, 3vw, 2.2rem)',
                  }}
                >
                  {p.title}
                </h3>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2">
                  <span className="text-white/50 text-[11px] uppercase tracking-widest font-mono">
                    {p.category}
                  </span>
                  {p.tech.slice(0, 3).map((t) => (
                    <span key={t} className="text-white/40 text-[11px] font-mono">
                      · {t}
                    </span>
                  ))}
                </div>

                {/* Description — expands on hover */}
                <AnimatePresence>
                  {hovered === i && (
                    <motion.p
                      initial={{ opacity: 0, height: 0, marginTop: 0 }}
                      animate={{ opacity: 1, height: 'auto', marginTop: 12 }}
                      exit={{ opacity: 0, height: 0, marginTop: 0 }}
                      className="text-white/65 text-sm leading-relaxed overflow-hidden"
                      style={{ maxWidth: '40rem' }}
                    >
                      {p.description}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Result */}
              <div className="hidden lg:flex items-start justify-end pt-1.5">
                <span className="text-emerald-400/60 text-xs font-mono text-right">
                  {p.result}
                </span>
              </div>

              {/* Arrow */}
              <motion.div
                animate={{ x: hovered === i ? 5 : 0 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className={`text-xl leading-none pt-1 transition-colors duration-300 ${
                  hovered === i ? 'text-white/60' : 'text-white/15'
                }`}
              >
                →
              </motion.div>
            </div>
          </div>
        ))}

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="border border-white/5 bg-[#0a0a0a] p-8 lg:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
        >
          <div>
            <p
              className="text-white font-bold text-base mb-1"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              ¿Tu negocio necesita un sistema así?
            </p>
            <p className="text-white/50 text-sm">Construimos la solución exacta para tus procesos.</p>
          </div>
          <a
            href={CONTACT.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 px-8 py-3.5 bg-white text-black text-xs uppercase tracking-[0.25em] font-bold
                       hover:bg-indigo-500 hover:text-white transition-all duration-300 whitespace-nowrap"
          >
            Consultar ahora →
          </a>
        </motion.div>
      </div>
    </section>
  );
}

// ─── SERVICES ────────────────────────────────────────────────────────────────

function Services() {
  return (
    <section id="servicios" className="bg-[#0a0a0a] py-28 lg:py-36 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-16">
          <span className="block text-white/25 uppercase tracking-[0.35em] text-[11px] font-mono mb-6">
            Servicios
          </span>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2
              className="text-white font-black leading-tight"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.2rem, 5vw, 4rem)',
              }}
            >
              Soluciones para{' '}
              <span className="text-indigo-400">cada necesidad.</span>
            </h2>
            <p className="text-white/60 text-sm leading-relaxed shrink-0 lg:text-right" style={{ maxWidth: '22rem' }}>
              Software a la medida para empresas en Costa Rica.
              Desde la idea hasta el servidor.
            </p>
          </div>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/5">
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
              className="bg-[#0a0a0a] p-8 lg:p-10 group cursor-default"
            >
              <s.icon className="w-5 h-5 text-indigo-400/60 mb-6" />
              <h3
                className="text-white font-bold group-hover:text-indigo-400 transition-colors duration-300 mb-3"
                style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem' }}
              >
                {s.title}
              </h3>
              <p className="text-white/60 text-sm leading-relaxed mb-6">{s.description}</p>
              <ul className="space-y-2">
                {s.features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5">
                    <span className="w-1 h-1 rounded-full bg-indigo-400/60 shrink-0" />
                    <span className="text-white/50 text-xs font-mono">{f}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── PROCESS ────────────────────────────────────────────────────────────────

function Process() {
  return (
    <section id="proceso" className="bg-[#0a0a0a] py-28 lg:py-36 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <span className="block text-white/25 uppercase tracking-[0.35em] text-[11px] font-mono mb-6">
          Cómo trabajo
        </span>
        <h2
          className="text-white font-black leading-tight mb-16"
          style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
        >
          De la idea al{' '}
          <span className="text-indigo-400">sistema en producción.</span>
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6">
          {PROCESS_STEPS.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="group"
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="text-white/35 font-mono text-xs tabular-nums">{step.number}</span>
                <div className="flex-1 h-px bg-white/6" />
              </div>
              <step.icon className="w-4 h-4 text-indigo-400/70 mb-4" />
              <h3
                className="text-white font-bold text-sm mb-2"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {step.title}
              </h3>
              <p className="text-white/60 text-sm leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── TESTIMONIALS ─────────────────────────────────────────────────────────────

function Testimonials() {
  return (
    <section className="bg-[#080808] py-28 lg:py-36 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <span className="block text-white/25 uppercase tracking-[0.35em] text-[11px] font-mono mb-6">
          Clientes
        </span>
        <h2
          className="text-white font-black leading-tight mb-16"
          style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
        >
          Lo que dicen los que{' '}
          <span className="text-indigo-400">ya lo vivieron.</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/5">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
              className="bg-[#080808] p-8 lg:p-10"
            >
              <div className="text-amber-400/75 text-xs tracking-wider mb-5">★★★★★</div>
              <p className="text-white/75 text-sm leading-relaxed mb-8">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-4">
                <div
                  className="w-9 h-9 rounded-full bg-indigo-500/15 border border-indigo-500/25
                             flex items-center justify-center text-indigo-400 font-mono text-[10px]
                             shrink-0"
                >
                  {t.initials}
                </div>
                <div>
                  <div
                    className="text-white font-bold text-sm"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {t.name}
                  </div>
                  <div className="text-white/45 text-[11px] font-mono uppercase tracking-wider mt-0.5">
                    {t.role}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── ABOUT ───────────────────────────────────────────────────────────────────

const TECH_ROW1 = ['React', '.NET Core', 'C#', 'SQL Server', 'TypeScript', 'Entity Framework', 'TailwindCSS', 'Vite'];
const TECH_ROW2 = ['Node.js', 'Docker', 'REST APIs', 'JWT Auth', 'Azure', 'PostgreSQL', 'Git', 'JavaScript'];

function TechMarquee() {
  return (
    <>
      <style>{`
        @keyframes mq-left  { from { transform: translateX(0);    } to { transform: translateX(-50%); } }
        @keyframes mq-right { from { transform: translateX(-50%); } to { transform: translateX(0);    } }
        @media (prefers-reduced-motion: reduce) {
          .mq-track { animation-play-state: paused !important; }
        }
      `}</style>
      <div className="space-y-3" aria-hidden="true">
        {[
          { items: TECH_ROW1, dir: 'mq-left',  dur: 28 },
          { items: TECH_ROW2, dir: 'mq-right', dur: 34 },
        ].map(({ items, dir, dur }, ri) => (
          <div key={ri} className="overflow-hidden">
            <div
              className="flex gap-3 mq-track"
              style={{ width: 'max-content', animation: `${dir} ${dur}s linear infinite` }}
            >
              {[...items, ...items].map((item, j) => (
                <span
                  key={j}
                  className="px-4 py-2 border border-white/8 text-white/45 text-xs font-mono whitespace-nowrap
                             hover:border-indigo-500/30 hover:text-white/70 transition-colors duration-300"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function About() {
  return (
    <section id="sobre-mi" className="bg-[#080808] py-28 lg:py-36 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <span className="block text-white/25 uppercase tracking-[0.35em] text-[11px] font-mono mb-14">
          Sobre mí
        </span>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-start">
          {/* Left — text + stats + marquee */}
          <div className="min-w-0">
            <h2
              className="text-white font-black leading-tight mb-8"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.8rem, 3.5vw, 3rem)',
              }}
            >
              Software que transforma<br />
              <span className="text-indigo-400">negocios reales.</span>
            </h2>
            <p className="text-white/70 leading-relaxed text-sm mb-12">
              +5 años construyendo sistemas para empresas en Costa Rica. Especializado en .NET Core
              y React — desde gestión e inventario hasta eCommerce con facturación electrónica CR.
            </p>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-8 mb-14">
              {ABOUT_STATS.map(({ value, label }) => (
                <div key={value}>
                  <div
                    className="text-white font-black mb-1"
                    style={{ fontFamily: 'var(--font-display)', fontSize: '3rem', lineHeight: 1 }}
                  >
                    <CountUp raw={value} />
                  </div>
                  <div className="text-white/45 text-[11px] uppercase tracking-[0.25em] font-mono whitespace-pre-line">
                    {label}
                  </div>
                </div>
              ))}
            </div>

            {/* Tech marquee */}
            <span className="block text-white/25 uppercase tracking-[0.35em] text-[11px] font-mono mb-6">
              Stack técnico
            </span>
            <TechMarquee />
          </div>

          {/* Right — featured photo */}
          <div className="min-w-0">
            <div
              className="relative overflow-hidden border border-white/8"
              style={{ boxShadow: '0 0 70px rgba(99,102,241,0.13)' }}
            >
              {/* Corner brackets */}
              <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-indigo-500/60 z-10 pointer-events-none" />
              <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-indigo-500/60 z-10 pointer-events-none" />
              <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-indigo-500/60 z-10 pointer-events-none" />
              <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-indigo-500/60 z-10 pointer-events-none" />

              <img
                src="/jorge.jpg"
                alt={CONTACT.name}
                loading="lazy"
                width="600"
                height="540"
                className="w-full object-cover object-top block"
                style={{ filter: 'grayscale(10%) contrast(1.06)', maxHeight: '540px' }}
              />

              {/* Gradient overlay + caption */}
              <div
                className="absolute inset-x-0 bottom-0 pt-20 px-6 pb-6"
                style={{ background: 'linear-gradient(to top, rgba(8,8,8,0.95) 0%, rgba(8,8,8,0.5) 50%, transparent 100%)' }}
              >
                <div
                  className="text-white font-bold text-sm"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {CONTACT.name}
                </div>
                <div className="text-white/50 text-[11px] font-mono uppercase tracking-wider mt-1">
                  {CONTACT.business} · San Carlos, CR
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── CONTACT ─────────────────────────────────────────────────────────────────

function Contact() {
  return (
    <section id="contacto" className="bg-[#080808] py-28 lg:py-44 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <span className="block text-white/25 uppercase tracking-[0.35em] text-[11px] font-mono mb-10">
          Contacto
        </span>

        <h2
          className="text-white font-black leading-[0.88] tracking-tight mb-14"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.4rem, 7.8vw, 7rem)',
          }}
        >
          TRABAJEMOS<br />
          <span className="text-indigo-400">JUNTOS.</span>
        </h2>

        <div className="flex flex-col sm:flex-row gap-4 mb-20">
          <a
            href={CONTACT.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="px-9 py-4 bg-white text-black text-xs uppercase tracking-[0.25em] font-bold
                       hover:bg-indigo-500 hover:text-white transition-all duration-300 text-center"
          >
            Abrir WhatsApp ↗
          </a>
          <a
            href={`mailto:${CONTACT.email}`}
            className="px-9 py-4 border border-white/15 text-white text-xs uppercase tracking-[0.25em]
                       hover:border-white/45 transition-all duration-300 text-center"
          >
            {CONTACT.email}
          </a>
          <a
            href={CONTACT.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="px-9 py-4 border border-white/15 text-white text-xs uppercase tracking-[0.25em]
                       hover:border-indigo-400 hover:text-indigo-400 transition-all duration-300 text-center"
          >
            LinkedIn ↗
          </a>
          <a
            href={CONTACT.github}
            target="_blank"
            rel="noopener noreferrer"
            className="px-9 py-4 border border-white/15 text-white text-xs uppercase tracking-[0.25em]
                       hover:border-white/40 hover:text-white/80 transition-all duration-300 text-center"
          >
            GitHub ↗
          </a>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 sm:gap-12 text-white/50 font-mono text-xs uppercase tracking-widest">
          <span>{CONTACT.phone}</span>
          <span>{CONTACT.location}</span>
        </div>
      </div>
    </section>
  );
}

// ─── SCROLL TOP ───────────────────────────────────────────────────────────────

function ScrollTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const fn = () => setVisible(window.scrollY > 600);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);
  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-24 right-6 z-50 w-10 h-10 border border-white/15 bg-[#080808]/90
                     backdrop-blur-md text-white/50 hover:text-white hover:border-white/40
                     transition-colors duration-300 flex items-center justify-center"
          aria-label="Volver arriba"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M6 10V2M2 6l4-4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}

// ─── FOOTER ──────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="bg-[#080808] border-t border-white/5 py-8 pb-28 sm:pb-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between mb-3">
          <span
            className="text-white font-black tracking-[0.2em] uppercase text-sm"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            JR Digital Solutions
          </span>
          <div className="flex items-center gap-6">
            <a
              href={CONTACT.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/35 hover:text-white text-xs font-mono uppercase tracking-widest transition-colors duration-300"
            >
              GitHub ↗
            </a>
            <a
              href={CONTACT.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/35 hover:text-white text-xs font-mono uppercase tracking-widest transition-colors duration-300"
            >
              LinkedIn ↗
            </a>
          </div>
        </div>
        <span className="text-white/40 text-xs font-mono">
          © {new Date().getFullYear()} · Jorge Rodríguez · San Carlos, CR
        </span>
      </div>
    </footer>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function PortfolioV2() {
  return (
    <div className="bg-[#080808]">
      <Nav />
      <Hero />
      <About />
      <Problems />
      <Projects />
      <Process />
      <Services />
      <Testimonials />
      <Contact />
      <Footer />
      <WhatsAppFloat />
      <ScrollTop />
    </div>
  );
}

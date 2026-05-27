import { motion } from 'framer-motion';
import { ArrowUpRight, MessageCircle, MapPin } from 'lucide-react';
import Container from '../ui/Container';
import DevScene3D from '../ui/DevScene3D';
import { CONTACT } from '../../utils/constants';

/* ---------- WorkspaceVisual ---------- */
function WorkspaceVisual() {
  const codeLines = [
    { text: 'const sistema = new JRDigital({', color: 'text-indigo-400' },
    { text: '  cliente: "Tu Negocio",', color: 'text-emerald-400' },
    { text: '  modulos: ["Inventario","CRM"],', color: 'text-yellow-400' },
    { text: '  tech: ["React", ".NET", "SQL"],', color: 'text-pink-400' },
    { text: '  soporte: "24/7",', color: 'text-emerald-400' },
    { text: '  resultado: "Exito garantizado"', color: 'text-yellow-400' },
    { text: '});', color: 'text-indigo-400' },
  ];

  const techBadges = [
    { name: 'React', cls: 'text-cyan-400 border-cyan-400/30 bg-cyan-400/8', left: '-6%', top: '12%', delay: 0 },
    { name: '.NET', cls: 'text-purple-400 border-purple-400/30 bg-purple-400/8', left: '82%', top: '6%', delay: 0.6 },
    { name: 'SQL', cls: 'text-amber-400 border-amber-400/30 bg-amber-400/8', left: '78%', top: '68%', delay: 1.1 },
    { name: 'C#', cls: 'text-green-400 border-green-400/30 bg-green-400/8', left: '-4%', top: '72%', delay: 1.7 },
  ];

  return (
    <div className="relative w-full h-[480px] flex items-center justify-center">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-72 h-72 bg-indigo-600/20 rounded-full blur-[100px]" />
      </div>

      <motion.div
        className="relative w-[88%] rounded-2xl overflow-hidden shadow-2xl shadow-black/60"
        style={{ border: '1px solid rgba(255,255,255,0.07)', background: '#0D0D0D' }}
        animate={{ y: [-6, 6, -6] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
      >
        <div className="flex items-center gap-2 px-5 py-3.5" style={{ background: '#161616', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
          <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
          <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
          <span className="ml-3 text-xs font-mono" style={{ color: 'rgba(255,255,255,0.28)' }}>proyecto.js</span>
        </div>

        <div className="p-5 font-mono text-[13px] leading-[1.85]">
          {codeLines.map((line, i) => (
            <motion.div
              key={i}
              className={line.color}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.14, duration: 0.4 }}
            >
              {line.text}
            </motion.div>
          ))}
          <motion.span
            className="inline-block w-[9px] h-[18px] bg-indigo-400/70 align-middle rounded-sm"
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.6, repeat: Infinity, repeatType: 'reverse' }}
          />
        </div>

        <div className="px-5 py-2.5 flex items-center gap-2" style={{ background: 'rgba(99,102,241,0.15)', borderTop: '1px solid rgba(99,102,241,0.2)' }}>
          <motion.div
            className="w-2 h-2 bg-emerald-400 rounded-full"
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ duration: 1.4, repeat: Infinity }}
          />
          <span className="text-xs font-mono text-indigo-300">Compilado exitosamente</span>
        </div>
      </motion.div>

      {techBadges.map((badge, i) => (
        <motion.div
          key={badge.name}
          className={`absolute px-3 py-1.5 rounded-lg border text-xs font-mono font-semibold ${badge.cls}`}
          style={{ left: badge.left, top: badge.top }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: [-5, 5, -5],
            rotate: [i % 2 === 0 ? -2 : 2, i % 2 === 0 ? 2 : -2, i % 2 === 0 ? -2 : 2],
          }}
          transition={{
            opacity: { delay: 0.5 + i * 0.2, duration: 0.4 },
            scale: { delay: 0.5 + i * 0.2, duration: 0.4 },
            y: { duration: 3.2 + i * 0.6, repeat: Infinity, ease: 'easeInOut', delay: badge.delay },
            rotate: { duration: 3.2 + i * 0.6, repeat: Infinity, ease: 'easeInOut', delay: badge.delay },
          }}
        >
          {badge.name}
        </motion.div>
      ))}

      <motion.div
        className="absolute rounded-xl px-4 py-3"
        style={{ bottom: '6%', right: '4%', background: '#111', border: '1px solid rgba(52,211,153,0.2)' }}
        animate={{ y: [-4, 4, -4] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="flex items-center gap-2">
          <motion.div
            className="w-2.5 h-2.5 bg-emerald-400 rounded-full"
            animate={{ scale: [1, 1.4, 1] }}
            transition={{ duration: 1.2, repeat: Infinity }}
          />
          <span className="text-xs font-mono text-emerald-300">+200% ventas online</span>
        </div>
      </motion.div>
    </div>
  );
}

/* ---------- Hero Section ---------- */
export default function Hero() {
  return (
    <section id="inicio" className="relative min-h-screen flex flex-col overflow-hidden">
      <div className="absolute inset-0" style={{ background: '#080808' }} />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0.035,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '180px 180px',
        }}
      />

      <div
        className="absolute pointer-events-none"
        style={{
          top: '20%', right: '20%',
          width: '600px', height: '600px',
          background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)',
          borderRadius: '50%',
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: '15%', left: '10%',
          width: '400px', height: '400px',
          background: 'radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 70%)',
          borderRadius: '50%',
        }}
      />

      <Container className="relative z-10 flex-1 flex items-center">
        <div className="grid md:grid-cols-[1.2fr_0.8fr] lg:grid-cols-[1.1fr_0.9fr] gap-8 xl:gap-20 items-center w-full py-28 md:py-0 min-h-screen">

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-flex items-center gap-2.5 mb-8"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.6 }}
            >
              <span className="relative flex h-2.5 w-2.5">
                <span
                  className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                  style={{ background: '#4ADE80' }}
                />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5" style={{ background: '#4ADE80' }} />
              </span>
              <span className="text-sm tracking-wide" style={{ color: 'rgba(255,255,255,0.45)' }}>
                Disponible para nuevos proyectos
              </span>
            </motion.div>

            <motion.h1
              className="font-display font-extrabold text-white leading-[0.88] tracking-tight"
              style={{ fontSize: 'clamp(3.8rem, 9.5vw, 8.5rem)' }}
              initial={{ opacity: 0, y: 36 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28, duration: 0.85, ease: [0.0, 0.0, 0.2, 1] }}
            >
              JORGE
              <br />
              <span className="text-white">RODR{'\u00CD'}GUEZ</span>
              <span style={{ color: '#6366F1' }}>.</span>
            </motion.h1>

            <motion.div
              className="mt-6 mb-8 inline-block"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.55, duration: 0.5, type: 'spring', stiffness: 200 }}
            >
              <div
                className="inline-flex items-center px-5 py-2"
                style={{ border: '2px solid rgba(255,255,255,0.75)', borderRadius: '3px' }}
              >
                <span
                  className="font-mono font-bold uppercase"
                  style={{ letterSpacing: '0.28em', fontSize: '0.78rem', color: '#ffffff' }}
                >
                  DESARROLLADOR DE SOFTWARE
                </span>
              </div>
            </motion.div>

            <motion.div
              className="flex flex-wrap items-center gap-3 mb-10"
              style={{ color: 'rgba(255,255,255,0.38)', fontSize: '0.875rem' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.65, duration: 0.6 }}
            >
              <span className="font-semibold" style={{ color: 'rgba(255,255,255,0.58)' }}>
                JR Digital Solutions
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                San Carlos, Costa Rica
              </span>
            </motion.div>

            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.78, duration: 0.6 }}
            >
              <a
                href="#proyectos"
                className="group inline-flex items-center gap-2 font-bold text-sm rounded-full transition-all duration-200"
                style={{ background: '#ffffff', color: '#080808', padding: '0.875rem 1.75rem' }}
              >
                Ver proyectos
                <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a
                href={CONTACT.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-medium text-sm rounded-full transition-all duration-200 hover:bg-white/5"
                style={{ border: '1px solid rgba(255,255,255,0.18)', color: '#ffffff', padding: '0.875rem 1.75rem' }}
              >
                <MessageCircle className="w-4 h-4" />
                Hablar por WhatsApp
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            className="hidden lg:flex items-center justify-center"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 1.2, ease: [0.0, 0.0, 0.2, 1] }}
          >
            <DevScene3D />
          </motion.div>
        </div>
      </Container>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.6 }}
      >
        <div
          className="w-6 h-10 rounded-full flex justify-center pt-2"
          style={{ border: '1.5px solid rgba(255,255,255,0.18)' }}
        >
          <motion.div
            className="w-1 h-2 rounded-full"
            style={{ background: 'rgba(255,255,255,0.45)' }}
            animate={{ y: [0, 14, 0], opacity: [0.8, 0.2, 0.8] }}
            transition={{ duration: 1.9, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
        <span
          className="font-mono"
          style={{ fontSize: '0.625rem', color: 'rgba(255,255,255,0.22)', letterSpacing: '0.25em' }}
        >
          SCROLL
        </span>
      </motion.div>

      <div
        className="absolute bottom-0 left-0 right-0 h-[1px]"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent)' }}
      />
    </section>
  );
}
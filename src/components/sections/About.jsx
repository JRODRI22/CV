import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Container from '../ui/Container';
import { CONTACT, ABOUT_STATS } from '../../utils/constants';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.0, 0.0, 0.2, 1] } },
};

export default function About() {
  return (
    <section
      id="sobre-mi"
      className="relative py-24 md:py-36 overflow-hidden"
      style={{ background: '#080808' }}
    >
      {/* Top divider */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px]"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent)' }}
      />

      {/* Ambient glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '30%', left: '-5%',
          width: '500px', height: '500px',
          background: 'radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)',
          borderRadius: '50%',
        }}
      />

      <Container className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* ===== LEFT: Text ===== */}
          <motion.div
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            {/* Section label */}
            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-10">
              <div className="w-8 h-[2px]" style={{ background: '#6366F1' }} />
              <span
                className="font-mono uppercase tracking-widest"
                style={{ fontSize: '0.7rem', color: '#6366F1' }}
              >
                Sobre mí
              </span>
            </motion.div>

            <motion.h2
              variants={fadeUp}
              className="font-display font-extrabold text-white leading-[0.92] mb-8"
              style={{ fontSize: 'clamp(2.8rem, 5.5vw, 4.5rem)' }}
            >
              Software que
              <br />
              <span style={{ color: '#6366F1' }}>transforma</span>
              <br />
              negocios.
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="text-lg leading-relaxed mb-5"
              style={{ color: 'rgba(255,255,255,0.55)' }}
            >
              Soy Jorge Rodríguez, desarrollador de software con base en San Carlos,
              Costa Rica. A través de <span style={{ color: 'rgba(255,255,255,0.85)' }}>JR Digital Solutions</span>, construyo
              sistemas a medida que resuelven problemas reales para PYMEs y emprendedores.
            </motion.p>

            <motion.p
              variants={fadeUp}
              className="text-lg leading-relaxed mb-10"
              style={{ color: 'rgba(255,255,255,0.55)' }}
            >
              Me especializo en aplicaciones web full-stack con React y .NET Core, sistemas
              de gestión empresarial, e integraciones que automatizan los procesos que más
              tiempo consumen — para que puedas enfocarte en lo que importa.
            </motion.p>

            <motion.div variants={fadeUp}>
              <a
                href={CONTACT.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 font-semibold text-sm transition-colors duration-200"
                style={{ color: '#6366F1' }}
              >
                Hablemos de tu proyecto
                <ArrowUpRight
                  className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            </motion.div>
          </motion.div>

          {/* ===== RIGHT: Stats Grid ===== */}
          <motion.div
            className="grid grid-cols-2 gap-4"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } } }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            {ABOUT_STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                variants={fadeUp}
                className="rounded-2xl p-8 flex flex-col justify-between"
                style={{
                  background: '#111111',
                  border: '1px solid rgba(255,255,255,0.06)',
                  minHeight: '160px',
                }}
                whileHover={{ borderColor: 'rgba(99,102,241,0.3)', transition: { duration: 0.2 } }}
              >
                <div
                  className="font-display font-extrabold text-white"
                  style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', lineHeight: 1 }}
                >
                  {stat.value}
                </div>
                <div
                  className="text-sm leading-relaxed whitespace-pre-line mt-3"
                  style={{ color: 'rgba(255,255,255,0.38)' }}
                >
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </Container>

      {/* Bottom divider */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[1px]"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent)' }}
      />
    </section>
  );
}

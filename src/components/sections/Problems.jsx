import { motion } from 'framer-motion';
import Container from '../ui/Container';
import SectionHeading from '../ui/SectionHeading';
import { PROBLEMS } from '../../utils/constants';
import { fadeInUp, staggerContainer } from '../../utils/animations';

export default function Problems() {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Subtle bg */}
      <div className="absolute inset-0 bg-gradient-to-b from-bg-primary via-bg-secondary/50 to-bg-primary pointer-events-none" />

      {/* Decorative circuit lines */}
      <div className="absolute top-0 left-0 right-0 circuit-line" />
      <div className="absolute bottom-0 left-0 right-0 circuit-line" />

      <Container className="relative z-10">
        <SectionHeading
          badge="El problema"
          title="¿Te suena familiar?"
          subtitle="La mayoría de negocios enfrentan estos problemas todos los días. Si uno es tu caso, tenemos la solución."
        />

        <motion.div
          className="grid sm:grid-cols-2 gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {PROBLEMS.map((problem, i) => {
            const Icon = problem.icon;
            return (
              <motion.div
                key={problem.title}
                variants={fadeInUp}
                className="group relative bg-bg-card/50 border border-border hover:border-red-500/30 rounded-2xl p-8 transition-all duration-500 hover:bg-bg-card"
                whileHover={{ y: -6, scale: 1.01 }}
              >
                {/* Red glow on hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Animated corner accent */}
                <motion.div
                  className="absolute top-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: 'var(--gradient-error-hover)',
                    borderRadius: '0 1rem 0 0',
                  }}
                />

                <div className="relative z-10">
                  <motion.div
                    className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-5 group-hover:bg-red-500/20 transition-all duration-300"
                    whileHover={{ rotate: [0, -5, 5, 0], scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                  >
                    <Icon className="w-6 h-6 text-red-400" />
                  </motion.div>

                  <h3 className="text-xl font-bold text-text-primary mb-3 group-hover:text-red-300 transition-colors duration-300">{problem.title}</h3>
                  <p className="text-text-secondary leading-relaxed">{problem.description}</p>
                </div>

                {/* Number watermark - animated on hover */}
                <motion.span
                  className="absolute top-4 right-6 text-6xl font-black text-border/50 select-none"
                  whileHover={{ scale: 1.2, opacity: 0.3 }}
                >
                  {String(i + 1).padStart(2, '0')}
                </motion.span>

                {/* Bottom glow */}
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-red-500/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}

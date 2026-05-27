import { motion } from 'framer-motion';
import Container from '../ui/Container';
import SectionHeading from '../ui/SectionHeading';
import { PROCESS_STEPS } from '../../utils/constants';
import { fadeInUp, staggerContainer } from '../../utils/animations';

export default function Process() {
  return (
    <section id="proceso" className="relative py-20 md:py-32 overflow-hidden">
      {/* Bg */}
      <div className="absolute inset-0 bg-gradient-to-b from-bg-primary via-bg-secondary/30 to-bg-primary pointer-events-none" />

      <Container className="relative z-10">
        <SectionHeading
          badge="Proceso"
          title="Así trabajamos juntos"
          subtitle="Un proceso claro, transparente y enfocado en resultados. Sin sorpresas, sin letra pequeña."
        />

        <motion.div
          className="relative"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {/* Desktop animated connector line */}
          <div className="hidden lg:block absolute top-24 left-[10%] right-[10%] h-[2px] overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary/40 via-accent/40 to-primary/40"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
              style={{ transformOrigin: 'left' }}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-4">
            {PROCESS_STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.number}
                  variants={fadeInUp}
                  className="relative text-center group"
                >
                  {/* Number + Icon */}
                  <div className="relative mx-auto mb-6">
                    {/* Animated glow ring */}
                    <motion.div
                      className="absolute inset-0 w-20 h-20 mx-auto rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      animate={{
                        boxShadow: [
                          "0 0 0 0 rgba(79, 70, 229, 0)",
                          "0 0 20px 4px rgba(79, 70, 229, 0.3)",
                          "0 0 0 0 rgba(79, 70, 229, 0)",
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
                    />

                    <motion.div
                      className="relative w-20 h-20 mx-auto rounded-2xl bg-bg-card border border-border group-hover:border-primary/40 flex flex-col items-center justify-center transition-all duration-300 group-hover:bg-bg-card-hover"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <span className="text-xs font-bold text-primary-light">{step.number}</span>
                      <Icon className="w-6 h-6 text-text-secondary group-hover:text-primary-light transition-colors mt-0.5" />
                    </motion.div>

                    {/* Connector dot (desktop) with pulse */}
                    {i < PROCESS_STEPS.length - 1 && (
                      <div className="hidden lg:block absolute top-1/2 -right-2 w-4 h-4">
                        <motion.div
                          className="w-3 h-3 rounded-full bg-primary/40 mx-auto"
                          animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.8, 0.4] }}
                          transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
                        />
                      </div>
                    )}
                  </div>

                  <h3 className="text-base font-bold text-text-primary mb-2 group-hover:text-primary-light transition-colors">{step.title}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed">{step.description}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

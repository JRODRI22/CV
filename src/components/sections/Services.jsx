import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import Container from '../ui/Container';
import { SERVICES } from '../../utils/constants';
import { fadeInUp, staggerContainer } from '../../utils/animations';

export default function Services() {
  return (
    <section id="servicios" className="relative py-20 md:py-32 overflow-hidden">
      {/* Bg */}
      <div className="absolute inset-0 bg-gradient-to-b from-bg-primary via-bg-secondary/30 to-bg-primary pointer-events-none" />

      {/* Decorative floating orb */}
      <motion.div
        className="absolute top-1/3 right-0 w-72 h-72 bg-primary/10 rounded-full blur-[120px] pointer-events-none"
        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <Container className="relative z-10">
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-[2px] bg-primary" />
            <span className="font-mono text-xs tracking-[0.25em] text-primary uppercase">Servicios</span>
          </div>
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-end">
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-[0.95] text-text-primary"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Soluciones para
              <br />
              <span className="text-primary-light">cada necesidad.</span>
            </h2>
            <p className="text-text-secondary text-base sm:text-lg leading-relaxed">
              Desde gestión de inventarios hasta sistemas en la nube.
              Todo personalizado para tu negocio.
            </p>
          </div>
        </div>

        <motion.div
          className="grid sm:grid-cols-2 gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {SERVICES.map((service, idx) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                variants={fadeInUp}
                className="group relative rounded-2xl overflow-hidden"
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
              >
                {/* Animated gradient border */}
                <div className="absolute -inset-[1px] bg-gradient-to-r from-primary/0 via-primary/0 to-primary/0 group-hover:from-primary/40 group-hover:via-accent/30 group-hover:to-primary/40 rounded-2xl transition-all duration-700 animate-gradient-x" style={{ backgroundSize: '200% 200%' }} />

                <div className="relative bg-bg-card border border-border group-hover:border-transparent rounded-2xl p-8 transition-all duration-500 h-full">
                  {/* Gradient bg on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`} />

                  <div className="relative z-10">
                    {/* Animated Icon */}
                    <motion.div
                      className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6 group-hover:bg-primary/20 group-hover:border-primary/40 transition-all duration-300"
                      whileHover={{ rotate: [0, -8, 8, 0], scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Icon className="w-7 h-7 text-primary-light" />
                    </motion.div>

                    {/* Content */}
                    <h3 className="text-xl font-bold text-text-primary mb-3">{service.title}</h3>
                    <p className="text-text-secondary mb-6 leading-relaxed">{service.description}</p>

                    {/* Features with staggered entrance */}
                    <ul className="space-y-2.5">
                      {service.features.map((feature, i) => (
                        <motion.li
                          key={feature}
                          className="flex items-center gap-2.5 text-sm text-text-secondary group-hover:text-text-primary transition-colors duration-300"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: idx * 0.1 + i * 0.05 }}
                        >
                          <div className="w-5 h-5 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors">
                            <Check className="w-3 h-3 text-accent" />
                          </div>
                          {feature}
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* Corner glow */}
                  <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-primary/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}

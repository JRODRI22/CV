import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';
import Container from '../ui/Container';
import SectionHeading from '../ui/SectionHeading';
import { TESTIMONIALS } from '../../utils/constants';
import { fadeInUp, staggerContainer } from '../../utils/animations';

export default function Testimonials() {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Decorative glow */}
      <motion.div
        className="absolute bottom-1/4 right-0 w-80 h-80 bg-accent/8 rounded-full blur-[120px] pointer-events-none"
        animate={{ scale: [1, 1.2, 1], opacity: [0.08, 0.15, 0.08] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <Container className="relative z-10">
        <SectionHeading
          badge="Testimonios"
          title="Lo que dicen nuestros clientes"
          subtitle="Software que ya está generando resultados reales."
        />

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {TESTIMONIALS.map((testimonial, idx) => (
            <motion.div
              key={testimonial.name}
              variants={fadeInUp}
              className="group relative rounded-2xl overflow-hidden"
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3 }}
            >
              {/* Animated border on hover */}
              <div className="absolute -inset-[1px] bg-gradient-to-r from-primary/0 to-accent/0 group-hover:from-primary/30 group-hover:to-accent/30 rounded-2xl transition-all duration-700" />

              <div className="relative bg-bg-card border border-border group-hover:border-transparent rounded-2xl p-8 transition-all duration-300 h-full flex flex-col">
                {/* Quote icon with glow */}
                <div className="mb-6 relative">
                  <Quote className="w-8 h-8 text-primary/30 group-hover:text-primary/50 transition-colors duration-300" />
                  <div className="absolute -inset-2 bg-primary/5 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + idx * 0.1 + i * 0.05 }}
                    >
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    </motion.div>
                  ))}
                </div>

                {/* Quote text */}
                <p className="text-text-secondary leading-relaxed mb-8 text-[15px] flex-1">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-4 mt-auto">
                  {/* Avatar with gradient ring */}
                  <div className="relative">
                    <div className="absolute -inset-0.5 bg-gradient-to-br from-primary to-accent rounded-full opacity-60 group-hover:opacity-100 transition-opacity" />
                    <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                      <span className="text-sm font-bold text-white">{testimonial.initials}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-text-primary">{testimonial.name}</p>
                    <p className="text-xs text-text-muted">{testimonial.role}</p>
                  </div>
                </div>

                {/* Bottom glow */}
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}

import { motion } from 'framer-motion';
import { MessageCircle, CheckCircle2, Zap, Shield } from 'lucide-react';
import Container from '../ui/Container';
import Button from '../ui/Button';
import { CONTACT } from '../../utils/constants';
import { fadeInUp, staggerContainer } from '../../utils/animations';

const guarantees = [
  { icon: CheckCircle2, text: "Consulta gratis y sin compromiso" },
  { icon: Zap, text: "Cotización en menos de 24 horas" },
  { icon: Shield, text: "Soporte técnico incluido" }
];

export default function FinalCTA() {
  return (
    <section id="contacto" className="relative py-20 md:py-32 overflow-hidden">
      {/* Enhanced background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-bg-primary via-primary/5 to-bg-primary" />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-primary/10 rounded-full blur-[150px]"
          animate={{ scale: [1, 1.2, 1], opacity: [0.08, 0.15, 0.08] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-accent/10 rounded-full blur-[120px]"
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.06, 0.12, 0.06] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Tech grid subtle */}
        <div className="absolute inset-0 tech-grid opacity-50" />

        {/* Floating particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-1 h-1 rounded-full ${i % 2 === 0 ? 'bg-primary/30' : 'bg-accent/25'}`}
            style={{ top: `${20 + i * 12}%`, left: `${10 + i * 15}%` }}
            animate={{ y: [-10, 10, -10], opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
          />
        ))}
      </div>

      <Container className="relative z-10">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.div variants={fadeInUp}>
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="w-8 h-[2px] bg-primary" />
              <span className="font-mono text-xs tracking-[0.25em] text-primary uppercase">Contacto</span>
            </div>
          </motion.div>

          <motion.h2
            variants={fadeInUp}
            className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[0.9] mb-8"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Trabajemos
            <br />
            <span className="bg-gradient-to-r from-primary-light to-accent bg-clip-text text-transparent">
              juntos.
            </span>
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className="text-lg sm:text-xl text-text-secondary mb-10 leading-relaxed max-w-2xl mx-auto"
          >
            ¿Tienes un proyecto en mente? Hablemos sin compromiso.
            Una conversación honesta sobre lo que necesitas construir.
          </motion.p>

          <motion.div variants={fadeInUp} className="mb-10">
            <motion.div
              className="inline-block relative group"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              {/* CTA glow ring */}
              <div className="absolute -inset-1 bg-gradient-to-r from-accent to-accent-light rounded-2xl opacity-30 group-hover:opacity-60 blur-lg transition-opacity duration-300" />
              <Button href={CONTACT.whatsappLink} variant="accent" size="lg" className="relative text-lg px-10 py-5">
                <MessageCircle className="w-6 h-6" />
                Escribir por WhatsApp
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="flex flex-wrap justify-center gap-6 sm:gap-8"
          >
            {guarantees.map(({ icon: Icon, text }, i) => (
              <motion.div
                key={text}
                className="flex items-center gap-2 text-sm text-text-secondary"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + i * 0.1 }}
              >
                <Icon className="w-4 h-4 text-accent flex-shrink-0" />
                {text}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}

import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import Container from '../ui/Container';
import SectionHeading from '../ui/SectionHeading';
import Button from '../ui/Button';
import { SOLUTIONS, CONTACT } from '../../utils/constants';
import { fadeInUp, fadeInLeft, fadeInRight, staggerContainer, staggerContainerFast } from '../../utils/animations';

export default function Solution() {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-primary/5 rounded-full blur-[150px]"
          animate={{ scale: [1, 1.1, 1], opacity: [0.05, 0.1, 0.05] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Circuit decoration */}
      <div className="absolute top-0 left-0 right-0 circuit-line" />

      <Container className="relative z-10">
        <SectionHeading
          badge="La solución"
          title="Software hecho a la medida de tu negocio"
          subtitle="No es un sistema genérico. Es TU sistema, diseñado para resolver TUS problemas específicos."
        />

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Visual */}
          <motion.div
            variants={fadeInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative">
              {/* Before card */}
              <motion.div
                className="glass bg-red-950/30 border border-red-500/20 rounded-2xl p-6 -rotate-3 mb-4"
                whileHover={{ rotate: 0, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-sm font-semibold text-red-400 mb-3">❌ Antes</p>
                <ul className="space-y-2">
                  {["Hojas de Excel desordenadas", "Pedidos perdidos en WhatsApp", "Sin control de ganancias", "Horas en tareas manuales"].map((item, i) => (
                    <motion.li
                      key={item}
                      className="flex items-center gap-2 text-sm text-red-300/80"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + i * 0.08 }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0" />
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {/* After card */}
              <motion.div
                className="glass bg-emerald-950/30 border border-accent/20 rounded-2xl p-6 rotate-2 -mt-2"
                whileHover={{ rotate: 0, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-sm font-semibold text-accent mb-3">✅ Después</p>
                <ul className="space-y-2">
                  {["Sistema centralizado y organizado", "Pedidos rastreados automáticamente", "Reportes de ganancias en tiempo real", "Procesos automatizados al 100%"].map((item, i) => (
                    <motion.li
                      key={item}
                      className="flex items-center gap-2 text-sm text-accent-light/80"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + i * 0.08 }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {/* Arrow between - enhanced */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                <motion.div
                  className="w-14 h-14 rounded-full bg-bg-primary border-2 border-primary flex items-center justify-center shadow-lg shadow-primary/20"
                  animate={{ scale: [1, 1.15, 1], boxShadow: ["0 0 0 0 rgba(79,70,229,0)", "0 0 20px 4px rgba(79,70,229,0.3)", "0 0 0 0 rgba(79,70,229,0)"] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <ArrowRight className="w-6 h-6 text-primary-light" />
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Right: Benefits list */}
          <motion.div
            variants={staggerContainerFast}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeInRight} className="mb-8">
              <h3 className="text-2xl font-bold text-text-primary mb-3">
                Todo lo que necesitás, en un solo lugar
              </h3>
              <p className="text-text-secondary">
                Cada sistema se construye desde cero para ajustarse a tus operaciones, tu equipo y tu presupuesto.
              </p>
            </motion.div>

            <div className="space-y-4 mb-8">
              {SOLUTIONS.map((solution) => (
                <motion.div
                  key={solution}
                  variants={fadeInUp}
                  className="flex items-center gap-3 group"
                >
                  <motion.div
                    className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors"
                    whileHover={{ scale: 1.15, rotate: 5 }}
                  >
                    <CheckCircle2 className="w-4 h-4 text-accent" />
                  </motion.div>
                  <p className="text-text-secondary group-hover:text-text-primary transition-colors">{solution}</p>
                </motion.div>
              ))}
            </div>

            <motion.div variants={fadeInUp}>
              <Button href={CONTACT.whatsappLink} variant="primary" size="lg">
                Quiero mi sistema
                <ArrowRight className="w-4 h-4" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

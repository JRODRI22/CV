import { motion } from 'framer-motion';
import { ExternalLink, TrendingUp } from 'lucide-react';
import Container from '../ui/Container';
import SectionHeading from '../ui/SectionHeading';
import Badge from '../ui/Badge';
import { PROJECTS } from '../../utils/constants';
import { fadeInUp, staggerContainer } from '../../utils/animations';

export default function Projects() {
  return (
    <section id="proyectos" className="relative py-20 md:py-32 overflow-hidden">
      {/* Decorative elements */}
      <motion.div
        className="absolute top-1/4 -left-20 w-60 h-60 bg-primary/10 rounded-full blur-[100px] pointer-events-none"
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <Container className="relative z-10">
        <SectionHeading
          badge="Proyectos"
          title="Software que ya está generando resultados"
          subtitle="Estos son algunos de los sistemas que hemos construido para negocios reales como el tuyo."
        />

        <motion.div
          className="grid sm:grid-cols-2 gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {PROJECTS.map((project) => (
            <motion.div
              key={project.title}
              variants={fadeInUp}
              className="group relative rounded-2xl overflow-hidden"
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
            >
              {/* Animated gradient border on hover */}
              <div className="absolute -inset-[1px] bg-gradient-to-r from-primary/0 to-accent/0 group-hover:from-primary/30 group-hover:to-accent/30 rounded-2xl transition-all duration-700 animate-gradient-x" style={{ backgroundSize: '200% 200%' }} />

              <div className="relative bg-bg-card border border-border group-hover:border-transparent rounded-2xl overflow-hidden transition-all duration-500">
                {/* Gradient header */}
                <div className={`h-48 bg-gradient-to-br ${project.gradient} relative overflow-hidden`}>
                  {/* Animated grid */}
                  <motion.div
                    className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage: 'var(--gradient-project-grid)',
                      backgroundSize: '30px 30px'
                    }}
                    animate={{ backgroundPosition: ['0px 0px', '30px 30px'] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  />
                  {/* Project name overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      className="text-center"
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 }}
                    >
                      <p className="text-3xl font-extrabold text-white drop-shadow-lg">{project.title}</p>
                      <p className="text-white/70 text-sm mt-1">{project.category}</p>
                    </motion.div>
                  </div>
                  {/* Hover overlay with icon */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-500 flex items-center justify-center">
                    <motion.div
                      className="opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0"
                    >
                      <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                        <ExternalLink className="w-6 h-6 text-white" />
                      </div>
                    </motion.div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="text-text-secondary text-sm leading-relaxed mb-4">
                    {project.description}
                  </p>

                  {/* Result badge - enhanced */}
                  <div className="flex items-center gap-2 mb-4 py-2.5 px-4 bg-accent/10 border border-accent/20 rounded-xl group-hover:bg-accent/15 transition-colors">
                    <TrendingUp className="w-4 h-4 text-accent flex-shrink-0" />
                    <span className="text-xs font-bold text-accent">{project.result}</span>
                  </div>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <Badge key={tech}>{tech}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}

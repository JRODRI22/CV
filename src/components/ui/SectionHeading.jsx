import { motion } from 'framer-motion';
import { fadeInUp } from '../../utils/animations';

export default function SectionHeading({ badge, title, subtitle, align = "center" }) {
  const alignment = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <motion.div
      className={`max-w-3xl mb-16 ${alignment}`}
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
    >
      {badge && (
        <motion.span
          className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-primary/10 text-primary-light border border-primary/20 mb-4"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          {badge}
        </motion.span>
      )}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-text-primary mb-4 leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg md:text-xl text-text-secondary leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}

import { motion } from 'framer-motion';

export default function Card({ children, className = "", hover = true, glow = false, ...props }) {
  return (
    <motion.div
      className={`
        bg-bg-card border border-border rounded-2xl p-6 md:p-8
        ${hover ? 'hover:border-border-light hover:bg-bg-card-hover' : ''}
        ${glow ? 'hover:shadow-lg hover:shadow-primary/10' : ''}
        transition-all duration-300
        ${className}
      `}
      whileHover={hover ? { y: -4 } : {}}
      {...props}
    >
      {children}
    </motion.div>
  );
}

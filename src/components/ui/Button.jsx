import { motion } from 'framer-motion';

const variants = {
  primary: "bg-primary hover:bg-primary-light text-white shadow-lg shadow-primary/25 hover:shadow-primary/40",
  secondary: "bg-bg-card hover:bg-bg-card-hover text-text-primary border border-border-light",
  accent: "bg-accent hover:bg-accent-light text-white shadow-lg shadow-accent/25",
  outline: "border border-primary text-primary hover:bg-primary hover:text-white",
  ghost: "text-text-secondary hover:text-text-primary hover:bg-bg-card"
};

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg"
};

export default function Button({ children, variant = "primary", size = "md", className = "", href, ...props }) {
  const classes = `inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-300 cursor-pointer ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    return (
      <motion.a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        className={classes}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        {...props}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      className={classes}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      {...props}
    >
      {children}
    </motion.button>
  );
}

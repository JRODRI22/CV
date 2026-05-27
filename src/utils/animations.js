export const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
  }
};

export const fadeInDown = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

export const fadeInLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

export const fadeInRight = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

export const blurIn = {
  hidden: { opacity: 0, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

export const rotateIn = {
  hidden: { opacity: 0, rotate: -10, scale: 0.9 },
  visible: {
    opacity: 1,
    rotate: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
  }
};

export const slideScale = {
  hidden: { opacity: 0, x: -30, scale: 0.95 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

export const textReveal = {
  hidden: { opacity: 0, y: 20, clipPath: "inset(100% 0 0 0)" },
  visible: {
    opacity: 1,
    y: 0,
    clipPath: "inset(0% 0 0 0)",
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }
  }
};

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

export const staggerContainerFast = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05
    }
  }
};

export const staggerContainerSlow = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.25,
      delayChildren: 0.2
    }
  }
};

export const glowPulse = {
  animate: {
    boxShadow: [
      "0 0 20px rgba(79, 70, 229, 0.3)",
      "0 0 40px rgba(79, 70, 229, 0.5)",
      "0 0 20px rgba(79, 70, 229, 0.3)"
    ],
    transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
  }
};

export const floatAnimation = {
  animate: {
    y: [-8, 8, -8],
    transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
  }
};

export const floatAnimationSlow = {
  animate: {
    y: [-5, 5, -5],
    transition: { duration: 6, repeat: Infinity, ease: "easeInOut" }
  }
};

export const rotateFloat = {
  animate: {
    y: [-6, 6, -6],
    rotate: [-2, 2, -2],
    transition: { duration: 5, repeat: Infinity, ease: "easeInOut" }
  }
};

export const drawLine = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 1.5, ease: "easeInOut" }
  }
};

export const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
}

export const reducedFadeInVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0 } },
}

export const staggerContainerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
}

export const scaleInVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
}

export const reducedScaleInVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0 } },
}

export const slideInLeftVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
}

export const slideInRightVariants = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
}

export const reducedSlideInVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0 } },
}

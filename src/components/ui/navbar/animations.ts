export const navbarAnimation = {
  initial: {
    y: -100,
    opacity: 0
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20,
      duration: 0.8
    }
  }
}

export const menuItemVariants = {
  initial: {
    opacity: 0,
    y: -5,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: -5,
  },
}

export const mobileMenuVariants = {
  initial: {
    x: '100%',
  },
  animate: {
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 30,
    },
  },
  exit: {
    x: '100%',
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 30,
    },
  },
} 
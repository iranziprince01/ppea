'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

interface RevealOnScrollProps {
  children: React.ReactNode
  delay?: number
  threshold?: number
  className?: string
}

export default function RevealOnScroll({ 
  children, 
  delay = 0, 
  threshold = 0.1,
  className = '' 
}: RevealOnScrollProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: threshold,
  })

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={variants}
      transition={{ duration: 0.6, delay: delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}



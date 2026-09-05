import {
  type MouseEvent,
  type ReactNode,
  useRef,
} from "react"

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react"

interface ParallaxProps {
  children: ReactNode
  strength?: number
  className?: string
}

function Parallax({
  children,
  strength = 12,
  className = "",
}: ParallaxProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const smoothX = useSpring(x, {
    stiffness: 120,
    damping: 20,
    mass: 0.5,
  })

  const smoothY = useSpring(y, {
    stiffness: 120,
    damping: 20,
    mass: 0.5,
  })

  const moveX = useTransform(smoothX, [-1, 1], [-strength, strength])
  const moveY = useTransform(smoothY, [-1, 1], [-strength, strength])

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const container = containerRef.current

    if (!container) return

    const rect = container.getBoundingClientRect()

    const relativeX =
      (event.clientX - (rect.left + rect.width / 2)) / (rect.width / 2)

    const relativeY =
      (event.clientY - (rect.top + rect.height / 2)) / (rect.height / 2)

    x.set(relativeX)
    y.set(relativeY)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
    >
      <motion.div
        style={{
          x: moveX,
          y: moveY,
        }}
      >
        {children}
      </motion.div>
    </div>
  )
}

export default Parallax
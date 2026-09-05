import {
  type MouseEvent,
  type ReactNode,
  useRef,
} from "react"

interface MagneticButtonProps {
  children: ReactNode
  className?: string
  onClick?: () => void
  href?: string
  strength?: number
}

function MagneticButton({
  children,
  className = "",
  onClick,
  href,
  strength = 0.22,
}: MagneticButtonProps) {
  const elementRef = useRef<HTMLElement>(null)

  const handleMouseMove = (event: MouseEvent<HTMLElement>) => {
    const element = elementRef.current

    if (!element) return

    const rect = element.getBoundingClientRect()

    const x = event.clientX - (rect.left + rect.width / 2)
    const y = event.clientY - (rect.top + rect.height / 2)

    element.style.transform = `translate(${x * strength}px, ${y * strength}px)`
  }

  const handleMouseLeave = () => {
    const element = elementRef.current

    if (!element) return

    element.style.transform = "translate(0px, 0px)"
  }

  const classes = `transition-transform duration-300 ease-out ${className}`

  if (href) {
    return (
      <a
        ref={elementRef as React.RefObject<HTMLAnchorElement>}
        href={href}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={classes}
      >
        {children}
      </a>
    )
  }

  return (
    <button
      ref={elementRef as React.RefObject<HTMLButtonElement>}
      type="button"
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={classes}
    >
      {children}
    </button>
  )
}

export default MagneticButton
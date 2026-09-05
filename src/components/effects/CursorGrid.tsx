import { useEffect, useState } from "react"

function CursorGrid() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isTouchDevice, setIsTouchDevice] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia("(pointer: coarse)")
    setIsTouchDevice(mediaQuery.matches)

    const handlePointerMove = (event: PointerEvent) => {
      setPosition({
        x: event.clientX,
        y: event.clientY,
      })
    }

    window.addEventListener("pointermove", handlePointerMove)

    return () => {
      window.removeEventListener("pointermove", handlePointerMove)
    }
  }, [])

  if (isTouchDevice) {
    return null
  }

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-20 overflow-hidden opacity-0 transition-opacity duration-500 [@media(pointer:fine)]:opacity-100"
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(36,31,26,0.13) 1px, transparent 1px), linear-gradient(90deg, rgba(36,31,26,0.065) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
          maskImage: `radial-gradient(
            circle 220px at ${position.x}px ${position.y}px,
            black 0%,
            rgba(0,0,0,0.75) 35%,
            transparent 100%
          )`,
          WebkitMaskImage: `radial-gradient(
            circle 180px at ${position.x}px ${position.y}px,
            black 0%,
            rgba(0,0,0,0.75) 35%,
            transparent 100%
          )`,
        }}
      />

      <div
        className="absolute h-3 w-3 rounded-full bg-[#C85A3F]/25 blur-[2px]"
        style={{
          left: position.x,
          top: position.y,
          transform: "translate(-50%, -50%)",
        }}
      />
    </div>
  )
}

export default CursorGrid
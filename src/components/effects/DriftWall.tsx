import { motion } from "motion/react"

const destinations = [
  {
    name: "Paris",
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=900&q=85",
    className: "left-[4%] top-[18%] h-52 w-40 rotate-[-7deg]",
  },
  {
    name: "Santorini",
    image:
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=900&q=85",
    className: "right-[5%] top-[14%] h-60 w-44 rotate-[6deg]",
  },
  {
    name: "Bali",
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=900&q=85",
    className: "left-[14%] bottom-[7%] h-48 w-36 rotate-[5deg]",
  },
  {
    name: "Kyoto",
    image:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=900&q=85",
    className: "right-[15%] bottom-[8%] h-56 w-40 rotate-[-5deg]",
  },
  {
    name: "Amalfi",
    image:
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=900&q=85",
    className: "left-[2%] top-[48%] h-40 w-32 rotate-[4deg]",
  },
  {
    name: "Swiss Alps",
    image:
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=900&q=85",
    className: "right-[3%] top-[48%] h-44 w-32 rotate-[-4deg]",
  },
]

function DriftWall() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Soft atmospheric layer */}
      <div className="absolute inset-0 bg-[#CFC1AA]/20" />

      {destinations.map((destination, index) => (
        <motion.div
          key={destination.name}
          className={`absolute overflow-hidden rounded-[28px] border border-[#F1E8D8]/60 shadow-[0_20px_50px_rgba(36,31,26,0.14)] ${destination.className}`}
          animate={{
            y: [0, index % 2 === 0 ? -16 : 16, 0],
            x: [0, index % 3 === 0 ? 10 : -10, 0],
            rotate: [
              Number(destination.className.match(/rotate-\[?(-?\d+)/)?.[1] ?? 0),
              Number(destination.className.match(/rotate-\[?(-?\d+)/)?.[1] ?? 0) + 2,
              Number(destination.className.match(/rotate-\[?(-?\d+)/)?.[1] ?? 0),
            ],
          }}
          transition={{
            duration: 7 + index,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.35,
          }}
        >
          <img
            src={destination.image}
            alt=""
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#241F1A]/35 via-transparent to-transparent" />

          <span className="absolute bottom-3 left-3 rounded-full bg-[#F1E8D8]/85 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#241F1A] backdrop-blur-sm">
            {destination.name}
          </span>
        </motion.div>
      ))}
    </div>
  )
}

export default DriftWall
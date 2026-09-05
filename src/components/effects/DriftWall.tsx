import { motion } from "motion/react"
import Parallax from "./Parallax"

const destinations = [
  {
    name: "Paris",
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=900&q=85",
    position: "left-[4%] top-[18%]",
    size: "h-72 w-60",
    rotation: -7,
  },
  {
    name: "Santorini",
    image:
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=900&q=85",
    position: "right-[5%] top-[14%]",
    size: "h-72 w-52",
    rotation: 6,
  },
  {
    name: "Bali",
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=900&q=85",
    position: "left-[14%] bottom-[7%]",
    size: "h-60 w-44",
    rotation: 5,
  },
  {
    name: "Kyoto",
    image:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=900&q=85",
    position: "right-[15%] bottom-[8%]",
    size: "h-68 w-48",
    rotation: -5,
  },
  {
    name: "Amalfi",
    image:
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=900&q=85",
    position: "left-[2%] top-[48%]",
    size: "h-64 w-48",
    rotation: 4,
  },
  {
    name: "Swiss Alps",
    image:
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=900&q=85",
    position: "right-[3%] top-[48%]",
    size: "h-72 w-52",
    rotation: -4,
  },
]

function DriftWall() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Soft atmospheric layer */}
      <div className="absolute inset-0 bg-[#CFC1AA]/20" />

      {destinations.map((destination, index) => (
        <Parallax
          key={destination.name}
          strength={index % 2 === 0 ? 6 : 4}
          className={`pointer-events-auto absolute ${destination.position} ${destination.size}`}
        >
          <motion.div
            className="h-full w-full overflow-hidden rounded-[28px] border border-[#F1E8D8]/60 shadow-[0_20px_50px_rgba(36,31,26,0.14)]"
            initial={{
              rotate: destination.rotation,
            }}
            animate={{
              y: [0, index % 2 === 0 ? -16 : 16, 0],
              x: [0, index % 3 === 0 ? 10 : -10, 0],
              rotate: [
                destination.rotation,
                destination.rotation + 2,
                destination.rotation,
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
              alt={`${destination.name} travel destination`}
              className="h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#241F1A]/35 via-transparent to-transparent" />

            <span className="absolute bottom-3 left-3 rounded-full bg-[#F1E8D8]/85 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#241F1A] backdrop-blur-sm">
              {destination.name}
            </span>
          </motion.div>
        </Parallax>
      ))}
    </div>
  )
}

export default DriftWall
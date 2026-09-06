import { motion } from "motion/react"
import { Check, Sparkles } from "lucide-react"

interface QuestCelebrationProps {
  sticker: string
  onComplete: () => void
}

function QuestCelebration({
  sticker,
  onComplete,
}: QuestCelebrationProps) {
  return (
    <div className="pointer-events-none fixed inset-0 z-[200] flex items-center justify-center px-6">
      <motion.div
        className="absolute inset-0 bg-[#241F1A]/20 backdrop-blur-[2px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      <motion.div
        className="relative flex w-full max-w-sm flex-col items-center rounded-[32px] bg-[#F1E8D8] p-8 text-center shadow-[0_30px_100px_rgba(36,31,26,0.25)]"
        initial={{
          opacity: 0,
          scale: 0.75,
          y: 30,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
        }}
        exit={{
          opacity: 0,
          scale: 0.9,
          y: -20,
        }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 18,
        }}
        onAnimationComplete={onComplete}
      >
        <motion.div
          className="flex h-24 w-24 items-center justify-center rounded-[28px] bg-[#D5A13A]/20 text-5xl"
          initial={{ scale: 0, rotate: -15 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            delay: 0.15,
            type: "spring",
            stiffness: 300,
            damping: 15,
          }}
        >
          {sticker}
        </motion.div>

        <div className="mt-6 flex items-center gap-2 text-[#C85A3F]">
          <Sparkles size={17} />

          <p className="text-xs font-black uppercase tracking-[0.2em]">
            Quest complete
          </p>

          <Sparkles size={17} />
        </div>

        <h2 className="mt-3 text-3xl font-black tracking-tight text-[#241F1A]">
          Sticker unlocked!
        </h2>

        <p className="mt-2 text-sm font-semibold text-[#241F1A]/55">
          You earned{" "}
          <span className="font-black text-[#28483D]">
            +100 XP
          </span>{" "}
          and added a new memory to your collection.
        </p>

        <div className="mt-6 flex items-center gap-2 rounded-full bg-[#28483D] px-5 py-2.5 text-xs font-bold uppercase tracking-[0.12em] text-[#F1E8D8]">
          <Check size={14} />
          Adventure unlocked
        </div>
      </motion.div>
    </div>
  )
}

export default QuestCelebration
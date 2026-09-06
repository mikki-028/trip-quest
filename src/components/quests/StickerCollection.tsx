import { Lock, Sparkles } from "lucide-react"

import type { Quest } from "../../types/trip"

interface StickerCollectionProps {
  quests: Quest[]
}

function StickerCollection({
  quests,
}: StickerCollectionProps) {
  const unlockedStickers = quests.filter(
    (quest) => quest.completed,
  )

  const totalStickers = quests.length
  const unlockedCount = unlockedStickers.length

  return (
    <section className="mt-8 rounded-[32px] border border-[#241F1A]/8 bg-[#F1E8D8] p-6 shadow-[0_20px_60px_rgba(36,31,26,0.07)] sm:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-2 text-[#C85A3F]">
            <Sparkles size={17} />

            <p className="text-xs font-bold uppercase tracking-[0.2em]">
              Collection
            </p>
          </div>

          <h2 className="mt-2 text-3xl font-black tracking-tight">
            Your travel stickers
          </h2>

          <p className="mt-2 max-w-xl text-sm leading-6 text-[#241F1A]/55">
            Complete quests to collect little
            memories from your journey.
          </p>
        </div>

        <div className="rounded-full bg-[#CFC1AA]/40 px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-[#241F1A]/55">
          {unlockedCount}/{totalStickers} unlocked
        </div>
      </div>

      {totalStickers > 0 ? (
        <div className="mt-7 grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
          {quests.map((quest) => {
            const unlocked = quest.completed

            return (
              <div
                key={quest.id}
                className={`group flex aspect-square flex-col items-center justify-center rounded-[22px] border transition-all duration-300 ${
                  unlocked
                    ? "border-[#D5A13A]/35 bg-[#D5A13A]/12 hover:-translate-y-1 hover:shadow-[0_12px_24px_rgba(36,31,26,0.08)]"
                    : "border-[#241F1A]/8 bg-[#CFC1AA]/20 opacity-55"
                }`}
              >
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl text-3xl transition-transform duration-300 ${
                    unlocked
                      ? "bg-[#F1E8D8] group-hover:scale-110"
                      : "bg-[#CFC1AA]/40 grayscale"
                  }`}
                >
                  {unlocked ? (
                    quest.sticker
                  ) : (
                    <Lock
                      size={20}
                      className="text-[#241F1A]/30"
                    />
                  )}
                </div>

                <p
                  className={`mt-2 max-w-[90%] truncate text-center text-[9px] font-bold uppercase tracking-[0.1em] ${
                    unlocked
                      ? "text-[#241F1A]/60"
                      : "text-[#241F1A]/30"
                  }`}
                  title={quest.title}
                >
                  {unlocked
                    ? quest.title
                    : "Locked"}
                </p>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="mt-7 rounded-[22px] bg-[#CFC1AA]/25 px-5 py-6 text-center text-sm font-semibold text-[#241F1A]/50">
          Your sticker collection will appear
          here once your quests are ready.
        </div>
      )}
    </section>
  )
}

export default StickerCollection
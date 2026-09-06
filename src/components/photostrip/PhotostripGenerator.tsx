import {
  Download,
  Image as ImageIcon,
  Printer,
  Sparkles,
} from "lucide-react"
import { useMemo, useRef } from "react"

import type { Quest } from "../../types/trip"

interface PhotostripGeneratorProps {
  destination: string
  date: string
  quests: Quest[]
}

function PhotostripGenerator({
  destination,
  date,
  quests,
}: PhotostripGeneratorProps) {
  const stripRef = useRef<HTMLDivElement>(null)

  const photoQuests = useMemo(
    () =>
      quests.filter(
        (quest) =>
          quest.completed &&
          Boolean(quest.photo),
      ),
    [quests],
  )

  function downloadPhotostrip() {
    const strip = stripRef.current

    if (!strip || photoQuests.length === 0) {
      return
    }

    const canvas = document.createElement("canvas")
    const context = canvas.getContext("2d")

    if (!context) {
      return
    }

    const width = 900
    const photoHeight = 520
    const headerHeight = 170
    const footerHeight = 150
    const padding = 36
    const gap = 24

    const height =
      headerHeight +
      footerHeight +
      padding * 2 +
      photoQuests.length * photoHeight +
      (photoQuests.length - 1) * gap

    canvas.width = width
    canvas.height = height

    context.fillStyle = "#F1E8D8"
    context.fillRect(
      0,
      0,
      canvas.width,
      canvas.height,
    )

    context.fillStyle = "#28483D"
    context.fillRect(
      0,
      0,
      width,
      headerHeight,
    )

    context.fillStyle = "#D5A13A"
    context.font = "700 22px Arial"
    context.fillText(
      "TRIP QUEST",
      padding,
      48,
    )

    context.fillStyle = "#F1E8D8"
    context.font = "900 48px Georgia"
    context.fillText(
      destination,
      padding,
      105,
    )

    context.fillStyle = "rgba(241, 232, 216, 0.7)"
    context.font = "600 18px Arial"
    context.fillText(
      date,
      padding,
      140,
    )

    let imagesLoaded = 0

    photoQuests.forEach((quest, index) => {
      if (!quest.photo) return

      const image = new Image()

      image.onload = () => {
        const y =
          headerHeight +
          padding +
          index * (photoHeight + gap)

        // Keep the entire image visible inside the
        // photostrip frame. This is "contain" behavior:
        // no cropping, regardless of aspect ratio.
        const scale = Math.min(
          width / image.width,
          photoHeight / image.height,
        )

        const drawWidth = image.width * scale
        const drawHeight = image.height * scale

        const drawX =
          (width - drawWidth) / 2

        const drawY =
          y + (photoHeight - drawHeight) / 2

        // Background behind letterboxed photos.
        context.fillStyle = "#CFC1AA"
        context.fillRect(
          0,
          y,
          width,
          photoHeight,
        )

        context.drawImage(
          image,
          drawX,
          drawY,
          drawWidth,
          drawHeight,
        )

        imagesLoaded += 1

        if (
          imagesLoaded ===
          photoQuests.length
        ) {
          context.fillStyle = "#28483D"
          context.fillRect(
            0,
            height - footerHeight,
            width,
            footerHeight,
          )

          context.fillStyle = "#D5A13A"
          context.font = "900 22px Arial"
          context.fillText(
            `${photoQuests.length} MEMORIES COLLECTED`,
            padding,
            height - 95,
          )

          context.fillStyle = "#F1E8D8"
          context.font = "600 18px Arial"
          context.fillText(
            "Made with Trip Quest",
            padding,
            height - 55,
          )

          const link =
            document.createElement("a")

          link.download = `${destination
            .toLowerCase()
            .replace(/\s+/g, "-")}-trip-quest.jpg`

          link.href = canvas.toDataURL(
            "image/jpeg",
            0.9,
          )

          link.click()
        }
      }

      image.src = quest.photo
    })
  }

  function printPhotostrip() {
    if (photoQuests.length === 0) {
      return
    }

    window.print()
  }

  return (
    <>
      <style>
        {`
          @media print {
            body * {
              visibility: hidden !important;
            }

            .trip-quest-photostrip,
            .trip-quest-photostrip * {
              visibility: visible !important;
            }

            .trip-quest-photostrip {
              position: absolute !important;
              left: 0 !important;
              top: 0 !important;
              width: 100% !important;
              margin: 0 !important;
              padding: 24px !important;
              background: white !important;
              box-shadow: none !important;
              border: none !important;
            }

            .trip-quest-photostrip-actions {
              display: none !important;
            }

            @page {
              margin: 0.4in;
            }
          }
        `}
      </style>

      <section
        className="trip-quest-photostrip mt-8 rounded-[32px] bg-[#F1E8D8] p-6 shadow-[0_20px_60px_rgba(36,31,26,0.07)] sm:p-8"
      >
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center gap-2 text-[#C85A3F]">
              <Sparkles size={17} />

              <p className="text-xs font-bold uppercase tracking-[0.2em]">
                Travel memory
              </p>
            </div>

            <h2 className="mt-2 text-3xl font-black tracking-tight">
              Your trip, captured.
            </h2>

            <p className="mt-2 max-w-xl text-sm leading-6 text-[#241F1A]/55">
              Complete photo quests to fill your
              personal travel photostrip.
            </p>
          </div>

          <div className="trip-quest-photostrip-actions flex flex-wrap gap-2">
            <button
              type="button"
              onClick={printPhotostrip}
              disabled={photoQuests.length === 0}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[#28483D]/15 bg-[#F1E8D8] px-5 py-3 text-xs font-bold uppercase tracking-[0.12em] text-[#28483D] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#28483D]/30 hover:bg-white disabled:cursor-not-allowed disabled:opacity-35"
            >
              <Printer size={15} />
              Print strip
            </button>

            <button
              type="button"
              onClick={downloadPhotostrip}
              disabled={photoQuests.length === 0}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#28483D] px-5 py-3 text-xs font-bold uppercase tracking-[0.12em] text-[#F1E8D8] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#203D34] disabled:cursor-not-allowed disabled:opacity-35"
            >
              <Download size={15} />
              Download strip
            </button>
          </div>
        </div>

        {photoQuests.length > 0 ? (
          <div className="mt-7 flex justify-center overflow-hidden rounded-[24px] bg-[#CFC1AA]/30 p-4">
            <div
              ref={stripRef}
              className="w-full max-w-md rounded-[10px] bg-[#F1E8D8] p-3 shadow-[0_16px_40px_rgba(36,31,26,0.12)]"
            >
              <div className="bg-[#28483D] px-5 py-6 text-[#F1E8D8]">
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#D5A13A]">
                  Trip Quest
                </p>

                <h3 className="mt-2 text-3xl font-black">
                  {destination}
                </h3>

                <p className="mt-1 text-xs font-semibold text-[#F1E8D8]/60">
                  {date}
                </p>
              </div>

              <div className="space-y-3 bg-[#F1E8D8] p-3">
                {photoQuests.map((quest) => (
                  <div
                    key={quest.id}
                    className="flex min-h-52 items-center justify-center overflow-hidden rounded-[6px] bg-[#CFC1AA]"
                  >
                    <img
                      src={quest.photo}
                      alt={quest.title}
                      className="h-52 w-full object-contain"
                    />
                  </div>
                ))}
              </div>

              <div className="bg-[#28483D] px-5 py-5 text-[#F1E8D8]">
                <div className="flex items-center justify-between">
                  <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#D5A13A]">
                    Memories collected
                  </p>

                  <ImageIcon size={15} />
                </div>

                <p className="mt-1 text-xl font-black">
                  {photoQuests.length}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-7 flex min-h-48 flex-col items-center justify-center rounded-[24px] border border-dashed border-[#241F1A]/10 bg-[#CFC1AA]/20 px-6 text-center">
            <ImageIcon
              size={28}
              className="text-[#241F1A]/25"
            />

            <p className="mt-3 text-sm font-black">
              Your photostrip is waiting.
            </p>

            <p className="mt-1 max-w-sm text-xs leading-5 text-[#241F1A]/45">
              Complete a photo quest and your first
              memory will appear here.
            </p>
          </div>
        )}
      </section>
    </>
  )
}

export default PhotostripGenerator
import {
  Check,
  Copy,
  Share2,
} from "lucide-react"
import { useState } from "react"

interface ShareTripProps {
  destination: string
}

function ShareTrip({
  destination,
}: ShareTripProps) {
  const [copied, setCopied] = useState(false)
  const [isSharing, setIsSharing] = useState(false)

  async function handleShare() {
    const shareUrl = window.location.href

    if (
      navigator.share &&
      typeof navigator.share === "function"
    ) {
      try {
        setIsSharing(true)

        await navigator.share({
          title: `${destination} · Trip Quest`,
          text: `Check out my ${destination} adventure on Trip Quest.`,
          url: shareUrl,
        })

        return
      } catch {
        // User cancelled sharing.
        return
      } finally {
        setIsSharing(false)
      }
    }

    try {
      await navigator.clipboard.writeText(
        shareUrl,
      )

      setCopied(true)

      window.setTimeout(() => {
        setCopied(false)
      }, 2000)
    } catch {
      setCopied(false)
    }
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(
        window.location.href,
      )

      setCopied(true)

      window.setTimeout(() => {
        setCopied(false)
      }, 2000)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        type="button"
        onClick={handleShare}
        disabled={isSharing}
        className="inline-flex items-center gap-2 rounded-full bg-[#28483D] px-4 py-2.5 text-xs font-bold uppercase tracking-[0.12em] text-[#F1E8D8] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#203D34] disabled:cursor-wait disabled:opacity-60"
      >
        <Share2 size={14} />

        {isSharing
          ? "Sharing..."
          : "Share trip"}
      </button>

      <button
        type="button"
        onClick={handleCopy}
        className="inline-flex items-center gap-2 rounded-full border border-[#241F1A]/10 bg-[#F1E8D8]/80 px-4 py-2.5 text-xs font-bold uppercase tracking-[0.12em] text-[#241F1A]/65 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#F1E8D8]"
      >
        {copied ? (
          <>
            <Check size={14} />
            Copied
          </>
        ) : (
          <>
            <Copy size={14} />
            Copy link
          </>
        )}
      </button>
    </div>
  )
}

export default ShareTrip
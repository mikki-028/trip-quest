import {
  ImagePlus,
  RotateCcw,
  Upload,
} from "lucide-react"
import { useRef, useState } from "react"

interface PhotoProofProps {
  photo?: string
  onPhotoChange: (photo: string | undefined) => void
}

function PhotoProof({
  photo,
  onPhotoChange,
}: PhotoProofProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  function openFilePicker() {
    inputRef.current?.click()
  }

  function processImage(file: File) {
    setIsProcessing(true)

    const reader = new FileReader()

    reader.onload = () => {
      const image = new Image()

      image.onload = () => {
        const maxSize = 900

        let width = image.width
        let height = image.height

        if (width > height && width > maxSize) {
          height = Math.round(
            (height * maxSize) / width,
          )
          width = maxSize
        }

        if (height >= width && height > maxSize) {
          width = Math.round(
            (width * maxSize) / height,
          )
          height = maxSize
        }

        const canvas = document.createElement("canvas")

        canvas.width = width
        canvas.height = height

        const context = canvas.getContext("2d")

        if (!context) {
          setIsProcessing(false)
          return
        }

        context.drawImage(
          image,
          0,
          0,
          width,
          height,
        )

        const compressedPhoto =
          canvas.toDataURL(
            "image/jpeg",
            0.72,
          )

        onPhotoChange(compressedPhoto)
        setIsProcessing(false)
      }

      image.src = String(reader.result)
    }

    reader.readAsDataURL(file)
  }

  function handleFileChange(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    const file = event.target.files?.[0]

    if (!file) return

    if (!file.type.startsWith("image/")) {
      return
    }

    processImage(file)

    event.target.value = ""
  }

  function removePhoto() {
    onPhotoChange(undefined)
  }

  if (photo) {
    return (
      <div className="mt-4 overflow-hidden rounded-[20px] border border-[#F1E8D8]/10 bg-[#F1E8D8]/5">
        <div className="relative flex h-52 w-full items-center justify-center overflow-hidden bg-[#241F1A]/20">
          <img
            src={photo}
            alt="Quest proof"
            className="h-full w-full object-contain"
          />

          <button
            type="button"
            onClick={removePhoto}
            className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-[#241F1A]/75 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[#F1E8D8] backdrop-blur-sm transition-all duration-200 hover:bg-[#241F1A]"
          >
            <RotateCcw size={12} />
            Change
          </button>
        </div>

        <div className="flex items-center gap-2 px-4 py-3 text-[10px] font-bold uppercase tracking-[0.14em] text-[#D5A13A]">
          <ImagePlus size={13} />
          Photo proof attached
        </div>
      </div>
    )
  }

  return (
    <div className="mt-4">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      <button
        type="button"
        onClick={openFilePicker}
        disabled={isProcessing}
        className="flex w-full items-center justify-center gap-2 rounded-[18px] border border-dashed border-[#F1E8D8]/15 bg-[#F1E8D8]/5 px-4 py-4 text-xs font-bold uppercase tracking-[0.12em] text-[#F1E8D8]/65 transition-all duration-200 hover:border-[#D5A13A]/50 hover:bg-[#D5A13A]/5 hover:text-[#D5A13A] disabled:cursor-wait disabled:opacity-60"
      >
        {isProcessing ? (
          <>
            <Upload
              size={15}
              className="animate-pulse"
            />
            Processing photo...
          </>
        ) : (
          <>
            <ImagePlus size={15} />
            Add photo proof
          </>
        )}
      </button>
    </div>
  )
}

export default PhotoProof
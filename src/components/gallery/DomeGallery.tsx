import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react"
import { useGesture } from "@use-gesture/react"
import "./DomeGallery.css"

type ImageItem = string | { src: string; alt?: string }

type DomeGalleryProps = {
  images?: ImageItem[]
  fit?: number
  fitBasis?: "auto" | "min" | "max" | "width" | "height"
  minRadius?: number
  maxRadius?: number
  padFactor?: number
  overlayBlurColor?: string
  maxVerticalRotationDeg?: number
  dragSensitivity?: number
  enlargeTransitionMs?: number
  segments?: number
  dragDampening?: number
  openedImageWidth?: string
  openedImageHeight?: string
  imageBorderRadius?: string
  openedImageBorderRadius?: string
  grayscale?: boolean
}

type ItemDef = {
  src: string
  alt: string
  x: number
  y: number
  sizeX: number
  sizeY: number
}

/*
  Trip Quest image collection
  --------------------------------
  The gallery intentionally mixes:
  - Monuments
  - Culture
  - Cuisine
  - Nature

  The gallery repeats these images around the dome so the sphere
  remains visually full while still giving the user lots of variety.
*/

const TRIP_QUEST_IMAGES: ImageItem[] = [
  // MONUMENTS
  {
    src: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=85&w=1000&auto=format&fit=crop",
    alt: "Eiffel Tower in Paris, France — monument",
  },
  {
    src: "https://images.unsplash.com/photo-1564507592333-c60657eea523?q=85&w=1000&auto=format&fit=crop",
    alt: "Taj Mahal in Agra, India — monument",
  },
  {
    src: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=85&w=1000&auto=format&fit=crop",
    alt: "Tokyo skyline and city architecture — landmark",
  },
  {
    src: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=85&w=1000&auto=format&fit=crop",
    alt: "Balinese temple in Indonesia — monument",
  },
  {
    src: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=85&w=1000&auto=format&fit=crop",
    alt: "Traditional Kyoto streets in Japan — historic architecture",
  },
  {
    src: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=85&w=1000&auto=format&fit=crop",
    alt: "Santorini architecture in Greece — landmark",
  },

  // CULTURE
  {
    src: "https://images.unsplash.com/photo-1548013146-72479768bada?q=85&w=1000&auto=format&fit=crop",
    alt: "Indian architecture and cultural heritage",
  },
  {
    src: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?q=85&w=1000&auto=format&fit=crop",
    alt: "Japanese street culture in Kyoto",
  },
  {
    src: "https://images.unsplash.com/photo-1500534623283-312aade485b7?q=85&w=1000&auto=format&fit=crop",
    alt: "European street culture and architecture",
  },
  {
    src: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=85&w=1000&auto=format&fit=crop",
    alt: "Colorful cultural architecture",
  },
  {
    src: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=85&w=1000&auto=format&fit=crop",
    alt: "Festival lights and cultural celebration",
  },
  {
    src: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=85&w=1000&auto=format&fit=crop",
    alt: "African landscape and local culture",
  },

  // CUISINE
  {
    src: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?q=85&w=1000&auto=format&fit=crop",
    alt: "Japanese ramen bowl — cuisine",
  },
  {
    src: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=85&w=1000&auto=format&fit=crop",
    alt: "Japanese sushi — cuisine",
  },
  {
    src: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=85&w=1000&auto=format&fit=crop",
    alt: "Italian pizza — cuisine",
  },
  {
    src: "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=85&w=1000&auto=format&fit=crop",
    alt: "Fresh European bread and pastries — cuisine",
  },
  {
    src: "https://images.unsplash.com/photo-1559314809-0d155014e29e?q=85&w=1000&auto=format&fit=crop",
    alt: "Thai street food — cuisine",
  },
  {
    src: "https://images.unsplash.com/photo-1551024601-bec78aea704b?q=85&w=1000&auto=format&fit=crop",
    alt: "Dessert and local sweet treats — cuisine",
  },

  // NATURE
  {
    src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=85&w=1000&auto=format&fit=crop",
    alt: "Mountain landscape — nature",
  },
  {
    src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=85&w=1000&auto=format&fit=crop",
    alt: "Tropical beach — nature",
  },
  {
    src: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?q=85&w=1000&auto=format&fit=crop",
    alt: "Waterfall in a forest — nature",
  },
  {
    src: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=85&w=1000&auto=format&fit=crop",
    alt: "Lake and mountain landscape — nature",
  },
  {
    src: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=85&w=1000&auto=format&fit=crop",
    alt: "Alpine mountain valley — nature",
  },
  {
    src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=85&w=1000&auto=format&fit=crop",
    alt: "Road through a dramatic landscape — travel",
  },
]

const DEFAULTS = {
  maxVerticalRotationDeg: 5,
  dragSensitivity: 20,
  enlargeTransitionMs: 350,
  segments: 35,
}

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max)

const normalizeAngle = (degrees: number) =>
  ((degrees % 360) + 360) % 360

const wrapAngleSigned = (degrees: number) => {
  const angle = (((degrees + 180) % 360) + 360) % 360
  return angle - 180
}

const getDataNumber = (
  element: HTMLElement,
  name: string,
  fallback: number,
) => {
  const attribute =
    element.dataset[name] ?? element.getAttribute(`data-${name}`)

  const number = attribute == null ? NaN : parseFloat(attribute)

  return Number.isFinite(number) ? number : fallback
}

function buildItems(
  pool: ImageItem[],
  segments: number,
): ItemDef[] {
  const xColumns = Array.from(
    { length: segments },
    (_, index) => -37 + index * 2,
  )

  const evenYs = [-4, -2, 0, 2, 4]
  const oddYs = [-3, -1, 1, 3, 5]

  const coordinates = xColumns.flatMap((x, column) => {
    const ys = column % 2 === 0 ? evenYs : oddYs

    return ys.map((y) => ({
      x,
      y,
      sizeX: 2,
      sizeY: 2,
    }))
  })

  const totalSlots = coordinates.length

  if (pool.length === 0) {
    return coordinates.map((coordinate) => ({
      ...coordinate,
      src: "",
      alt: "",
    }))
  }

  const normalizedImages = pool.map((image) => {
    if (typeof image === "string") {
      return {
        src: image,
        alt: "",
      }
    }

    return {
      src: image.src || "",
      alt: image.alt || "",
    }
  })

  /*
    Fill the dome by repeating the Trip Quest collection.

    We also prevent the exact same image from appearing
    immediately next to itself.
  */
  const usedImages = Array.from(
    { length: totalSlots },
    (_, index) =>
      normalizedImages[index % normalizedImages.length],
  )

  for (let index = 1; index < usedImages.length; index++) {
    if (
      usedImages[index].src ===
      usedImages[index - 1].src
    ) {
      for (
        let swapIndex = index + 1;
        swapIndex < usedImages.length;
        swapIndex++
      ) {
        if (
          usedImages[swapIndex].src !==
          usedImages[index].src
        ) {
          const temporary = usedImages[index]

          usedImages[index] =
            usedImages[swapIndex]

          usedImages[swapIndex] = temporary

          break
        }
      }
    }
  }

  return coordinates.map((coordinate, index) => ({
    ...coordinate,
    src: usedImages[index].src,
    alt: usedImages[index].alt,
  }))
}

function computeItemBaseRotation(
  offsetX: number,
  offsetY: number,
  sizeX: number,
  sizeY: number,
  segments: number,
) {
  const unit = 360 / segments / 2

  const rotateY =
    unit * (offsetX + (sizeX - 1) / 2)

  const rotateX =
    unit * (offsetY - (sizeY - 1) / 2)

  return {
    rotateX,
    rotateY,
  }
}

export default function DomeGallery({
  images = TRIP_QUEST_IMAGES,
  fit = 0.47,
  fitBasis = "auto",
  minRadius = 520,
  maxRadius = Infinity,
  padFactor = 0.2,
  overlayBlurColor = "#E8DDCC",
  maxVerticalRotationDeg =
    DEFAULTS.maxVerticalRotationDeg,
  dragSensitivity = DEFAULTS.dragSensitivity,
  enlargeTransitionMs =
    DEFAULTS.enlargeTransitionMs,
  segments = DEFAULTS.segments,
  dragDampening = 0.72,
  openedImageWidth = "460px",
  openedImageHeight = "460px",
  imageBorderRadius = "24px",
  openedImageBorderRadius = "28px",
  grayscale = false,
}: DomeGalleryProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const mainRef = useRef<HTMLDivElement>(null)
  const sphereRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef<HTMLDivElement>(null)
  const viewerRef = useRef<HTMLDivElement>(null)
  const scrimRef = useRef<HTMLDivElement>(null)

  const focusedElRef =
    useRef<HTMLElement | null>(null)

  const originalTilePositionRef = useRef<{
    left: number
    top: number
    width: number
    height: number
  } | null>(null)

  const rotationRef = useRef({
    x: 0,
    y: 0,
  })

  const startRotRef = useRef({
    x: 0,
    y: 0,
  })

  const startPosRef = useRef<{
    x: number
    y: number
  } | null>(null)

  const draggingRef = useRef(false)
  const movedRef = useRef(false)

  const inertiaRAF =
    useRef<number | null>(null)

  const openingRef = useRef(false)

  const openStartedAtRef = useRef(0)

  const lastDragEndAt =
    useRef(0)

  const scrollLockedRef =
    useRef(false)

  const lockedRadiusRef =
    useRef<number | null>(null)

  const lockScroll = useCallback(() => {
    if (scrollLockedRef.current) return

    scrollLockedRef.current = true

    document.body.classList.add(
      "dg-scroll-lock",
    )
  }, [])

  const unlockScroll = useCallback(() => {
    if (!scrollLockedRef.current) return

    if (
      rootRef.current?.getAttribute(
        "data-enlarging",
      ) === "true"
    ) {
      return
    }

    scrollLockedRef.current = false

    document.body.classList.remove(
      "dg-scroll-lock",
    )
  }, [])

  const items = useMemo(
    () => buildItems(images, segments),
    [images, segments],
  )

  const applyTransform = (
    xDegrees: number,
    yDegrees: number,
  ) => {
    const element = sphereRef.current

    if (!element) return

    element.style.transform =
      `translateZ(calc(var(--radius) * -1)) ` +
      `rotateX(${xDegrees}deg) ` +
      `rotateY(${yDegrees}deg)`
  }

  /*
    Responsive dome sizing
  */
  useEffect(() => {
    const root = rootRef.current

    if (!root) return

    const resizeObserver =
      new ResizeObserver((entries) => {
        const contentRect =
          entries[0].contentRect

        const width = Math.max(
          1,
          contentRect.width,
        )

        const height = Math.max(
          1,
          contentRect.height,
        )

        const minDimension =
          Math.min(width, height)

        const aspect =
          width / height

        let basis: number

        switch (fitBasis) {
          case "min":
            basis = minDimension
            break

          case "max":
            basis = Math.max(width, height)
            break

          case "width":
            basis = width
            break

          case "height":
            basis = height
            break

          default:
            basis =
              aspect >= 1.3
                ? width
                : minDimension
        }

        let radius = basis * fit

        const heightGuard =
          height * 1.35

        radius = Math.min(
          radius,
          heightGuard,
        )

        radius = clamp(
          radius,
          minRadius,
          maxRadius,
        )

        lockedRadiusRef.current =
          Math.round(radius)

        const viewerPadding =
          Math.max(
            8,
            Math.round(
              minDimension * padFactor,
            ),
          )

        root.style.setProperty(
          "--radius",
          `${lockedRadiusRef.current}px`,
        )

        root.style.setProperty(
          "--viewer-pad",
          `${viewerPadding}px`,
        )

        root.style.setProperty(
          "--overlay-blur-color",
          overlayBlurColor,
        )

        root.style.setProperty(
          "--tile-radius",
          imageBorderRadius,
        )

        root.style.setProperty(
          "--enlarge-radius",
          openedImageBorderRadius,
        )

        root.style.setProperty(
          "--image-filter",
          grayscale
            ? "grayscale(1)"
            : "none",
        )

        applyTransform(
          rotationRef.current.x,
          rotationRef.current.y,
        )

        const enlargedOverlay =
          viewerRef.current?.querySelector(
            ".enlarge",
          ) as HTMLElement | null

        if (
          enlargedOverlay &&
          frameRef.current &&
          mainRef.current
        ) {
          const frameRect =
            frameRef.current.getBoundingClientRect()

          const mainRect =
            mainRef.current.getBoundingClientRect()

          const hasCustomSize =
            openedImageWidth &&
            openedImageHeight

          if (hasCustomSize) {
            const temporaryDiv =
              document.createElement("div")

            temporaryDiv.style.cssText =
              `position:absolute;` +
              `width:${openedImageWidth};` +
              `height:${openedImageHeight};` +
              `visibility:hidden;`

            document.body.appendChild(
              temporaryDiv,
            )

            const temporaryRect =
              temporaryDiv.getBoundingClientRect()

            document.body.removeChild(
              temporaryDiv,
            )

            const centeredLeft =
              frameRect.left -
              mainRect.left +
              (frameRect.width -
                temporaryRect.width) /
                2

            const centeredTop =
              frameRect.top -
              mainRect.top +
              (frameRect.height -
                temporaryRect.height) /
                2

            enlargedOverlay.style.left =
              `${centeredLeft}px`

            enlargedOverlay.style.top =
              `${centeredTop}px`
          } else {
            enlargedOverlay.style.left =
              `${frameRect.left - mainRect.left}px`

            enlargedOverlay.style.top =
              `${frameRect.top - mainRect.top}px`

            enlargedOverlay.style.width =
              `${frameRect.width}px`

            enlargedOverlay.style.height =
              `${frameRect.height}px`
          }
        }
      })

    resizeObserver.observe(root)

    return () => {
      resizeObserver.disconnect()
    }
  }, [
    fit,
    fitBasis,
    minRadius,
    maxRadius,
    padFactor,
    overlayBlurColor,
    grayscale,
    imageBorderRadius,
    openedImageBorderRadius,
    openedImageWidth,
    openedImageHeight,
  ])

  useEffect(() => {
    applyTransform(
      rotationRef.current.x,
      rotationRef.current.y,
    )
  }, [])

  /*
    Stop existing inertia animation
  */
  const stopInertia = useCallback(() => {
    if (inertiaRAF.current) {
      cancelAnimationFrame(
        inertiaRAF.current,
      )

      inertiaRAF.current = null
    }
  }, [])

  /*
    Smooth inertia after releasing the dome
  */
  const startInertia = useCallback(
    (velocityX: number, velocityY: number) => {
      const maxVelocity = 1.4

      let vX =
        clamp(
          velocityX,
          -maxVelocity,
          maxVelocity,
        ) * 80

      let vY =
        clamp(
          velocityY,
          -maxVelocity,
          maxVelocity,
        ) * 80

      let frames = 0

      const damping = clamp(
        dragDampening ?? 0.72,
        0,
        1,
      )

      const frictionMultiplier =
        0.94 + 0.055 * damping

      const stopThreshold =
        0.015 - 0.01 * damping

      const maxFrames =
        Math.round(
          90 + 270 * damping,
        )

      const step = () => {
        vX *= frictionMultiplier
        vY *= frictionMultiplier

        if (
          Math.abs(vX) < stopThreshold &&
          Math.abs(vY) < stopThreshold
        ) {
          inertiaRAF.current = null
          return
        }

        if (++frames > maxFrames) {
          inertiaRAF.current = null
          return
        }

        const nextX = clamp(
          rotationRef.current.x -
            vY / 200,
          -maxVerticalRotationDeg,
          maxVerticalRotationDeg,
        )

        const nextY = wrapAngleSigned(
          rotationRef.current.y +
            vX / 200,
        )

        rotationRef.current = {
          x: nextX,
          y: nextY,
        }

        applyTransform(
          nextX,
          nextY,
        )

        inertiaRAF.current =
          requestAnimationFrame(step)
      }

      stopInertia()

      inertiaRAF.current =
        requestAnimationFrame(step)
    },
    [
      dragDampening,
      maxVerticalRotationDeg,
      stopInertia,
    ],
  )

  /*
    Drag interaction
  */
  useGesture(
  {
    onDragStart: (
      state: { event: Event },
    ) => {
      if (focusedElRef.current) return

      stopInertia()

      const pointerEvent =
        state.event as PointerEvent

      draggingRef.current = true
      movedRef.current = false

      startRotRef.current = {
        ...rotationRef.current,
      }

      startPosRef.current = {
        x: pointerEvent.clientX,
        y: pointerEvent.clientY,
      }
    },

    onDrag: (
      state: {
        event: Event
        last: boolean
        velocity?: [number, number]
        direction?: [number, number]
        movement?: [number, number]
      },
    ) => {
      if (
        focusedElRef.current ||
        !draggingRef.current ||
        !startPosRef.current
      ) {
        return
      }

      const pointerEvent =
        state.event as PointerEvent

      const totalDeltaX =
        pointerEvent.clientX -
        startPosRef.current.x

      const totalDeltaY =
        pointerEvent.clientY -
        startPosRef.current.y

      if (!movedRef.current) {
        const distanceSquared =
          totalDeltaX * totalDeltaX +
          totalDeltaY * totalDeltaY

        if (distanceSquared > 16) {
          movedRef.current = true
        }
      }

      const nextX = clamp(
        startRotRef.current.x -
          totalDeltaY / dragSensitivity,
        -maxVerticalRotationDeg,
        maxVerticalRotationDeg,
      )

      const nextY =
        wrapAngleSigned(
          startRotRef.current.y +
            totalDeltaX / dragSensitivity,
        )

      if (
        rotationRef.current.x !== nextX ||
        rotationRef.current.y !== nextY
      ) {
        rotationRef.current = {
          x: nextX,
          y: nextY,
        }

        applyTransform(
          nextX,
          nextY,
        )
      }

      if (state.last) {
        draggingRef.current = false

        const velocity =
          state.velocity ?? [0, 0]

        const direction =
          state.direction ?? [0, 0]

        let velocityX =
          velocity[0] * direction[0]

        let velocityY =
          velocity[1] * direction[1]

        const movement =
          state.movement

        if (
          Math.abs(velocityX) < 0.001 &&
          Math.abs(velocityY) < 0.001 &&
          Array.isArray(movement)
        ) {
          velocityX = clamp(
            (movement[0] /
              dragSensitivity) *
              0.02,
            -1.2,
            1.2,
          )

          velocityY = clamp(
            (movement[1] /
              dragSensitivity) *
              0.02,
            -1.2,
            1.2,
          )
        }

        if (
          Math.abs(velocityX) > 0.005 ||
          Math.abs(velocityY) > 0.005
        ) {
          startInertia(
            velocityX,
            velocityY,
          )
        }

        if (movedRef.current) {
          lastDragEndAt.current =
            performance.now()
        }

        movedRef.current = false
      }
    },
  },
  {
    target: mainRef,
    eventOptions: {
      passive: true,
    },
  },
)

  /*
    Open an image in the center
  */
  const openItemFromElement = (
    element: HTMLElement,
  ) => {
    if (openingRef.current) return

    openingRef.current = true
    openStartedAtRef.current =
      performance.now()

    lockScroll()

    const parent =
      element.parentElement as HTMLElement

    focusedElRef.current = element

    element.setAttribute(
      "data-focused",
      "true",
    )

    const offsetX = getDataNumber(
      parent,
      "offsetX",
      0,
    )

    const offsetY = getDataNumber(
      parent,
      "offsetY",
      0,
    )

    const sizeX = getDataNumber(
      parent,
      "sizeX",
      2,
    )

    const sizeY = getDataNumber(
      parent,
      "sizeY",
      2,
    )

    const parentRotation =
      computeItemBaseRotation(
        offsetX,
        offsetY,
        sizeX,
        sizeY,
        segments,
      )

    const parentY = normalizeAngle(
      parentRotation.rotateY,
    )

    const globalY = normalizeAngle(
      rotationRef.current.y,
    )

    let rotationY =
      -(parentY + globalY) % 360

    if (rotationY < -180) {
      rotationY += 360
    }

    const rotationX =
      -parentRotation.rotateX -
      rotationRef.current.x

    parent.style.setProperty(
      "--rot-y-delta",
      `${rotationY}deg`,
    )

    parent.style.setProperty(
      "--rot-x-delta",
      `${rotationX}deg`,
    )

    const referenceDiv =
      document.createElement("div")

    referenceDiv.className =
      "item__image item__image--reference"

    referenceDiv.style.opacity = "0"

    referenceDiv.style.transform =
      `rotateX(${-parentRotation.rotateX}deg) ` +
      `rotateY(${-parentRotation.rotateY}deg)`

    parent.appendChild(referenceDiv)

    void referenceDiv.offsetHeight

    const tileRect =
      referenceDiv.getBoundingClientRect()

    const mainRect =
      mainRef.current?.getBoundingClientRect()

    const frameRect =
      frameRef.current?.getBoundingClientRect()

    if (
      !mainRect ||
      !frameRect ||
      tileRect.width <= 0 ||
      tileRect.height <= 0
    ) {
      openingRef.current = false
      focusedElRef.current = null

      parent.removeChild(
        referenceDiv,
      )

      unlockScroll()

      return
    }

    originalTilePositionRef.current = {
      left: tileRect.left,
      top: tileRect.top,
      width: tileRect.width,
      height: tileRect.height,
    }

    element.style.visibility =
      "hidden"

    element.style.zIndex = "0"

    const overlay =
      document.createElement("div")

    overlay.className = "enlarge"

    overlay.style.position =
      "absolute"

    overlay.style.left =
      `${frameRect.left - mainRect.left}px`

    overlay.style.top =
      `${frameRect.top - mainRect.top}px`

    overlay.style.width =
      `${frameRect.width}px`

    overlay.style.height =
      `${frameRect.height}px`

    overlay.style.opacity = "0"
    overlay.style.zIndex = "30"
    overlay.style.willChange =
      "transform, opacity"

    overlay.style.transformOrigin =
      "top left"

    overlay.style.transition =
      `transform ${enlargeTransitionMs}ms ease, ` +
      `opacity ${enlargeTransitionMs}ms ease`

    const rawSource =
      parent.dataset.src ||
      (
        element.querySelector(
          "img",
        ) as HTMLImageElement
      )?.src ||
      ""

    const image =
      document.createElement("img")

    image.src = rawSource
    image.alt =
      element.getAttribute(
        "aria-label",
      ) || "Travel image"

    overlay.appendChild(image)

    viewerRef.current!.appendChild(
      overlay,
    )

    const translateX =
      tileRect.left -
      frameRect.left

    const translateY =
      tileRect.top -
      frameRect.top

    const scaleX =
      tileRect.width /
      frameRect.width

    const scaleY =
      tileRect.height /
      frameRect.height

    const validScaleX =
      Number.isFinite(scaleX) &&
      scaleX > 0
        ? scaleX
        : 1

    const validScaleY =
      Number.isFinite(scaleY) &&
      scaleY > 0
        ? scaleY
        : 1

    overlay.style.transform =
      `translate(${translateX}px, ${translateY}px) ` +
      `scale(${validScaleX}, ${validScaleY})`

    setTimeout(() => {
      if (!overlay.parentElement) {
        return
      }

      overlay.style.opacity = "1"

      overlay.style.transform =
        "translate(0px, 0px) scale(1, 1)"

      rootRef.current?.setAttribute(
        "data-enlarging",
        "true",
      )
    }, 16)

    const wantsResize =
      openedImageWidth ||
      openedImageHeight

    if (wantsResize) {
      const onFirstTransitionEnd = (
        event: TransitionEvent,
      ) => {
        if (
          event.propertyName !==
          "transform"
        ) {
          return
        }

        overlay.removeEventListener(
          "transitionend",
          onFirstTransitionEnd,
        )

        const previousTransition =
          overlay.style.transition

        overlay.style.transition =
          "none"

        const temporaryWidth =
          openedImageWidth ||
          `${frameRect.width}px`

        const temporaryHeight =
          openedImageHeight ||
          `${frameRect.height}px`

        overlay.style.width =
          temporaryWidth

        overlay.style.height =
          temporaryHeight

        const newRect =
          overlay.getBoundingClientRect()

        overlay.style.width =
          `${frameRect.width}px`

        overlay.style.height =
          `${frameRect.height}px`

        void overlay.offsetWidth

        overlay.style.transition =
          `left ${enlargeTransitionMs}ms ease, ` +
          `top ${enlargeTransitionMs}ms ease, ` +
          `width ${enlargeTransitionMs}ms ease, ` +
          `height ${enlargeTransitionMs}ms ease`

        const centeredLeft =
          frameRect.left -
          mainRect.left +
          (frameRect.width -
            newRect.width) /
            2

        const centeredTop =
          frameRect.top -
          mainRect.top +
          (frameRect.height -
            newRect.height) /
            2

        requestAnimationFrame(() => {
          overlay.style.left =
            `${centeredLeft}px`

          overlay.style.top =
            `${centeredTop}px`

          overlay.style.width =
            temporaryWidth

          overlay.style.height =
            temporaryHeight
        })

        const cleanupSecondTransition =
          () => {
            overlay.removeEventListener(
              "transitionend",
              cleanupSecondTransition,
            )

            overlay.style.transition =
              previousTransition
          }

        overlay.addEventListener(
          "transitionend",
          cleanupSecondTransition,
          {
            once: true,
          },
        )
      }

      overlay.addEventListener(
        "transitionend",
        onFirstTransitionEnd,
      )
    }
  }

  const onTileClick = useCallback(
    (
      event: React.MouseEvent<HTMLDivElement>,
    ) => {
      if (draggingRef.current) return
      if (movedRef.current) return

      if (
        performance.now() -
          lastDragEndAt.current <
        80
      ) {
        return
      }

      if (openingRef.current) return

      openItemFromElement(
        event.currentTarget,
      )
    },
    [],
  )

  const onTilePointerUp = useCallback(
    (
      event: React.PointerEvent<HTMLDivElement>,
    ) => {
      if (
        event.pointerType !== "touch"
      ) {
        return
      }

      if (draggingRef.current) return
      if (movedRef.current) return

      if (
        performance.now() -
          lastDragEndAt.current <
        80
      ) {
        return
      }

      if (openingRef.current) return

      openItemFromElement(
        event.currentTarget,
      )
    },
    [],
  )

  /*
    Close enlarged image
  */
  useEffect(() => {
    const scrim = scrimRef.current

    if (!scrim) return

    const close = () => {
      if (
        performance.now() -
          openStartedAtRef.current <
        250
      ) {
        return
      }

      const element =
        focusedElRef.current

      if (!element) return

      const parent =
        element.parentElement as HTMLElement

      const overlay =
        viewerRef.current?.querySelector(
          ".enlarge",
        ) as HTMLElement | null

      if (!overlay) return

      const referenceDiv =
        parent.querySelector(
          ".item__image--reference",
        ) as HTMLElement | null

      const originalPosition =
        originalTilePositionRef.current

      if (!originalPosition) {
        overlay.remove()

        if (referenceDiv) {
          referenceDiv.remove()
        }

        parent.style.setProperty(
          "--rot-y-delta",
          "0deg",
        )

        parent.style.setProperty(
          "--rot-x-delta",
          "0deg",
        )

        element.style.visibility = ""

        element.style.zIndex = "0"

        focusedElRef.current = null

        rootRef.current?.removeAttribute(
          "data-enlarging",
        )

        openingRef.current = false

        unlockScroll()

        return
      }

      const currentRect =
        overlay.getBoundingClientRect()

      const rootRect =
        rootRef.current!.getBoundingClientRect()

      const originalPositionRelative =
        {
          left:
            originalPosition.left -
            rootRect.left,

          top:
            originalPosition.top -
            rootRect.top,

          width:
            originalPosition.width,

          height:
            originalPosition.height,
        }

      const overlayRelative = {
        left:
          currentRect.left -
          rootRect.left,

        top:
          currentRect.top -
          rootRect.top,

        width:
          currentRect.width,

        height:
          currentRect.height,
      }

      const closingOverlay =
        document.createElement("div")

      closingOverlay.className =
        "enlarge-closing"

      closingOverlay.style.cssText =
        `
        position:absolute;
        left:${overlayRelative.left}px;
        top:${overlayRelative.top}px;
        width:${overlayRelative.width}px;
        height:${overlayRelative.height}px;
        z-index:9999;
        border-radius:var(--enlarge-radius, 32px);
        overflow:hidden;
        box-shadow:0 10px 30px rgba(36,31,26,.24);
        transition:all ${enlargeTransitionMs}ms ease-out;
        pointer-events:none;
        margin:0;
        transform:none;
      `

      const originalImage =
        overlay.querySelector("img")

      if (originalImage) {
        const clonedImage =
          originalImage.cloneNode(
            true,
          ) as HTMLImageElement

        clonedImage.style.cssText =
          `
          width:100%;
          height:100%;
          object-fit:cover;
        `

        closingOverlay.appendChild(
          clonedImage,
        )
      }

      overlay.remove()

      rootRef.current!.appendChild(
        closingOverlay,
      )

      void closingOverlay.getBoundingClientRect()

      requestAnimationFrame(() => {
        closingOverlay.style.left =
          `${originalPositionRelative.left}px`

        closingOverlay.style.top =
          `${originalPositionRelative.top}px`

        closingOverlay.style.width =
          `${originalPositionRelative.width}px`

        closingOverlay.style.height =
          `${originalPositionRelative.height}px`

        closingOverlay.style.opacity =
          "0"
      })

      const cleanup = () => {
        closingOverlay.remove()

        originalTilePositionRef.current =
          null

        if (referenceDiv) {
          referenceDiv.remove()
        }

        parent.style.transition =
          "none"

        element.style.transition =
          "none"

        parent.style.setProperty(
          "--rot-y-delta",
          "0deg",
        )

        parent.style.setProperty(
          "--rot-x-delta",
          "0deg",
        )

        requestAnimationFrame(() => {
          element.style.visibility =
            ""

          element.style.opacity =
            "0"

          element.style.zIndex =
            "0"

          focusedElRef.current =
            null

          rootRef.current?.removeAttribute(
            "data-enlarging",
          )

          requestAnimationFrame(() => {
            parent.style.transition =
              ""

            element.style.transition =
              "opacity 300ms ease-out"

            requestAnimationFrame(() => {
              element.style.opacity =
                "1"

              setTimeout(() => {
                element.style.transition =
                  ""

                element.style.opacity =
                  ""

                openingRef.current =
                  false

                if (
                  !draggingRef.current &&
                  rootRef.current?.getAttribute(
                    "data-enlarging",
                  ) !== "true"
                ) {
                  document.body.classList.remove(
                    "dg-scroll-lock",
                  )
                }
              }, 300)
            })
          })
        })
      }

      closingOverlay.addEventListener(
        "transitionend",
        cleanup,
        {
          once: true,
        },
      )
    }

    scrim.addEventListener(
      "click",
      close,
    )

    const handleKeyDown = (
      event: KeyboardEvent,
    ) => {
      if (event.key === "Escape") {
        close()
      }
    }

    window.addEventListener(
      "keydown",
      handleKeyDown,
    )

    return () => {
      scrim.removeEventListener(
        "click",
        close,
      )

      window.removeEventListener(
        "keydown",
        handleKeyDown,
      )
    }
  }, [
    enlargeTransitionMs,
    unlockScroll,
  ])

  useEffect(() => {
    return () => {
      document.body.classList.remove(
        "dg-scroll-lock",
      )
    }
  }, [])

  return (
    <div
      ref={rootRef}
      className="sphere-root"
      style={
        {
          "--segments-x": segments,
          "--segments-y": segments,
          "--overlay-blur-color":
            overlayBlurColor,
          "--tile-radius":
            imageBorderRadius,
          "--enlarge-radius":
            openedImageBorderRadius,
          "--image-filter": grayscale
            ? "grayscale(1)"
            : "none",
        } as React.CSSProperties
      }
    >
      <main
        ref={mainRef}
        className="sphere-main"
      >
        <div className="stage">
          <div
            ref={sphereRef}
            className="sphere"
          >
            {items.map((item, index) => (
              <div
                key={`${item.x}-${item.y}-${index}`}
                className="item"
                data-src={item.src}
                data-offset-x={item.x}
                data-offset-y={item.y}
                data-size-x={item.sizeX}
                data-size-y={item.sizeY}
                style={
                  {
                    "--offset-x": item.x,
                    "--offset-y": item.y,
                    "--item-size-x":
                      item.sizeX,
                    "--item-size-y":
                      item.sizeY,
                  } as React.CSSProperties
                }
              >
                <div
                  className="item__image"
                  role="button"
                  tabIndex={0}
                  aria-label={
                    item.alt ||
                    "Open travel image"
                  }
                  onClick={onTileClick}
                  onPointerUp={
                    onTilePointerUp
                  }
                  onKeyDown={(event) => {
                    if (
                      event.key === "Enter" ||
                      event.key === " "
                    ) {
                      event.preventDefault()
                      openItemFromElement(
                        event.currentTarget,
                      )
                    }
                  }}
                >
                  <img
                    src={item.src}
                    draggable={false}
                    alt={item.alt}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="overlay" />
        <div className="overlay overlay--blur" />

        <div className="edge-fade edge-fade--top" />
        <div className="edge-fade edge-fade--bottom" />

        <div
          className="viewer"
          ref={viewerRef}
        >
          <div
            ref={scrimRef}
            className="scrim"
          />

          <div
            ref={frameRef}
            className="frame"
          />
        </div>
      </main>
    </div>
  )
}
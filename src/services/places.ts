import type { Place, ActivityType } from "../types/place"
import type { Location } from "../types/weather"


interface OverpassElement {
  id: number
  type: "node" | "way" | "relation"
  lat?: number
  lon?: number
  center?: {
    lat: number
    lon: number
  }
  tags?: Record<string, string>
}

interface OverpassResponse {
  elements: OverpassElement[]
}

function getCoordinates(element: OverpassElement) {
  if (element.lat !== undefined && element.lon !== undefined) {
    return {
      latitude: element.lat,
      longitude: element.lon,
    }
  }

  if (element.center) {
    return {
      latitude: element.center.lat,
      longitude: element.center.lon,
    }
  }

  return null
}

function getActivityType(
  tags: Record<string, string>,
): ActivityType {
  const tourism = tags.tourism
  const historic = tags.historic
  const leisure = tags.leisure

  if (
    tourism === "museum" ||
    tourism === "gallery"
  ) {
    return "museum"
  }

  if (
    tourism === "viewpoint" ||
    leisure === "park" ||
    leisure === "garden"
  ) {
    return "nature"
  }

  if (
    historic === "monument" ||
    historic === "castle" ||
    historic === "ruins" ||
    historic === "memorial"
  ) {
    return "landmark"
  }

  if (
    tourism === "attraction" ||
    tourism === "theme_park" ||
    tourism === "zoo"
  ) {
    return "entertainment"
  }

  if (tourism === "artwork") {
    return "culture"
  }

  return "landmark"
}

function getDescription(
  tags: Record<string, string>,
): string {
  return (
    tags.description ||
    tags.short_description ||
    "A place worth exploring during your trip."
  )
}

function getDuration(
  type: ActivityType,
): number {
  switch (type) {
    case "museum":
      return 150

    case "nature":
      return 90

    case "entertainment":
      return 120

    case "culture":
      return 90

    default:
      return 75
  }
}

function getCostLevel(
  tags: Record<string, string>,
): 1 | 2 | 3 | 4 | 5 {
  if (tags.fee === "no") {
    return 1
  }

  if (tags.fee === "yes") {
    return 3
  }

  return 2
}

function normalizePlace(
  element: OverpassElement,
  location: Location,
): Place | null {
  const tags = element.tags

  if (!tags) {
    return null
  }

  const name = tags.name

  if (!name) {
    return null
  }

  const coordinates = getCoordinates(element)

  if (!coordinates) {
    return null
  }

  const category = getActivityType(tags)

  return {
    id: `osm-${element.type}-${element.id}`,
    name,
    city: location.name,
    country: location.country,
    category,
    description: getDescription(tags),
    image: tags.image || "",
    coordinates,
    durationMinutes: getDuration(category),
    costLevel: getCostLevel(tags),
    suitableFor: [
      "Backpacker",
      "Luxury",
      "Family",
      "Couple",
      "Explorer",
    ],
    weatherTypes: ["sunny", "cloudy", "rain", "cold", "hot", "any"],
    mustDo: [],
    localTip:
      "Check the place details and opening hours before visiting.",
    photoChallenge:
      `Capture a memorable photo at ${name}.`,
    sticker:
      category === "museum"
        ? "🎨"
        : category === "nature"
          ? "🌿"
          : category === "entertainment"
            ? "✨"
            : "📍",
  }
}

export async function getNearbyPlaces(
  location: Location,
  radiusMeters = 8000,
): Promise<Place[]> {
  const response = await fetch("/api/places", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      latitude: location.latitude,
      longitude: location.longitude,
      radiusMeters,
    }),
  })

  if (!response.ok) {
    throw new Error(
      "Unable to discover places for this destination.",
    )
  }

  const data =
    (await response.json()) as OverpassResponse

  const places = data.elements
    .map((element) =>
      normalizePlace(element, location),
    )
    .filter(
      (place): place is Place => place !== null,
    )

  const uniquePlaces = Array.from(
    new Map(
      places.map((place) => [
        place.name.toLowerCase(),
        place,
      ]),
    ).values(),
  )

  return uniquePlaces.slice(0, 60)
}
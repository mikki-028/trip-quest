import type { Place, Persona, WeatherType } from "../types/place"
import { getPersonaScore } from "./personaRules"
import { getWeatherPreferenceScore } from "./weatherRules"

interface ScoreContext {
  persona: Persona
  weather: WeatherType
}

export function scorePlace(
  place: Place,
  context: ScoreContext,
): number {
  let score = 0

  score += getPersonaScore(place, context.persona)

  score += getWeatherPreferenceScore(
    place.weatherTypes,
    context.weather,
  )

  // Slight preference for cheaper experiences.
  // This especially benefits backpackers later.
  if (context.persona === "Backpacker") {
    score += Math.max(0, 6 - place.costLevel)
  }

  // Families benefit from shorter, manageable activities.
  if (context.persona === "Family") {
    if (place.durationMinutes <= 150) {
      score += 5
    }
  }

  return score
}

export function rankPlaces(
  places: Place[],
  context: ScoreContext,
): Place[] {
  return [...places].sort(
    (a, b) =>
      scorePlace(b, context) -
      scorePlace(a, context),
  )
}
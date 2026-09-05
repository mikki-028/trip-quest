import type { Persona, Place } from "../types/place"

export function getPersonaScore(
  place: Place,
  persona: Persona,
): number {
  if (place.suitableFor.includes(persona)) {
    return 20
  }

  return 0
}
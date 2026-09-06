import type { Trip } from "../types/trip"

const TRIP_HISTORY_KEY = "trip-quest-history"

export function getTripHistory(): Trip[] {
  const storedTrips =
    localStorage.getItem(TRIP_HISTORY_KEY)

  if (!storedTrips) {
    return []
  }

  try {
    return JSON.parse(storedTrips) as Trip[]
  } catch {
    return []
  }
}

export function saveTripToHistory(trip: Trip): void {
  const existingTrips = getTripHistory()

  const filteredTrips = existingTrips.filter(
    (item) => item.id !== trip.id,
  )

  const updatedTrips = [
    trip,
    ...filteredTrips,
  ]

  localStorage.setItem(
    TRIP_HISTORY_KEY,
    JSON.stringify(updatedTrips),
  )
}

export function removeTripFromHistory(
  tripId: string,
): void {
  const existingTrips = getTripHistory()

  const updatedTrips = existingTrips.filter(
    (trip) => trip.id !== tripId,
  )

  localStorage.setItem(
    TRIP_HISTORY_KEY,
    JSON.stringify(updatedTrips),
  )
}
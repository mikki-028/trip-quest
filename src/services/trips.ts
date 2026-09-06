import { supabase } from "./supabase"
import type { Trip } from "../types/trip"

export async function saveTripToSupabase(
  trip: Trip,
) {
  const { error } = await supabase
    .from("trips")
    .upsert({
      id: trip.id,
      destination: trip.destination,
      country: trip.country,
      duration: trip.duration,
      persona: trip.persona,
      weather: trip.weather,
      days: trip.days,
      quests: trip.quests,
      created_at: trip.createdAt,
    })

  if (error) {
    throw new Error(
      `Unable to save trip: ${error.message}`,
    )
  }
}

export async function getTripFromSupabase(
  tripId: string,
): Promise<Trip | null> {
  const { data, error } = await supabase
    .from("trips")
    .select("*")
    .eq("id", tripId)
    .maybeSingle()

  if (error) {
    throw new Error(
      `Unable to load shared trip: ${error.message}`,
    )
  }

  if (!data) {
    return null
  }

  return {
    id: data.id,
    destination: data.destination,
    country: data.country,
    duration: data.duration,
    persona: data.persona,
    weather: data.weather,
    days: data.days,
    quests: data.quests,
    createdAt: data.created_at,
  }
}
import type {
  ItineraryDay,
  ItineraryStop,
} from "../types/trip"
import type {
  Persona,
  Place,
} from "../types/place"
import type {
  WeatherData,
} from "../types/weather"

import {
  getWeatherType,
} from "./weatherRules"

import {
  rankPlaces,
} from "./scoring"

import {
  getRouteInfo,
} from "../services/routing"

interface GenerateItineraryOptions {
  duration: number
  persona: Persona
  weather: WeatherData
  places: Place[]
}

const DAY_START_MINUTES = 9 * 60
const MAX_STOPS_PER_DAY = 4
const BREAK_MINUTES = 60

function formatTime(
  minutesFromMidnight: number,
): string {
  const hours = Math.floor(minutesFromMidnight / 60)
  const minutes = minutesFromMidnight % 60
  const suffix = hours >= 12 ? "PM" : "AM"
  const displayHour =
    hours % 12 === 0 ? 12 : hours % 12

  return `${displayHour}:${String(minutes).padStart(2, "0")} ${suffix}`
}

function getDayTheme(
  places: Place[],
): string {
  const categories = places.map(
    (place) => place.category,
  )

  if (categories.includes("culture")) {
    return "Culture & local discoveries"
  }

  if (categories.includes("nature")) {
    return "Slow moments & scenic views"
  }

  if (categories.includes("food")) {
    return "Taste the city"
  }

  if (categories.includes("landmark")) {
    return "Classic highlights"
  }

  return "Explore & discover"
}

async function buildDayStops(
  places: Place[],
): Promise<ItineraryStop[]> {
  let currentTime = DAY_START_MINUTES

  const stops: ItineraryStop[] = []

  for (let index = 0; index < places.length; index += 1) {
    const place = places[index]

    const startTime = formatTime(currentTime)

    currentTime += place.durationMinutes

    const endTime = formatTime(currentTime)

    currentTime += BREAK_MINUTES

    let distanceFromPreviousKm: number | undefined
    let travelMinutesFromPrevious:
      | number
      | undefined

    if (index > 0) {
      const previousPlace = places[index - 1]

      try {
        const route = await getRouteInfo(
          previousPlace.coordinates,
          place.coordinates,
        )

        distanceFromPreviousKm =
          route.distanceKm

        travelMinutesFromPrevious =
          route.durationMinutes
      } catch {
        // Routing failure should not destroy
        // an otherwise valid itinerary.
        distanceFromPreviousKm = undefined
        travelMinutesFromPrevious = undefined
      }
    }

    stops.push({
      place,
      startTime,
      endTime,
      distanceFromPreviousKm,
      travelMinutesFromPrevious,
    })
  }

  return stops
}

function getDayWeather(
  weather: WeatherData,
  dayIndex: number,
) {
  return (
    weather.days[dayIndex] ?? {
      date:
        weather.days[weather.days.length - 1]?.date ??
        new Date()
          .toISOString()
          .split("T")[0],

      weatherCode:
        weather.currentWeatherCode,

      temperatureMax:
        weather.currentTemperature,

      temperatureMin:
        weather.currentTemperature,

      precipitationProbability: 0,
    }
  )
}

function getAvailablePlaces(
  places: Place[],
  locationName: string,
): Place[] {
  return places.filter(
    (place) =>
      place.city.toLowerCase() ===
      locationName.toLowerCase(),
  )
}

function selectPlacesForDay(
  rankedPlaces: Place[],
  usedPlaceIds: Set<string>,
): Place[] {
  const selected: Place[] = []

  for (const place of rankedPlaces) {
    if (usedPlaceIds.has(place.id)) {
      continue
    }

    selected.push(place)

    if (selected.length === MAX_STOPS_PER_DAY) {
      break
    }
  }

  return selected
}

export async function generateItinerary({
  duration,
  persona,
  weather,
  places,
}: GenerateItineraryOptions): Promise<ItineraryDay[]> {
  const itinerary: ItineraryDay[] = []

  const availablePlaces =
    getAvailablePlaces(
      places,
      weather.location.name,
    )

  const usedPlaceIds = new Set<string>()

  const safeDuration = Math.max(
    1,
    Math.min(duration, 7),
  )

  for (
    let dayIndex = 0;
    dayIndex < safeDuration;
    dayIndex += 1
  ) {
    const dayWeather = getDayWeather(
      weather,
      dayIndex,
    )

    const weatherType = getWeatherType(
      dayWeather.weatherCode,
      dayWeather.temperatureMax,
    )

    const rankedPlaces = rankPlaces(
      availablePlaces.filter(
        (place) =>
          !usedPlaceIds.has(place.id),
      ),
      {
        persona,
        weather: weatherType,
      },
    )

    const dayPlaces =
      selectPlacesForDay(
        rankedPlaces,
        usedPlaceIds,
      )

    if (dayPlaces.length === 0) {
      break
    }

    dayPlaces.forEach((place) => {
      usedPlaceIds.add(place.id)
    })

    const stops = await buildDayStops(
      dayPlaces,
    )

    itinerary.push({
      day: dayIndex + 1,
      date: dayWeather.date,
      theme: getDayTheme(dayPlaces),

      weather: {
        temperatureMax:
          dayWeather.temperatureMax,

        temperatureMin:
          dayWeather.temperatureMin,

        weatherCode:
          dayWeather.weatherCode,

        precipitationProbability:
          dayWeather.precipitationProbability,
      },

      stops,
    })
  }

  return itinerary
}
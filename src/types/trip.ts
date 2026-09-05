import type { Persona, Place } from "./place"
import type { WeatherData } from "./weather"

export interface ItineraryStop {
  place: Place
  startTime: string
  endTime: string
  distanceFromPreviousKm?: number
  travelMinutesFromPrevious?: number
}

export interface ItineraryDay {
  day: number
  date: string
  theme: string
  weather: {
    temperatureMax: number
    temperatureMin: number
    weatherCode: number
    precipitationProbability: number
  }
  stops: ItineraryStop[]
}

export interface Quest {
  id: string
  title: string
  description: string
  placeId: string
  sticker: string
  completed: boolean
  photo?: string
}

export interface Trip {
  id: string
  destination: string
  country: string
  duration: number
  persona: Persona
  weather: WeatherData
  days: ItineraryDay[]
  quests: Quest[]
  createdAt: string
}
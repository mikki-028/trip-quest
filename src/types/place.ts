export type Persona =
  | "Backpacker"
  | "Luxury"
  | "Family"
  | "Couple"
  | "Explorer"

export type ActivityType =
  | "landmark"
  | "museum"
  | "food"
  | "nature"
  | "shopping"
  | "culture"
  | "entertainment"

export type WeatherType =
  | "sunny"
  | "cloudy"
  | "rain"
  | "cold"
  | "hot"
  | "any"

export interface Coordinates {
  latitude: number
  longitude: number
}

export interface Place {
  id: string
  name: string
  city: string
  country: string
  category: ActivityType
  description: string
  image: string
  coordinates: Coordinates

  durationMinutes: number
  costLevel: 1 | 2 | 3 | 4 | 5

  suitableFor: Persona[]
  weatherTypes: WeatherType[]

  mustDo: string[]
  localTip: string
  photoChallenge?: string
  sticker?: string
}
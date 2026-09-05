export interface WeatherDay {
  date: string
  weatherCode: number
  temperatureMax: number
  temperatureMin: number
  precipitationProbability: number
}

export interface Location {
  name: string
  country: string
  latitude: number
  longitude: number
  timezone: string
}

export interface WeatherData {
  location: Location
  currentTemperature: number
  currentWeatherCode: number
  days: WeatherDay[]
}
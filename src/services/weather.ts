import type { Location, WeatherData, WeatherDay } from "../types/weather"

const GEOCODING_URL =
  "https://geocoding-api.open-meteo.com/v1/search"

const WEATHER_URL =
  "https://api.open-meteo.com/v1/forecast"

export async function findLocation(
  city: string,
): Promise<Location> {
  const params = new URLSearchParams({
    name: city,
    count: "1",
    language: "en",
    format: "json",
  })

  const response = await fetch(`${GEOCODING_URL}?${params}`)

  if (!response.ok) {
    throw new Error("Unable to search for the destination.")
  }

  const data = await response.json()

  if (!data.results || data.results.length === 0) {
    throw new Error(`We couldn't find "${city}".`)
  }

  const result = data.results[0]

  return {
    name: result.name,
    country: result.country,
    latitude: result.latitude,
    longitude: result.longitude,
    timezone: result.timezone,
  }
}

export async function getWeather(
  location: Location,
  days = 7,
): Promise<WeatherData> {
  const params = new URLSearchParams({
    latitude: String(location.latitude),
    longitude: String(location.longitude),
    current: "temperature_2m,weather_code",
    daily:
      "weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max",
    forecast_days: String(Math.min(days, 16)),
    timezone: "auto",
  })

  const response = await fetch(`${WEATHER_URL}?${params}`)

  if (!response.ok) {
    throw new Error("Unable to fetch weather data.")
  }

  const data = await response.json()

  const weatherDays: WeatherDay[] = data.daily.time.map(
    (date: string, index: number) => ({
      date,
      weatherCode: data.daily.weather_code[index],
      temperatureMax: data.daily.temperature_2m_max[index],
      temperatureMin: data.daily.temperature_2m_min[index],
      precipitationProbability:
        data.daily.precipitation_probability_max[index],
    }),
  )

  return {
    location,
    currentTemperature: data.current.temperature_2m,
    currentWeatherCode: data.current.weather_code,
    days: weatherDays,
  }
}

export async function getDestinationWeather(
  city: string,
  days = 7,
): Promise<WeatherData> {
  const location = await findLocation(city)

  return getWeather(location, days)
}
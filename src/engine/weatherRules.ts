import type { WeatherType } from "../types/place"

export function getWeatherType(
  weatherCode: number,
  temperature: number,
): WeatherType {
  // Clear / mostly clear
  if (weatherCode === 0 || weatherCode === 1) {
    if (temperature >= 30) {
      return "hot"
    }

    return "sunny"
  }

  // Partly cloudy / overcast
  if (weatherCode === 2 || weatherCode === 3) {
    return "cloudy"
  }

  // Fog
  if (weatherCode === 45 || weatherCode === 48) {
    return "cold"
  }

  // Drizzle / rain
  if (
    weatherCode === 51 ||
    weatherCode === 53 ||
    weatherCode === 55 ||
    weatherCode === 61 ||
    weatherCode === 63 ||
    weatherCode === 65 ||
    weatherCode === 80 ||
    weatherCode === 81 ||
    weatherCode === 82
  ) {
    return "rain"
  }

  // Snow / freezing conditions
  if (
    weatherCode === 71 ||
    weatherCode === 73 ||
    weatherCode === 75 ||
    weatherCode === 77 ||
    weatherCode === 85 ||
    weatherCode === 86
  ) {
    return "cold"
  }

  // Thunderstorms
  if (weatherCode === 95 || weatherCode === 96 || weatherCode === 99) {
    return "rain"
  }

  return "any"
}

export function getWeatherPreferenceScore(
  placeWeatherTypes: WeatherType[],
  currentWeather: WeatherType,
): number {
  if (placeWeatherTypes.includes(currentWeather)) {
    return 20
  }

  if (placeWeatherTypes.includes("any")) {
    return 10
  }

  return 0
}
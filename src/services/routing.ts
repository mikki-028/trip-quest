import type { Coordinates } from "../types/place"

const OSRM_URL =
  "https://router.project-osrm.org/route/v1/driving"

interface OsrmRouteResponse {
  code: string
  routes?: Array<{
    distance: number
    duration: number
  }>
}

export interface RouteInfo {
  distanceKm: number
  durationMinutes: number
}

export async function getRouteInfo(
  from: Coordinates,
  to: Coordinates,
): Promise<RouteInfo> {
  const coordinates = [
    `${from.longitude},${from.latitude}`,
    `${to.longitude},${to.latitude}`,
  ].join(";")

  const params = new URLSearchParams({
    overview: "false",
  })

  const response = await fetch(
    `${OSRM_URL}/${coordinates}?${params}`,
  )

  if (!response.ok) {
    throw new Error("Unable to calculate the route.")
  }

  const data =
    (await response.json()) as OsrmRouteResponse

  if (
    data.code !== "Ok" ||
    !data.routes ||
    data.routes.length === 0
  ) {
    throw new Error("No route could be found between these places.")
  }

  const route = data.routes[0]

  return {
    distanceKm: Number((route.distance / 1000).toFixed(1)),
    durationMinutes: Math.max(
      1,
      Math.round(route.duration / 60),
    ),
  }
}
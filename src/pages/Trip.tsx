import {
  ArrowLeft,
  CalendarDays,
  Car,
  CloudSun,
  MapPin,
} from "lucide-react"
import { Link, useParams } from "react-router-dom"

import type { Trip as TripData } from "../types/trip"

function Trip() {
  const { tripId } = useParams()

  const storedTrip = tripId
    ? localStorage.getItem(`trip-quest-${tripId}`)
    : null

  const trip = storedTrip
    ? (JSON.parse(storedTrip) as TripData)
    : null

  if (!trip) {
    return (
      <main className="min-h-screen bg-[#CFC1AA] px-6 py-24 text-[#241F1A]">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#C85A3F]">
            Trip not found
          </p>

          <h1 className="mt-4 text-5xl font-black tracking-tight">
            This adventure doesn't exist yet.
          </h1>

          <Link
            to="/"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#28483D] px-5 py-3 text-sm font-bold text-[#F1E8D8]"
          >
            <ArrowLeft size={16} />
            Back to planning
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#CFC1AA] px-6 py-16 text-[#241F1A]">
      <div className="mx-auto max-w-6xl">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#241F1A]/60 transition-colors hover:text-[#C85A3F]"
        >
          <ArrowLeft size={16} />
          Plan another trip
        </Link>

        <header className="mt-12">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#28483D]">
            Your adventure
          </p>

          <div className="mt-4 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-6xl font-black tracking-[-0.05em] sm:text-7xl">
                {trip.destination}
              </h1>

              <p className="mt-3 text-lg text-[#241F1A]/60">
                {trip.country} · {trip.duration}{" "}
                {trip.duration === 1 ? "day" : "days"} ·{" "}
                {trip.persona}
              </p>
            </div>

            <div className="flex items-center gap-3 rounded-[24px] bg-[#F1E8D8]/80 px-5 py-4">
              <CloudSun
                size={22}
                className="text-[#C85A3F]"
              />

              <div>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#241F1A]/45">
                  Right now
                </p>

                <p className="mt-1 text-xl font-black">
                  {Math.round(
                    trip.weather.currentTemperature,
                  )}
                  °C
                </p>
              </div>
            </div>
          </div>
        </header>

        <div className="mt-12 space-y-8">
          {trip.days.map((day) => (
            <section
              key={day.day}
              className="rounded-[32px] bg-[#F1E8D8] p-6 shadow-[0_20px_60px_rgba(36,31,26,0.08)] sm:p-8"
            >
              <div className="flex flex-col gap-4 border-b border-[#241F1A]/10 pb-6 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C85A3F]">
                    Day {day.day}
                  </p>

                  <h2 className="mt-2 text-3xl font-black">
                    {day.theme}
                  </h2>
                </div>

                <div className="flex items-center gap-2 text-sm font-semibold text-[#241F1A]/55">
                  <CalendarDays size={16} />
                  {day.date}
                </div>
              </div>

              <div className="mt-7">
                {day.stops.map((stop, index) => (
                  <div key={stop.place.id}>
                    <div className="relative pl-10">
                      <div className="absolute left-0 top-1 flex h-7 w-7 items-center justify-center rounded-full bg-[#28483D] text-xs font-black text-[#F1E8D8]">
                        {index + 1}
                      </div>

                      {index < day.stops.length - 1 && (
                        <div className="absolute bottom-[-24px] left-[13px] top-9 w-px bg-[#241F1A]/15" />
                      )}

                      <div className="grid gap-4 sm:grid-cols-[180px_1fr]">
                        <div>
                          <p className="text-sm font-black text-[#241F1A]">
                            {stop.startTime}
                          </p>

                          <p className="mt-1 text-xs font-semibold text-[#241F1A]/45">
                            until {stop.endTime}
                          </p>
                        </div>

                        <div>
                          <p className="text-xl font-black">
                            {stop.place.name}
                          </p>

                          <div className="mt-2 flex flex-wrap gap-2">
                            <span className="rounded-full bg-[#CFC1AA]/45 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em]">
                              {stop.place.category}
                            </span>

                            <span className="rounded-full bg-[#D5A13A]/25 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em]">
                              {stop.place.durationMinutes} min
                            </span>
                          </div>

                          <p className="mt-3 max-w-2xl text-sm leading-6 text-[#241F1A]/60">
                            {stop.place.description}
                          </p>

                          {stop.place.photoChallenge && (
                            <div className="mt-4 rounded-[20px] bg-[#28483D] p-4 text-[#F1E8D8]">
                              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#D5A13A]">
                                📸 Photo challenge
                              </p>

                              <p className="mt-1 text-sm font-semibold">
                                {stop.place.photoChallenge}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {index < day.stops.length - 1 && (
                      <div className="ml-10 flex items-center gap-3 py-5">
                        <div className="h-px flex-1 bg-[#241F1A]/10" />

                        <div className="flex items-center gap-2 rounded-full bg-[#CFC1AA]/35 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[#241F1A]/55">
                          <Car
                            size={13}
                            className="text-[#C85A3F]"
                          />

                          {stop.distanceFromPreviousKm !==
                            undefined &&
                          stop.travelMinutesFromPrevious !==
                            undefined ? (
                            <>
                              {stop.distanceFromPreviousKm} km
                              <span className="text-[#241F1A]/25">
                                ·
                              </span>
                              {stop.travelMinutesFromPrevious}{" "}
                              min
                            </>
                          ) : (
                            "Route unavailable"
                          )}
                        </div>

                        <div className="h-px flex-1 bg-[#241F1A]/10" />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-8 flex items-center gap-2 rounded-[20px] bg-[#CFC1AA]/25 px-4 py-3 text-sm font-semibold text-[#241F1A]/60">
                <MapPin
                  size={16}
                  className="text-[#C85A3F]"
                />
                Weather-aware itinerary for this day
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  )
}

export default Trip
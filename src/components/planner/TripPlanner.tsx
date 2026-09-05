import {
  CalendarDays,
  ChevronDown,
  LoaderCircle,
  MapPin,
  Sparkles,
} from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

import { generateItinerary } from "../../engine/itineraryEngine"
import { getNearbyPlaces } from "../../services/places"
import { getDestinationWeather } from "../../services/weather"
import type { Persona } from "../../types/place"

const personas: Persona[] = [
  "Backpacker",
  "Luxury",
  "Family",
  "Couple",
  "Explorer",
]

const durations = ["1", "2", "3", "4", "5", "6", "7"]

function TripPlanner() {
  const navigate = useNavigate()

  const [destination, setDestination] = useState("")
  const [duration, setDuration] = useState("3")
  const [persona, setPersona] = useState<Persona>("Backpacker")
  const [openDropdown, setOpenDropdown] = useState<
    "duration" | "persona" | null
  >(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  async function handlePlanTrip() {
    const trimmedDestination = destination.trim()

    if (!trimmedDestination) {
      setError("Tell us where you're going first.")
      return
    }

    setError("")
    setIsLoading(true)
    setOpenDropdown(null)

    try {
      const tripDuration = Number(duration)

      // 1. Find the destination and fetch its weather.
      const weather = await getDestinationWeather(
        trimmedDestination,
        Math.max(tripDuration, 3),
      )

      // 2. Discover real nearby places around that destination.
      const places = await getNearbyPlaces(
        weather.location,
      )

      if (places.length === 0) {
        throw new Error(
          `We couldn't find enough places to build a trip for ${weather.location.name}.`,
        )
      }

      // 3. Rank those places using our weather + persona engine.
      const itinerary = await generateItinerary({
        duration: tripDuration,
        persona,
        weather,
        places,
      })

      if (itinerary.length === 0) {
        throw new Error(
          `We couldn't build an itinerary for ${weather.location.name} with the available places.`,
        )
      }

      // 4. Create a unique trip ID.
      const tripId =
        `${weather.location.name}-${Date.now()}`
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")

      // 5. Build the complete trip object.
      const trip = {
        id: tripId,
        destination: weather.location.name,
        country: weather.location.country,
        duration: tripDuration,
        persona,
        weather,
        days: itinerary,
        quests: [],
        createdAt: new Date().toISOString(),
      }

      // 6. Save the trip locally.
      localStorage.setItem(
        `trip-quest-${tripId}`,
        JSON.stringify(trip),
      )

      // 7. Open the generated trip.
      navigate(`/trip/${tripId}`)
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong while planning your trip.",
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div
      id="planner"
      className="relative z-50 mx-auto mt-10 w-full max-w-3xl rounded-[32px] border border-[#F1E8D8]/70 bg-[#F1E8D8]/90 p-3 shadow-[0_25px_80px_rgba(36,31,26,0.16)] backdrop-blur-xl"
    >
      <div className="grid gap-2 md:grid-cols-[1.5fr_0.8fr_1fr_auto]">
        {/* Destination */}
        <div className="group flex min-h-[68px] items-center gap-3 rounded-[24px] bg-white/50 px-4 transition-colors duration-300 hover:bg-white/70">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#28483D] text-[#F1E8D8]">
            <MapPin size={18} />
          </span>

          <span className="flex min-w-0 flex-1 flex-col">
            <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#241F1A]/45">
              Destination
            </span>

            <input
              type="text"
              value={destination}
              onChange={(event) => {
                setDestination(event.target.value)
                setError("")
              }}
              placeholder="Where are you going?"
              className="w-full bg-transparent text-sm font-semibold text-[#241F1A] outline-none placeholder:text-[#241F1A]/35"
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handlePlanTrip()
                }
              }}
              disabled={isLoading}
            />
          </span>
        </div>

        {/* Duration */}
        <div className="relative">
          <button
            type="button"
            disabled={isLoading}
            onClick={() =>
              setOpenDropdown(
                openDropdown === "duration"
                  ? null
                  : "duration",
              )
            }
            className="flex min-h-[68px] w-full items-center gap-3 rounded-[24px] bg-white/50 px-4 text-left transition-colors duration-300 hover:bg-white/70 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#D5A13A] text-[#241F1A]">
              <CalendarDays size={17} />
            </span>

            <span className="flex min-w-0 flex-1 flex-col">
              <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#241F1A]/45">
                Trip length
              </span>

              <span className="text-sm font-semibold text-[#241F1A]">
                {duration} {duration === "1" ? "day" : "days"}
              </span>
            </span>

            <ChevronDown
              size={16}
              className={`shrink-0 text-[#241F1A]/45 transition-transform duration-200 ${
                openDropdown === "duration"
                  ? "rotate-180"
                  : ""
              }`}
            />
          </button>

          {openDropdown === "duration" && (
            <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-[100] overflow-hidden rounded-[20px] border border-[#241F1A]/10 bg-[#F1E8D8] p-2 shadow-[0_18px_45px_rgba(36,31,26,0.18)]">
              <div className="max-h-64 overflow-y-auto">
                {durations.map((item) => {
                  const isSelected = duration === item

                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => {
                        setDuration(item)
                        setOpenDropdown(null)
                      }}
                      className={`flex w-full items-center justify-between rounded-[14px] px-3 py-2.5 text-sm font-semibold transition-colors ${
                        isSelected
                          ? "bg-[#28483D] text-[#F1E8D8]"
                          : "text-[#241F1A] hover:bg-[#CFC1AA]/35"
                      }`}
                    >
                      <span>
                        {item} {item === "1" ? "day" : "days"}
                      </span>

                      {isSelected && (
                        <span className="text-[10px] uppercase tracking-[0.14em] opacity-70">
                          selected
                        </span>
                      )}
                    </button>
                  )
                })}
              </div>
            </div>
          )}
        </div>

        {/* Persona */}
        <div className="relative">
          <button
            type="button"
            disabled={isLoading}
            onClick={() =>
              setOpenDropdown(
                openDropdown === "persona"
                  ? null
                  : "persona",
              )
            }
            className="flex min-h-[68px] w-full items-center gap-3 rounded-[24px] bg-white/50 px-4 text-left transition-colors duration-300 hover:bg-white/70 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#C85A3F] text-[#F1E8D8]">
              <Sparkles size={17} />
            </span>

            <span className="flex min-w-0 flex-1 flex-col">
              <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#241F1A]/45">
                Your style
              </span>

              <span className="truncate text-sm font-semibold text-[#241F1A]">
                {persona}
              </span>
            </span>

            <ChevronDown
              size={16}
              className={`shrink-0 text-[#241F1A]/45 transition-transform duration-200 ${
                openDropdown === "persona"
                  ? "rotate-180"
                  : ""
              }`}
            />
          </button>

          {openDropdown === "persona" && (
            <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-[100] overflow-hidden rounded-[20px] border border-[#241F1A]/10 bg-[#F1E8D8] p-2 shadow-[0_18px_45px_rgba(36,31,26,0.18)]">
              <div className="max-h-64 overflow-y-auto">
                {personas.map((item) => {
                  const isSelected = persona === item

                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => {
                        setPersona(item)
                        setOpenDropdown(null)
                      }}
                      className={`flex w-full items-center justify-between rounded-[14px] px-3 py-2.5 text-sm font-semibold transition-colors ${
                        isSelected
                          ? "bg-[#C85A3F] text-[#F1E8D8]"
                          : "text-[#241F1A] hover:bg-[#CFC1AA]/35"
                      }`}
                    >
                      <span>{item}</span>

                      {isSelected && (
                        <span className="text-[10px] uppercase tracking-[0.14em] opacity-70">
                          selected
                        </span>
                      )}
                    </button>
                  )
                })}
              </div>
            </div>
          )}
        </div>

        {/* Submit */}
        <button
          type="button"
          disabled={isLoading}
          onClick={handlePlanTrip}
          className="group flex min-h-[68px] items-center justify-center gap-2 rounded-[24px] bg-[#28483D] px-6 text-sm font-bold text-[#F1E8D8] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#203D34] hover:shadow-[0_12px_28px_rgba(40,72,61,0.25)] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isLoading ? (
            <>
              <LoaderCircle
                size={17}
                className="animate-spin"
              />
              <span>Planning...</span>
            </>
          ) : (
            <>
              <span>Plan it</span>

              <span className="transition-transform duration-300 group-hover:translate-x-1">
                ✈️
              </span>
            </>
          )}
        </button>
      </div>

      {error && (
        <p className="px-4 pt-3 text-center text-xs font-semibold text-[#B33F31]">
          {error}
        </p>
      )}

      <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 px-3 pb-1 pt-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#241F1A]/40">
        <span className="h-1.5 w-1.5 rounded-full bg-[#C85A3F]" />
        Weather-aware plans

        <span className="h-1.5 w-1.5 rounded-full bg-[#D5A13A]" />
        Personalized quests

        <span className="h-1.5 w-1.5 rounded-full bg-[#28483D]" />
        Travel memories
      </div>
    </div>
  )
}

export default TripPlanner
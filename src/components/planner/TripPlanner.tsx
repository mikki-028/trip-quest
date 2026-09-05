import { CalendarDays, ChevronDown, MapPin, Sparkles } from "lucide-react"
import { useState } from "react"

const personas = [
  "Backpacker",
  "Luxury",
  "Family",
  "Couple",
  "Explorer",
]

function TripPlanner() {
  const [destination, setDestination] = useState("")
  const [duration, setDuration] = useState("3")
  const [persona, setPersona] = useState("Backpacker")

  return (
    <div
      id="planner"
      className="mx-auto mt-10 w-full max-w-3xl rounded-[32px] border border-[#F1E8D8]/70 bg-[#F1E8D8]/90 p-3 shadow-[0_25px_80px_rgba(36,31,26,0.16)] backdrop-blur-xl"
    >
      <div className="grid gap-2 md:grid-cols-[1.5fr_0.8fr_1fr_auto]">
        {/* Destination */}
        <label className="group flex min-h-[68px] items-center gap-3 rounded-[24px] bg-white/50 px-4 transition-colors duration-300 hover:bg-white/70">
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
              onChange={(event) => setDestination(event.target.value)}
              placeholder="Where are you going?"
              className="w-full bg-transparent text-sm font-semibold text-[#241F1A] outline-none placeholder:text-[#241F1A]/35"
            />
          </span>
        </label>

        {/* Duration */}
        <label className="group flex min-h-[68px] items-center gap-3 rounded-[24px] bg-white/50 px-4 transition-colors duration-300 hover:bg-white/70">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#D5A13A] text-[#241F1A]">
            <CalendarDays size={17} />
          </span>

          <span className="flex min-w-0 flex-1 flex-col">
            <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#241F1A]/45">
              Trip length
            </span>

            <select
              value={duration}
              onChange={(event) => setDuration(event.target.value)}
              className="w-full cursor-pointer appearance-none bg-transparent text-sm font-semibold text-[#241F1A] outline-none"
            >
              <option value="1">1 day</option>
              <option value="2">2 days</option>
              <option value="3">3 days</option>
              <option value="4">4 days</option>
              <option value="5">5 days</option>
              <option value="6">6 days</option>
              <option value="7">7 days</option>
            </select>
          </span>
        </label>

        {/* Persona */}
        <label className="group flex min-h-[68px] items-center gap-3 rounded-[24px] bg-white/50 px-4 transition-colors duration-300 hover:bg-white/70">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#C85A3F] text-[#F1E8D8]">
            <Sparkles size={17} />
          </span>

          <span className="flex min-w-0 flex-1 flex-col">
            <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#241F1A]/45">
              Your style
            </span>

            <span className="relative">
              <select
                value={persona}
                onChange={(event) => setPersona(event.target.value)}
                className="w-full cursor-pointer appearance-none bg-transparent pr-5 text-sm font-semibold text-[#241F1A] outline-none"
              >
                {personas.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>

              <ChevronDown
                size={15}
                className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-[#241F1A]/45"
              />
            </span>
          </span>
        </label>

        {/* Submit */}
        <button
          type="button"
          className="group flex min-h-[68px] items-center justify-center gap-2 rounded-[24px] bg-[#28483D] px-6 text-sm font-bold text-[#F1E8D8] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#203D34] hover:shadow-[0_12px_28px_rgba(40,72,61,0.25)]"
        >
          <span>Plan it</span>

          <span className="transition-transform duration-300 group-hover:translate-x-1">
            ✈️
          </span>
        </button>
      </div>

      <div className="flex items-center justify-center gap-2 px-3 pb-1 pt-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#241F1A]/40">
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
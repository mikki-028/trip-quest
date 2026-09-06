import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Compass,
  MapPin,
  Trash2,
  Trophy,
} from "lucide-react"
import { useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"

import type { Trip } from "../types/trip"
import { getTripHistory, removeTripFromHistory } from "../utils/tripStorage"

function History() {
  const [trips, setTrips] = useState<Trip[]>([])

  useEffect(() => {
    setTrips(getTripHistory())
  }, [])

  const totalQuestsCompleted = useMemo(
    () =>
      trips.reduce(
        (total, trip) =>
          total + trip.quests.filter((quest) => quest.completed).length,
        0,
      ),
    [trips],
  )

  const totalXp = totalQuestsCompleted * 100

  const handleDelete = (tripId: string) => {
    const confirmed = window.confirm(
      "Delete this adventure from your history?",
    )

    if (!confirmed) return

    removeTripFromHistory(tripId)
    localStorage.removeItem(`trip-quest-${tripId}`)
    setTrips((currentTrips) =>
      currentTrips.filter((trip) => trip.id !== tripId),
    )
  }

  const formatDate = (value: string) => {
    const date = new Date(value)

    if (Number.isNaN(date.getTime())) {
      return "Unknown date"
    }

    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
  }

  return (
    <main className="min-h-screen bg-[#CFC1AA] px-5 py-10 text-[#241F1A] sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10">
          <Link
            to="/"
            className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-[#28483D] transition hover:-translate-x-1"
          >
            <ArrowLeft size={16} />
            Back home
          </Link>

          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#241F1A]/10 bg-[#F1E8D8]/70 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#28483D]">
                <Compass size={14} />
                Your travel journal
              </div>

              <h1 className="font-serif text-5xl leading-none tracking-tight sm:text-6xl">
                Adventure History
              </h1>

              <p className="mt-4 max-w-2xl text-base leading-7 text-[#241F1A]/65">
                Every itinerary you create lives here, along with the quests,
                memories, and little wins collected along the way.
              </p>
            </div>

            {trips.length > 0 && (
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-[#241F1A]/10 bg-[#F1E8D8]/75 px-5 py-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-[#241F1A]/45">
                    Adventures
                  </p>
                  <p className="mt-1 text-2xl font-bold">{trips.length}</p>
                </div>

                <div className="rounded-2xl border border-[#241F1A]/10 bg-[#F1E8D8]/75 px-5 py-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-[#241F1A]/45">
                    XP earned
                  </p>
                  <p className="mt-1 text-2xl font-bold">{totalXp}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {trips.length === 0 ? (
          <section className="rounded-[2rem] border border-[#241F1A]/10 bg-[#F1E8D8]/75 px-6 py-16 text-center shadow-[0_20px_60px_rgba(36,31,26,0.08)] sm:px-10">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#28483D] text-[#F1E8D8]">
              <Compass size={28} />
            </div>

            <h2 className="mt-6 font-serif text-3xl">
              No adventures yet
            </h2>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#241F1A]/60">
              Your first journey will appear here once you create an
              itinerary.
            </p>

            <Link
              to="/"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#28483D] px-6 py-3 text-sm font-bold text-[#F1E8D8] transition hover:-translate-y-0.5"
            >
              Plan your first adventure
            </Link>
          </section>
        ) : (
          <div className="space-y-5">
            {trips.map((trip) => {
              const completedQuests = trip.quests.filter(
                (quest) => quest.completed,
              ).length

              const totalQuests = trip.quests.length

              const progress =
                totalQuests > 0
                  ? Math.round((completedQuests / totalQuests) * 100)
                  : 0

              const xp = completedQuests * 100

              return (
                <article
                  key={trip.id}
                  className="overflow-hidden rounded-[2rem] border border-[#241F1A]/10 bg-[#F1E8D8]/80 shadow-[0_18px_50px_rgba(36,31,26,0.07)]"
                >
                  <div className="p-6 sm:p-8">
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#241F1A]/45">
                          <span className="inline-flex items-center gap-1.5">
                            <CalendarDays size={14} />
                            {formatDate(trip.createdAt)}
                          </span>

                          <span>•</span>

                          <span>{trip.persona}</span>
                        </div>

                        <h2 className="mt-3 font-serif text-4xl leading-none sm:text-5xl">
                          {trip.destination}
                        </h2>

                        <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-[#241F1A]/60">
                          <span className="inline-flex items-center gap-1.5">
                            <MapPin size={15} />
                            {trip.country}
                          </span>

                          <span className="inline-flex items-center gap-1.5">
                            <Clock3 size={15} />
                            {trip.duration}{" "}
                            {trip.duration === 1 ? "day" : "days"}
                          </span>

                          <span className="inline-flex items-center gap-1.5">
                            <Trophy size={15} />
                            {xp} XP
                          </span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleDelete(trip.id)}
                        className="inline-flex w-fit items-center gap-2 rounded-full border border-[#241F1A]/10 px-4 py-2 text-sm font-semibold text-[#241F1A]/55 transition hover:border-[#C85A3F]/30 hover:bg-[#C85A3F]/10 hover:text-[#C85A3F]"
                      >
                        <Trash2 size={15} />
                        Delete
                      </button>
                    </div>

                    <div className="mt-8 grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
                      <div>
                        <div className="mb-2 flex items-center justify-between text-xs font-bold uppercase tracking-wider">
                          <span className="text-[#241F1A]/45">
                            Quest progress
                          </span>
                          <span className="text-[#28483D]">
                            {completedQuests}/{totalQuests}
                          </span>
                        </div>

                        <div className="h-3 overflow-hidden rounded-full bg-[#241F1A]/8">
                          <div
                            className="h-full rounded-full bg-[#28483D] transition-all duration-500"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      </div>

                      <div className="flex items-center gap-2 rounded-2xl border border-[#241F1A]/8 bg-[#E8DDCC]/65 px-4 py-3">
                        <CheckCircle2
                          size={18}
                          className="text-[#28483D]"
                        />

                        <div>
                          <p className="text-sm font-bold">
                            {progress}% complete
                          </p>
                          <p className="text-xs text-[#241F1A]/50">
                            {completedQuests} quests completed
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-7 flex flex-wrap gap-3">
                      <Link
                        to={`/trip/${trip.id}`}
                        className="inline-flex items-center gap-2 rounded-full bg-[#28483D] px-6 py-3 text-sm font-bold text-[#F1E8D8] transition hover:-translate-y-0.5"
                      >
                        Open adventure
                      </Link>

                      <div className="inline-flex items-center gap-2 rounded-full border border-[#241F1A]/10 bg-[#E8DDCC]/60 px-5 py-3 text-sm font-semibold text-[#241F1A]/65">
                        <Trophy size={15} />
                        {completedQuests}{" "}
                        {completedQuests === 1 ? "quest" : "quests"} conquered
                      </div>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        )}
      </div>
    </main>
  )
}

export default History
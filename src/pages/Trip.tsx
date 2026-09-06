import {
  ArrowLeft,
  CalendarDays,
  Car,
  Check,
  CloudSun,
  ExternalLink,
  MapPin,
  Sparkles,
} from "lucide-react"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"

import PhotostripGenerator from "../components/photostrip/PhotostripGenerator"
import PhotoProof from "../components/quests/PhotoProof"
import QuestCelebration from "../components/quests/QuestCelebration"
import ShareTrip from "../components/quests/ShareTrip"
import StickerCollection from "../components/quests/StickerCollection"
import type { Trip as TripData } from "../types/trip"
import { getTripFromSupabase } from "../services/trips"
import { saveTripToSupabase } from "../services/trips"
import { saveTripToHistory } from "../utils/tripStorage"

function Trip() {
  const { tripId } = useParams()

  const [currentTrip, setCurrentTrip] =
    useState<TripData | null>(null)

  const [isLoading, setIsLoading] = useState(true)

  const [loadError, setLoadError] =
    useState("")

  const [celebrationSticker, setCelebrationSticker] =
    useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    async function loadTrip() {
      if (!tripId) {
        if (isMounted) {
          setLoadError(
            "This trip link is invalid.",
          )
          setIsLoading(false)
        }

        return
      }

      setIsLoading(true)
      setLoadError("")

      try {
        // First try the local copy.
        const localTrip = localStorage.getItem(
          `trip-quest-${tripId}`,
        )

        if (localTrip) {
          const parsedTrip =
            JSON.parse(localTrip) as TripData

          if (isMounted) {
            setCurrentTrip(parsedTrip)
          }

          return
        }

        // No local copy? Fetch the shared trip from Supabase.
        const remoteTrip =
          await getTripFromSupabase(tripId)

        if (!remoteTrip) {
          if (isMounted) {
            setCurrentTrip(null)
            setLoadError(
              "This adventure doesn't exist yet.",
            )
          }

          return
        }

        // Cache the shared trip locally for future visits.
        localStorage.setItem(
          `trip-quest-${remoteTrip.id}`,
          JSON.stringify(remoteTrip),
        )

        saveTripToHistory(remoteTrip)

        if (isMounted) {
          setCurrentTrip(remoteTrip)
        }
      } catch (error) {
        if (!isMounted) return

        setCurrentTrip(null)

        setLoadError(
          error instanceof Error
            ? error.message
            : "Unable to load this adventure.",
        )
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadTrip()

    return () => {
      isMounted = false
    }
  }, [tripId])

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#CFC1AA] px-6 text-[#241F1A]">
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#28483D] text-2xl">
            🧭
          </div>

          <p className="mt-5 text-xs font-bold uppercase tracking-[0.2em] text-[#C85A3F]">
            Loading adventure
          </p>

          <h1 className="mt-2 text-3xl font-black">
            Getting your trip ready...
          </h1>
        </div>
      </main>
    )
  }

  if (!currentTrip) {
    return (
      <main className="min-h-screen bg-[#CFC1AA] px-6 py-24 text-[#241F1A]">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#C85A3F]">
            Trip not found
          </p>

          <h1 className="mt-4 text-5xl font-black tracking-tight">
            {loadError ||
              "This adventure doesn't exist yet."}
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

  function persistTrip(updatedTrip: TripData) {
    setCurrentTrip(updatedTrip)

    localStorage.setItem(
      `trip-quest-${updatedTrip.id}`,
      JSON.stringify(updatedTrip),
    )

    saveTripToHistory(updatedTrip)

    void saveTripToSupabase(updatedTrip).catch((error) => {
      console.error("Unable to sync trip update to Supabase:", error)
    })
  }

  function updateQuestPhoto(
    questId: string,
    photo: string | undefined,
  ) {
    if (!currentTrip) return

    const updatedTrip: TripData = {
      ...currentTrip,
      quests: currentTrip.quests.map((quest) =>
        quest.id === questId
          ? {
              ...quest,
              photo,
            }
          : quest,
      ),
    }

    persistTrip(updatedTrip)
  }

  function completeQuest(questId: string) {
    if (!currentTrip) return

    const quest = currentTrip.quests.find(
      (item) => item.id === questId,
    )

    if (!quest) return

    if (!quest.completed && !quest.photo) {
      return
    }

    const isCompleting = !quest.completed

    const updatedTrip: TripData = {
      ...currentTrip,
      quests: currentTrip.quests.map((item) =>
        item.id === questId
          ? {
              ...item,
              completed: !item.completed,
            }
          : item,
      ),
    }

    persistTrip(updatedTrip)

    if (isCompleting) {
      setCelebrationSticker(quest.sticker)
    }
  }

  const completedQuests = currentTrip.quests.filter(
    (quest) => quest.completed,
  ).length

  const totalQuests = currentTrip.quests.length

  const xp = completedQuests * 100

  const progress =
    totalQuests > 0
      ? Math.round(
          (completedQuests / totalQuests) * 100,
        )
      : 0

  const firstDayDate =
    currentTrip.days[0]?.date ??
    new Date().toISOString().split("T")[0]

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
                {currentTrip.destination}
              </h1>

              <p className="mt-3 text-lg text-[#241F1A]/60">
                {currentTrip.country} ·{" "}
                {currentTrip.duration}{" "}
                {currentTrip.duration === 1
                  ? "day"
                  : "days"}{" "}
                · {currentTrip.persona}
              </p>

              <div className="mt-5">
                <ShareTrip
                  destination={currentTrip.destination}
                />
              </div>
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
                    currentTrip.weather.currentTemperature,
                  )}
                  °C
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Itinerary */}
        <div className="mt-8 space-y-8">
          {currentTrip.days.map((day) => (
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
                {day.stops.map((stop, index) => {
                  const previousStop =
                    index > 0
                      ? day.stops[index - 1]
                      : null

                  const routeUrl = previousStop
                    ? `https://www.google.com/maps/dir/?api=1&origin=${previousStop.place.coordinates.latitude},${previousStop.place.coordinates.longitude}&destination=${stop.place.coordinates.latitude},${stop.place.coordinates.longitude}`
                    : null

                  return (
                    <div key={stop.place.id}>
                      <div className="relative pl-10">
                        <div className="absolute left-0 top-1 flex h-7 w-7 items-center justify-center rounded-full bg-[#28483D] text-xs font-black text-[#F1E8D8]">
                          {index + 1}
                        </div>

                        {index <
                          day.stops.length - 1 && (
                          <div className="absolute bottom-[-24px] left-[13px] top-9 w-px bg-[#241F1A]/15" />
                        )}

                        <div className="grid gap-4 sm:grid-cols-[180px_1fr]">
                          <div>
                            <p className="text-sm font-black">
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

                      {index <
                        day.stops.length - 1 && (
                        <div className="ml-10 flex flex-col gap-3 py-5 sm:flex-row sm:items-center">
                          <div className="hidden h-px flex-1 bg-[#241F1A]/10 sm:block" />

                          <div className="flex flex-wrap items-center justify-center gap-2">
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
                                  {
                                    stop.distanceFromPreviousKm
                                  }{" "}
                                  km

                                  <span className="text-[#241F1A]/25">
                                    ·
                                  </span>

                                  {
                                    stop.travelMinutesFromPrevious
                                  }{" "}
                                  min
                                </>
                              ) : (
                                "Route unavailable"
                              )}
                            </div>

                            {routeUrl && (
                              <a
                                href={routeUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 rounded-full bg-[#28483D] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[#F1E8D8] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#203D34]"
                              >
                                <ExternalLink size={12} />
                                View route
                              </a>
                            )}
                          </div>

                          <div className="hidden h-px flex-1 bg-[#241F1A]/10 sm:block" />
                        </div>
                      )}
                    </div>
                  )
                })}
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

        {/* Trip Quest */}
        <section className="mt-8 overflow-hidden rounded-[32px] bg-[#28483D] p-6 text-[#F1E8D8] shadow-[0_20px_60px_rgba(36,31,26,0.12)] sm:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="flex items-center gap-2 text-[#D5A13A]">
                <Sparkles size={18} />

                <p className="text-xs font-bold uppercase tracking-[0.2em]">
                  Trip Quest
                </p>
              </div>

              <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
                Make the trip
                <br />
                worth remembering.
              </h2>

              <p className="mt-4 max-w-xl text-sm leading-6 text-[#F1E8D8]/65">
                Complete challenges along the way,
                collect stickers, and turn your
                itinerary into a story.
              </p>
            </div>

            <div className="min-w-[220px] rounded-[24px] bg-[#F1E8D8]/10 p-5">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#F1E8D8]/45">
                    Progress
                  </p>

                  <p className="mt-1 text-3xl font-black">
                    {completedQuests}/{totalQuests}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#D5A13A]">
                    XP
                  </p>

                  <p className="mt-1 text-xl font-black">
                    {xp}
                  </p>
                </div>
              </div>

              <div className="mt-4 h-2 overflow-hidden rounded-full bg-[#F1E8D8]/10">
                <div
                  className="h-full rounded-full bg-[#D5A13A] transition-all duration-500"
                  style={{
                    width: `${progress}%`,
                  }}
                />
              </div>

              <p className="mt-2 text-right text-[10px] font-bold uppercase tracking-[0.12em] text-[#F1E8D8]/40">
                {progress}% complete
              </p>
            </div>
          </div>

          {totalQuests > 0 && (
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {currentTrip.quests.map((quest) => (
                <article
                  key={quest.id}
                  className={`rounded-[24px] border p-5 transition-all duration-300 ${
                    quest.completed
                      ? "border-[#D5A13A]/40 bg-[#D5A13A]/10"
                      : "border-[#F1E8D8]/10 bg-[#F1E8D8]/5 hover:bg-[#F1E8D8]/10"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#F1E8D8]/10 text-2xl">
                      {quest.sticker}
                    </div>

                    <button
                      type="button"
                      disabled={
                        !quest.completed &&
                        !quest.photo
                      }
                      onClick={() =>
                        completeQuest(quest.id)
                      }
                      className={`inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] transition-all duration-200 ${
                        quest.completed
                          ? "bg-[#D5A13A] text-[#241F1A] hover:-translate-y-0.5"
                          : quest.photo
                            ? "bg-[#F1E8D8] text-[#28483D] hover:-translate-y-0.5"
                            : "cursor-not-allowed bg-[#F1E8D8]/20 text-[#F1E8D8]/35"
                      }`}
                    >
                      {quest.completed ? (
                        <>
                          <Check size={13} />
                          Done
                        </>
                      ) : quest.photo ? (
                        "Complete"
                      ) : (
                        "Add photo first"
                      )}
                    </button>
                  </div>

                  <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.16em] text-[#D5A13A]">
                    +100 XP
                  </p>

                  <h3 className="mt-2 text-xl font-black">
                    {quest.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-[#F1E8D8]/60">
                    {quest.description}
                  </p>

                  <PhotoProof
                    photo={quest.photo}
                    onPhotoChange={(photo) =>
                      updateQuestPhoto(
                        quest.id,
                        photo,
                      )
                    }
                  />

                  {quest.completed && (
                    <div className="mt-4 flex items-center gap-2 rounded-[16px] bg-[#D5A13A]/10 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.12em] text-[#D5A13A]">
                      <Check size={12} />
                      Quest completed · sticker earned
                    </div>
                  )}
                </article>
              ))}
            </div>
          )}
        </section>

        {/* Sticker Collection */}
        <StickerCollection
          quests={currentTrip.quests}
        />

        {/* Travel Memory */}
        <PhotostripGenerator
          destination={currentTrip.destination}
          date={firstDayDate}
          quests={currentTrip.quests}
        />
      </div>

      {celebrationSticker && (
        <QuestCelebration
          sticker={celebrationSticker}
          onComplete={() =>
            setCelebrationSticker(null)
          }
        />
      )}
    </main>
  )
}

export default Trip
import type { ItineraryDay, Quest } from "../types/trip"

const QUEST_TEMPLATES = [
  {
    title: "Capture the moment",
    description: "Take a memorable photo at this stop.",
    sticker: "📸",
  },
  {
    title: "Spot something unique",
    description: "Find one detail here that you wouldn't see anywhere else.",
    sticker: "🔎",
  },
  {
    title: "Make it yours",
    description: "Find your favorite detail of this place and remember why.",
    sticker: "✨",
  },
  {
    title: "Traveler's challenge",
    description: "Explore this place and capture something worth remembering.",
    sticker: "🧭",
  },
]

export function generateQuests(
  days: ItineraryDay[],
): Quest[] {
  const quests: Quest[] = []

  days.forEach((day) => {
    day.stops.forEach((stop, index) => {
      const template =
        QUEST_TEMPLATES[
          (day.day + index) %
            QUEST_TEMPLATES.length
        ]

      quests.push({
        id: `quest-${day.day}-${stop.place.id}`,
        title: template.title,
        description:
          stop.place.photoChallenge ||
          template.description,
        placeId: stop.place.id,
        sticker:
          stop.place.sticker ||
          template.sticker,
        completed: false,
      })
    })
  })

  return quests
}
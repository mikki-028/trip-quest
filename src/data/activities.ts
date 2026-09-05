import type { Place } from "../types/place"

export const activities: Place[] = [
  // ─────────────────────────────────────
  // PARIS
  // ─────────────────────────────────────

  {
    id: "paris-eiffel-tower",
    name: "Eiffel Tower",
    city: "Paris",
    country: "France",
    category: "landmark",
    description:
      "Paris's iconic landmark with panoramic city views and unforgettable photo opportunities.",
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=85",
    coordinates: {
      latitude: 48.8584,
      longitude: 2.2945,
    },
    durationMinutes: 120,
    costLevel: 3,
    suitableFor: ["Backpacker", "Luxury", "Family", "Couple", "Explorer"],
    weatherTypes: ["sunny", "cloudy", "any"],
    mustDo: [
      "Take the classic photo from Trocadéro.",
      "See the tower sparkle after sunset.",
    ],
    localTip:
      "Go earlier in the morning for a calmer experience and better photos.",
    photoChallenge:
      "Capture the Eiffel Tower from a creative angle with yourself in the frame.",
    sticker: "🗼",
  },

  {
    id: "paris-louvre",
    name: "Louvre Museum",
    city: "Paris",
    country: "France",
    category: "museum",
    description:
      "A world-famous museum filled with art, history, and architectural details worth exploring.",
    image:
      "https://images.unsplash.com/photo-1564399579883-451a5d44ec08?auto=format&fit=crop&w=1200&q=85",
    coordinates: {
      latitude: 48.8606,
      longitude: 2.3376,
    },
    durationMinutes: 180,
    costLevel: 3,
    suitableFor: ["Backpacker", "Luxury", "Family", "Couple", "Explorer"],
    weatherTypes: ["rain", "cloudy", "cold", "any"],
    mustDo: [
      "See the glass pyramid.",
      "Choose a few galleries instead of trying to see everything.",
    ],
    localTip:
      "Plan your must-see galleries before arriving because the museum is enormous.",
    photoChallenge:
      "Get a reflection shot with the Louvre pyramid.",
    sticker: "🎨",
  },

  {
    id: "paris-le-marais",
    name: "Le Marais",
    city: "Paris",
    country: "France",
    category: "culture",
    description:
      "A lively historic district known for charming streets, cafés, boutiques, and local food.",
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80",
    coordinates: {
      latitude: 48.8566,
      longitude: 2.3522,
    },
    durationMinutes: 120,
    costLevel: 2,
    suitableFor: ["Backpacker", "Luxury", "Couple", "Explorer"],
    weatherTypes: ["sunny", "cloudy", "any"],
    mustDo: [
      "Walk the smaller side streets.",
      "Try a local pastry or crêpe.",
    ],
    localTip:
      "Wander without a strict route and explore the smaller streets around the main attractions.",
    photoChallenge:
      "Find a colorful storefront and capture your favorite street scene.",
    sticker: "🥐",
  },

  {
    id: "paris-luxembourg-gardens",
    name: "Luxembourg Gardens",
    city: "Paris",
    country: "France",
    category: "nature",
    description:
      "A peaceful Parisian garden perfect for a relaxed walk, picnic, or slow afternoon.",
    image:
      "https://images.unsplash.com/photo-1508057198894-247b23fe5ade?auto=format&fit=crop&w=1200&q=85",
    coordinates: {
      latitude: 48.8462,
      longitude: 2.3372,
    },
    durationMinutes: 90,
    costLevel: 1,
    suitableFor: ["Backpacker", "Family", "Couple", "Explorer"],
    weatherTypes: ["sunny", "cloudy", "hot"],
    mustDo: [
      "Take a relaxed walk through the gardens.",
      "Find a quiet place to sit and people-watch.",
    ],
    localTip:
      "Pair the gardens with nearby cafés for a slower, less rushed afternoon.",
    photoChallenge:
      "Capture a peaceful garden scene with the architecture in the background.",
    sticker: "🌳",
  },

  // ─────────────────────────────────────
  // TOKYO
  // ─────────────────────────────────────

  {
    id: "tokyo-sensoji",
    name: "Senso-ji Temple",
    city: "Tokyo",
    country: "Japan",
    category: "culture",
    description:
      "One of Tokyo's best-known temples, surrounded by lively streets and traditional shops.",
    image:
      "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&w=1200&q=85",
    coordinates: {
      latitude: 35.7148,
      longitude: 139.7967,
    },
    durationMinutes: 120,
    costLevel: 1,
    suitableFor: ["Backpacker", "Family", "Couple", "Explorer"],
    weatherTypes: ["sunny", "cloudy", "any"],
    mustDo: [
      "Walk through Nakamise-dori.",
      "See the temple gate and main hall.",
    ],
    localTip:
      "Visit earlier in the day if you want a calmer experience around the temple grounds.",
    photoChallenge:
      "Capture the lantern and temple entrance symmetrically.",
    sticker: "⛩️",
  },

  {
    id: "tokyo-shibuya",
    name: "Shibuya Crossing",
    city: "Tokyo",
    country: "Japan",
    category: "landmark",
    description:
      "Tokyo's famous crossing surrounded by neon signs, shops, cafés, and nonstop city energy.",
    image:
      "https://images.unsplash.com/photo-1513407030348-c983a97b98d8?auto=format&fit=crop&w=1200&q=85",
    coordinates: {
      latitude: 35.6595,
      longitude: 139.7005,
    },
    durationMinutes: 90,
    costLevel: 2,
    suitableFor: ["Backpacker", "Luxury", "Couple", "Explorer"],
    weatherTypes: ["sunny", "cloudy", "rain", "any"],
    mustDo: [
      "Watch the crossing from above.",
      "Explore the surrounding streets after dark.",
    ],
    localTip:
      "Combine the crossing with nearby cafés or shopping instead of visiting it as a standalone stop.",
    photoChallenge:
      "Capture the crossing from a high viewpoint.",
    sticker: "🌃",
  },

  {
    id: "tokyo-teamlab",
    name: "teamLab Borderless",
    city: "Tokyo",
    country: "Japan",
    category: "entertainment",
    description:
      "An immersive digital art experience filled with interactive rooms and changing light installations.",
    image:
      "https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=1200&q=85",
    coordinates: {
      latitude: 35.6261,
      longitude: 139.7834,
    },
    durationMinutes: 150,
    costLevel: 3,
    suitableFor: ["Family", "Couple", "Luxury", "Explorer"],
    weatherTypes: ["rain", "cloudy", "cold", "any"],
    mustDo: [
      "Explore multiple rooms rather than rushing through.",
      "Spend time in the more immersive installations.",
    ],
    localTip:
      "This is an excellent rainy-day activity.",
    photoChallenge:
      "Capture a colorful light installation without using flash.",
    sticker: "✨",
  },

  // ─────────────────────────────────────
  // BALI
  // ─────────────────────────────────────

  {
    id: "bali-tegalalang",
    name: "Tegallalang Rice Terraces",
    city: "Ubud",
    country: "Indonesia",
    category: "nature",
    description:
      "Layered rice terraces surrounded by tropical greenery and scenic walking paths.",
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=85",
    coordinates: {
      latitude: -8.4312,
      longitude: 115.2792,
    },
    durationMinutes: 120,
    costLevel: 2,
    suitableFor: ["Backpacker", "Couple", "Explorer", "Luxury"],
    weatherTypes: ["sunny", "cloudy", "any"],
    mustDo: [
      "Walk part of the terraces.",
      "Stop at a viewpoint overlooking the valley.",
    ],
    localTip:
      "Morning light is usually more comfortable for walking and photography.",
    photoChallenge:
      "Capture the layered terraces from a viewpoint.",
    sticker: "🌿",
  },

  {
    id: "bali-ubud-market",
    name: "Ubud Art Market",
    city: "Ubud",
    country: "Indonesia",
    category: "shopping",
    description:
      "A colorful market filled with handmade crafts, textiles, souvenirs, and local artwork.",
    image:
      "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1200&q=85",
    coordinates: {
      latitude: -8.5069,
      longitude: 115.2625,
    },
    durationMinutes: 90,
    costLevel: 1,
    suitableFor: ["Backpacker", "Family", "Couple", "Explorer"],
    weatherTypes: ["sunny", "cloudy", "rain", "any"],
    mustDo: [
      "Browse local crafts.",
      "Look for a small handmade souvenir.",
    ],
    localTip:
      "Compare a few stalls before buying and enjoy the market rather than rushing through it.",
    photoChallenge:
      "Capture the colors and textures of the market.",
    sticker: "🛍️",
  },
]
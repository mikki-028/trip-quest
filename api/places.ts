const OVERPASS_URLS = [
  "https://overpass.private.coffee/api/interpreter",
  "https://overpass-api.de/api/interpreter",
  "https://overpass.openstreetmap.fr/api/interpreter",
]

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const {
      latitude,
      longitude,
      radiusMeters = 8000,
    } = body

    if (
      typeof latitude !== "number" ||
      typeof longitude !== "number"
    ) {
      return Response.json(
        { error: "Invalid coordinates." },
        { status: 400 },
      )
    }

    const query = `
      [out:json][timeout:25];

      (
        nwr["tourism"="attraction"](around:${radiusMeters},${latitude},${longitude});
        nwr["tourism"="museum"](around:${radiusMeters},${latitude},${longitude});
        nwr["tourism"="gallery"](around:${radiusMeters},${latitude},${longitude});
        nwr["tourism"="viewpoint"](around:${radiusMeters},${latitude},${longitude});
        nwr["tourism"="artwork"](around:${radiusMeters},${latitude},${longitude});

        nwr["historic"="monument"](around:${radiusMeters},${latitude},${longitude});
        nwr["historic"="castle"](around:${radiusMeters},${latitude},${longitude});
        nwr["historic"="ruins"](around:${radiusMeters},${latitude},${longitude});
        nwr["historic"="memorial"](around:${radiusMeters},${latitude},${longitude});

        nwr["leisure"="park"](around:${radiusMeters},${latitude},${longitude});
        nwr["leisure"="garden"](around:${radiusMeters},${latitude},${longitude});

        nwr["tourism"="theme_park"](around:${radiusMeters},${latitude},${longitude});
        nwr["tourism"="zoo"](around:${radiusMeters},${latitude},${longitude});
      );

      out center tags;
    `

    let lastError = "Unknown Overpass error."

    for (const url of OVERPASS_URLS) {
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "User-Agent":
              "TripQuest/1.0 (travel planner hackathon project)",
          },
          body: new URLSearchParams({
            data: query,
          }),
        })

        if (!response.ok) {
          lastError = `${url} returned HTTP ${response.status}`
          continue
        }

        const data = await response.json()

        return Response.json(data)
      } catch (error) {
        lastError =
          error instanceof Error
            ? error.message
            : "Unknown network error."
      }
    }

    console.error("All Overpass endpoints failed:", lastError)

    return Response.json(
      {
        error:
          "Unable to discover places right now.",
        details: lastError,
      },
      { status: 502 },
    )
  } catch (error) {
    console.error("Places API error:", error)

    return Response.json(
      { error: "Unable to discover places." },
      { status: 500 },
    )
  }
}
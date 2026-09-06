const OVERPASS_URLS = [
  "https://overpass.private.coffee/api/interpreter",
  "https://overpass-api.de/api/interpreter",
  "https://overpass.openstreetmap.fr/api/interpreter",
]

function jsonResponse(
  data: unknown,
  status = 200,
) {
  return new Response(
    JSON.stringify(data),
    {
      status,
      headers: {
        "Content-Type": "application/json",
      },
    },
  )
}

export async function POST(request: Request) {
  try {
    // Read the raw body first instead of relying on request.json().
    const rawBody = await request.text()

    console.log(
      "[TripQuest] Incoming places request:",
      rawBody,
    )

    if (!rawBody) {
      return jsonResponse(
        { error: "Request body is empty." },
        400,
      )
    }

    let body: {
      latitude?: unknown
      longitude?: unknown
      radiusMeters?: unknown
    }

    try {
      body = JSON.parse(rawBody)
    } catch {
      return jsonResponse(
        {
          error: "Request body contains invalid JSON.",
        },
        400,
      )
    }

    const latitude = Number(body.latitude)
    const longitude = Number(body.longitude)
    const radiusMeters = Number(
      body.radiusMeters ?? 8000,
    )

    if (
      !Number.isFinite(latitude) ||
      !Number.isFinite(longitude) ||
      !Number.isFinite(radiusMeters)
    ) {
      return jsonResponse(
        {
          error: "Invalid coordinates.",
          received: body,
        },
        400,
      )
    }

    const query = `
      [out:json][timeout:20];

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

    let lastError =
      "All Overpass providers failed."

    for (const url of OVERPASS_URLS) {
      try {
        console.log(
          `[TripQuest] Trying Overpass: ${url}`,
        )

        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type":
              "application/x-www-form-urlencoded",
            Accept: "application/json",
            "User-Agent":
              "TripQuest/1.0 (travel planner hackathon project)",
          },
          body: new URLSearchParams({
            data: query,
          }).toString(),
        })

        const responseText = await response.text()

        console.log(
          `[TripQuest] Overpass ${response.status}:`,
          responseText.slice(0, 500),
        )

        if (!response.ok) {
          lastError =
            `${url} returned HTTP ${response.status}`
          continue
        }

        let data: unknown

        try {
          data = JSON.parse(responseText)
        } catch {
          lastError =
            `${url} returned invalid JSON`
          continue
        }

        return jsonResponse(data, 200)
      } catch (error) {
        lastError =
          error instanceof Error
            ? error.message
            : "Unknown network error."

        console.error(
          `[TripQuest] Overpass error for ${url}:`,
          error,
        )
      }
    }

    return jsonResponse(
      {
        error:
          "Unable to discover places right now.",
        details: lastError,
      },
      502,
    )
  } catch (error) {
    console.error(
      "[TripQuest] Places function crashed:",
      error,
    )

    return jsonResponse(
      {
        error: "Unable to discover places.",
        details:
          error instanceof Error
            ? error.message
            : String(error),
      },
      500,
    )
  }
}
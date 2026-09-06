import Navbar from "../components/navigation/Navbar"
import DriftWall from "../components/effects/DriftWall"
import CursorGrid from "../components/effects/CursorGrid"
import SplashCursor from "../components/effects/SplashCursor"
import TripPlanner from "../components/planner/TripPlanner"
import MagneticButton from "../components/ui/MagneticButton"
import DomeGallery from "../components/gallery/DomeGallery"

function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#E8C8B5] text-[#241F1A]">
      <CursorGrid />
      <SplashCursor />

      <Navbar />

      {/* Hero */}
      <section className="relative min-h-screen">
        <DriftWall />

        <div className="relative z-10 flex min-h-screen items-center justify-center px-6 pt-24 pb-16">
          <div className="w-full max-w-5xl text-center">
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.28em] text-[#28483D]">
              Plan · Explore · Play · Remember
            </p>

            <h1 className="text-balance tracking-[-0.045em]">
              <span className="block text-5xl font-black leading-[0.95] sm:text-6xl lg:text-7xl">
                Your next
              </span>

              <span
                className="mt-1 block text-6xl font-bold leading-[0.9] text-[#C85A3F] sm:text-7xl lg:text-8xl"
                style={{
                  fontFamily:
                    "Georgia, Cambria, 'Times New Roman', serif",
                  fontStyle: "italic",
                }}
              >
                adventure
              </span>

              <span className="block text-5xl font-black leading-[0.95] sm:text-6xl lg:text-7xl">
                starts here.
              </span>
            </h1>

            <p className="mx-auto mt-7 max-w-2xl text-base leading-7 text-[#241F1A]/70 sm:text-lg">
              Build a trip around your travel style, the local weather, and
              the experiences you don't want to miss.
            </p>

            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <MagneticButton
                href="#planner"
                className="rounded-full bg-[#28483D] px-7 py-3.5 text-sm font-bold text-[#F1E8D8] shadow-[0_12px_30px_rgba(40,72,61,0.2)]"
              >
                Start My Quest ✈️
              </MagneticButton>

              <MagneticButton
                href="#explore"
                className="rounded-full border border-[#241F1A]/15 bg-[#F1E8D8]/70 px-7 py-3.5 text-sm font-bold text-[#241F1A] backdrop-blur-sm hover:bg-[#F1E8D8]"
              >
                Explore destinations
              </MagneticButton>
            </div>

            <TripPlanner />

            <div className="mt-8 flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-[#241F1A]/45">
              <span className="h-px w-8 bg-[#241F1A]/25" />
              Scroll to explore
              <span className="h-px w-8 bg-[#241F1A]/25" />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section
        id="how-it-works"
        className="relative overflow-hidden bg-[#B8CBBB] px-6 py-24 text-[#241F1A] sm:py-28"
      >
        {/* Soft atmospheric shapes */}
        <div className="pointer-events-none absolute -right-24 top-20 h-72 w-72 rounded-full bg-[#DFA7AA]/25 blur-3xl" />
        <div className="pointer-events-none absolute -left-28 bottom-0 h-80 w-80 rounded-full bg-[#D5A13A]/10 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-7xl">
          {/* Intro */}
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#28483D]">
                How it works
              </p>

              <h2
                className="mt-5 max-w-2xl text-4xl font-normal leading-[1.02] tracking-[-0.025em] sm:text-5xl lg:text-6xl"
                style={{
                  fontFamily:
                    "Georgia, Cambria, 'Times New Roman', serif",
                  fontStyle: "italic",
                }}
              >
                From destination
                <br />
                to something
                <br />
                worth remembering.
              </h2>
            </div>

            <div className="lg:pb-2 lg:pl-10">
              <p className="max-w-xl text-base leading-7 text-[#241F1A]/65 sm:text-lg">
                Trip Quest brings together the practical parts of planning
                with the fun parts of travelling — so your itinerary feels
                more like a companion than a checklist.
              </p>
            </div>
          </div>

          {/* Glass manual */}
          <div className="mt-14 overflow-hidden rounded-[36px] border border-white/35 bg-[#F7EFE6]/45 shadow-[0_30px_90px_rgba(36,31,26,0.10)] backdrop-blur-2xl">
            <div className="grid lg:grid-cols-[0.72fr_1.28fr]">
              {/* Story side */}
              <div className="relative min-h-[410px] overflow-hidden border-b border-[#241F1A]/10 p-8 sm:p-10 lg:border-b-0 lg:border-r">
                <div className="absolute -right-16 -top-16 h-52 w-52 rounded-full border border-[#DFA7AA]/45 bg-[#DFA7AA]/25" />

                <div className="absolute left-12 top-32 h-24 w-24 rounded-full border border-[#D5A13A]/35 bg-[#D5A13A]/10" />

                <div className="relative flex h-full flex-col justify-between">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#C85A3F]">
                      The Trip Quest way
                    </p>

                    <p
                      className="mt-8 max-w-sm text-4xl font-normal leading-[1.08] text-[#241F1A] sm:text-5xl"
                      style={{
                        fontFamily:
                          "Georgia, Cambria, 'Times New Roman', serif",
                        fontStyle: "italic",
                      }}
                    >
                      A trip should feel like a story, not a spreadsheet.
                    </p>
                  </div>

                  <div className="mt-14">
                    <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.18em] text-[#241F1A]/45">
                      <span className="h-px w-10 bg-[#241F1A]/20" />
                      Plan
                    </div>

                    <div className="mt-2 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.18em] text-[#241F1A]/45">
                      <span className="h-px w-20 bg-[#241F1A]/20" />
                      Adapt
                    </div>

                    <div className="mt-2 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.18em] text-[#241F1A]/45">
                      <span className="h-px w-32 bg-[#241F1A]/20" />
                      Explore
                    </div>

                    <div className="mt-2 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.18em] text-[#28483D]">
                      <span className="h-px w-44 bg-[#28483D]/45" />
                      Remember
                    </div>
                  </div>
                </div>
              </div>

              {/* Steps */}
              <div className="p-6 sm:p-8 lg:p-10">
                <div className="divide-y divide-[#241F1A]/10">
                  <div className="grid gap-4 py-7 first:pt-2 sm:grid-cols-[58px_1fr]">
                    <span
                      className="text-4xl font-normal text-[#C85A3F]/55"
                      style={{
                        fontFamily:
                          "Georgia, Cambria, 'Times New Roman', serif",
                        fontStyle: "italic",
                      }}
                    >
                      01
                    </span>

                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#28483D]">
                        Plan
                      </p>

                      <h3 className="mt-2 text-xl font-semibold tracking-[-0.015em]">
                        Start with the way you travel.
                      </h3>

                      <p className="mt-2 max-w-xl text-sm leading-6 text-[#241F1A]/60">
                        Choose your destination, trip length, and travel style
                        — from Backpacker and Explorer to Couple, Family, or
                        Luxury.
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-4 py-7 sm:grid-cols-[58px_1fr]">
                    <span
                      className="text-4xl font-normal text-[#C85A3F]/55"
                      style={{
                        fontFamily:
                          "Georgia, Cambria, 'Times New Roman', serif",
                        fontStyle: "italic",
                      }}
                    >
                      02
                    </span>

                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#28483D]">
                        Adapt
                      </p>

                      <h3 className="mt-2 text-xl font-semibold tracking-[-0.015em]">
                        Let the weather shape the plan.
                      </h3>

                      <p className="mt-2 max-w-xl text-sm leading-6 text-[#241F1A]/60">
                        Real local weather helps influence which experiences
                        make the most sense for the conditions of your trip.
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-4 py-7 sm:grid-cols-[58px_1fr]">
                    <span
                      className="text-4xl font-normal text-[#C85A3F]/55"
                      style={{
                        fontFamily:
                          "Georgia, Cambria, 'Times New Roman', serif",
                        fontStyle: "italic",
                      }}
                    >
                      03
                    </span>

                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#28483D]">
                        Explore
                      </p>

                      <h3 className="mt-2 text-xl font-semibold tracking-[-0.015em]">
                        Discover places worth your time.
                      </h3>

                      <p className="mt-2 max-w-xl text-sm leading-6 text-[#241F1A]/60">
                        Real places, landmarks, food spots, culture, nature,
                        and more become part of a practical day-by-day plan.
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-4 py-7 pb-2 sm:grid-cols-[58px_1fr]">
                    <span
                      className="text-4xl font-normal text-[#C85A3F]/55"
                      style={{
                        fontFamily:
                          "Georgia, Cambria, 'Times New Roman', serif",
                        fontStyle: "italic",
                      }}
                    >
                      04
                    </span>

                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#28483D]">
                        Remember
                      </p>

                      <h3 className="mt-2 text-xl font-semibold tracking-[-0.015em]">
                        Turn moments into memories.
                      </h3>

                      <p className="mt-2 max-w-xl text-sm leading-6 text-[#241F1A]/60">
                        Complete quests, capture photos, collect stickers, and
                        turn the moments from your trip into something worth
                        keeping.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Flow */}
            <div className="border-t border-[#241F1A]/10 bg-[#F7EFE6]/30 px-6 py-5 sm:px-10">
              <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[9px] font-bold uppercase tracking-[0.18em] text-[#241F1A]/45 sm:justify-start">
                <span>Weather</span>
                <span className="text-[#C85A3F]">→</span>
                <span>Places</span>
                <span className="text-[#C85A3F]">→</span>
                <span>Itinerary</span>
                <span className="text-[#C85A3F]">→</span>
                <span>Quests</span>
                <span className="text-[#C85A3F]">→</span>
                <span className="text-[#28483D]">
                  Memories
                </span>
              </div>
            </div>
          </div>

          {/* Closing line */}
          <div className="mt-10 flex flex-col gap-5 border-t border-[#241F1A]/10 pt-7 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-xl text-sm leading-6 text-[#241F1A]/50">
              Not another itinerary generator. A travel companion built to
              help you experience the trip, not just schedule it.
            </p>

            <a
              href="#explore"
              className="inline-flex w-fit items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#28483D] transition-colors hover:text-[#C85A3F]"
            >
              See what you can explore
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </section>

      {/* Trip Quest */}
      <section
        id="trip-quest"
        className="relative overflow-hidden bg-[#E8D6D2] px-6 py-24 text-[#241F1A] sm:py-32"
      >
        {/* Soft editorial atmosphere */}
        <div className="pointer-events-none absolute -left-28 top-24 h-72 w-72 rounded-full bg-[#C85A3F]/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 bottom-20 h-80 w-80 rounded-full bg-[#D5A13A]/10 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-7xl">
          {/* Heading */}
          <div className="max-w-4xl">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#28483D]">
              Trip Quest · Field Guide
            </p>

            <h2 className="mt-5 max-w-4xl text-5xl font-black leading-[0.95] tracking-[-0.045em] sm:text-6xl lg:text-7xl">
              Turn your itinerary
              <br />
              into an{" "}
              <span
                className="text-[#C85A3F]"
                style={{
                  fontFamily:
                    "Georgia, Cambria, 'Times New Roman', serif",
                  fontStyle: "italic",
                }}
              >
                adventure.
              </span>
            </h2>

            <p className="mt-7 max-w-2xl text-base leading-7 text-[#241F1A]/65 sm:text-lg">
              Your itinerary gives you the places. Trip Quest gives you something
              to do with them. Complete little challenges, capture the moment,
              and collect pieces of the journey along the way.
            </p>
          </div>

          {/* Quest sequence */}
          <div className="mt-16 grid gap-5 lg:grid-cols-3">
            {/* 01 */}
            <article className="relative overflow-hidden rounded-[30px] border border-[#241F1A]/10 bg-[#F7EFE6] p-7 shadow-[0_20px_60px_rgba(36,31,26,0.08)] transition-transform duration-300 hover:-translate-y-1 sm:p-8">
              <div className="flex items-start justify-between">
                <span className="font-serif text-5xl italic text-[#C85A3F]/50">
                  01
                </span>

                <span className="rounded-full bg-[#28483D] px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.16em] text-[#F1E8D8]">
                  Find it
                </span>
              </div>

              <div className="mt-14">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#28483D] text-2xl">
                  📍
                </div>

                <h3 className="mt-6 text-2xl font-black tracking-tight">
                  Find your quest
                </h3>

                <p className="mt-3 max-w-sm text-sm leading-6 text-[#241F1A]/60">
                  Reach a stop on your itinerary and discover the challenge waiting
                  for you there.
                </p>
              </div>

              <div className="mt-8 border-t border-[#241F1A]/10 pt-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#241F1A]/35">
                  Your next stop
                </p>

                <p className="mt-2 font-serif text-lg italic text-[#28483D]">
                  “Something worth discovering.”
                </p>
              </div>
            </article>

            {/* 02 */}
            <article className="relative overflow-hidden rounded-[30px] border border-[#241F1A]/10 bg-[#F7EFE6] p-7 shadow-[0_20px_60px_rgba(36,31,26,0.08)] transition-transform duration-300 hover:-translate-y-1 sm:p-8">
              <div className="flex items-start justify-between">
                <span className="font-serif text-5xl italic text-[#C85A3F]/50">
                  02
                </span>

                <span className="rounded-full bg-[#C85A3F] px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.16em] text-[#F7EFE6]">
                  Capture it
                </span>
              </div>

              <div className="mt-14">
                <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-[#C85A3F] text-2xl">
                  📸

                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#D5A13A] text-[10px]">
                    +
                  </span>
                </div>

                <h3 className="mt-6 text-2xl font-black tracking-tight">
                  Capture the moment
                </h3>

                <p className="mt-3 max-w-sm text-sm leading-6 text-[#241F1A]/60">
                  Complete the challenge and upload a photo as your proof. Your
                  memories become part of the adventure.
                </p>
              </div>

              <div className="mt-8 rounded-[20px] border border-dashed border-[#241F1A]/15 bg-[#E8D6D2]/55 p-4">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-xl bg-[#C8B99F]" />

                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#241F1A]/35">
                      Quest proof
                    </p>
                    <p className="mt-1 text-sm font-bold text-[#28483D]">
                      Photo captured ✓
                    </p>
                  </div>
                </div>
              </div>
            </article>

            {/* 03 */}
            <article className="relative overflow-hidden rounded-[30px] border border-[#241F1A]/10 bg-[#F7EFE6] p-7 shadow-[0_20px_60px_rgba(36,31,26,0.08)] transition-transform duration-300 hover:-translate-y-1 sm:p-8">
              <div className="flex items-start justify-between">
                <span className="font-serif text-5xl italic text-[#C85A3F]/50">
                  03
                </span>

                <span className="rounded-full bg-[#D5A13A] px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.16em] text-[#241F1A]">
                  Collect it
                </span>
              </div>

              <div className="mt-14">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#D5A13A] text-2xl">
                  🏷️
                </div>

                <h3 className="mt-6 text-2xl font-black tracking-tight">
                  Collect your reward
                </h3>

                <p className="mt-3 max-w-sm text-sm leading-6 text-[#241F1A]/60">
                  Complete the quest, earn XP, unlock a sticker, and keep building
                  your personal travel collection.
                </p>
              </div>

              <div className="mt-8 flex items-center justify-between rounded-[20px] bg-[#28483D] px-5 py-4 text-[#F1E8D8]">
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#F1E8D8]/45">
                    Reward unlocked
                  </p>
                  <p className="mt-1 text-sm font-bold">
                    New sticker added
                  </p>
                </div>

                <span className="text-2xl">✨</span>
              </div>
            </article>
          </div>

          {/* Journey loop */}
          <div className="mt-14 rounded-[32px] border border-[#241F1A]/10 bg-[#F7EFE6]/65 p-6 backdrop-blur-sm sm:p-8">
            <div className="flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C85A3F]">
                  The loop
                </p>

                <p className="mt-3 max-w-xl font-serif text-2xl leading-tight text-[#28483D] sm:text-3xl">
                  Capture the moment. Complete the quest. Keep the memory.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2 text-[10px] font-bold uppercase tracking-[0.15em] text-[#241F1A]/55">
                <span className="rounded-full bg-[#E8D6D2] px-3 py-2">
                  📸 Capture
                </span>

                <span className="text-[#C85A3F]">→</span>

                <span className="rounded-full bg-[#E8D6D2] px-3 py-2">
                  ✦ Complete
                </span>

                <span className="text-[#C85A3F]">→</span>

                <span className="rounded-full bg-[#E8D6D2] px-3 py-2">
                  🏷️ Collect
                </span>

                <span className="text-[#C85A3F]">→</span>

                <span className="rounded-full bg-[#28483D] px-3 py-2 text-[#F1E8D8]">
                  ♥ Remember
                </span>
              </div>
            </div>
          </div>

          {/* Photostrip teaser */}
          <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_0.75fr] lg:items-center">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#28483D]">
                And when the trip is over...
              </p>

              <h3 className="mt-4 max-w-xl text-4xl font-black leading-tight tracking-[-0.035em] sm:text-5xl">
                Your quests become a
                <span
                  className="ml-2 text-[#C85A3F]"
                  style={{
                    fontFamily:
                      "Georgia, Cambria, 'Times New Roman', serif",
                    fontStyle: "italic",
                  }}
                >
                  story.
                </span>
              </h3>

              <p className="mt-5 max-w-xl text-sm leading-6 text-[#241F1A]/60">
                The photos you captured can become part of your travel memory —
                complete with your unlocked stickers and the moments you chose to
                keep.
              </p>

              <a
                href="#explore"
                className="mt-7 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#28483D] transition-colors hover:text-[#C85A3F]"
              >
                Continue exploring
                <span aria-hidden="true">↗</span>
              </a>
            </div>

            {/* Small photostrip-style visual */}
            <div className="mx-auto w-full max-w-sm rotate-[2deg] rounded-[22px] bg-[#F7EFE6] p-4 shadow-[0_25px_70px_rgba(36,31,26,0.14)]">
              <div className="grid grid-cols-3 gap-2">
                <div className="aspect-[3/4] rounded-xl bg-[#C8B99F]" />
                <div className="aspect-[3/4] rounded-xl bg-[#DFA7AA]" />
                <div className="aspect-[3/4] rounded-xl bg-[#AFC4B5]" />
              </div>

              <div className="mt-4 flex items-center justify-between">
                <p className="font-serif text-sm italic text-[#28483D]">
                  Trip memories
                </p>

                <p className="text-[8px] font-bold uppercase tracking-[0.18em] text-[#241F1A]/35">
                  Quest complete
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Explore the World */}
      <section
        id="explore"
        className="relative overflow-hidden bg-[#E8DDCC] px-6 py-28 text-[#241F1A] sm:py-36"
      >
        {/* Atmospheric shapes */}
        <div className="pointer-events-none absolute -left-32 top-20 h-80 w-80 rounded-full bg-[#DFA7AA]/15 blur-3xl" />
        <div className="pointer-events-none absolute -right-28 bottom-16 h-96 w-96 rounded-full bg-[#D5A13A]/10 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-7xl">
          {/* Intro */}
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#C85A3F]">
                Explore the world
              </p>

              <h2
                className="mt-5 max-w-3xl text-5xl font-normal leading-[0.95] tracking-[-0.035em] sm:text-6xl lg:text-7xl"
                style={{
                  fontFamily:
                    "Georgia, Cambria, 'Times New Roman', serif",
                  fontStyle: "italic",
                }}
              >
                Places, cultures,
                <br />
                <span className="text-[#C85A3F]">flavours.</span>
              </h2>
            </div>

            <div className="lg:pb-2 lg:pl-12">
              <p className="max-w-xl text-base leading-7 text-[#241F1A]/60 sm:text-lg">
                Wander through the places and experiences that make every
                destination feel different — from iconic monuments and local
                streets to food, traditions, and landscapes.
              </p>
            </div>
          </div>

          {/* Dome Gallery */}
          <div className="mt-14 overflow-hidden rounded-[36px] border border-[#241F1A]/10 bg-[#C8B99F]/20 shadow-[0_30px_90px_rgba(36,31,26,0.10)]">
            {/* Gallery header */}
            <div className="flex flex-col gap-4 border-b border-[#241F1A]/10 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#28483D]">
                  The world is waiting
                </p>

                <p className="mt-1 text-sm text-[#241F1A]/45">
                  Wander through a collection of places worth experiencing.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-[#28483D] px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.14em] text-[#F1E8D8]">
                  Monuments
                </span>

                <span className="rounded-full bg-[#F7EFE6] px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.14em] text-[#241F1A]/55">
                  Culture
                </span>

                <span className="rounded-full bg-[#F7EFE6] px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.14em] text-[#241F1A]/55">
                  Cuisine
                </span>

                <span className="rounded-full bg-[#F7EFE6] px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.14em] text-[#241F1A]/55">
                  Nature
                </span>
              </div>
            </div>

            {/* Gallery canvas */}
            <div className="h-[540px] w-full sm:h-[640px] lg:h-[720px]">
              <DomeGallery
                fit={0.46}
                fitBasis="auto"
                minRadius={520}
                maxVerticalRotationDeg={5}
                dragSensitivity={20}
                dragDampening={0.72}
                enlargeTransitionMs={300}
                openedImageWidth="460px"
                openedImageHeight="460px"
                imageBorderRadius="24px"
                openedImageBorderRadius="28px"
                overlayBlurColor="#E8DDCC"
                grayscale={false}
              />
            </div>
          </div>

          {/* Gallery footer */}
          <div className="mt-7 flex flex-col gap-4 border-t border-[#241F1A]/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm leading-6 text-[#241F1A]/50">
              Drag to wander through the world. Tap a photo to bring a place
              closer.
            </p>

            <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.2em] text-[#28483D]/60">
              <span>Discover</span>
              <span className="text-[#C85A3F]">→</span>
              <span>Wander</span>
              <span className="text-[#C85A3F]">→</span>
              <span>Remember</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Home
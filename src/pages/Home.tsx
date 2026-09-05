import Navbar from "../components/navigation/Navbar"
import DriftWall from "../components/effects/DriftWall"
import CursorGrid from "../components/effects/CursorGrid"
import SplashCursor from "../components/effects/SplashCursor"
import TripPlanner from "../components/planner/TripPlanner"
import MagneticButton from "../components/ui/MagneticButton"

function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#CFC1AA] text-[#241F1A]">
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
        className="min-h-screen bg-[#28483D] px-6 py-24 text-[#F1E8D8]"
      >
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#D5A13A]">
            How it works
          </p>

          <h2 className="mt-4 max-w-3xl text-5xl font-black tracking-tight sm:text-6xl">
            From destination to adventure.
          </h2>
        </div>
      </section>

      {/* Explore placeholder */}
      <section
        id="explore"
        className="min-h-screen bg-[#E8DDCC] px-6 py-24 text-[#241F1A]"
      >
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#C85A3F]">
            Explore
          </p>

          <h2 className="mt-4 max-w-3xl text-5xl font-black tracking-tight sm:text-6xl">
            Find places worth remembering.
          </h2>
        </div>
      </section>

      {/* Trip Quest placeholder */}
      <section
        id="trip-quest"
        className="min-h-screen bg-[#D5A13A] px-6 py-24 text-[#241F1A]"
      >
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#28483D]">
            Trip Quest
          </p>

          <h2 className="mt-4 max-w-3xl text-5xl font-black tracking-tight sm:text-6xl">
            Turn your trip into a game.
          </h2>
        </div>
      </section>
    </main>
  )
}

export default Home
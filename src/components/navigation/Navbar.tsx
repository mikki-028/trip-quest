import { useState } from "react"
import { ArrowUpRight, Menu, Plane, X } from "lucide-react"
import MagneticButton from "../ui/MagneticButton"

const navItems = [
  { label: "Explore", href: "#explore" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Trip Quest", href: "#trip-quest" },
]

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="absolute inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8">
      <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-[#241F1A]/10 bg-[#F1E8D8]/90 px-4 py-3 shadow-[0_10px_40px_rgba(36,31,26,0.08)] backdrop-blur-md sm:px-5">
        {/* Brand */}
        <a
          href="/"
          className="group flex items-center gap-2.5"
          aria-label="Trip Quest home"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#28483D] text-[#F1E8D8] transition-transform duration-300 group-hover:rotate-[-8deg]">
            <Plane size={16} strokeWidth={2.2} />
          </span>

          <span className="text-sm font-black uppercase tracking-[0.18em] text-[#241F1A]">
            Trip Quest
          </span>
        </a>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="group relative text-sm font-medium text-[#241F1A]/70 transition-colors duration-200 hover:text-[#C85A3F]"
            >
              {item.label}

              <span className="absolute -bottom-1 left-0 h-px w-0 bg-[#C85A3F] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <MagneticButton
          href="#planner"
          className="hidden items-center gap-2 rounded-full bg-[#C85A3F] px-5 py-2.5 text-sm font-semibold text-[#F9F2E7] shadow-[0_8px_24px_rgba(200,90,63,0.18)] md:flex"
        >
          Start Planning
          <ArrowUpRight size={16} />
        </MagneticButton>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setIsMenuOpen((open) => !open)}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-[#28483D] text-[#F1E8D8] md:hidden"
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="mx-auto mt-2 max-w-7xl rounded-3xl border border-[#241F1A]/10 bg-[#F1E8D8] p-4 shadow-[0_15px_40px_rgba(36,31,26,0.12)] md:hidden">
          <div className="flex flex-col gap-1">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="rounded-2xl px-4 py-3 text-sm font-medium text-[#241F1A]/75 transition-colors hover:bg-[#CFC1AA]/40 hover:text-[#C85A3F]"
              >
                {item.label}
              </a>
            ))}

            <a
              href="#planner"
              onClick={() => setIsMenuOpen(false)}
              className="mt-2 flex items-center justify-between rounded-2xl bg-[#C85A3F] px-4 py-3 text-sm font-semibold text-[#F9F2E7]"
            >
              Start Planning
              <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar
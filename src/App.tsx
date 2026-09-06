import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Trip from "./pages/Trip"
import History from "./pages/History"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trip/:tripId" element={<Trip />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
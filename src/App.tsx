import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Trip from "./pages/Trip"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trip/:tripId" element={<Trip />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
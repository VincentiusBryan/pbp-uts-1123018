import { lazy, Suspense } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import "./Global.css"

const AmbilBuku = lazy(() => import("./AmbilBuku"))
const DetailBuku = lazy(() => import("./DetailBuku"))
const UpdateBuku = lazy(() => import("./UpdateBuku"))
const PinjamBuku = lazy(() => import("./PinjamBuku"))

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Suspense fallback={<h2>Loading...</h2>}>
      <Routes>

        <Route path="/AmbilBuku" element={<AmbilBuku />} />
        <Route path="/DetailBuku/:id" element={<DetailBuku />} />
        <Route path="/UpdateBuku/:id" element={<UpdateBuku />} />
        <Route path="/PinjamBuku/:id" element={<PinjamBuku />} />

      </Routes>
    </Suspense>
  </BrowserRouter>
)
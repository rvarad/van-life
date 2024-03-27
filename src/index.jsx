import React from "react"
import ReactDOM from "react-dom/client"
import "./server"
import { BrowserRouter, Route, Routes, Link } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import Vans from "./pages/Vans/Vans"
import VanDetails from "./pages/Vans/VanDetails"
import Layout from "./components/Layout"
import HostLayout from "./components/HostLayout"
import Dashboard from "./pages/Host/Dashboard"
import Income from "./pages/Host/Income"
import Reviews from "./pages/Host/Reviews"
import HostVans from "./pages/Host/HostVans"
import HostVanDetails from "./pages/Host/HostVanDetails"
import HostVanInfo from "./pages/Host/HostVanInfo"
import HostVanPricing from "./pages/Host/HostVanPricing"
import HostVanPhotos from "./pages/Host/HostVanPhotos"
import NotFound from "./pages/NotFound"

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<Layout />}>
					<Route
						index
						element={<Home />}
					/>
					<Route
						path="/host"
						element={<HostLayout />}
					>
						<Route
							index
							element={<Dashboard />}
						/>
						<Route
							path="income"
							element={<Income />}
						/>
						<Route
							path="vans"
							element={<HostVans />}
						/>
						<Route
							path="vans/:id"
							element={<HostVanDetails />}
						>
							<Route
								index
								element={<HostVanInfo />}
							/>
							<Route
								path="pricing"
								element={<HostVanPricing />}
							/>
							<Route
								path="photos"
								element={<HostVanPhotos />}
							/>
						</Route>
						<Route
							path="reviews"
							element={<Reviews />}
						/>
					</Route>
					<Route
						path="about"
						element={<About />}
					/>
					<Route
						path="vans"
						element={<Vans />}
					/>
					<Route
						path="vans/:id"
						element={<VanDetails />}
					/>
					<Route
						path="*"
						element={<NotFound />}
					/>
				</Route>
			</Routes>
		</BrowserRouter>
	)
}

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
)

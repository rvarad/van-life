import React from "react"
import ReactDOM from "react-dom/client"
import "./server"
import {
	Route,
	createBrowserRouter,
	createRoutesFromElements,
	RouterProvider,
} from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import Vans, { loader as vansLoader } from "./pages/Vans/Vans"
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
import Error from "./components/Error"

const router = createBrowserRouter(
	createRoutesFromElements(
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
				errorElement={<Error />}
				loader={vansLoader}
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
	)
)

function App() {
	return <RouterProvider router={router} />
}

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
)

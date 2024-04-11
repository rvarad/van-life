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
import VanDetails, { loader as vanDetailsLoader } from "./pages/Vans/VanDetails"
import Layout from "./components/Layout"
import HostLayout from "./components/HostLayout"
import Dashboard from "./pages/Host/Dashboard"
import Income from "./pages/Host/Income"
import Reviews from "./pages/Host/Reviews"
import HostVans, { loader as hostVansLoader } from "./pages/Host/HostVans"
import HostVanDetails, {
	loader as hostVanDetailsLoader,
} from "./pages/Host/HostVanDetails"
import HostVanInfo from "./pages/Host/HostVanInfo"
import HostVanPricing from "./pages/Host/HostVanPricing"
import HostVanPhotos from "./pages/Host/HostVanPhotos"
import NotFound from "./pages/NotFound"
import Error from "./components/Error"
import Login, {
	loader as loginLoader,
	action as loginAction,
} from "./pages/Login"
import { requireAuth } from "./utils"

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route
			element={<Layout />}
			errorElement={<Error />}
		>
			<Route
				index
				element={<Home />}
			/>
			<Route
				path="host"
				element={<HostLayout />}
			>
				<Route
					index
					element={<Dashboard />}
					loader={async ({ request }) => await requireAuth(request)}
				/>
				<Route
					path="income"
					element={<Income />}
					loader={async ({ request }) => await requireAuth(request)}
				/>
				<Route
					path="vans"
					element={<HostVans />}
					loader={hostVansLoader}
				/>
				<Route
					path="vans/:id"
					element={<HostVanDetails />}
					loader={hostVanDetailsLoader}
				>
					<Route
						index
						element={<HostVanInfo />}
						loader={async ({ request }) => await requireAuth(request)}
					/>
					<Route
						path="pricing"
						element={<HostVanPricing />}
						loader={async ({ request }) => await requireAuth(request)}
					/>
					<Route
						path="photos"
						element={<HostVanPhotos />}
						loader={async ({ request }) => await requireAuth(request)}
					/>
				</Route>
				<Route
					path="reviews"
					element={<Reviews />}
					loader={async ({ request }) => await requireAuth(request)}
				/>
			</Route>
			<Route
				path="about"
				element={<About />}
			/>
			<Route
				path="vans"
				element={<Vans />}
				loader={vansLoader}
			/>
			<Route
				path="vans/:id"
				element={<VanDetails />}
				loader={vanDetailsLoader}
			/>
			<Route
				path="login"
				element={<Login />}
				loader={loginLoader}
				action={loginAction}
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

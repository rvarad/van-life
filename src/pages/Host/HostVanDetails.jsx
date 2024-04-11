import React, { useEffect, useState } from "react"
import {
	useParams,
	Link,
	NavLink,
	Outlet,
	useLoaderData,
} from "react-router-dom"
import { getHostVans } from "../../api"
import { requireAuth } from "../../utils"

export async function loader({ params, request }) {
	await requireAuth(request)
	return getHostVans(params.id)
}

function HostVanDetails() {
	const van = useLoaderData()
	// const { id } = useParams()
	// const [van, setVan] = useState(null)

	// useEffect(() => {
	// 	fetch(`/api/host/vans/${id}`)
	// 		.then((res) => res.json())
	// 		.then((data) => setVan(data.vans))
	// 	// .then((data) => console.log(data.vans))
	// 	// console.log(van)
	// }, [])

	// if (!van) {
	// 	return <h1>Loading...</h1>
	// }

	const activeTabStyle = {
		fontWeight: "bold",
		textDecoration: "underline",
		color: "#161616",
	}

	return van ? (
		<section>
			<Link
				to="../vans"
				// relative="path" // this is the way shown in scrimba, but my way also works
				className="back-button"
			>
				&larr; <span>Back to all vans</span>
			</Link>

			<div className="host-van-detail-layout-container">
				<div className="host-van-detail">
					<img src={van.imageUrl} />
					<div className="host-van-detail-info-text">
						<i className={`van-type van-type-${van.type}`}>{van.type}</i>
						<h3>{van.name}</h3>
						<h4>${van.price}/day</h4>
					</div>
				</div>

				<nav className="host-van-detail-nav">
					<NavLink
						to={"."}
						end
						style={({ isActive }) => (isActive ? activeTabStyle : null)}
					>
						Details
					</NavLink>
					<NavLink
						to={"pricing"}
						style={({ isActive }) => (isActive ? activeTabStyle : null)}
					>
						Pricing
					</NavLink>
					<NavLink
						to={"photos"}
						style={({ isActive }) => (isActive ? activeTabStyle : null)}
					>
						Photos
					</NavLink>
				</nav>

				<Outlet context={{ van }} />
			</div>
		</section>
	) : (
		<h1>Loading...</h1>
	)
}

export default HostVanDetails

import React from "react"
import { Link, NavLink, Outlet } from "react-router-dom"

export default function HostLayout() {
	const activeTabStyle = {
		fontWeight: "bold",
		textDecoration: "underline",
		color: "#161616",
	}

	return (
		<>
			<nav className="host-nav">
				<NavLink
					style={({ isActive }) => (isActive ? activeTabStyle : null)}
					end
					to={"."}
				>
					Dashboard
				</NavLink>
				<NavLink
					style={({ isActive }) => (isActive ? activeTabStyle : null)}
					to={"income"}
				>
					Income
				</NavLink>
				<NavLink
					style={({ isActive }) => (isActive ? activeTabStyle : null)}
					to={"vans"}
				>
					Vans
				</NavLink>
				<NavLink
					style={({ isActive }) => (isActive ? activeTabStyle : null)}
					to={"reviews"}
				>
					Reviews
				</NavLink>
			</nav>
			<Outlet />
		</>
	)
}

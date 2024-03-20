import React from "react"
import { Link, NavLink } from "react-router-dom"

function Header() {
	const acTiveTabStyle = {
		fontWeight: "bold",
		textDecoration: "underline",
		color: "#161616",
	}

	return (
		<header>
			<Link
				to="/"
				className="site-logo">
				#VanLife
			</Link>
			<nav>
				<NavLink
					style={({ isActive }) => (isActive ? acTiveTabStyle : null)}
					to={"/host"}>
					Host
				</NavLink>
				<NavLink
					style={({ isActive }) => (isActive ? acTiveTabStyle : null)}
					to={"/about"}>
					About
				</NavLink>
				<NavLink
					style={({ isActive }) => (isActive ? acTiveTabStyle : null)}
					to={"/vans"}>
					Vans
				</NavLink>
			</nav>
		</header>
	)
}

export default Header

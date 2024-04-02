import React, { useState, useEffect } from "react"
import { Link, useSearchParams, useLoaderData } from "react-router-dom"
import { getVans } from "../../api"

export function loader() {
	// console.log(getVans())
	return getVans()
}

function Vans() {
	// const [vans, setVans] = useState([])
	const [searchParams, setSearchParams] = useSearchParams()

	const vans = useLoaderData()

	// useEffect(() => {
	// 	fetch("/api/vans")
	// 		.then((res) => res.json())
	// 		.then((data) => setVans(data.vans))
	// }, [])
	// console.log(vans)

	const typeFilter = searchParams.get("type")

	const displayVans = typeFilter
		? vans.filter((van) => van.type === typeFilter)
		: vans

	// console.log(searchParams)

	function handleFilterChange(key, value) {
		setSearchParams((prev) => {
			if (value === null) {
				prev.delete(key)
			} else {
				prev.set(key, value)
			}
			return prev
		})
	}

	const vanElements = displayVans.map((van) => (
		<div
			key={van.id}
			className="van-tile"
		>
			<Link
				to={`${van.id}`}
				state={{ search: `?${searchParams.toString()}`, type: typeFilter }}
				// to={`${van.id}?type=${van.type}`}
				aria-label={`View details for ${van.name}, priced at $${van.price} per day`}
			>
				<img src={van.imageUrl} />
				<div className="van-info">
					<p>{van.name}</p>
					<p>
						${van.price}
						<span>/day</span>
					</p>
				</div>
				<i className={`van-type ${van.type} selected`}>{van.type}</i>
			</Link>
		</div>
	))

	return (
		<div className="van-list-container">
			<h1>Explore our van options</h1>
			<div className="van-list-filter-buttons">
				{/* <Link to={"?type=simple"}>Simple</Link>
				<Link to={"?type=rugged"}>Rugged</Link>
				<Link to={"?type=luxury"}>Luxury</Link>
				<Link to={"."}>Clear Filters</Link> */}
				{/* <button onClick={() => setSearchParams({ type: "simple" })}>
					Simple
				</button>
				<button onClick={() => setSearchParams({ type: "rugged" })}>
					Rugged
				</button>
				<button onClick={() => setSearchParams({ type: "luxury" })}>
					Luxury
				</button>
				{typeFilter !== null && (
					<button onClick={() => setSearchParams({})}>Clear Filters</button>
				)} */}
				<button onClick={() => handleFilterChange("type", "simple")}>
					Simple
				</button>
				<button onClick={() => handleFilterChange("type", "rugged")}>
					Rugged
				</button>
				<button onClick={() => handleFilterChange("type", "luxury")}>
					Luxury
				</button>
				{typeFilter !== null && (
					<button onClick={() => handleFilterChange("type", null)}>
						Clear Filters
					</button>
				)}
			</div>
			<div className="van-list">{vanElements}</div>
		</div>
	)
}

export default Vans

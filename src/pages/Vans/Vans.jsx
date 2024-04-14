import React, { useState, useEffect, Suspense } from "react"
import {
	Link,
	useSearchParams,
	useLoaderData,
	defer,
	Await,
} from "react-router-dom"
import { getVans } from "../../api"

export function loader() {
	// console.log(getVans())
	return defer({ vans: getVans() })
}

function Vans() {
	// const [vans, setVans] = useState([])
	const [searchParams, setSearchParams] = useSearchParams()

	const dataPromise = useLoaderData()

	// useEffect(() => {
	// 	fetch("/api/vans")
	// 		.then((res) => res.json())
	// 		.then((data) => setVans(data.vans))
	// }, [])
	// console.log(vans)

	const typeFilter = searchParams.get("type")
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

	function renderVanElements(vans) {
		const displayVans = typeFilter
			? vans.filter((van) => van.type === typeFilter)
			: vans

		const vanElements = displayVans.map((van) => (
			<div
				key={van.id}
				className="van-tile"
			>
				<Link
					to={`${van.id}`}
					state={{
						search: `?${searchParams.toString()}`,
						type: typeFilter,
					}}
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
			<>
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
					<button
						className={`van-type simple ${
							typeFilter === "simple" ? "selected" : ""
						}`}
						onClick={() => handleFilterChange("type", "simple")}
					>
						Simple
					</button>
					<button
						className={`van-type rugged ${
							typeFilter === "rugged" ? "selected" : ""
						}`}
						onClick={() => handleFilterChange("type", "rugged")}
					>
						Rugged
					</button>
					<button
						className={`van-type luxury ${
							typeFilter === "luxury" ? "selected" : ""
						}`}
						onClick={() => handleFilterChange("type", "luxury")}
					>
						Luxury
					</button>
					{typeFilter !== null && (
						<button onClick={() => handleFilterChange("type", null)}>
							Clear Filters
						</button>
					)}
				</div>
				<div className="van-list">{vanElements}</div>
			</>
		)
	}

	return (
		<div className="van-list-container">
			<h1>Explore our van options</h1>
			<Suspense fallback={<h2>Loading...</h2>}>
				<Await resolve={dataPromise.vans}>{renderVanElements}</Await>
			</Suspense>
		</div>
	)
}

export default Vans

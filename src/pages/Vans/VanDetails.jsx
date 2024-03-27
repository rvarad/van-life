import React, { useState, useEffect } from "react"
import { useParams, Link, useSearchParams, useLocation } from "react-router-dom"

export default function VanDetails() {
	const [van, setVan] = useState(null)
	// const [searchParams, setSearchParams] = useSearchParams()
	const location = useLocation()

	const search = location.state?.search || ""
	const type = location.state?.type || "all"

	const params = useParams()

	// const typeFilter = searchParams.get("type")

	useEffect(() => {
		fetch(`/api/vans/${params.id}`)
			.then((res) => res.json())
			.then((data) => setVan(data.vans))
	}, [params.id])

	return (
		<div className="van-detail-container">
			<Link
				to={`..${search}`}
				// to={`..?type=${typeFilter}`}
				relative="path"
				className="back-button"
			>
				&larr; <span>Back to {type} vans</span>
			</Link>
			{van ? (
				<div className="van-detail">
					<img src={van.imageUrl} />
					<i className={`van-type ${van.type} selected`}>{van.type}</i>
					<h2>{van.name}</h2>
					<p className="van-price">
						<span>${van.price}</span>/day
					</p>
					<p>{van.description}</p>
					<button className="link-button">Rent this van</button>
				</div>
			) : (
				<h2>Loading...</h2>
			)}
		</div>
	)
}

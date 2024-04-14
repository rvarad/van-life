import React, { useState, useEffect, Suspense } from "react"
import {
	Link,
	useSearchParams,
	useLoaderData,
	defer,
	Await,
} from "react-router-dom"
import { getHostVans } from "../../api"
import { requireAuth } from "../../utils"

export async function loader({ request }) {
	await requireAuth(request)
	return defer({ vanList: getHostVans() })
}

function HostVans() {
	const [searchParams, setSearchParams] = useSearchParams()
	// const [vanList, setVanList] = useState([])
	const vanListPromise = useLoaderData()
	// console.log(vanList)

	// useEffect(() => {
	// 	fetch("/api/host/vans")
	// 		.then((res) => res.json())
	// 		.then((data) => setVanList(data.vans))
	// }, [])

	const typeFilter = searchParams.get("type")

	// console.log(typeFilter)

	function renderHostVanElements(vanList) {
		const hostVanElements = vanList.map((van) => (
			<Link
				to={`${van.id}`}
				key={van.id}
				className="host-van-link-wrapper"
			>
				<div
					className="host-van-single"
					key={van.id}
				>
					<img
						src={van.imageUrl}
						alt={`Photo of ${van.name}`}
					/>
					<div className="host-van-info">
						<h3>{van.name}</h3>
						<p>${van.price}/day</p>
					</div>
				</div>
			</Link>
		))

		return (
			<div className="host-vans-list">
				<section>{hostVanElements}</section>
			</div>
		)
	}

	return (
		<section>
			<h1 className="host-vans-title">Your listed vans</h1>
			<Suspense fallback={<h2>Loading...</h2>}>
				<Await resolve={vanListPromise.vanList}>{renderHostVanElements}</Await>
			</Suspense>
		</section>
	)
}

export default HostVans

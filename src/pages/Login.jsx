import React, { useState } from "react"
import {
	useNavigation,
	useLoaderData,
	useActionData,
	Form,
	redirect,
	Link,
} from "react-router-dom"
import { loginUser } from "../api"

export function loader({ request }) {
	// console.log(request)
	return new URL(request.url).searchParams.get("message")
	// return null
}

export async function action({ request }) {
	const formData = await request.formData()
	const email = formData.get("email")
	const password = formData.get("password")
	const pathname =
		new URL(request.url).searchParams.get("redirectTo") || "/host"
	try {
		const data = await loginUser({ email, password })
		localStorage.setItem("loggedIn", true)
		console.log(data)
		const response = redirect(pathname)
		Object.defineProperty(response, "body", { value: true })
		return response
	} catch (error) {
		return error.message
	}
}

function Login() {
	const error = useActionData()
	const message = useLoaderData()
	const status = useNavigation().state

	return localStorage.getItem("loggedIn") ? (
		<>
			<h1>You are already logged in</h1>
			<h3>
				<Link to={"/host"}>Go to Host Dashboard</Link>
			</h3>
			<button onClick={() => localStorage.removeItem("loggedIn")}>
				<Link to={"/"}>Logout</Link>
			</button>
		</>
	) : (
		<div className="login-container">
			<h1>Login to your account</h1>
			{error && <h3 className="red">{error}</h3>}
			{message && <h3 className="red">{message}</h3>}
			<Form
				method="post"
				className="login-form"
				replace
			>
				<input
					type="text"
					placeholder="Email address"
					name="email"
				/>
				<input
					type="password"
					placeholder="Password"
					name="password"
				/>
				<button disabled={status === "submitting"}>
					{status === "submitting" ? "Logging in..." : "Log in"}
				</button>
			</Form>
		</div>
	)
}

export default Login

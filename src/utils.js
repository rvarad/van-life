import { redirect } from "react-router-dom"

export async function requireAuth(request) {
  const isLoggedIn = localStorage.getItem("loggedIn")
  const pathname = new URL(request.url).pathname
  const response = redirect(`/login?message=You must be logged in to access this page&redirectTo=${pathname}`)
  if (!isLoggedIn) {
    Object.defineProperty(response, "body", { value: true })
    throw response
  }
  return null
}
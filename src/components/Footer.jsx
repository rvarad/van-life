import React from "react"

function Footer() {
	const date = new Date().getFullYear()
	// console.log(date)
	return (
		<footer>
			<p>&#169; {date} #VANLIFE</p>
		</footer>
	)
}

export default Footer

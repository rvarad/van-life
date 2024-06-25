// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyAN_pOdkiJWXqNl8VhS96ueLC0w8l3Amh0",
	authDomain: "van-life-ae54a.firebaseapp.com",
	projectId: "van-life-ae54a",
	storageBucket: "van-life-ae54a.appspot.com",
	messagingSenderId: "323776807111",
	appId: "1:323776807111:web:901acd2df43fed84673ee2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const database = getFirestore(app)




///////////////////////////////////////////////
export async function getVans(id) {
	const url = id ? `/api/vans/${id}` : "/api/vans"
	const res = await fetch(url)
	if (!res.ok) {
		throw {
			message: "Failed to fetch vans",
			statusText: res.statusText,
			status: res.status
		}
	}
	const data = await res.json()
	return data.vans
}

export async function getHostVans(id) {
	const url = id ? `/api/host/vans/${id}` : "/api/host/vans"
	const res = await fetch(url)
	if (!res.ok) {
		throw {
			message: "Failed to fetch vans",
			statusText: res.statusText,
			status: res.status
		}
	}
	const data = await res.json()
	return data.vans
}


export async function loginUser(creds) {
	const res = await fetch("/api/login",
		{ method: "post", body: JSON.stringify(creds) }
	)
	const data = await res.json()

	if (!res.ok) {
		throw {
			message: data.message,
			statusText: res.statusText,
			status: res.status
		}
	}

	return data
}
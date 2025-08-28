import { initializeApp, getApps, type FirebaseApp } from 'firebase/app'
import { getAuth, setPersistence, browserLocalPersistence, browserSessionPersistence, type Auth } from 'firebase/auth'
import { getAnalytics, isSupported, type Analytics } from 'firebase/analytics'

let app: FirebaseApp | undefined
let auth: Auth | undefined
let analytics: Analytics | undefined

export function getFirebaseApp(): FirebaseApp {
	if (!app) {
		const config = {
			apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
			authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
			projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
			storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
			messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
			appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
			measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
		}

		app = getApps().length ? getApps()[0]! : initializeApp(config)
	}
	return app
}

export async function getFirebaseAuth(persist: 'local' | 'session' = 'local'): Promise<Auth> {
	if (!auth) {
		auth = getAuth(getFirebaseApp())
	}
	await setPersistence(auth!, persist === 'local' ? browserLocalPersistence : browserSessionPersistence)
	return auth!
}

export async function getFirebaseAnalytics(): Promise<Analytics | undefined> {
	if (typeof window === 'undefined') return undefined
	if (!analytics && (await isSupported())) {
		analytics = getAnalytics(getFirebaseApp())
	}
	return analytics
}

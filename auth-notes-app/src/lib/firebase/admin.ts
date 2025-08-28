import { cert, getApps, initializeApp, type App } from 'firebase-admin/app'
import { getAuth as getAdminAuth, type Auth as AdminAuth } from 'firebase-admin/auth'

let adminApp: App | undefined
let adminAuth: AdminAuth | undefined

function getAdminApp(): App {
	if (!adminApp) {
		const projectId = process.env.FIREBASE_PROJECT_ID
		const clientEmail = process.env.FIREBASE_CLIENT_EMAIL
		let privateKey = process.env.FIREBASE_PRIVATE_KEY
		if (!projectId || !clientEmail || !privateKey) {
			throw new Error('Missing Firebase Admin env vars')
		}
		// Support private keys wrapped in quotes with \n characters
		privateKey = privateKey.replace(/\\n/g, '\n')
		adminApp = getApps().length
			? (getApps()[0] as unknown as App)
			: initializeApp({
				credential: cert({ projectId, clientEmail, privateKey }),
			})
	}
	return adminApp
}

export function getServerAuth(): AdminAuth {
	if (!adminAuth) {
		adminAuth = getAdminAuth(getAdminApp())
	}
	return adminAuth!
}

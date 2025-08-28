"use client"
import { useEffect } from 'react'
import { getFirebaseAuth } from '@/lib/firebase/client'
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth'

type GoogleIdInit = {
	client_id: string
	callback: (response: { credential: string }) => void
}
type GoogleAccounts = { id: { initialize: (init: GoogleIdInit) => void; prompt: () => void } }
declare global { interface Window { google?: { accounts: GoogleAccounts } } }

export default function GoogleOneTap() {
	useEffect(() => {
		const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
		if (!clientId) return
		if (document.getElementById('google-one-tap')) return
		const s = document.createElement('script')
		s.id = 'google-one-tap'
		s.src = 'https://accounts.google.com/gsi/client'
		s.async = true
		s.defer = true
		s.onload = () => {
			if (!window.google) return
			window.google.accounts.id.initialize({
				client_id: clientId,
				callback: async (response: { credential: string }) => {
					try {
						const auth = await getFirebaseAuth('local')
						const credential = GoogleAuthProvider.credential(response.credential)
						await signInWithCredential(auth, credential)
						// Redirect can be handled by caller page
					} catch (e) {
						console.error('Google One Tap failed', e)
					}
				},
			})
			window.google.accounts.id.prompt()
		}
		document.head.appendChild(s)
	}, [])
	return null
}

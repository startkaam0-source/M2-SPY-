"use client"
import { useEffect } from 'react'

type Grecaptcha = {
	ready: (cb: () => void) => void
	execute: (siteKey: string, opts: { action: string }) => Promise<string>
}
declare global { interface Window { grecaptcha?: Grecaptcha } }

export function RecaptchaBadge() {
	useEffect(() => {
		if (!process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY) return
		if (document.getElementById('recaptcha-script')) return
		const s = document.createElement('script')
		s.id = 'recaptcha-script'
		s.src = `https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`
		s.async = true
		document.head.appendChild(s)
	}, [])
	return null
}

export async function getRecaptchaToken(action: string): Promise<string | null> {
	const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
	if (!siteKey) return null
	return new Promise((resolve) => {
		if (!window.grecaptcha) return resolve(null)
		window.grecaptcha.ready(() => {
			window.grecaptcha!
				.execute(siteKey, { action })
				.then((token: string) => resolve(token))
				.catch(() => resolve(null))
		})
	})
}

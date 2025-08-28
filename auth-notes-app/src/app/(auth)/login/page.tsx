"use client"
import { useState } from 'react'
import { getFirebaseAuth } from '@/lib/firebase/client'
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { RecaptchaBadge, getRecaptchaToken } from '../components/Recaptcha'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
	const router = useRouter()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState<string | null>(null)
	const [loading, setLoading] = useState(false)

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault()
		setError(null)
		setLoading(true)
		try {
			await getRecaptchaToken('login')
			const auth = await getFirebaseAuth('local')
			const cred = await signInWithEmailAndPassword(auth, email.trim(), password)
			fetch('/api/auth/login-history', { method: 'POST', body: JSON.stringify({ uid: cred.user.uid, email: cred.user.email, status: 'success' }) })
			router.push('/dashboard')
		} catch (err: unknown) {
			fetch('/api/auth/login-history', { method: 'POST', body: JSON.stringify({ uid: '', email, status: 'error' }) })
			setError(err instanceof Error ? err.message : 'Login failed')
		} finally {
			setLoading(false)
		}
	}

	async function handleGoogle() {
		setError(null)
		setLoading(true)
		try {
			const auth = await getFirebaseAuth('local')
			const provider = new GoogleAuthProvider()
			await signInWithPopup(auth, provider)
			router.push('/dashboard')
		} catch (err: unknown) {
			setError(err instanceof Error ? err.message : 'Google login failed')
		} finally {
			setLoading(false)
		}
	}

	const GoogleOneTap = dynamic(() => import('../google-one-tap/GoogleOneTap'), { ssr: false })
	return (
		<div className="mx-auto max-w-sm py-12">
			<RecaptchaBadge />
			<GoogleOneTap />
			<h1 className="text-2xl font-semibold mb-6">Login</h1>
			<form onSubmit={handleSubmit} className="space-y-3">
				<input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} className="w-full border rounded px-3 py-2" required />
				<input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} className="w-full border rounded px-3 py-2" required />
				<button disabled={loading} className="w-full bg-black text-white rounded px-3 py-2 disabled:opacity-50">{loading ? 'Signing in...' : 'Login'}</button>
			</form>
			<button onClick={handleGoogle} className="w-full mt-3 border rounded px-3 py-2">Continue with Google</button>
			<div className="mt-4 text-sm flex justify-between">
				<Link href="/signup" className="underline">Create account</Link>
				<Link href="/reset" className="underline">Forgot password?</Link>
			</div>
			{error && <p className="mt-4 text-red-600 text-sm">{error}</p>}
		</div>
	)
}

"use client"
import { useState } from 'react'
import { getFirebaseAuth } from '@/lib/firebase/client'
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth'
import Link from 'next/link'
import { RecaptchaBadge, getRecaptchaToken } from '../components/Recaptcha'
import { useRouter } from 'next/navigation'

export default function SignupPage() {
	const router = useRouter()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState<string | null>(null)
	const [loading, setLoading] = useState(false)
	const [success, setSuccess] = useState<string | null>(null)

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault()
		setError(null)
		setSuccess(null)
		setLoading(true)
		try {
			await getRecaptchaToken('signup')
			const auth = await getFirebaseAuth('local')
			const cred = await createUserWithEmailAndPassword(auth, email.trim(), password)
			if (cred.user) {
				await sendEmailVerification(cred.user)
				setSuccess('Verification email sent. Please verify to access the app.')
			}
			router.push('/login')
		} catch (err: unknown) {
			setError(err instanceof Error ? err.message : 'Signup failed')
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className="mx-auto max-w-sm py-12">
			<RecaptchaBadge />
			<h1 className="text-2xl font-semibold mb-6">Create account</h1>
			<form onSubmit={handleSubmit} className="space-y-3">
				<input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} className="w-full border rounded px-3 py-2" required />
				<input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} className="w-full border rounded px-3 py-2" required />
				<button disabled={loading} className="w-full bg-black text-white rounded px-3 py-2 disabled:opacity-50">{loading ? 'Creating...' : 'Sign up'}</button>
			</form>
			<div className="mt-4 text-sm">
				<Link href="/login" className="underline">Back to login</Link>
			</div>
			{error && <p className="mt-4 text-red-600 text-sm">{error}</p>}
			{success && <p className="mt-4 text-green-700 text-sm">{success}</p>}
		</div>
	)
}

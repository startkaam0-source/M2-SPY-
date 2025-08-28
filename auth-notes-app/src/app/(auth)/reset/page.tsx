"use client"
import { useState } from 'react'
import { getFirebaseAuth } from '@/lib/firebase/client'
import { sendPasswordResetEmail } from 'firebase/auth'
import Link from 'next/link'

export default function ResetPage() {
	const [email, setEmail] = useState('')
	const [error, setError] = useState<string | null>(null)
	const [success, setSuccess] = useState<string | null>(null)
	const [loading, setLoading] = useState(false)

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault()
		setError(null)
		setSuccess(null)
		setLoading(true)
		try {
			const auth = await getFirebaseAuth('local')
			await sendPasswordResetEmail(auth, email.trim())
			setSuccess('Password reset link sent to your email')
		} catch (err: unknown) {
			setError(err instanceof Error ? err.message : 'Failed to send reset email')
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className="mx-auto max-w-sm py-12">
			<h1 className="text-2xl font-semibold mb-6">Reset password</h1>
			<form onSubmit={handleSubmit} className="space-y-3">
				<input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} className="w-full border rounded px-3 py-2" required />
				<button disabled={loading} className="w-full bg-black text-white rounded px-3 py-2 disabled:opacity-50">{loading ? 'Sending...' : 'Send reset link'}</button>
			</form>
			<div className="mt-4 text-sm">
				<Link href="/login" className="underline">Back to login</Link>
			</div>
			{error && <p className="mt-4 text-red-600 text-sm">{error}</p>}
			{success && <p className="mt-4 text-green-700 text-sm">{success}</p>}
		</div>
	)
}

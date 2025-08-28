"use client"
import { useEffect, useState } from 'react'
import { getFirebaseAuth } from '@/lib/firebase/client'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import Link from 'next/link'

export default function DashboardPage() {
	const [userEmail, setUserEmail] = useState<string | null>(null)

	useEffect(() => {
		let unsub = () => {}
		getFirebaseAuth('local').then(auth => {
			unsub = onAuthStateChanged(auth, (user) => {
				if (user?.emailVerified === false) {
					setUserEmail(null)
					return
				}
				setUserEmail(user?.email ?? null)
			})
		})
		return () => unsub()
	}, [])

	async function handleLogout() {
		const auth = await getFirebaseAuth('local')
		await signOut(auth)
	}

	if (!userEmail) {
		return (
			<div className="mx-auto max-w-lg py-12">
				<p className="mb-4">You are not logged in or email not verified.</p>
				<Link href="/login" className="underline">Go to login</Link>
			</div>
		)
	}

	return (
		<div className="mx-auto max-w-lg py-12 space-y-4">
			<h1 className="text-2xl">Welcome, {userEmail}</h1>
			<button onClick={handleLogout} className="border rounded px-3 py-2">Logout</button>
		</div>
	)
}

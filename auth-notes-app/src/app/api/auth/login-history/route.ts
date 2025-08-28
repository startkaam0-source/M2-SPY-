import { NextResponse } from 'next/server'

export async function POST(req: Request) {
	try {
		const { uid, email, status } = await req.json()
		const ip = req.headers.get('x-forwarded-for') || '0.0.0.0'
		const userAgent = req.headers.get('user-agent') || ''
		// Placeholder: In a real app, write to Firestore/DB
		console.log('login_history', { uid, email, status, ip, userAgent, at: Date.now() })
		return NextResponse.json({ ok: true })
	} catch (e) {
		return NextResponse.json({ ok: false }, { status: 400 })
	}
}

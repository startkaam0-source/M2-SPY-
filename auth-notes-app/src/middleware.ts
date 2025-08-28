import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
	const url = req.nextUrl
	const isAuthRoute = url.pathname.startsWith('/login') || url.pathname.startsWith('/signup') || url.pathname.startsWith('/reset')
	const isMaintenance = process.env.MAINTENANCE_MODE === 'true'
	if (isMaintenance && !url.pathname.startsWith('/maintenance')) {
		url.pathname = '/maintenance'
		return NextResponse.rewrite(url)
	}
	// Future: add session cookie checks and blocklist
	return NextResponse.next()
}

export const config = {
	matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}

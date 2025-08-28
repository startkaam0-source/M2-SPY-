export default function Home() {
	return (
		<div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
			<header className="sticky top-0 bg-white/70 backdrop-blur border-b z-10">
				<div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
					<div className="flex items-center gap-3">
						<span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-black text-white font-bold">A</span>
						<span className="font-semibold">Auth Notes</span>
					</div>
					<nav className="flex items-center gap-3 text-sm">
						<a className="hover:underline" href="#features">Features</a>
						<a className="hover:underline" href="#security">Security</a>
						<a className="hover:underline" href="#notes">Notes</a>
						<a className="hover:underline" href="#payments">Payments</a>
						<a className="hover:underline" href="#quiz">Quiz</a>
						<a className="hover:underline" href="#notifications">Notifications</a>
						<a className="hover:underline" href="#admin">Admin</a>
						<a className="hover:underline" href="#extras">Extras</a>
					</nav>
					<div className="flex gap-3">
						<a href="/login" className="px-3 py-2 border rounded text-sm">Login</a>
						<a href="/signup" className="px-3 py-2 bg-black text-white rounded text-sm">Get Started</a>
					</div>
				</div>
			</header>
			<main className="mx-auto max-w-6xl px-4 py-16">
				<section className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
					<div>
						<h1 className="text-4xl md:text-5xl font-semibold tracking-tight">All-in-one Notes, Quiz, and Payments Platform</h1>
						<p className="mt-4 text-gray-600">Starter scaffold with Firebase Auth (email, Google), password reset, maintenance mode. Expand to 200+ features incrementally.</p>
						<div className="mt-6 flex gap-3">
							<a href="/signup" className="px-4 py-2 bg-black text-white rounded">Create account</a>
							<a href="/login" className="px-4 py-2 border rounded">Login</a>
						</div>
					</div>
					<div className="border rounded-xl p-6 bg-white shadow-sm">
						<h3 className="font-medium mb-3">Quick Links</h3>
						<ul className="space-y-2 text-sm">
							<li><a className="underline" href="/dashboard">Dashboard (Protected)</a></li>
							<li><a className="underline" href="/maintenance">Maintenance</a></li>
							<li><a className="underline" href="https://firebase.google.com/docs/auth" target="_blank" rel="noreferrer">Firebase Auth Docs</a></li>
						</ul>
					</div>
				</section>
			</main>
		</div>
	)
}

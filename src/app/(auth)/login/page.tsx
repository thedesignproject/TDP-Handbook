"use client";

import { createClient } from "@/utils/supabase/client";
import { useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";

function LoginContent() {
	const searchParams = useSearchParams();
	const [email, setEmail] = useState("");
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState<{
		type: "success" | "error";
		text: string;
	} | null>(null);

	useEffect(() => {
		const error = searchParams.get("error");
		if (error === "unauthorized_domain") {
			setMessage({
				type: "error",
				text: "Your email domain is not authorized to access this site.",
			});
		} else if (error === "auth_failed") {
			setMessage({
				type: "error",
				text: "Authentication failed. Please try again.",
			});
		}
	}, [searchParams]);

	const supabase = createClient();

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setMessage(null);

		// Check domain restriction
		const allowedDomains = process.env.NEXT_PUBLIC_ALLOWED_EMAIL_DOMAINS?.split(
			",",
		).map((d) => d.trim().toLowerCase());

		if (allowedDomains && allowedDomains.length > 0) {
			const emailDomain = email.split("@")[1]?.toLowerCase();
			if (!emailDomain || !allowedDomains.includes(emailDomain)) {
				setMessage({
					type: "error",
					text: `Access is restricted to authorized email domains.`,
				});
				setLoading(false);
				return;
			}
		}

		const { error } = await supabase.auth.signInWithOtp({
			email,
			options: {
				emailRedirectTo: `${window.location.origin}/auth/callback`,
			},
		});

		if (error) {
			setMessage({ type: "error", text: error.message });
		} else {
			setMessage({
				type: "success",
				text: "Check your email for a magic link to sign in.",
			});
		}

		setLoading(false);
	};

	return (
		<div className="w-full max-w-md space-y-8 rounded-lg border border-neutral-200 bg-white p-8 shadow-lg dark:border-neutral-800 dark:bg-neutral-900">
				<div className="text-center">
					<h1 className="text-2xl font-bold text-neutral-900 dark:text-white">
						Sign in to TDP SOPs
					</h1>
					<p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
						Access is restricted to authorized users only.
					</p>
				</div>

				<form onSubmit={handleLogin} className="mt-8 space-y-6">
					<div>
						<label
							htmlFor="email"
							className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
						>
							Email address
						</label>
						<input
							id="email"
							name="email"
							type="email"
							autoComplete="email"
							required
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className="mt-1 block w-full rounded-md border border-neutral-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
							placeholder="you@company.com"
						/>
					</div>

					{message && (
						<div
							className={`rounded-md p-3 text-sm ${
								message.type === "success"
									? "bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-400"
									: "bg-red-50 text-red-800 dark:bg-red-900/20 dark:text-red-400"
							}`}
						>
							{message.text}
						</div>
					)}

					<button
						type="submit"
						disabled={loading}
						className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
					>
						{loading ? "Sending..." : "Send magic link"}
					</button>
			</form>
		</div>
	);
}

export default function LoginPage() {
	return (
		<Suspense fallback={
			<div className="w-full max-w-md space-y-8 rounded-lg border border-neutral-200 bg-white p-8 shadow-lg dark:border-neutral-800 dark:bg-neutral-900">
				<div className="text-center">
					<h1 className="text-2xl font-bold text-neutral-900 dark:text-white">
						Sign in to TDP SOPs
					</h1>
					<p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
						Loading...
					</p>
				</div>
			</div>
		}>
			<LoginContent />
		</Suspense>
	);
}

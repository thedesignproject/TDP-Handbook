"use client";

import { useTheme } from "next-themes";

export function AuthHeader() {
	const { theme, setTheme } = useTheme();

	return (
		<header className="flex items-center justify-between px-6 py-4">
			<a href="/" className="flex items-center">
				<img src="/favicon.svg" alt="Logo" className="h-8 w-8" />
			</a>
			<button
				type="button"
				className="p-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
				onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
				aria-label="Toggle dark mode"
			>
				<svg
					className="h-5 w-5 text-neutral-600 dark:text-neutral-400"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
					/>
				</svg>
			</button>
		</header>
	);
}

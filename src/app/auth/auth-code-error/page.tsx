import Link from "next/link";

export default function AuthCodeErrorPage() {
	return (
		<div className="flex min-h-screen items-center justify-center">
			<div className="w-full max-w-md space-y-4 p-8 text-center">
				<h1 className="text-2xl font-bold text-red-600">Authentication Error</h1>
				<p className="text-gray-600">
					There was an error during the authentication process. Please try again.
				</p>
				<Link
					href="/auth/login"
					className="inline-block rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
				>
					Back to Login
				</Link>
			</div>
		</div>
	);
}

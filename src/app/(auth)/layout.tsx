import type React from "react";
import { AuthHeader } from "./auth-header";

export default function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="h-screen flex flex-col bg-background-color overflow-hidden">
			<AuthHeader />
			<main className="flex-1 flex items-center justify-center">
				{children}
			</main>
		</div>
	);
}

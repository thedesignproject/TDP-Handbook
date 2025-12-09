"use client";

import { createClient } from "@/lib/supabase/client";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export function LogoutButton() {
	const supabase = createClient();
	const router = useRouter();

	const handleLogout = async () => {
		await supabase.auth.signOut();
		router.push("/auth/login");
		router.refresh();
	};

	return (
		<button
			type="button"
			onClick={handleLogout}
			title="Logout"
			className="inline-flex cursor-pointer items-center justify-center rounded-full p-2 text-fd-muted-foreground transition-colors hover:bg-fd-accent hover:text-fd-accent-foreground"
		>
			<LogOut className="size-4" />
		</button>
	);
}

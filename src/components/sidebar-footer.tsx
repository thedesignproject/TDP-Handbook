"use client";

import { createClient } from "@/lib/supabase/client";
import { LogOut, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function SidebarFooter() {
	const supabase = createClient();
	const router = useRouter();
	const { resolvedTheme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => setMounted(true), []);

	const value = mounted ? resolvedTheme : null;

	return (
		<>
			<button
				type="button"
				onClick={async () => {
					await supabase.auth.signOut();
					router.push("/auth/login");
					router.refresh();
				}}
				title="Logout"
				className="inline-flex cursor-pointer items-center justify-center rounded-full p-2 text-fd-muted-foreground transition-colors hover:bg-fd-accent hover:text-fd-accent-foreground"
			>
				<LogOut className="size-4" />
			</button>
			<button
				onClick={() => setTheme(value === "light" ? "dark" : "light")}
				className="ms-auto inline-flex cursor-pointer items-center rounded-full border p-1"
				aria-label="Toggle Theme"
			>
				<Sun fill="currentColor" className={`size-6.5 rounded-full p-1.5 ${value === "light" ? "bg-fd-accent text-fd-accent-foreground" : "text-fd-muted-foreground"}`} />
				<Moon fill="currentColor" className={`size-6.5 rounded-full p-1.5 ${value === "dark" ? "bg-fd-accent text-fd-accent-foreground" : "text-fd-muted-foreground"}`} />
			</button>
		</>
	);
}

import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

export async function updateSession(request: NextRequest) {
	let supabaseResponse = NextResponse.next({
		request,
	});

	const supabase = createServerClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
		{
			cookies: {
				getAll() {
					return request.cookies.getAll();
				},
				setAll(cookiesToSet) {
					for (const { name, value } of cookiesToSet) {
						request.cookies.set(name, value);
					}
					supabaseResponse = NextResponse.next({
						request,
					});
					for (const { name, value, options } of cookiesToSet) {
						supabaseResponse.cookies.set(name, value, options);
					}
				},
			},
		},
	);

	const {
		data: { user },
	} = await supabase.auth.getUser();

	// Allow access to login page and auth callback
	const isLoginPage = request.nextUrl.pathname === "/login";
	const isAuthCallback = request.nextUrl.pathname === "/auth/callback";
	const isAdminRoute = request.nextUrl.pathname.startsWith("/admin");

	// Skip auth for TinaCMS admin routes (has its own auth)
	if (isAdminRoute) {
		return supabaseResponse;
	}

	// Allow unauthenticated access to login and callback
	if (isLoginPage || isAuthCallback) {
		// If user is already logged in and on login page, redirect to home
		if (user && isLoginPage) {
			const url = request.nextUrl.clone();
			url.pathname = "/";
			return NextResponse.redirect(url);
		}
		return supabaseResponse;
	}

	// Protect all other routes - redirect to login if not authenticated
	if (!user) {
		const url = request.nextUrl.clone();
		url.pathname = "/login";
		return NextResponse.redirect(url);
	}

	return supabaseResponse;
}

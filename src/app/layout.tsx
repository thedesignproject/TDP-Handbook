import "@/styles/global.css";
import settings from "@/content/settings/config.json";
import { ThemeProvider } from "next-themes";
import { Inter, Roboto_Flex } from "next/font/google";
import type React from "react";

const body = Inter({ subsets: ["latin"], variable: "--body-font" });
const heading = Roboto_Flex({
	subsets: ["latin"],
	weight: ["400"],
	style: ["normal"],
	variable: "--heading-font",
});

const theme = settings.selectedTheme || "default";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" className={`theme-${theme}`} suppressHydrationWarning>
			<head>
				<meta name="theme-color" content="#E6FAF8" />
				<link rel="alternate" type="application/rss+xml" href="/rss.xml" />
				<link rel="icon" type="image/png" href="/favicon.png" />
			</head>
			<body className={`${body.variable} ${heading.variable}`}>
				<ThemeProvider
					attribute="class"
					defaultTheme={theme}
					enableSystem={true}
					disableTransitionOnChange={false}
				>
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}

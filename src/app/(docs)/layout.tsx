import AdminLink from "@/components/ui/admin-link";
import { TailwindIndicator } from "@/components/ui/tailwind-indicator";
import { ThemeSelector } from "@/components/ui/theme-selector";
import client from "@/tina/__generated__/client";
import { TabsLayout } from "@/components/docs/layout/tab-layout";
import type React from "react";
import { TinaClient } from "../tina-client";

const isThemeSelectorEnabled =
	process.env.NODE_ENV === "development" ||
	process.env.NEXT_PUBLIC_ENABLE_THEME_SELECTION === "true";

export default function DocsLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			{isThemeSelectorEnabled && <ThemeSelector />}
			<Content>
				<DocsMenu>{children}</DocsMenu>
			</Content>
		</>
	);
}

const Content = ({ children }: { children?: React.ReactNode }) => (
	<>
		<AdminLink />
		<TailwindIndicator />
		<div className="font-sans flex min-h-screen flex-col bg-background-color">
			<div className="flex flex-1 flex-col items-center">{children}</div>
		</div>
	</>
);

const DocsMenu = async ({ children }: { children?: React.ReactNode }) => {
	const navigationData = await client.queries.minimisedNavigationBarFetch({
		relativePath: "docs-navigation-bar.json",
	});

	return (
		<div className="relative flex flex-col w-full pb-2">
			<TinaClient
				props={{
					query: navigationData.query,
					variables: navigationData.variables,
					data: navigationData.data,
					children,
				}}
				Component={TabsLayout}
			/>
		</div>
	);
};

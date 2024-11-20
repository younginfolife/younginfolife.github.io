"use client";

import React from 'react'
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import Image from 'next/image';

interface NavigationLinks {
	title: string;
	href: string;
}

const allNavigationLinks: NavigationLinks[] = [
	{
		title: "Home",
		href: "/",
	},
	{
		title: "Squadra",
		href: "/about",
	},
	//{
	//	title: "Contatti",
	//	href: "/contact",
	//},
	{
		title: "Eventi",
		href: "/events",
	},
	{
		title: "Publicazioni",
		href: "/publications",
	},
	{
		title: "Iscriviti",
		href: "/apply",
	}
]

export const AppNavbar = () => {
	const pathname = usePathname();
	return (
		<nav className="mx-auto bg-background sticky top-0 z-10 rounded-full mt-2 my-8 shadow-lg max-w-fit flex items-center">
			<div className="relative w-24 h-8 block mx-4">
				<Image src="/logo.png" alt="Logo" fill />
			</div>
			<NavigationMenu className="mx-auto p-2">
				<NavigationMenuList>
					{allNavigationLinks.map((e, key) =>
						<NavigationMenuItem key={key}>
							<Link href={e.href} legacyBehavior passHref>
								<NavigationMenuLink className={navigationMenuTriggerStyle()} active={pathname === e.href}>
									{e.title}
								</NavigationMenuLink>
							</Link>
						</NavigationMenuItem>
					)}
				</NavigationMenuList>
			</NavigationMenu>
		</nav>
	)
}

"use client";

import React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

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
    title: "Storia",
    href: "/about",
  },
  {
    title: "Squadra",
    href: "/team",
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
  },
];

export const AppNavbar = () => {
  const pathname = usePathname();
  return (
    <nav className="mx-auto bg-background sticky top-0 z-10 rounded-full mt-2 my-8 shadow-lg max-w-fit flex items-center">
      <Link href="/" className="relative w-24 h-8 block mx-4">
        <Image src="/logo.png" alt="Logo" fill />
      </Link>
      <div className="block md:hidden"></div>
      <NavigationMenu className="mx-auto p-2">
        <div className="md:block hidden">
          <NavigationMenuList>
            {allNavigationLinks.map((e, key) => (
              <NavigationMenuItem key={key}>
                <Link href={e.href} legacyBehavior passHref>
                  <NavigationMenuLink
                    className={navigationMenuTriggerStyle()}
                    active={pathname === e.href}
                  >
                    {e.title}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </div>
        <div className="block md:hidden">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className={navigationMenuTriggerStyle()}>
                  Menu
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  {allNavigationLinks.map((e, key) => (
                    <Link href={e.href} legacyBehavior passHref key={key}>
                      <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                        active={pathname === e.href}
                      >
                        {e.title}
                      </NavigationMenuLink>
                    </Link>
                  ))}
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </NavigationMenu>
    </nav>
  );
};

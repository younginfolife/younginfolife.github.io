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
import Image from "next/image";
import {LocaleSwitcher} from './LocaleSwitcher';

interface NavigationLinks {
  title: string;
  href: string;
}

interface AppNavbarProps {
  locale: string;
  labels?: {
    home: string;
    about: string;
    team: string;
    events: string;
    publications: string;
    apply: string;
  };
}

export const AppNavbar = ({ locale, labels }: AppNavbarProps) => {
  const defaultLabels = {
    home: locale === 'it' ? 'Home' : 'Home',
    about: locale === 'it' ? 'Chi Siamo' : 'About',
    team: locale === 'it' ? 'Team' : 'Team',
    events: locale === 'it' ? 'Eventi' : 'Events',
    publications: locale === 'it' ? 'Pubblicazioni' : 'Publications',
    apply: locale === 'it' ? 'Candidati' : 'Apply',
  };
  
  const t = labels || defaultLabels;
  
  const allNavigationLinks: NavigationLinks[] = [
    { title: t.home, href: "/" },
    { title: t.about, href: "/about" },
    { title: t.team, href: "/team" },
    { title: t.events, href: "/events" },
    { title: t.publications, href: "/publications" },
    { title: t.apply, href: "/apply" },
  ];

  // Helper to create locale-aware paths
  const getLocalizedHref = (path: string) => {
    if (path === "/") return `/${locale}`;
    return `/${locale}${path}`;
  };

  return (
    <nav className="mx-auto bg-background sticky top-0 z-10 rounded-full mt-2 my-8 shadow-lg max-w-fit flex items-center">
      <Link href={getLocalizedHref("/")} className="relative w-24 h-8 block mx-4">
        <Image src="/logo.png" alt="Logo" fill />
      </Link>
      <div className="block md:hidden"></div>
      <NavigationMenu className="mx-auto p-2">
        <div className="md:block hidden">
          <NavigationMenuList>
            {allNavigationLinks.map((e, key) => (
              <NavigationMenuItem key={key}>
                <Link href={getLocalizedHref(e.href)} legacyBehavior passHref>
                  <NavigationMenuLink
                    className={navigationMenuTriggerStyle()}
                  >
                    {e.title}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ))}
            <NavigationMenuItem>
              <div className="ml-4 pl-4 border-l border-gray-300">
                <LocaleSwitcher locale={locale} />
              </div>
            </NavigationMenuItem>
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
                    <Link href={getLocalizedHref(e.href)} legacyBehavior passHref key={key}>
                      <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                      >
                        {e.title}
                      </NavigationMenuLink>
                    </Link>
                  ))}
                  <div className="p-2">
                    <LocaleSwitcher locale={locale} />
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </NavigationMenu>
    </nav>
  );
};

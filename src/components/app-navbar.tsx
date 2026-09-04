"use client";

import React, { useState, useEffect } from "react";
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
import {useTranslations, useLocale} from 'next-intl';
import {LocaleSwitcher} from './LocaleSwitcher';

interface NavigationLinks {
  title: string;
  href: string;
}

export const AppNavbar = () => {
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations('navigation');
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  const allNavigationLinks: NavigationLinks[] = [
    {
      title: t('home'),
      href: "/",
    },
    {
      title: t('about'),
      href: "/about",
    },
    {
      title: t('team'),
      href: "/team",
    },
    {
      title: t('events'),
      href: "/events",
    },
    {
      title: t('publications'),
      href: "/publications",
    },
    {
      title: t('apply'),
      href: "/apply",
    },
  ];

  const isActive = (href: string) => {
    if (!mounted) return false;
    const fullPath = `/${locale}${href}`;
    return pathname === fullPath || pathname.endsWith(href);
  };

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
                    active={isActive(e.href)}
                  >
                    {e.title}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ))}
            <NavigationMenuItem>
              <div className="ml-4 pl-4 border-l border-gray-300">
                <LocaleSwitcher />
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
                    <Link href={e.href} legacyBehavior passHref key={key}>
                      <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                        active={isActive(e.href)}
                      >
                        {e.title}
                      </NavigationMenuLink>
                    </Link>
                  ))}
                  <div className="p-2">
                    <LocaleSwitcher />
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

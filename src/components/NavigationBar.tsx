"use client";

import React from "react";
import { NavigationButton } from "./NavigationButton";
import { useScroll } from "@/hooks/useScroll";

export default function NavigationBar() {
  const scrollPosition = useScroll();

  return (
    <nav
      className={[
        "bg-white/85 shadow-lg flex p-2 md:justify-between gap-2 w-auto",
        "items-start flex-row mx-auto sticky top-0 backdrop-blur-lg",
        "backdrop-brightness-125 z-50",
        "transition-all md:max-w-fit max-w-full md:rounded-full w-full md:w-auto",
        scrollPosition > 20 ? "scale-100" : "md:scale-125",
      ].join(" ")}
    >
      <NavigationButton href="/">Home</NavigationButton>
      <NavigationButton href="/about">Squadra</NavigationButton>
      <NavigationButton href="/events">Eventi</NavigationButton>
      <NavigationButton href="/activities">Attività</NavigationButton>
      <NavigationButton href="/contacts">Contatti</NavigationButton>
    </nav>
  );
}

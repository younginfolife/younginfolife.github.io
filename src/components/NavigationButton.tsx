"use client";

import { usePathname } from "next/navigation";

interface NavigationButtonProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {}

export function NavigationButton(props: NavigationButtonProps) {
  const pathname = usePathname();
  return (
    <a
      className={[
        props.className,
        pathname === props.href ? "bg-black text-white font-bold" : "",
        "rounded-full px-4 py-1",
      ].join(" ")}
      {...props}
    />
  );
}

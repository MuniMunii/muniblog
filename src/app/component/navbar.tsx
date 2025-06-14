"use client";
import React, { useEffect, useRef, useState } from "react";
// import { Link } from "react-router-dom";;
import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
export default function Navbar() {
  const [indicatorProps, setIndicatorProps] = useState({ x: 0, width: 0 });
    const [hoverRect, setHoverRect] = useState<{ x: number; width: number } | null>(null);
  const navList = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
  ];
  const navRef = useRef<HTMLDivElement | null>(null);
  const pathName = usePathname();
  useEffect(() => {
    const activeLink = navRef?.current?.querySelector(`[data-active="true"]`);
    if (activeLink) {
      const { offsetLeft, offsetWidth } = activeLink as HTMLElement;
      setIndicatorProps({ x: offsetLeft, width: offsetWidth });
    }
  }, [pathName]);
  const indicator = hoverRect ?? indicatorProps;
  return (
    <div className="w-full bg-neutral-900 p-2 z-[999] text-center text-white select-none"
    onMouseLeave={() => setHoverRect(null)}>
      <div
        className="mx-auto max-w-[1000px] h-full w-[90%] flex items-center justify-between"
        ref={navRef}
      >
        <div className="text-2xl">MuniBlog</div>
        <div className="flex gap-2 relative">
          <motion.div
            layout
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            animate={{ x: indicator.x, width: indicator.width }}
            className={`absolute bg-blue-400 h-full rounded-md`}
          />
          {navList.map((link, index) => {
            const isActive = pathName === link.href;
            return (
              <Link
                className={`py-2 px-4 relative `}
                key={link.href}
                data-active={isActive}
                href={link.href}
                onMouseEnter={(e) => {
                const target = e.currentTarget as HTMLElement;
                setHoverRect({ x: target.offsetLeft, width: target.offsetWidth });
              }}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

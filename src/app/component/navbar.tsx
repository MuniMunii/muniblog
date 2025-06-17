"use client";
import React, {useEffect, useRef, useState } from "react";
// import { Link } from "react-router-dom";;
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import useMediaQuery from "../hook/useMediaQuery";
import { MenuButton } from "./menuButton";
export default function Navbar() {
  const [indicatorProps, setIndicatorProps] = useState({ x: 0, width: 0 });
  const [hoverRect, setHoverRect] = useState<{
    x: number;
    width: number;
  } | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const isMobile = useMediaQuery("(max-width:640px)");
  const navList = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
  ];
  const navRef = useRef<HTMLDivElement | null>(null);
  const pathName = usePathname();
  useEffect(() => {
    const activeLink = navRef?.current?.querySelector(`[data-active="true"]`);
    if (activeLink && !isMobile) {
      const { offsetLeft, offsetWidth } = activeLink as HTMLElement;
      setIndicatorProps({ x: offsetLeft, width: offsetWidth });
    }
  }, [pathName]);
  useEffect(() => {
    if(!isOpen)document.body.style.overflow = "auto";
    else{document.body.style.overflow = "hidden"
    document.body.style.userSelect = "none"
    }
  }, [isOpen]);
  const indicator = hoverRect ?? indicatorProps;
  return (
    <div
      className="w-full bg-neutral-900 p-2 text-center text-white select-none relative z-50"
      onMouseLeave={() => setHoverRect(null)}
    >
      <div
        className="mx-auto max-w-[1000px] h-full w-[90%] flex items-center justify-between"
        ref={navRef}
      >
        <div className="text-2xl">MuniBlog</div>
        <div className="flex gap-2 relative">
          {indicator.width > 0 && !isMobile && (
            <motion.div
              layout
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              initial={false}
              animate={{ x: indicator.x, width: indicator.width }}
              className={`absolute bg-blue-400 h-full rounded-md`}
            />
          )}
          {!isMobile &&
            navList.map((link) => {
              const isActive = pathName === link.href;
              return (
                <Link
                  className={`py-2 px-4 relative `}
                  key={link.href}
                  data-active={isActive}
                  href={link.href}
                  onMouseEnter={(e) => {
                    const target = e.currentTarget as HTMLElement;
                    setHoverRect({
                      x: target.offsetLeft,
                      width: target.offsetWidth,
                    });
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          {isMobile && (
            <MenuButton
              isOpen={isOpen}
              onClick={() => setIsOpen(!isOpen)}
              color="white"
              z={999}
              style={{ position: "relative" }}
            />
          )}
          <AnimatePresence>
            {isMobile && isOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed size-full top-0 right-0 bg-white/40 flex justify-center items-center z-40 pointer-events-none"
              >
                <div className="pointer-events-auto">
                  {navList.map((link) => {
                    return (
                      <Link
                        className={`py-2 px-4 relative `}
                        key={link.href}
                        href={link.href}
                        onClick={()=>setIsOpen(false)}
                        onMouseEnter={(e) => {
                          const target = e.currentTarget as HTMLElement;
                          setHoverRect({
                            x: target.offsetLeft,
                            width: target.offsetWidth,
                          });
                        }}
                      >
                        {link.label}
                      </Link>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

"use client";

import { Code2, ShieldPlus } from "lucide-react";
import Link from "next/link";
import MainNav from "./main-nav";
import { ModeToggle } from "./mode-toggle";
import MobileNav from "./mobile-nav";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const Navbar = () => {
   const pathname = usePathname();

   const routes = [
      {
         href: "/safe",
         label: "Safe zones",
         active: pathname === "/safe",
      },
      {
         href: "/hospitals",
         label: "Hospitals",
         active: pathname === "/hospitals",
      },
   ];

   const [show, setShow] = useState(true);
   const [lastScrollY, setLastScrollY] = useState(0);

   const controlNavbar = () => {
      if (typeof window !== "undefined") {
         if (window.scrollY > lastScrollY && window.scrollY > 80) {
            setShow(false);
         } else {
            setShow(true);
         }

         setLastScrollY(window.scrollY);
      }
   };

   useEffect(() => {
      if (typeof window !== "undefined") {
         window.addEventListener("scroll", controlNavbar);

         return () => {
            window.removeEventListener("scroll", controlNavbar);
         };
      }
   }, [lastScrollY, controlNavbar]);

   return (
      <nav
         className={cn(
            "flex items-center border-b z-50 bg-background transition-all fixed w-full px-4",
            show ? "py-2 h-16" : "h-0 py-0 overflow-hidden"
         )}
      >
         <div className="flex items-center w-full animate-enter-top">
            <div className="flex gap-x-6">
               <Link
                  href={"/"}
                  className="text-md font-semibold flex gap-x-2 py-2 px-2 items-center"
               >
                  <div className="bg-black dark:bg-white p-1.5 rounded-lg">
                     <ShieldPlus
                        size={20}
                        className="text-white dark:text-black"
                     />
                  </div>
                  RapidEscape
               </Link>
               <MainNav routes={routes} />
            </div>
            <div className="flex items-center space-x-4 ml-auto">
               <Link
                  href="https://github.com/ArjunVarshney/Rapid-Escape"
                  className="p-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 hidden sm:block"
               >
                  <Code2 size={20} />
               </Link>
               <ModeToggle />
               <MobileNav
                  routes={[
                     ...routes,
                     {
                        href: "https://github.com/ArjunVarshney/Body-works",
                        label: "View on Github",
                        active: false,
                     },
                  ]}
               />
            </div>
         </div>
      </nav>
   );
};

export default Navbar;

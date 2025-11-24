"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

// ICONS
import { ChevronDown, ChevronUp, Menu, X } from "lucide-react";

// LOGO
import imageLogo from "@/assets/svg/icon.svg";

// =============== TYPES ===================
interface UserType {
  name?: string;
  email?: string;
}

interface SubLink {
  title: string;
  link: string;
}

interface NavItem {
  title: string;
  link?: string;
  subLinks?: SubLink[];
}

// =============== NAVIGATION DATA ===============
const getNavigationLinks = (user: UserType | null): NavItem[] => {
  const baseLinks: NavItem[] = [
    { title: "Home", link: "/" },
    { title: "About Us", link: "/about-us-more-information" },
    {
      title: "B.A. Shape Formats",
      subLinks: [
        { title: "1st Layer", link: "/b-a-shape-formats/1st-layer" },
        { title: "2nd Layer", link: "/b-a-shape-formats/2nd-layer" },
        { title: "3rd Layer", link: "/b-a-shape-formats/3rd-layer" },
        { title: "4th Layer", link: "/b-a-shape-formats/4th-layer" },
        { title: "5th Layer", link: "/b-a-shape-formats/5th-layer" },
        { title: "6th Layer", link: "/b-a-shape-formats/6th-layer" },
        { title: "7th Layer", link: "/b-a-shape-formats/7th-layer" },
      ],
    },
  ];

  if (user) {
    baseLinks.splice(2, 0, { title: "Dashboard", link: "/dashboard" });
  }

  baseLinks.push(
    {
      title: "Contribute",
      subLinks: [
        { title: "Blank Format", link: "/contribute/blank-format" },
        { title: "Upload PDF", link: "/contribute/upload-pdf" },
      ],
    },
    { title: "PDF Download", link: "/pdf-download" },
    { title: "Blog", link: "/blog-us" }
  );

  return baseLinks;
};

// ================= NAVBAR COMPONENT ==================
export default function PublicNavbar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [desktopSubMenu, setDesktopSubMenu] = useState<number | null>(null);
  const [activeSubMenu, setActiveSubMenu] = useState<number | null>(null);

  const pathname = usePathname();
  const user: UserType | null = null; // ← এখানে user বসাও

  const navigationLinks = getNavigationLinks(user);

  const isActive = (link?: string): boolean => {
    if (!link) return false;
    return link === "/" ? pathname === "/" : pathname.startsWith(link);
  };

  const mobileMenuVariants = {
    hidden: { x: "-100%" },
    visible: { x: 0 },
    exit: { x: "-100%" },
  };

  return (
    <div className="fixed top-0 left-0 w-full bg-white shadow-lg z-50 px-2 py-2">
      <div className="max-w-[1400px] mx-auto h-[70px] flex justify-between items-center">
        {/* LOGO */}
        <Link href="/">
          <Image src={imageLogo} alt="Logo" width={80} height={40} />
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-5 font-semibold text-lg">
          {navigationLinks.map((item, index) => (
            <div
              key={index}
              className="relative"
              onMouseEnter={() => setDesktopSubMenu(index)}
              onMouseLeave={() => setDesktopSubMenu(null)}
            >
              {/* Parent item */}
              {item.subLinks ? (
                <div className="flex items-center cursor-pointer">
                  <span
                    className={`px-2 py-1 ${
                      isActive(item.link) ? "text-teal-700" : "text-black"
                    }`}
                  >
                    {item.title}
                  </span>
                  {desktopSubMenu === index ? (
                    <ChevronUp size={18} />
                  ) : (
                    <ChevronDown size={18} />
                  )}
                </div>
              ) : (
                <Link
                  href={item.link!}
                  className={`px-3 py-1 ${
                    isActive(item.link) ? "text-teal-700" : "text-black"
                  }`}
                >
                  {item.title}
                </Link>
              )}

              {/* Dropdown */}
              <AnimatePresence>
                {item.subLinks && desktopSubMenu === index && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    className="absolute top-full left-0 mt-1 bg-white shadow-md border rounded-md min-w-[200px] py-2 z-50"
                  >
                    {item.subLinks.map((sub) => (
                      <Link
                        key={sub.title}
                        href={sub.link}
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        {sub.title}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}

          {/* LOGIN / LOGOUT */}
          {user ? (
            <button className="px-4 py-2 bg-red-100 text-red-600 rounded-md">
              Logout
            </button>
          ) : (
            <Link
              href="/login"
              className="px-4 py-2 bg-teal-700 text-white rounded-md"
            >
              Login
            </Link>
          )}
        </div>

        {/* MOBILE BUTTON */}
        <button
          onClick={() => setIsOpen(true)}
          className="md:hidden bg-teal-600 p-2 rounded text-white"
        >
          <Menu size={26} />
        </button>
      </div>

      {/* MOBILE SIDEBAR */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black/60 z-40"
              onClick={() => setIsOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Drawer */}
            <motion.div
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-y-0 left-0 w-4/5 max-w-sm bg-white z-50 p-4 shadow-lg"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <Image src={imageLogo} width={80} height={40} alt="Logo" />
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 bg-red-100 text-red-600 rounded"
                >
                  <X size={28} />
                </button>
              </div>

              {/* Mobile Links */}
              <div className="space-y-3">
                {navigationLinks.map((item, index) => (
                  <div key={index} className="border-b pb-2">
                    {item.subLinks ? (
                      <>
                        <div
                          className="flex justify-between items-center"
                          onClick={() =>
                            setActiveSubMenu(
                              activeSubMenu === index ? null : index
                            )
                          }
                        >
                          <span className="font-semibold">{item.title}</span>
                          {activeSubMenu === index ? (
                            <ChevronUp size={22} />
                          ) : (
                            <ChevronDown size={22} />
                          )}
                        </div>

                        {/* Dropdown */}
                        <AnimatePresence>
                          {activeSubMenu === index && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="pl-4 space-y-2 mt-2"
                            >
                              {item.subLinks.map((sub) => (
                                <Link
                                  key={sub.title}
                                  href={sub.link}
                                  onClick={() => setIsOpen(false)}
                                  className="block py-2 text-gray-700"
                                >
                                  {sub.title}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link
                        href={item.link!}
                        onClick={() => setIsOpen(false)}
                        className="block py-1 font-semibold"
                      >
                        {item.title}
                      </Link>
                    )}
                  </div>
                ))}
              </div>

              {/* Login Button */}
              <div className="mt-6">
                {user ? (
                  <button className="w-full py-3 bg-red-600 text-white rounded-md">
                    Logout
                  </button>
                ) : (
                  <Link
                    href="/login"
                    className="block text-center py-3 bg-teal-700 text-white rounded-md"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Link>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

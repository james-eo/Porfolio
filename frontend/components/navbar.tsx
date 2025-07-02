"use client";

import React, { useState } from "react";
import { ModeToggle } from "./mode-toggle";
import { usePathname } from "next/navigation";
import { ThemeProvider } from "./theme-provider";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");
  const isResume = pathname.startsWith("/resume");
  // const { data: session } = useSession();

  return (
    <div>
      <ThemeProvider />
      <ModeToggle />
      {/* Add other navbar items here */}
    </div>
  );
};

export default Navbar;

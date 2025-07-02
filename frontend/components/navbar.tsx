import React, { useState } from "react";
import { ModeToggle } from "./mode-toggle";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");
  const isResume = pathname.startsWith("/resume");
  // const { data: session } = useSession();

  return (
    <div>
      Navbar
      <ModeToggle />
      {/* Add other navbar items here */}
    </div>
  );
};

export default Navbar;

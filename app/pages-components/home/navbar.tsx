import React from "react";

import logo from "@/public/navbar-logo.png";
import Image from "next/image";

export function Navbar() {
  return (
    <div className="absolute top-0 left-0 z-10 w-full">
      <div className="flex h-24 w-full items-center justify-between px-4">
        <div>
          <Image src={logo} alt="Logo" width={60} height={60} />
        </div>
        <div className="flex space-x-4"></div>
      </div>
    </div>
  );
}

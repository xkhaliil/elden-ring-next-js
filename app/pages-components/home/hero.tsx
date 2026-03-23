"use client";

import { PixelLiquidBg } from "@/components/unlumen-ui/pixel-liquid-bg";
import goDown from "@/public/arrow-down-01-stroke-rounded.svg";
import logo from "@/public/eldenring_transparent.png";
import Image from "next/image";

export default function Hero() {
  return (
    <div className="relative h-screen min-h-screen">
      <PixelLiquidBg pixelSize={12} />
      <div className="absolute inset-0 flex items-center justify-center gap-10">
        <div className="flex flex-col items-center justify-center gap-3 p-8 px-4 text-start shadow-2xl">
          <div className="shadow-4xl flex flex-col text-6xl text-white max-sm:text-4xl">
            The
          </div>
          <div className="shadow-4xl flex flex-col text-6xl text-white max-sm:text-4xl">
            Elden
          </div>
          <div className="shadow-4xl flex flex-col text-6xl text-white max-sm:text-4xl">
            Ring
          </div>
          <div className="shadow-4xl flex flex-col text-6xl text-white max-sm:text-4xl">
            WiKi
          </div>
        </div>
        <div>
          <Image
            src={logo}
            alt="Logo"
            width={200}
            height={200}
            className="shadow-4xl transition-transform duration-300 hover:scale-110"
          />
        </div>
      </div>
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 scale-110 transform animate-pulse rounded-full bg-black/20 p-3 shadow-2xl transition-transform duration-300 hover:scale-150"
        onClick={() => {
          const categoriesSection = document.getElementById("categories");
          if (categoriesSection) {
            categoriesSection.scrollIntoView({ behavior: "smooth" });
          }
        }}
      >
        <Image src={goDown} alt="Go Down" width={40} height={40} className="" />
      </div>
    </div>
  );
}

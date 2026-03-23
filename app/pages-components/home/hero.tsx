import { PixelLiquidBg } from "@/components/unlumen-ui/pixel-liquid-bg";

export function Hero() {
  return (
    <div className="relative h-screen min-h-screen">
      <PixelLiquidBg pixelSize={12} />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-4 text-start">
        <div className="flex flex-col text-5xl text-white shadow-2xl">The</div>
        <div className="flex flex-col text-5xl text-white shadow-2xl">
          Elden
        </div>
        <div className="flex flex-col text-5xl text-white shadow-2xl">Ring</div>
        <div className="flex flex-col text-5xl text-white shadow-2xl">WiKi</div>
      </div>
      <div>
        <Image
          src={logo}
          alt="Logo"
          width={60}
          height={60}
          className="absolute top-4 left-4 z-10"
        />
      </div>
    </div>
  );
}

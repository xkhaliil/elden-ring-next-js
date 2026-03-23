import { PixelLiquidBg } from "@/components/unlumen-ui/pixel-liquid-bg";

export function Hero() {
  return (
    <div className="relative h-screen min-h-screen">
      <PixelLiquidBg pixelSize={12}>
        <div className="flex h-full items-center justify-center">
          <h1>Hello world</h1>
        </div>
      </PixelLiquidBg>
    </div>
  );
}

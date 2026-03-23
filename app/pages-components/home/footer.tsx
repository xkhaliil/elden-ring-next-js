export default function Footer() {
  return (
    <div className="flex max-h-16 items-center justify-between bg-[#240000]">
      <div className="mx-8">
        The Elden Ring Wiki by{" "}
        <a
          href="https://github.com/xkhaliil"
          className="animate-pulse text-blue-500 transition-colors duration-300 hover:text-blue-700"
        >
          @xkhaliil
        </a>
      </div>
      <div className="mx-8">
        <a
          href="https://github.com/xkhaliil/elden-ring-next-js"
          className="240000 animate-pulse text-blue-500 transition-colors duration-300 hover:text-blue-700"
        >
          check the code on github
        </a>
      </div>
    </div>
  );
}

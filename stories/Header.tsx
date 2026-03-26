import Image from "next/image";
import Link from "next/link";

import "./header.css";

const logo = "/navbar-logo.png";

type User = {
  name: string;
};

export interface HeaderProps {
  user?: User;
  onclicktoBosses?: () => void;
  onclicktoWeapons?: () => void;
  onclicktoItems?: () => void;
}

export const Header = ({
  user,
  onclicktoBosses,
  onclicktoWeapons,
  onclicktoItems,
}: HeaderProps) => (
  <header className="">
    <div className="absolute top-0 left-0 z-10 w-full">
      <div className="flex h-24 w-full items-center justify-between px-4">
        <div>
          <Link href="/">
            <Image src={logo} alt="Logo" width={60} height={60} />
          </Link>
        </div>
        <div className="mr-4 flex space-x-4">
          <Link href="/bosses" onClick={onclicktoBosses}>
            <div className="text-white hover:text-gray-300">Bosses</div>
          </Link>
          <Link href="/weapons" onClick={onclicktoWeapons}>
            <div className="text-white hover:text-gray-300">Weapons</div>
          </Link>
          <Link href="/items" onClick={onclicktoItems}>
            <div className="text-white hover:text-gray-300">Items</div>
          </Link>
        </div>
      </div>
    </div>
  </header>
);

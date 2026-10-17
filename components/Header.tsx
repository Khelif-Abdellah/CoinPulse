"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "cn";
import { navItems } from "../constants";

const Header = () => {
  const pathname = usePathname();

  return (
    <header>
      <div className="main-container inner">
        <Link href="/" aria-label="CoinPulse home">
          <Image
            src="/assets/logo.svg"
            alt="CoinPulse Logo"
            width={132}
            height={40}
            priority
          />
        </Link>

        <nav>
          {navItems.map((item) => {
            if (item.label === "Search") {
              return (
                <button
                  key={item.label}
                  type="button"
                  className="nav-link"
                  // onClick={() => openSearchModal()}
                >
                  {item.label}
                </button>
              );
            }

            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname === item.href ||
                  pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.label}
                href={item.href}
                className={cn("nav-link", {
                  "is-active": isActive,
                  "is-home": item.href === "/",
                })}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
};

export default Header;

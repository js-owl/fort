import Image from "next/image";
import Link from "next/link";
import { navigation } from "@/content/home";
import { MobileNav } from "@/components/layout/mobile-nav";

export function SiteHeader() {
  return (
    <header className="relative z-20 flex items-center justify-between px-page py-6 lg:py-[30px]">
      <Link href="/" className="relative z-10 shrink-0">
        <Image
          src="/images/home/logo.svg"
          alt="Аэромакс"
          width={180}
          height={42}
        />
      </Link>
      <nav
        className="absolute top-1/2 left-1/2 hidden -translate-x-1/2 -translate-y-1/2 lg:block"
        aria-label="Разделы"
      >
        <ul className="flex items-center gap-4 xl:gap-10">
          {navigation.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="px-2 py-2 text-lg leading-[1.2] whitespace-nowrap xl:px-2.5 xl:py-2.5 xl:text-2xl"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <MobileNav />
    </header>
  );
}

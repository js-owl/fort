import Image from "next/image";
import Link from "next/link";
import { navigation } from "@/content/home";
import { MobileNav } from "@/components/layout/mobile-nav";

export function SiteHeader() {
  return (
    <header className="relative z-20 flex items-center justify-between px-page py-6 lg:py-[30px]">
      <Link href="/" className="shrink-0">
        <Image
          src="/images/home/logo.svg"
          alt="Форт-9"
          width={173}
          height={21}
        />
      </Link>
      <div className="flex shrink-0 items-center">
        <nav className="hidden lg:block" aria-label="Разделы">
          <ul className="flex items-center gap-1 xl:gap-8">
            {navigation.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="px-2 py-2 text-lg leading-[1.2] font-medium whitespace-nowrap xl:px-2.5 xl:text-xl"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <MobileNav />
      </div>
    </header>
  );
}

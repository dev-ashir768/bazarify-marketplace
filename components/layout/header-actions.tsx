"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HeartIcon, ShoppingCartIcon } from "lucide-react";

import { routes } from "@/config/routes";
import { selectCartCount, useCartStore } from "@/features/cart/cart-store";
import { useWishlistStore } from "@/features/wishlist/wishlist-store";
import { cn } from "@/lib/utils";

function CountBadge({ count }: { count: number }) {
  if (count === 0) return null;
  return (
    <span className="absolute -top-1 left-4 grid min-w-5 place-items-center rounded-full bg-brand-accent px-1 text-[11px] leading-5 font-semibold text-white">
      {count > 99 ? "99+" : count}
    </span>
  );
}

export function HeaderActions() {
  const pathname = usePathname();
  const cartCount = useCartStore(selectCartCount);
  const wishlistCount = useWishlistStore((state) => state.ids.length);

  const links = [
    { href: routes.wishlist, label: "Wishlist", Icon: HeartIcon, count: wishlistCount },
    { href: routes.cart, label: "My Cart", Icon: ShoppingCartIcon, count: cartCount },
  ];

  return (
    <nav aria-label="Account" className="flex items-center gap-1 lg:gap-2">
      {links.map(({ href, label, Icon, count }) => {
        const active = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "relative flex h-11 items-center gap-2.5 whitespace-nowrap rounded-full px-3 text-sm text-ink transition-colors hover:bg-surface lg:h-16.25 lg:px-7 lg:text-lg",
              active && "bg-surface text-brand",
            )}
          >
            <span className="relative">
              <Icon className="size-5 lg:size-6" strokeWidth={1.75} />
              <CountBadge count={count} />
            </span>
            <span className="hidden sm:inline">{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

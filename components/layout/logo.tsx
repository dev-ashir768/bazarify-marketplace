import Image from "next/image";
import Link from "next/link";

import { routes } from "@/config/routes";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

type LogoProps = {
  variant?: "default" | "white";
  className?: string;
};

export function Logo({ variant = "default", className }: LogoProps) {
  return (
    <Link href={routes.home} aria-label={`${siteConfig.name} home`} className={cn("inline-flex", className)}>
      <Image
        src={variant === "white" ? "/images/brand/logo-white.svg" : "/images/brand/logo.svg"}
        alt={siteConfig.name}
        width={181}
        height={42}
        priority={variant === "default"}
        className="h-8 w-auto lg:h-[42px]"
      />
    </Link>
  );
}

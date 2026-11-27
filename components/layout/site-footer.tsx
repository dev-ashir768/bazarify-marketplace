import Link from "next/link";

import { routes } from "@/config/routes";
import { siteConfig } from "@/config/site";

import { Logo } from "./logo";
import { SocialLinks } from "./social-links";

const customerCare = [
  { label: "Track My Order", href: routes.trackOrder },
  { label: "Return & Refund", href: routes.returns },
  { label: "Shipping Info", href: routes.shipping },
];

const legal = [
  { label: "Terms of Service", href: routes.terms },
  { label: "Privacy Policy", href: routes.privacy },
  { label: "Refund Policy", href: routes.refund },
  { label: "Cookie Policy", href: routes.cookies },
];

const headingClass = "mb-5 text-lg font-semibold text-white lg:text-xl";
const linkClass = "text-white/60 transition-colors hover:text-white";

export function SiteFooter() {
  const { contact, registration } = siteConfig;

  return (
    <footer className="mt-auto bg-footer text-sm lg:text-base">
      <div className="container grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_1.4fr_0.8fr] lg:py-20">
        <div className="space-y-6">
          <Logo variant="white" />
          <p className="max-w-sm leading-relaxed text-white/60">{siteConfig.description}</p>
          <SocialLinks />
        </div>

        <div>
          <h2 className={headingClass}>Customer Care</h2>
          <ul className="space-y-3">
            {customerCare.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className={linkClass}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className={headingClass}>Contact Us</h2>
          <ul className="space-y-3 text-white/60">
            <li>
              <a href={`mailto:${contact.email}`} className={linkClass}>
                {contact.email}
              </a>
            </li>
            <li>
              <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className={linkClass}>
                {contact.phone}
              </a>
            </li>
            <li>{contact.address}</li>
          </ul>
        </div>

        <div>
          <h2 className={headingClass}>Registered</h2>
          <ul className="space-y-3 text-white/60">
            <li>NTN: {registration.ntn}</li>
            <li>FBR: {registration.fbr}</li>
          </ul>
          <div className="mt-5 grid size-15 place-items-center rounded-xl bg-white text-sm font-extrabold tracking-tight text-[#1b5fa8]">
            FBR
          </div>
        </div>
      </div>

      <div className="container">
        <div className="flex flex-col gap-4 border-t border-white/10 py-6 text-xs text-white/60 md:flex-row md:items-center md:justify-between lg:text-sm">
          <p>© {siteConfig.copyrightYear} {siteConfig.name}. All Right Reserved.</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {legal.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className={linkClass}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

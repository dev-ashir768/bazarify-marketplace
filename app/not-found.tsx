import Link from "next/link";

import { routes } from "@/config/routes";

export default function NotFound() {
  return (
    <div className="container-page grid flex-1 place-items-center py-24 text-center">
      <div className="space-y-4">
        <p className="text-sm font-semibold text-brand">404</p>
        <h1 className="text-3xl font-semibold">Page not found</h1>
        <p className="text-ink-muted">The page you&apos;re looking for doesn&apos;t exist or was moved.</p>
        <Link
          href={routes.home}
          className="inline-flex h-11 items-center rounded-xl bg-brand px-6 text-sm font-medium text-white"
        >
          Back to Marketplace
        </Link>
      </div>
    </div>
  );
}

import { HeaderActions } from "./header-actions";
import { Logo } from "./logo";
import { SearchBar } from "./search-bar";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 bg-white shadow-[0_4px_25px_rgba(0,0,0,0.05)]">
      <div className="container flex flex-wrap items-center gap-x-4 gap-y-3 py-3 lg:h-[86px] lg:flex-nowrap lg:py-0">
        <Logo className="shrink-0" />
        <SearchBar className="order-last basis-full lg:order-none lg:mx-auto lg:max-w-[760px] lg:basis-auto" />
        <div className="ml-auto lg:ml-0">
          <HeaderActions />
        </div>
      </div>
    </header>
  );
}

import { BadgeCheckIcon, TagIcon, TruckIcon, type LucideIcon } from "lucide-react";

const items: { title: string; text: string; Icon: LucideIcon }[] = [
  { title: "Verified Sellers", text: "Every store is checked.", Icon: BadgeCheckIcon },
  { title: "Best Price Promise", text: "No hidden charges.", Icon: TagIcon },
  { title: "Fast Delivery", text: "Delivered to your doorstep.", Icon: TruckIcon },
];

export function TrustBadges() {
  return (
    <ul className="grid grid-cols-3 gap-2 sm:gap-4 xl:gap-6">
      {items.map(({ title, text, Icon }) => (
        <li
          key={title}
          className="flex flex-col items-center gap-2 rounded-2xl bg-surface px-2 py-3 text-center sm:flex-row sm:gap-4 sm:rounded-3xl sm:p-4 sm:text-left xl:min-h-30 xl:rounded-[28px] xl:py-4 xl:pl-4 xl:pr-1"
        >
          <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-[#fcfcfc] text-brand sm:size-14 sm:rounded-2xl xl:h-16.5 xl:w-17.5 xl:rounded-[18px]">
            <Icon className="size-5 sm:size-6 xl:size-8" strokeWidth={1.5} />
          </span>
          <span>
            <span className="block text-xs leading-tight font-semibold text-ink sm:text-sm xl:text-lg">{title}</span>
            {/* The one-liner only fits from `sm` up; phones show the title alone. */}
            <span className="hidden text-xs text-ink-muted sm:block xl:text-base">{text}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}

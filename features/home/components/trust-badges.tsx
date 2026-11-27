import { BadgeCheckIcon, TagIcon, TruckIcon, type LucideIcon } from "lucide-react";

const items: { title: string; text: string; Icon: LucideIcon }[] = [
  { title: "Verified Sellers", text: "Every store is checked.", Icon: BadgeCheckIcon },
  { title: "Best Price Promise", text: "No hidden charges.", Icon: TagIcon },
  { title: "Fast Delivery", text: "Delivered to your doorstep.", Icon: TruckIcon },
];

export function TrustBadges() {
  return (
    <ul className="grid gap-4 sm:grid-cols-3 xl:gap-6">
      {items.map(({ title, text, Icon }) => (
        <li
          key={title}
          className="flex items-center gap-4 rounded-3xl bg-surface p-4 xl:min-h-[153px] xl:rounded-[28px] xl:p-6"
        >
          <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-[#fcfcfc] text-brand xl:h-[79px] xl:w-[90px] xl:rounded-[18px]">
            <Icon className="size-6 xl:size-8" strokeWidth={1.5} />
          </span>
          <span>
            <span className="block text-sm font-semibold text-ink xl:text-[21px] xl:leading-[35px]">{title}</span>
            <span className="block text-xs text-ink-muted xl:text-[19px] xl:leading-[35px]">{text}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}

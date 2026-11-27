"use client";

import { useFormContext } from "react-hook-form";

import { OutlinedInput, OutlinedSelect } from "@/components/shared/outlined-field";
import { cities, type ShippingFormInput } from "@/schemas/checkout.schema";

export function ShippingForm() {
  const {
    register,
    formState: { errors },
  } = useFormContext<ShippingFormInput>();

  return (
    <section aria-labelledby="shipping-heading" className="space-y-6">
      <div>
        <h1 id="shipping-heading" className="text-2xl font-semibold text-ink xl:text-[34px]">
          Shipping Details
        </h1>
        <p className="mt-1 text-sm text-ink-muted xl:text-base">Just a few details and your order is on its way.</p>
      </div>

      <div className="grid gap-5 xl:gap-6">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1 xl:gap-6">
          <OutlinedInput label="First Name" autoComplete="given-name" error={errors.firstName?.message} {...register("firstName")} />
          <OutlinedInput label="Last Name" autoComplete="family-name" error={errors.lastName?.message} {...register("lastName")} />
        </div>
        <OutlinedInput label="Email" type="email" autoComplete="email" error={errors.email?.message} {...register("email")} />
        <OutlinedInput
          label="Mobile Number"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          error={errors.phone?.message}
          {...register("phone")}
        />
        <OutlinedSelect
          label="City"
          options={[...cities]}
          placeholder="Select city"
          error={errors.city?.message}
          {...register("city")}
        />
        <OutlinedInput label="Address" autoComplete="street-address" error={errors.address?.message} {...register("address")} />
      </div>
    </section>
  );
}

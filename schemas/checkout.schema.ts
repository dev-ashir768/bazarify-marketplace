import { z } from "zod";

export const cities = [
  "Karachi",
  "Lahore",
  "Islamabad",
  "Rawalpindi",
  "Faisalabad",
  "Multan",
  "Peshawar",
  "Quetta",
  "Hyderabad",
  "Sialkot",
] as const;

/** 03XXXXXXXXX or +923XXXXXXXXX, spaces and dashes allowed. */
const pakistaniMobile = /^(\+92|0)3\d{9}$/;

export const shippingSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(50),
  lastName: z.string().trim().min(1, "Last name is required").max(50),
  email: z.email("Enter a valid email").trim(),
  phone: z
    .string()
    .transform((value) => value.replace(/[\s-]/g, ""))
    .pipe(z.string().regex(pakistaniMobile, "Enter a valid mobile number, e.g. 03001234567")),
  city: z.enum(cities, { error: "Select your city" }),
  address: z.string().trim().min(8, "Enter your full address").max(200),
});

/** What the form fields hold. */
export type ShippingFormInput = z.input<typeof shippingSchema>;
/** Cleaned values after validation — what the API receives. */
export type ShippingDetails = z.output<typeof shippingSchema>;

export const paymentMethodSchema = z.enum(["cod"]);

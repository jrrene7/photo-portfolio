import { redirect } from "next/navigation";

// Booking now lives on the merged Contact & Booking page.
export default function BookPage() {
  redirect("/contact");
}

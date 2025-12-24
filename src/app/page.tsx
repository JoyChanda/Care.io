import HomeClient from "@/components/HomeClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Care.IO | Reliable Care Services for Your Family",
  description: "Find and hire trusted caretakers for baby sitting, elderly care, and special home care. Secure, easy, and accessible caregiving for everyone.",
  keywords: ["baby care", "elderly care", "caregiving", "care.io", "home care", "babysitting", "trusted care"],
  openGraph: {
    title: "Care.IO | Professional Caregiving Platform",
    description: "Making caregiving easy, secure, and accessible for everyone.",
    images: ["/og-image.jpg"],
  }
};

export default function Home() {
  return <HomeClient />;
}

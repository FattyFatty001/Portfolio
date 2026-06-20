import type { Metadata } from "next";
import { Manrope, Fraunces } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";

const grotesk = Manrope({
  subsets: ["latin"],
  variable: "--font-grotesk",
  display: "swap",
});

const serif = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Matt Pearson — Game UI/UX Designer",
  description:
    "UI/UX and experience designer with 15+ years leading game interface work from first sketch to final in-engine screen across AAA, indie, and live service.",
  openGraph: {
    title: "Matt Pearson — Game UI/UX Designer",
    description:
      "UI/UX and experience designer with 15+ years leading game interface work from first sketch to final in-engine screen across AAA, indie, and live service.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${grotesk.variable} ${serif.variable}`}>
      <body className="canvas">
        <Cursor />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}

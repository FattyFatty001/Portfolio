import type { Metadata } from "next";
import { Space_Grotesk, Instrument_Serif } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";

const grotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-grotesk",
  display: "swap",
});

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
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

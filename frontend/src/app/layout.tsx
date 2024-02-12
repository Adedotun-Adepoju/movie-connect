import type { Metadata } from "next";
import { Montserrat, Pacifico } from "next/font/google";
import Local from "next/font/local";
import "@/styles/globals.css";
import { cx } from "@/utils";

const sfpro = Local({
  src: [
    {
      path: "../../public/fonts/sf-pro-text-bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/sf-pro-text-semibold.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/sf-pro-text-regular.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-sfpro",
});

const mont = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mont",
});

const pacifico = Pacifico({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-pacifico",
});

export const metadata: Metadata = {
  title: "Movie Connect",
  description: "A movie community app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cx(
          mont.variable,
          sfpro.variable,
          pacifico.variable,
          "bg-bg-color font-mont",
        )}
      >
        {children}
      </body>
    </html>
  );
}

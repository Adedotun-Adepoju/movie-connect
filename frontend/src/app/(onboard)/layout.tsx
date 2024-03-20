import type { Metadata } from "next";
import { Montserrat, Pacifico } from "next/font/google";
import Local from "next/font/local";
import "@/styles/globals.css";
import { cx } from "@/utils";
import OnBoardContainer from "@/components/onboard/OnBoardContainer";

export default function OnboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <OnBoardContainer>{children}</OnBoardContainer>
    </main>
  );
}

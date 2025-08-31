import { Analytics } from "@vercel/analytics/next";
import { GeistMono } from "geist/font/mono";
import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import type React from "react";
import { Suspense } from "react";
import { LoadingPage } from "../components/LoadingSpinner";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: "기록을 정리하는 블로그",
  description: "일상의 생각과 기록을 정리하는 블로그",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`font-sans ${dmSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={<LoadingPage />}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  );
}

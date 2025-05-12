import "./globals.css";
import { inter, jetbrainsMono, sora } from "@/app/fonts";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "LinkShrink - URL Shortener",
    template: "%s - LinkShrink",
  },
  description:
    "Shorten, customize, and track your URLs. Get concise links, detailed analytics, and custom domains in one easy-to-use platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} ${sora.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

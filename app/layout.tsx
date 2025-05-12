import "./globals.css";
import { inter, jetbrainsMono, sora } from "@/app/fonts";
import { ThemeProvider } from "@/components/theme-provider";
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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} ${sora.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

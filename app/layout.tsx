import "./globals.css";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import { ThemeProvider } from "@/components/theme-provider";
import { siteConfig } from "@/config/site";
import { Inter, JetBrains_Mono, Sora } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

// export const metadata: Metadata = {
//   title: {
//     default: "LinkShrink - URL Shortener",
//     template: "%s - LinkShrink",
//   },
//   description:
//     "Shorten, customize, and track your URLs. Get concise links, detailed analytics, and custom domains in one easy-to-use platform.",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={siteConfig.defaultLang} suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} ${sora.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NuqsAdapter>
            {children}
            <TailwindIndicator />
          </NuqsAdapter>
        </ThemeProvider>
      </body>
    </html>
  );
}

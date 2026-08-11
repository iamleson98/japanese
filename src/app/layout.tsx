import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoJp = Noto_Sans_JP({
  variable: "--font-noto-jp",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nihongo Path · 日本語パス — Learn Japanese N5 → N3",
  description:
    "A focused, content-rich Japanese learning app covering JLPT N5 to N3. Kana, vocabulary, grammar, kanji, flashcards, and curated YouTube resources.",
  keywords: [
    "Japanese",
    "JLPT",
    "N5",
    "N4",
    "N3",
    "hiragana",
    "katakana",
    "kanji",
    "flashcards",
    "日本語",
  ],
  authors: [{ name: "Nihongo Path" }],
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
  },
  openGraph: {
    title: "Nihongo Path · 日本語パス",
    description: "Learn Japanese N5 → N3 with kana, vocab, grammar, kanji & flashcards.",
    siteName: "Nihongo Path",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nihongo Path · 日本語パス",
    description: "Learn Japanese N5 → N3 with kana, vocab, grammar, kanji & flashcards.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${notoJp.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider>
          {children}
          <Toaster />
          <SonnerToaster position="bottom-right" richColors closeButton />
        </ThemeProvider>
      </body>
    </html>
  );
}

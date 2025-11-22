import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { Toaster } from "@/components/ui/sonner";
import { Footer } from "@/components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const chalkboy = localFont({
  src: [
    {
      path: "../../public/fonts/chalkboy.regular.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-chalkboy",
});

export const metadata: Metadata = {
  title: "Teachers App",
  description: "Teachers App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${chalkboy.variable} antialiased min-h-dvh w-full`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="fixed inset-0 -z-10 h-full">
            {/* Light theme background */}
            <div className="absolute inset-0 bg-[linear-gradient(315deg,#E1BEE7_0%,#F3E5F5_20%,#FCE4EC_40%,#FFF0F5_60%,#F8BBD9_80%,#E1BEE7_100%)] dark:hidden" />
            {/* Dark theme background */}
            <div
              className="absolute inset-0 hidden bg-black dark:block"
              style={{
                backgroundImage:
                  "radial-gradient(125% 125% at 50% 100%, #000000 40%, #350136 100%)",
              }}
            />
          </div>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster closeButton richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}

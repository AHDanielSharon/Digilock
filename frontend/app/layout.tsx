import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Digilock",
  description: "Futuristic secure document locker",
  manifest: "/manifest.webmanifest"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body>{children}</body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BetterYourAds Website DNA",
  description: "Extract structured SaaS Website DNA for BetterYourAds."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

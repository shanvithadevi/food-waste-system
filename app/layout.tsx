import "./globals.css";
import { LayoutClient } from "./layout-client";

export const metadata = {
  title: "Food Waste Optimization System",
  description: "Save food, save lives - Connecting donors and NGOs",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#ec4899" />
      </head>
      <body className="bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 font-poppins">
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  );
}
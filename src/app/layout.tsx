
import "./css/gloabal.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gwen",
  description: "Gwen ai",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
      <link rel="stylesheet" href="https://site-assets.fontawesome.com/releases/v6.5.1/css/all.css"/>
      </head>
      <body>{children}</body>
    </html>
  );
}

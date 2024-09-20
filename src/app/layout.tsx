import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.scss";
import ToasterDisplay from "@/components/notifications/ToasterDisplay";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Feedback Bác Sĩ Nguyễn Tuấn Anh",
  description: "Feedback của người dùng",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
        <body className={nunito.className}>
          <ToasterDisplay />
          {children}
        </body>
      </html>
  );
}

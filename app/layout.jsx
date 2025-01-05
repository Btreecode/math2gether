import { Inter } from "next/font/google";
import "./globals.css";
import LayoutClient from "./layout-client";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Math2gether",
  description: "At Math Together, we believe in the transformative power of education. Our mission is to provide free, personalized math tutoring to middle school students, fostering a love for learning and improving academic performance. By connecting students with dedicated tutors, we aim to bridge educational gaps and build confidence in math. Join us in empowering young minds and creating a brighter future for our community.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  );
}

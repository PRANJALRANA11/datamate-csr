import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "DataMate",
  description: "DataMate is your private data assistant.",
};

export default function RootLayout({ children }) {
  
  return (
    <html lang="en">
      <body className="dark">{children}</body>
    </html>
  );
}

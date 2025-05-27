import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ConfigProvider } from "antd";
import { defaultTheme } from "@/interfaces/theme";

const poppins = Poppins({
  weight: "400",
  variable: "--font-poppins",
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "Social Video Manager",
  description: "Gerenciador de postagens das redes sociais",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased`}>
        <ConfigProvider theme={defaultTheme}>
          {children}
        </ConfigProvider>
      </body>
    </html>
  );
}

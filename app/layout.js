import { Josefin_Sans } from "next/font/google";
import MotionProvider from "./components/motion-provider";
import { site } from "./components/lib/site";
import "./globals.css";

const josefin = Josefin_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: site.name,
  description: site.tagline,
  icons: {
    icon: site.logo,
    apple: site.logo,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={josefin.variable}>
      <body>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}

import { Bebas_Neue, Source_Sans_3 } from "next/font/google";
import MotionProvider from "./components/motion-provider";
import { site } from "./components/lib/site";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const sourceSans = Source_Sans_3({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: site.name,
  description: site.tagline,
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${bebasNeue.variable} ${sourceSans.variable}`}
    >
      <body>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}

"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import Login from "@/components/login";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import Providers from "./providers";
import cookie from "js-cookie";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Provider store={store}>
          <TonConnectUIProvider manifestUrl='https://api.tonixapp.xyz/tonconnect-manifest.json'>
            <Providers>{children}</Providers>
          </TonConnectUIProvider>
        </Provider>
      </body>
    </html>
  );
}

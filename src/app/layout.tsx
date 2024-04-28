import type { Metadata } from "next";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter'
import { ThemeProvider } from '@mui/material/styles';
import theme from './Context/theme';
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NextJS e-commerce",
  description: "It is an e-commerce web admin panel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}

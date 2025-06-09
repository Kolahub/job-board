import "./globals.css";
import Header from "@/components/Header";
import SubHeader from "./subheader";
import { ReduxProvider } from "@/providers/ReduxProvider";
import ScrollToTop from "@/components/ScrollToTop";

import ThemeInitializer from '@/components/ThemeInitializer';

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <head />
      <body className="font-sans antialiased bg-gray-100 dark:bg-midnight min-h-full transition-colors duration-200">
        <ThemeInitializer />
        <ReduxProvider>
          <Header />
          <div className="">
            <SubHeader />
          </div>
          <main className="container mx-auto pt-52 sm:pt-72">
            <ScrollToTop />
            {children}
          </main>
        </ReduxProvider>
      </body>
    </html>
  );
}

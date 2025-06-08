import "./globals.css";
import Header from "@/components/Header";
import SubHeader from "./subheader";
import { ReduxProvider } from "@/providers/ReduxProvider";
import ScrollToTop from "@/components/ScrollToTop";

export default function RootLayout({ children }) {

  return (
    <html lang="en" className="h-full">
      <body className={`font-sans antialiased bg-gray-100 dark:bg-midnight min-h-full`}>
        <ReduxProvider>
          {/* Fixed header with dark background */}
          <header className="fixed top-0 left-0 right-0 bg-midnight shadow-md z-10">
              <Header />
          </header>

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

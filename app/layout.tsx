import "./globals.css";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

import { Toaster } from "@/components/ui/sonner";
import { QueryProvider } from "@/providers/query-provider";
import { SheetProvider } from "@/providers/sheet-provider";
import { ToastProvider } from "@/providers/toast-provider";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata = {
  title: "Flexibble",
  description: "Showcase and discover remarkable developer projects",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang='en'>
        <body suppressHydrationWarning>
          <QueryProvider>
            {/* <Navbar />
            <main> */}
              <SheetProvider />
              <ToastProvider />
              {children}
            {/* </main> */}
            {/* <Toaster /> */}
            <Footer />
          </QueryProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}

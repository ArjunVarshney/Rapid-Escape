import NavBar from "@/components/navbar";
import "./globals.css";
import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import Footer from "@/components/footer";
import { ThemeProvider } from "@/providers/theme-provider";
import ToastProvider from "@/providers/toast-provider";

const font = Urbanist({ subsets: ["latin"] });

export const metadata: Metadata = {
   title: "Body Works",
   description: "Exercise website for everyone",
};

export default function RootLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   return (
      <html lang="en" suppressHydrationWarning>
         <body className={font.className} suppressHydrationWarning={true}>
            <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
               <ToastProvider />
               <div className="flex flex-col min-h-full w-full">
                  <NavBar />
                  <div className="p-0 mt-16 h-full w-full overflow-hidden">
                     {children}
                  </div>
                  <Footer />
               </div>
            </ThemeProvider>
         </body>
      </html>
   );
}

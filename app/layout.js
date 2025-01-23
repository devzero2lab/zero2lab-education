import localFont from "next/font/local";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from 'sonner';
 
const geistSans = localFont({  
  src: "./fonts/GeistVF.woff",   
  variable: "--font-geist-sans",    
  weight: "100 900",  
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Zero2learn",
  description: "Zero2learn LMS",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClerkProvider>
          <Header /> 
          <Toaster position="top-right" richColors />
          {children}
          <Footer />
        </ClerkProvider>
      </body>
    </html>
  );
}


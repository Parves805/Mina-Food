import type { Metadata } from 'next';
import './globals.css';
import { AppHeader } from '@/app/_components/header';
import { AppFooter } from '@/app/_components/footer';
import { Toaster } from '@/components/ui/toaster';
import { CartProvider } from '@/context/cart-context';

export const metadata: Metadata = {
  title: 'গ্রিনবাস্কেট',
  description: 'تازা জৈব খাবার, আপনার দরজায় পৌঁছে দেওয়া হয়।',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn" className="light">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased min-h-screen flex flex-col">
        <CartProvider>
          <AppHeader />
          <main className="flex-grow">{children}</main>
          <AppFooter />
          <Toaster />
        </CartProvider>
      </body>
    </html>
  );
}

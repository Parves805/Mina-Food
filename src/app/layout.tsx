import type { Metadata } from 'next';
import { Noto_Sans_Bengali } from 'next/font/google';
import './globals.css';
import { AppHeader } from '@/app/_components/header';
import { AppFooter } from '@/app/_components/footer';
import { Toaster } from '@/components/ui/toaster';
import { CartProvider } from '@/context/cart-context';
import { BottomNav } from './_components/bottom-nav';

const noto_sans_bengali = Noto_Sans_Bengali({
  subsets: ['bengali'],
  variable: '--font-body',
});

export const metadata: Metadata = {
  title: 'মিনা ফুড',
  description: 'তাজা জৈব খাবার, আপনার দরজায় পৌঁছে দেওয়া হয়।',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn" className={`light ${noto_sans_bengali.variable}`}>
      <body className="font-body antialiased min-h-screen flex flex-col">
        <CartProvider>
          <AppHeader />
          <main className="flex-grow pb-16 md:pb-0">{children}</main>
          <AppFooter />
          <Toaster />
          <BottomNav />
        </CartProvider>
      </body>
    </html>
  );
}

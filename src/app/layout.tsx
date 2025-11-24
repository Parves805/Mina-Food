import type { Metadata } from 'next';
import { Noto_Sans_Bengali } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { CartProvider } from '@/context/cart-context';
import { PWAInstallProvider } from '@/context/pwa-install-context';


const noto_sans_bengali = Noto_Sans_Bengali({
  subsets: ['bengali'],
  variable: '--font-body',
});

export const metadata: Metadata = {
  title: 'মিনা ফুড',
  description: 'তাজা জৈব খাবার, আপনার দরজায় পৌঁছে দেওয়া হয়।',
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn" className={`light ${noto_sans_bengali.variable}`}>
      <body className="font-body antialiased min-h-screen flex flex-col">
        <PWAInstallProvider>
          <CartProvider>
            {children}
            <Toaster />
          </CartProvider>
        </PWAInstallProvider>
      </body>
    </html>
  );
}

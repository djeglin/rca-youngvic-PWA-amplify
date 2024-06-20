import type { Metadata } from 'next';
import { Inter, Oswald } from 'next/font/google';
import './globals.css';
import { Providers } from '@/src/app/providers';

const oswald = Oswald({ subsets: ['latin'], variable: '--font-oswald' });
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Young Vic AI Chatbot',
  description: 'Chatbot created for The Young Vic',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${oswald.variable} ${inter.variable} bg-secondary-brown`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

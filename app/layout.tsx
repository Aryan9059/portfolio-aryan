import type { Metadata } from 'next';
import {Manrope } from 'next/font/google';

import './globals.css';


const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: 'Aryan Srivastava Portfolio',
  description: 'Designing and shipping mobile-first experiences with depth.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${manrope.className}  font-mono antialiased`}>
        {children}
      </body>
    </html>
  );
}

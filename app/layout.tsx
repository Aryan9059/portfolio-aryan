import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Aryan Srivastava — Mobile Developer',
  description: 'Android Native developer crafting precise, high-performance mobile experiences.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
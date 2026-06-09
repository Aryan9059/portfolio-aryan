import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'cuteFlame',
  description: 'An IT undergrad at IIIT Allahabad.',
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
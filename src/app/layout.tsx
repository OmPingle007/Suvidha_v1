import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { Analytics } from "@vercel/analytics/next"

export const metadata: Metadata = {
  title: 'Suvidha OCR | AI-Powered OCR for Indian MSMEs',
  description: 'Unlock Your Paperwork. Unleash Your Business. The intelligent OCR for Indian MSMEs.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="!scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        {children}
        <Analytics />
        <Toaster />
      </body>
    </html>
  );
}

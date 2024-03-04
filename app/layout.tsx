import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import '../styles/globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
});

export const metadata: Metadata = {
  title: 'Hublist - A Simple Todo App',
  description: 'Created with Love by @saiemsaeed for Baaa',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${inter.variable} ${jetbrains.variable} font-sans`}
    >
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}

import './globals.css'
import { Inter } from 'next/font/google'
import Head from "next/head";

const inter = Inter({ subsets: ['latin'] })

export const md = {
  title: 'Khas Sensor Network',
  description: 'A website which tracks various life quaility data in Kadir Has University',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Head>
        <title>{md.description}</title>
      </Head>
      <Head>
        <meta name="description" content={md.description} />
      </Head>
      <body className={inter.className}>test{children}</body>
    </html>
  );
}

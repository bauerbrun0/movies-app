import './globals.css';
import Navbar from '../components/navbar';

import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={montserrat.className}>
      <body className='bg-background text-text'>
        <Navbar />
        {children}
      </body>
    </html>
  );
}

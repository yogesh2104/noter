import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/providers/theme-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Noter | Home',
  description: 'This is the Noter | Home',
  icons:{
    icon:[{
      media:"(prefers-color-scheme:light)",
      url:"/black_logo.svg",
      type:"image/svg+xml",
      href:"/black_logo.svg",
    },
    {
      media:"(prefers-color-scheme:dark)",
      url:"/white_logo.svg",
      type:"image/svg+xml",
      href:"/white_logo.svg",
    }
  
  ]
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider 
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
          storageKey='noter-app'>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

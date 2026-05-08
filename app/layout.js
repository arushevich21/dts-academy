import { Bebas_Neue, DM_Sans } from 'next/font/google'
import './globals.css'

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-display',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
})

export const metadata = {
  title: 'DTS Academy',
  description: 'Elite sim racing coaching and training',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${bebasNeue.variable} ${dmSans.variable}`}>
        {children}
      </body>
    </html>
  )
}
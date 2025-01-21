import { Inter, Space_Mono } from "next/font/google"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
})

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-mono",
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${spaceMono.variable}`}>
      <body className={inter.className}>{children}</body>
    </html>
  )
}


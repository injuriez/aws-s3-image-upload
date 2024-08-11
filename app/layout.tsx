import './globals.css'

export const metadata = {
  title: 'voidbox',
  description: 'exploring the void...',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

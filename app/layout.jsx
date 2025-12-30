import '../globals.css'
import Header from '../../components/Header'

export const metadata = {
  title: 'Farchan Shah — Web Developer & Visual Editor',
  description: 'Web development, image editing, and digital services.'
}

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className="bg-light text-dark">
        <Header />
        {children}
      </body>
    </html>
  )
}

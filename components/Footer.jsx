export default function Footer() {
  return (
    <footer className="mt-12 border-t bg-white">
      <div className="container-max py-8 flex flex-col md:flex-row justify-between items-center">
        <div>© {new Date().getFullYear()} Farchan Shah</div>
        <div className="flex gap-4 mt-4 md:mt-0 text-sm text-gray-600">
          <a href="/privacy">Privacy</a>
          <a href="/terms">Terms</a>
        </div>
      </div>
    </footer>
  )
}

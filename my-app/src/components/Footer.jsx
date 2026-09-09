export default function Footer({ designer }) {
  return (
    <footer className="border-t border-white/10 bg-black/20">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 text-sm text-white/65 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p>
          © {new Date().getFullYear()} {designer.name} Studio. All rights
          reserved.
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <a className="hover:text-white" href="#work">
            Work
          </a>
          <a className="hover:text-white" href="#services">
            Services
          </a>
          <a className="hover:text-white" href="#about">
            About
          </a>
          <a className="hover:text-white" href="#contact">
            Contact
          </a>
          <a className="hover:text-white" href="/?admin=1">
            Admin
          </a>
        </div>
      </div>
    </footer>
  )
}

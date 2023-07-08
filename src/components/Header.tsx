import { NavLink } from './NavLink'

export function Header() {
  return (
    <header className="sticky left-0 top-0 w-full lg:left-auto border-b backdrop-blur dark:border-white/10">
      <div className="flex items-center h-20 max-w-7xl mx-auto px-8">
        <div>
          <h1 className="text-3xl font-bold">
            dz.<span className="text-blue-700">blog</span>
          </h1>
        </div>
        <nav className="ml-20">
          <NavLink href="posts" title="Posts" />
        </nav>
      </div>
    </header>
  )
}

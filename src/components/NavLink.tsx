import React from 'react'
import Link, { LinkProps } from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/utils/cn'

interface SidebarNavProps extends LinkProps {
  href: string
  title: string
}

export function NavLink({ href, title, ...props }: SidebarNavProps) {
  const pathname = usePathname()

  return (
    <Link
      href={href}
      className={cn(pathname.includes(href) && 'text-blue-600 font-bold')}
      {...props}
    >
      {title}
    </Link>
  )
}

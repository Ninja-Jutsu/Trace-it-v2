'use client'
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FaBug } from 'react-icons/fa'
import classNames from 'classnames'

export default function NavBar() {
  const currentPath = usePathname()

  const links = [
    { label: 'Dashboard', href: '/' },
    { label: 'Issues', href: '/issues' },
  ]

  return (
    <nav className='flex space-x-6 border-b mb-5 px-5 h-14 items-center'>
      <Link href={'/'}>
        <FaBug />
      </Link>
      <ul className='flex space-x-6'>
        {links.map(({ href, label }) => (
          <li key={label}>
            <Link
              href={href}
              className={classNames({
                'text-zinc-900': href === currentPath,
                'text-zinc-500': href !== currentPath,
                'hover:text-zinc-800 transition-colors': true,
              })}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

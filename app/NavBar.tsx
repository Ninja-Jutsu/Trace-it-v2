import React from 'react'
import Link from 'next/link'
import { FaBug } from 'react-icons/fa'

export default function NavBar() {
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
              className='text-zinc-500 hover:text-zinc-800 transition-colors'
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

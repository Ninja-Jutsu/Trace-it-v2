'use client'
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FaBug } from 'react-icons/fa'
import classNames from 'classnames'
import { useSession } from 'next-auth/react'
import { Avatar, Box, Container, DropdownMenu, Flex, Text } from '@radix-ui/themes'
import styled from 'styled-components'

export default function NavBar() {
  return (
    <nav className=' border-b mb-5 px-5 py-3'>
      <Container>
        <Flex
          justify='between'
          className='h-10'
          align='center'
        >
          <Flex
            align='center'
            gap={'3'}
          >
            <Link href={'/'}>
              <FaBug />
            </Link>
            <NavLinks />
          </Flex>
          <AuthStatus />
        </Flex>
      </Container>
    </nav>
  )
}

function NavLinks() {
  const currentPath = usePathname()

  const links = [
    { label: 'Dashboard', href: '/' },
    { label: 'Issues', href: '/issues/list' },
  ]
  return (
    <ul className='flex space-x-6'>
      {links.map(({ href, label }) => (
        <li key={label}>
          <Link
            href={href}
            className={classNames({
              'nav-link': true,
              '!text-zinc-900': href === currentPath,
            })}
          >
            {label}
          </Link>
        </li>
      ))}
    </ul>
  )
}

function AuthStatus() {
  const { status, data: session } = useSession()
  if (status === 'loading')
    return (
      <Avatar
        fallback=''
        size={'2'}
        radius='full'
        className='cursor-pointer'
        color='tomato'
      ></Avatar>
    )
  if (status === 'unauthenticated')
    return (
      <Link
        href={'/api/auth/signin'}
        className='nav-link'
      >
        Login
      </Link>
    )

  return (
    <Box>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Avatar
            src={session!.user!.image!}
            fallback='?'
            size={'2'}
            radius='full'
            className='cursor-pointer'
          />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Label>
            <Text size='2'>{session!.user!.email}</Text>
          </DropdownMenu.Label>
          <DropdownMenu.Item>
            <StyledLink href={'/api/auth/signout'}>Logout</StyledLink>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>
  )
}

const StyledLink = styled(Link)`
  width: 100%;
`

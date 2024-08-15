'use client'
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FaBug } from 'react-icons/fa'
import classNames from 'classnames'
import { useSession } from 'next-auth/react'
import { Avatar, Box, Container, DropdownMenu, Flex, Text } from '@radix-ui/themes'
import { Skeleton } from '@/app/components'
import styled from 'styled-components'

export default function NavBar() {
  return (
    <nav className='border-b flex h-20 items-center'>
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
            <Link
              href={'/'}
              className='block'
            >
              <FaBug className='w-8 h-8 ml-5 sm:w-12 sm:h-12' />
            </Link>
          </Flex>
          <NavLinks />
          <AuthStatus />
        </Flex>
      </Container>
    </nav>
  )
}

function NavLinks() {
  const currentPath = usePathname()

  const links = [
    { label: 'Dashboard', href: '/dashboard' },
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
              'text-xl': true
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
      <>
        {!session ? (
          <Skeleton width='2.5rem' />
        ) : (
          <Avatar
            fallback=''
            size={'2'}
            radius='full'
            className='cursor-pointer mr-5'
            color='tomato'
          />
        )}
      </>
    )
  if (status === 'unauthenticated')
    return (
      <Link
        href={'/api/auth/signin'}
        className='nav-link mr-5 text-xl'
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

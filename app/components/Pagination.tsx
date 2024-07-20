'use client'
import { ChevronLeftIcon, ChevronRightIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon } from '@radix-ui/react-icons'
import { Button, Flex, Text } from '@radix-ui/themes'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

interface Props {
  itemCount: number
  pageSize: number
  currentPage: number
}

export default function Pagination({ currentPage, itemCount, pageSize }: Props) {
  const pageCount = Math.ceil(itemCount / pageSize)

  const router = useRouter()
  const searchParams = useSearchParams()
  if (pageCount <= 1) return

  function changePage(page: number) {
    const params = new URLSearchParams(searchParams)
    params.set('page', page.toString())
    router.push('?' + params.toString())
  }

  return (
    <Flex
      align='center'
      gap='2'
    >
      <Text size='2'>
        Page {currentPage} of {pageCount}
      </Text>
      <Button
        color='gray'
        variant='soft'
        disabled={currentPage === 1}
        onClick={changePage.bind(null, 1)}
        style={{ cursor: 'pointer' }}
      >
        <DoubleArrowLeftIcon />
      </Button>
      <Button
        color='gray'
        variant='soft'
        disabled={currentPage === 1}
        onClick={changePage.bind(null, currentPage - 1)}
        style={{ cursor: 'pointer' }}
      >
        <ChevronLeftIcon />
      </Button>
      <Button
        color='gray'
        variant='soft'
        disabled={currentPage === pageCount}
        onClick={changePage.bind(null, currentPage + 1)}
        style={{ cursor: 'pointer' }}
      >
        <ChevronRightIcon />
      </Button>
      <Button
        color='gray'
        variant='soft'
        disabled={currentPage === pageCount}
        onClick={changePage.bind(null, pageCount)}
        style={{ cursor: 'pointer' }}
      >
        <DoubleArrowRightIcon />
      </Button>
    </Flex>
  )
}

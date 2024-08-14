import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { FaBug } from 'react-icons/fa'
import BackgroundBeamsDisplay from './components/BackGroundBeams'

import { Inter, MedievalSharp } from 'next/font/google'
import { TextGenerateEffect } from './components/ui/text-generate-effect'
const inter = Inter({ subsets: ['latin'] })
const medievalSharp = MedievalSharp({ weight: ['400'], subsets: ['latin'] })

export default function Home() {
  return (
    <BackgroundBeamsDisplay>
      <main className='mx-auto h-full'>
        <section className='px-4 sm:px-8 h-max  grid lg:grid-cols-[1fr,400px] items-center gap-6'>
          <div className='flex flex-col gap-6'>
            <h1 className={`text-3xl md:text-6xl font-bold ${inter.className}`}>
              <span className={`text-4xl md:text-7xl font-bold ${medievalSharp.className}`}>Trace it</span>. An Issue{' '}
              <span className='text-primary'>Tracking</span> App
            </h1>
            <TextGenerateEffect
              words={
                'Accelerate software development with our robust issue tracking tool. Easily create, assign, and prioritize tasks to enhance team collaboration and project management. Ideal for agile development teams.'
              }
            />

            <Button
              asChild
              className='mt-4 p-6 text-xl max-w-max'
            >
              <Link href='/'>Get Started</Link>
            </Button>
          </div>
          <FaBug className='hidden sm:block w-[350px] h-[350px]' />
        </section>
      </main>
    </BackgroundBeamsDisplay>
  )
}

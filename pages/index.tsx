import type { NextPage } from 'next'
import Head from 'next/head'
import Container from '../components/Container'
import H1 from '../components/H1'
import Media from '../components/Media'

const Home: NextPage = () => {
  return (
    <section>
      <Head>
        <title>Drop Shop</title>
        <meta name="description" content="Get Wax Drops in any Token" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Container className='mb-8'>
          <Media
            src={undefined}
            alt=''
            h='h-full'
            w='w-full'
            type='img'
            provider='ipfs' />
        </Container>
        <Container className='mb-8 px-8'>
          <H1 text='top drops' className='mb-4 w-full' />
        </Container>
        <Container className='mb-8 px-8'>
          <H1 text='top collections' className='mb-4 w-full' />
        </Container>
      </main>
    </section>
  )
}

export default Home

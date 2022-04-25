import '../styles/globals.css'
import type { AppProps } from 'next/app'
import 'regenerator-runtime/runtime';
import { UALProvider, withUAL } from 'ual-reactjs-renderer';
import { Wax } from '@eosdacio/ual-wax';
import { Anchor } from 'ual-anchor';
import Layout from '../components/Layout';

const appName = 'Drop Shop';

const waxChain = {
  chainId: '1064487b3cd1a897ce03ae5b6a865651747e2e152090f99c1d19d44e01aea5a4',
  rpcEndpoints: [{
      protocol: 'https',
      host: 'wax.greymass.com',
      port: 443
  }]
}

const wax = new Wax([waxChain]);
const anchor = new Anchor([waxChain], { appName });

function MyApp({ Component, pageProps }: AppProps) {

  const App = () => {

    return (
      <Layout>
        <Component {...pageProps} />
      </Layout>
    )
  }

  const UALConsumer = withUAL(App);

  return (
    <UALProvider chains={[waxChain]} authenticators={[wax, anchor]} 
      appName={ appName }>
      <UALConsumer />
    </UALProvider>
  )
}

export default MyApp

import '@/styles/globals.css';
import { Toaster } from 'react-hot-toast';
import type { AppProps } from 'next/app';
import {
  ContractKitProvider,
  Alfajores,
  NetworkNames,
  useContractKit,
} from '@celo-tools/use-contractkit';

import '@celo/react-celo/lib/styles.css';
import ClientOnly from '@/components/ClientOnly';
import { useReadAllEvents } from '@/hooks/useReadAllEvent';
import AddEvent from '@/components/AddEvent';
import Loading from '@/components/Loading';
import Alert from '@/components/Alert';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import LoadData from '@/components/LoadData';


export default function App({ Component, pageProps }: AppProps) {
 
  return (
    <ContractKitProvider
      networks={[Alfajores]}
      network={{
        name: NetworkNames.Alfajores,
        rpcUrl: 'https://alfajores-forno.celo-testnet.org',
        graphQl: 'https://alfajores-blockscout.celo-testnet.org/graphiql',
        explorer: 'https://alfajores-blockscout.celo-testnet.org',
        chainId: 44787,
      }}
      dapp={{
        name: 'My awesome dApp',
        description: 'My awesome description',
        url: 'https://example.com',
        icon: 'https://example.com/icon.png',
      }}
    >
      <ClientOnly>
      <NavBar/>
        <Component {...pageProps} />
        <AddEvent/>
        <Loading/>
        <Alert/>
        <LoadData/>
        <Footer/>
      </ClientOnly>
      <Toaster />
    </ContractKitProvider>
  );
}

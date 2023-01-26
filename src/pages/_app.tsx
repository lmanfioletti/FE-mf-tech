import { theme } from '../styles/theme'
import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"
import { ProtectedRoutes } from '../common/ProtectedRoutes'

export default function App({ 
  Component,
  pageProps: { session, ...pageProps },
  router,
}: AppProps) {
  return (
    <SessionProvider session={session}> 
     <ProtectedRoutes router={router}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </ProtectedRoutes>
   </SessionProvider>
  )
}

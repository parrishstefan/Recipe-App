import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Example from "@/components/navbar"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Example />
      <Component {...pageProps} />
    </div>
  )
}

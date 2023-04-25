import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "@/components/navbar";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Toaster />
      <Navbar />
      <Component {...pageProps} />
    </div>
  );
}

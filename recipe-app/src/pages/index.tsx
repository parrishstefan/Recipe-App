import Head from "next/head";
import Link from "next/link";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>CPSC 254 Team 03</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex justify-center h-screen items-center max-w-2xl mx-auto">
        <div className="space-y-5">
          <h1 className="font-bold text-6xl text-green-600 text-center">
            CookMate
          </h1>
          <p className="text-gray-500 text-md text-center">
            Meet CookMate, your go-to recipe app for healthy and delicious
            meals! With our easy-to-use app, you can search for recipes based on
            your dietary preferences, cooking time, and ingredients on hand. Our
            recipes are accompanied by detailed nutritional information, so you
            can make informed decisions about your meals.
          </p>
          <Link href="/recipes">
            <div className="px-3 py-2 bg-green-700 flex justify-center rounded-md mt-5 hover:bg-green-800">
              <span className="text-white text-xl">View Recipes →</span>
            </div>
          </Link>
        </div>
      </main>
    </>
  );
}
import Head from "next/head";
import { Logo, Form } from "./components";

export default function Home() {
  return (
    <>
      <Head>
        <title>Form</title>
        <meta name="description" content="Form for wedding memories" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-screen flex flex-col items-center pb-6 px-6 bg-cover bg-no-repeat bg-center">
        <header className="w-full flex justify-start p-4 bg-transparent">
          <Logo />
        </header>
        <main className="flex flex-col items-center justify-center w-full max-w-md bg-white bg-opacity-80 p-2 md:p-8 rounded-lg shadow-lg">
          <Form />
        </main>
      </div>
    </>
  );
}

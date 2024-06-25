import Head from "next/head";
import FileUploadForm from "./components/Form";

export default function Home() {
  return (
    <>
      <div className="min-h-screen flex items-center justify-center p-6 bg-cover">
        <Head>
          <title>Upload Form</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className="flex flex-col items-center justify-center w-full max-w-md bg-white bg-opacity-80 p-8 rounded-lg shadow-lg">
          <FileUploadForm />
        </main>
      </div>
    </>
  );
}

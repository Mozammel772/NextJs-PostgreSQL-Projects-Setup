import Head from "next/head";

export default function page() {
  return (
    <>
      <Head>
        <title>AI-Powered Healthcare - Find Your Perfect Doctor</title>
        <meta
          name="description"
          content="Discover top-rated doctors tailored to your needs with our AI-powered healthcare platform. Get personalized recommendations and book appointments effortlessly."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="pt-56">
        <h1>Welcome to the AI-Powered Healthcare Platform</h1>
        <p>Find the best doctors tailored to your needs.</p>
      </main>
    </>
  );
}

import type { NextPage } from "next";
import Head from "next/head";
import HomeScreen from "../components/screens/HomeScreen";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const hello = trpc.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <HomeScreen />
    </>
  );
};

export default Home;


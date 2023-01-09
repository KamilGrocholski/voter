import type { NextPage } from "next";
import Head from "next/head";
import HomeScreen from "../components/screens/HomeScreen";

const Home: NextPage = () => {

  return (
    <>
      <Head>
        <title>Voter</title>
        <meta name="description" content="Create vote sets and vote" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <HomeScreen />
    </>
  );
};

export default Home;


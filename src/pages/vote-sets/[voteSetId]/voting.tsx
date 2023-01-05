import { NextPage } from "next"
import Head from "next/head"
import VotingScreen from "../../../components/screens/VotingScreen"

const Voting: NextPage = () => {
  return (
    <>
      <Head>
        <title>Voting</title>
      </Head>

      <VotingScreen />
    </>
  )
}

export default Voting
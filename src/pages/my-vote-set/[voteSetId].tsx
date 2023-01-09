import { NextPage } from "next"
import Head from "next/head"
import { MyVoteSetScreen } from "../../components/screens/MyVoteSetScreen"

const MyVoteSet: NextPage = () => {

  return (
    <>
      <Head>
        <title>VoteSet</title>
      </Head>

      <MyVoteSetScreen />
    </>
  )
}

export default MyVoteSet

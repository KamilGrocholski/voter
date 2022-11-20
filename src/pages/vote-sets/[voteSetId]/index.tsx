import { NextPage } from "next"
import Head from "next/head"
import VoteSetScreen from "../../../components/screens/VoteSetScreen"

const VoteSet: NextPage = () => {
    return (
        <>
            <Head>
                <title>Vote set</title>
            </Head>

            <VoteSetScreen />
        </>
    )
}

export default VoteSet
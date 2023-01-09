import { NextPage } from "next"
import Head from "next/head"
import VoteSetScreen from "../../../components/screens/VoteSetScreen"

const VoteSet: NextPage = () => {
    return (
        <>
            <Head>
                <title>Vote set</title>
                <meta name='vote set' content='Vote set' />
            </Head>

            <VoteSetScreen />
        </>
    )
}

export default VoteSet
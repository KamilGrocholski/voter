import { NextPage } from "next"
import Head from "next/head"
import NewScreen from "../components/screens/NewScreen"

const New: NextPage = () => {
    return (
        <>
            <Head>
                <title>new</title>
            </Head>

            <NewScreen />
        </>
    )
}

export default New
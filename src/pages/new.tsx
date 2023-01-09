import { NextPage } from "next"
import Head from "next/head"
import NewScreen from "../components/screens/NewScreen"

const New: NextPage = () => {
    return (
        <>
            <Head>
                <title>New</title>
                <meta name='new' content='Create a new vote set' />
            </Head>

            <NewScreen />
        </>
    )
}

export default New
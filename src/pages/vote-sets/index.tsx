import { NextPage } from "next";
import Head from "next/head";
import VotesSetsPaginationScreen from "../../components/screens/VotesSetsPaginationScreen";

const VoteSets: NextPage = () => {
    return (
        <>
            <Head>
                <title></title>
            </Head>
            
            <VotesSetsPaginationScreen />
        </>
    )
}

export default VoteSets
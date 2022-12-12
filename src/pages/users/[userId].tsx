import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import UserProfileScreen from "../../components/screens/UserProfileScreen";
import MainLayout from "../../layouts/MainLayout";

const UserProfile: NextPage = () => {
    const router = useRouter()

    return (
        <>
            <Head>
                <title>xd</title>
            </Head>

            <MainLayout useContainer={true}>
                <UserProfileScreen userId={router.query.id as string} />
            </MainLayout>
        </>
    )
}

export default UserProfile
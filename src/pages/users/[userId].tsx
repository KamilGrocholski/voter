import { NextPage } from "next";
import Head from "next/head";
import UserProfileScreen from "../../components/screens/UserProfileScreen";
import MainLayout from "../../layouts/MainLayout";

const UserProfile: NextPage = () => {

    return (
        <>
            <Head>
                <title>User profile</title>
                <meta name='user profile' content='User profile' />
            </Head>

            <MainLayout useContainer={true}>
                <UserProfileScreen />
            </MainLayout>
        </>
    )
}

export default UserProfile
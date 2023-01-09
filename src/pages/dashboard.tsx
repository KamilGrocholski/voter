import { NextPage } from "next"
import Head from "next/head"
import DashboardScreen from "../components/screens/DashboardScreen"

const Dashboard: NextPage = () => {
  return (
    <>
      <Head>
        <title>Dashboard</title>
        <meta property="og:dashboard" name='dashboard' content='Check your vote sets' key='dashboard' />
      </Head>

      <DashboardScreen />
    </>
  )
}

export default Dashboard
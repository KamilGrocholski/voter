import { NextPage } from "next"
import Head from "next/head"
import DashboardScreen from "../components/screens/DashboardScreen"

const Dashboard: NextPage = () => {
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>

      <DashboardScreen />
    </>
  )
}

export default Dashboard
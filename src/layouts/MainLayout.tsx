import Footer from "../components/common/Footer"
import Header from "../components/common/Header"

interface Props {
    children: JSX.Element | JSX.Element[]
    useContainer: boolean
}

const MainLayout: React.FC<Props> = ({ children, useContainer = true }) => {
    return (
        <>
            <Header />

            <main className={ `${ useContainer && 'container' } mx-auto flex flex-col min-h-screen px-2 mt-12` }>
                { children }
            </main>

            <Footer />
        </>
    )
}

export default MainLayout
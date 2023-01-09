import Footer from "../components/common/Footer"
import Header from "../components/common/Header"

interface Props {
    children: JSX.Element | JSX.Element[]
    useContainer: boolean
    usePadding?: boolean
}

const MainLayout: React.FC<Props> = ({ children, useContainer = true, usePadding = true }) => {
    return (
        <>
            <Header />

            <main className={`${useContainer && 'container'} mx-auto flex flex-col min-h-screen ${usePadding && 'py-12'}`}>
                {children}
            </main>

            <Footer />
        </>
    )
}

export default MainLayout
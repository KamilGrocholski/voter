import MainLayout from "../../../layouts/MainLayout"
import CreateItem from "./components/CreateItem"
import CreateSet from './components/CreateSet'
import ImagePreview from "./components/ImagePreview"
import ItemCreationModal from "./components/ItemCreationModal"
import ItemsList from "./components/ItemsList"
import NameBar from "./components/NameBar"

const NewScreen: React.FC = () => {
    return (
        <MainLayout useContainer={true}>
            <div className='flex flex-col space-y-3'>
                <CreateSet />
                <NameBar />
                <ImagePreview />
                <ItemsList />
                <CreateItem />
                <ItemCreationModal />
            </div>
        </MainLayout>
    )
}

export default NewScreen
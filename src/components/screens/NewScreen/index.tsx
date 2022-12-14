import MainLayout from "../../../layouts/MainLayout"
import ImageUpload from "../../common/ImageUpload/ImageUpload"
import CreateItem from "./components/CreateItem"
import CreateSet from './components/CreateSet'
import CreationStateModal from "./components/CreationStateModal"
import ItemCreationModal from "./components/ItemCreationModal"
import ItemsList from "./components/ItemsList"
import NameBar from "./components/NameBar"
import { useNewVoteSetStore } from "./store"

const NewScreen: React.FC = () => {
    const { setImage, image } = useNewVoteSetStore()

    return (
        <MainLayout useContainer={true}>
            <div className='flex flex-col space-y-3'>
                <CreateSet />
                <NameBar />
                <ImageUpload
                    storeImage={image}
                    storeImageFn={setImage}
                />
                <CreateItem />
                <ItemsList />
                <CreationStateModal />
                <ItemCreationModal />
            </div>
        </MainLayout>
    )
}

export default NewScreen
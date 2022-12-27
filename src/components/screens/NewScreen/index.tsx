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
    const image = useNewVoteSetStore(state => state.image)
    const setImage = useNewVoteSetStore(state => state.setImage)

    return (
        <MainLayout useContainer={true}>
            <div className='flex flex-col space-y-3 w-[20vw] mx-auto'>
                <CreateSet />
                <NameBar />
                <span className='text-indicative-danger'>{image ? null : 'Choose an image'}</span>
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
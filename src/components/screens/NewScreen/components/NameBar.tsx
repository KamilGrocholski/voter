import React from "react"
import { useNewVoteSetStore } from "../store"

const NameBar: React.FC = () => {
    const name = useNewVoteSetStore(state => state.name)
    const { setName } = useNewVoteSetStore()

    const handleSetName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.currentTarget.value)
    }

    return (
        <div className='rouded-md bg-gray-700 px-3 py-1'>
            <input 
                placeholder='Choose a name for your new vote set'
                value={ name }
                onChange={ handleSetName }
                className='bg-inherit w-full'
            />
        </div>
    )
}

export default NameBar
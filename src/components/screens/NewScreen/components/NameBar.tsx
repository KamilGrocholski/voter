import { useNewVoteSetStore } from "../store"

const NameBar: React.FC = () => {
    const name = useNewVoteSetStore(state => state.name)
    const setName = useNewVoteSetStore(state => state.setName)

    const handleSetName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.currentTarget.value)
    }

    return (
        <>
            <span className='text-indicative-danger'>{!name || name && (name.length <= 5 || name.length >= 45) ? 'Name must be between 5 and 45 characters' : null}</span>
            <input
                placeholder='Choose a name for your new vote set'
                value={name}
                onChange={handleSetName}
                className='input-normal'
            />
        </>
    )
}

export default NameBar
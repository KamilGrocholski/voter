import React from 'react'
import { Modal } from '../../../common/Modal'

interface ErrorModalProps {
    isOpen: boolean
    error: string
    onCancel: () => void
}

// children: ReactNode;
// isOpen: boolean;
// title: string;
// description: string;
// handleCancel: () => void;

export const ErrorModal: React.FC<ErrorModalProps> = ({
    isOpen,
    onCancel,
    error
}) => {

    return (
        <Modal
            title={'Error'}
            description={'An error has occured during the cast voting. Try again.'}
            handleCancel={onCancel}
            isOpen={isOpen}
        >
            <div className='text-indicative-danger'>
                {error}
            </div>
        </Modal>
    )
}

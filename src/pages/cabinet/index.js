import { useState } from "react";
import { Button } from "antd";
import AddIssueModal from "../../components/sheard/IssueModal/Add";

const Cabinet = () => {
    const [ showModal, setShowModal ] = useState(false);

    const handleOpenModal = () => {
        setShowModal(true);
    }

    const handleClose = () => {
        setShowModal(false);
    }
    return (
        <div>
            <Button type="primory" onClick={handleOpenModal}>
               Create Issue
            </Button>

            <AddIssueModal onClose={handleClose} isOpen={showModal}/>
        </div>
    )
};

export default Cabinet;

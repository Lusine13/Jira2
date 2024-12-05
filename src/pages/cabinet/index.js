import { useState, useEffect } from "react";
import { Button } from "antd";
import AddIssueModal from "../../components/sheard/IssueModal/Add";
import { useDispatch, useSelector } from "react-redux";
import { fetchIssuesData } from '../../state-managment/slices/issues';
import EditIssueModal from "../../components/sheard/IssueModal/Edit";
import './index.css';


const Cabinet = () => {
    const dispatch = useDispatch();
    const [ showModal, setShowModal ] = useState(false);
    const { data, isLoading } = useSelector((store) => store.issues);
    const [ editModalData, setEditModalData ] = useState(null);
    
    useEffect(() => {
        dispatch(fetchIssuesData());
    }, []);
    
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
            {
                Boolean(editModalData) && (
                <EditIssueModal
                data={editModalData}
                isOpen={Boolean(editModalData)}                
                onClose={() => setEditModalData(null)}
                />
                )
            }

            <AddIssueModal 
                onClose={handleClose}
                isOpen={showModal}
            />
            
            {/* Todo */}
            <div className='board_container'>
                <ul>
                    {
                        data.map((item) => {
                            return (
                                <li key={item.taskId} onClick={() => setEditModalData(item)}>
                                    {item.issueName}
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    )
};

export default Cabinet;

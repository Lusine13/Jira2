import { useEffect, useState } from "react";
import { Modal, Form, notification } from "antd";
import ModalForm from "../Form";
import { db } from "../../../../services/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { FIRESTORE_PATH_NAMES } from "../../../../core/utils/constants";
import { useDispatch } from "react-redux";
import { fetchIssuesData } from "../../../../state-managment/slices/issues";

const EditIssueModal = ({ isOpen, onClose, data }) => {
    const [ buttonLoading, setButtonLoading ] = useState(false);  
    const dispatch = useDispatch();
    const [ form ] = Form.useForm();
    
    const handleEditIssue = async (formData) => {
        setButtonLoading(true);
        try {
          const { taskId } = data;          
          const issueDocRef = doc(db, FIRESTORE_PATH_NAMES.ISSUES, taskId);
          await updateDoc(issueDocRef, formData);
          notification.success({
            message: 'Issue data successfully updated'
          })
          dispatch(fetchIssuesData());
          onClose();
        } catch(error) {
            console.log(error);
        } finally {
            setButtonLoading(false);
        }
    }

    useEffect(() => {          
        form.setFieldsValue(data);        
    }, [data, form]);

    return (
        <Modal
            title="Edit Issue"
            open={isOpen}
            width={600}
            okText="Edit Issue"
            centered
            onCancel={onClose}
            onOk={form.submit}
            >   
            <ModalForm
                form={form}
                onFinish={handleEditIssue}
                />         
        </Modal>
    )
};

export default EditIssueModal;
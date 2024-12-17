import { Modal, Form, notification } from 'antd';
import { useState } from 'react';
import ModalForm from '../Form';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../../../services/firebase';
import { FIRESTORE_PATH_NAMES } from '../../../../core/utils/constants';
import { generateUid } from '../../../../core/helpers/generateUid';
import { useDispatch } from 'react-redux';
import { fetchIssuesData } from '../../../../state-managment/slices/issues'
import { taskStatuses } from '../../../../core/utils/issues';

const AddIssueModal = ({ isOpen, onClose }) => {
    const dispatch = useDispatch();
    const [ form ] = Form.useForm();
    const [ buttonLoading, setButtonLoading ] = useState(false);

    const handleCreateIssue = async (values) => {
        setButtonLoading(true);
        const taskId = generateUid();

        const taskModel = {
            taskId,
            ...values,
            status: taskStatuses.TODO.key,
            date: new Date().toLocaleDateString()
        };
      
        try {
            const createdDoc = doc(db, FIRESTORE_PATH_NAMES.ISSUES, taskId);
            await setDoc(createdDoc, taskModel);            
            onClose();
            form.resetFields();
            notification.success({
                message: 'Your task has been created'
            });
         dispatch(fetchIssuesData());
        }catch {
            notification.error({
                message: 'Error Ooops'
            });
        }finally {
            setButtonLoading(false);
        }
    }
    
const handleClose = () => {
    onClose();
    form.resetFields();
}
    return (
        <Modal
          title="Create Issue"
          open={isOpen}
          width={600}
          onCancel={handleClose}
          okText="Create Issue"
          centered
          confirmLoading={buttonLoading}
          onOk={form.submit}
        >
          <ModalForm  form={form} onFinish={handleCreateIssue} />  

        </Modal>
    )
};

export default AddIssueModal;
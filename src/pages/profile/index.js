import { useContext } from 'react';
import { Form, Input, Button } from "antd";
import { AuthContext } from '../../context/authContext';
import "./index.css";

const Profile = () => {
    const { useProfileInfo } = useContext(AuthContext);
    const [ form ] = Form.useForm();

    useEffect(() => {
        const { uid, ...restData } = useProfileInfo;

        form.setFieldValue(restData);
    }, [form, useProfileInfo])

    return (
        <div>
            <Form layout="vertical" form={form}>
                <Form.Item
                label="First Name"
                name="firstName"
                >
                <Input
                placeholder="First Name"
                />  
                </Form.Item>

                <Form.Item
                label="Last Name"
                name="lasttName"
                >
                <Input
                placeholder="Last Name"
                />  
                </Form.Item>

                <Form.Item
                label="Email"
                name="email"
                >
                <Input
                readOnly
                placeholder="Email"
                />  
                </Form.Item>

                <Form.Item
                label="Phone Number"
                name="phoneNumber"
                >
                <Input
                placeholder="Phone Number"
                />  
                </Form.Item>

                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
         
            </Form>
        </div>
    )
};

export default Profile;
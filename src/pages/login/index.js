import { useState } from 'react';
import { Form, Input, Button } from 'antd';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../services/firebase';

const Login = () => {
  const [loading, setLoading] = useState(false);

  const [ form ] = Form.useForm();

  const handleLogin = async values => {
    setLoading(true);
    try {
        const { email, password } = values;
        const response = await signInWithEmailAndPassword(auth, email, password);
        form.resetFields();
    }
    catch (error) {
        console.log(error)
    } finally {
        setLoading(false);
    }    
  };


  return (
    <div>
      <Form layout="vertical" form={form} onFinish={handleLogin}>
        <Form.Item 
        label="Email"
        name="email"
        rules={[
            {
                required: true,
                message: 'Please input your email'
            }
        ]}
        >
          <Input type="email" placeholder="Email"/>
        </Form.Item>

        <Form.Item 
        label="Password"
        name="password"
        tooltip="Password must be min 6 max 16 characters..."
        rules={[
            {
                required: true,
                message: 'Please input your password'
            },
            {
                pattern:  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
                message: 'Wrong password'
            }
        ]}
        >
          <Input.Password placeholder="Password"/>
        </Form.Item>

        <Button type="primary" htmlType="submit" loading={loading} >
          Sign in
        </Button>
      </Form>
    </div>
  )
}




export default Login;
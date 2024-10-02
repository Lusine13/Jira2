import React from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Form, Button, Input, notification } from 'antd';
import { auth } from '../../services/firebase';
import './index.css';

class Register extends React.Component {
    constructor () {
        super();
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            loading: false
        }
    }

    handleChangeImput = e => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }
    
    handleRegister = async e => {
        e.preventDefault();
        this.setState( {
            loading: true
        });
        const { email, password } = this.state;
        try {
            await createUserWithEmailAndPassword(auth, email, password);
        } catch {
            console.log('error');
        }finally {
            this.setState({
                loading: false
            });
        }
    }
    
    

    render () {
        const { loading } = this.state;
        return (
            <div className="auth_container">                
            <Form layout="vertical" onSubmit={this.handleRegister}>

            <Form.Item label="First Name">
              <Input type="text" name="firstName" placeholder="First Name" onChange={this.handleChangeInput}/>
            </Form.Item>

            <Form.Item label="Last Name">
              <Input type="text" name="lastName" placeholder="Last Name" onChange={this.handleChangeInput}/>
            </Form.Item>

            <Form.Item label="Email">
              <Input type="email" name="email" placeholder="Email" onChange={this.handleChangeInput}/>
            </Form.Item>

            <Form.Item label="Password">
              <Input type="password" name="password" placeholder="Password" onChange={this.handleChangeInput}/>
            </Form.Item>

            <Button type="primary" onclick={this.handleRegister} loading={loading}>Register</Button>
          </Form>
            </div>
        )
    }
};
export default Register;
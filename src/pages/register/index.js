import React from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../services/firebase';

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
    
   /* handleRegister = async e => {
        e.preventDefault();
        this.setState( {
            loading: true
        });
        const { email, password } = this.state;
        try {
            await createUser
        }
    }
    */
    

    render () {
        return (
            <div>
                <fieldset>
                    <legend>Register</legend>

                    <form onSubmit={this.handleRegister}>
                        <label htmlFor="">
                        <p>First Name</p>
                        <input type='text' name="firstName" placeholder="First Name" onChange={this.handleChangeImput}/>
                        </label>

                        <label htmlFor="">
                            <p>Last Name</p>
                            <input type="text" name="lastName" placeholder="Last Name" onChange={this.handleChangeImput}/>
                        </label>
                        <label htmlFor="">
                            <p>Email</p>
                            <input type="email" name="email" placeholder="Email" onChange={this.handleChangeImput}/>
                        </label>
                        <label htmlFor="">
                            <p>Password</p>
                            <input type="password" name="password" placeholder="Password" onChange={this.handleChangeImput}/>
                        </label>

                        <hr/>
                        <button>Register</button>
                    </form>
                </fieldset>
            </div>
        )
    }
};
export default Register;
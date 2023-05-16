import React, { useContext, useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../Provider/AuthProvider';
import { toast } from 'react-toastify';

const Login = () => {
    const [emailError, setEmailError] = useState('');
    const [error, setError] = useState('');
    const { signInUser, createUserWithGoogle } = useContext(AuthContext);

    const handleSignIn = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        signInUser(email, password)
            .then(result => {
                const loggedUser = result.user;
                setError('')
                setEmailError('')
                form.reset();
                toast('Successfully Login')
            })
            .catch(error => {
                console.error(error.message)
                if (error.message == 'Firebase: Error (auth/user-not-found).') {
                    setError('')
                    setEmailError('user-not-found')
                }
                else if (error.message == 'Firebase: Error (auth/wrong-password).') {
                    setEmailError('')
                    setError('wrong-password')
                }

            })
    }

    const handleLoginWithGoogle = () => {
        createUserWithGoogle()
        .then(result => {
            console.log(result.user)
        })
        .catch(error => {
            console.log(error.message)
        })
    }
    return (
        <div className='w-75 w-md-25 mx-auto mt-5 border rounded px-4 py-5' style={{ boxShadow: ' -10px 10px #FFE0B3' }}>
            <h3>Login</h3>
            <Form onSubmit={handleSignIn}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" name='email' required />
                    <Form.Text className="text-muted">
                        <p className='text-danger'> {emailError} </p>
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" name='password' required />
                </Form.Group>
                <Form.Text className="text-muted">
                    <p className='text-danger'> {error} </p>
                </Form.Text>
                <Form.Text className="text-muted">
                    <p><button className='btn btn-link'>Show password</button></p>
                </Form.Text>
                <Button variant="primary fw-semibold w-100" type="submit">
                    Login
                </Button>
                <p className='text-center mt-3'>New to Ema-john? <Link to='/register'>Create new Account</Link> </p>
                <div className="mt-5">
                    <button onClick={handleLoginWithGoogle} className="w-100 "> <img className='' style={{ width: '20px' }} src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2008px-Google_%22G%22_Logo.svg.png" alt="" /> Continue with Google</button>
                </div>
            </Form>
        </div>
    );
};

export default Login;
import React, { useContext, useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../Provider/AuthProvider';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';


const Register = () => {
    const [error, setError] = useState('');
    const [confirmError, setConfirmError] = useState('');
    const {createUser, createUserWithGoogle} = useContext(AuthContext);
    const [showPass, setShowPass] = useState('password');

    const handleRegister = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        const confirmPassword = form.confirm.value;

        if(password.length < 8) {
            setError('Password Minimum eight characters long');
            setConfirmError('')
            return;
        }

        else if(password != confirmPassword){
            setConfirmError('Password did not match')
            setError('')
            return 
        }
        createUser(email, password)
        .then(result => {
            const createdUser = result.user;
            setError('')
            setConfirmError('')
            toast("Wow Successfully Register!");
            form.reset();
        })
        .catch(error => {
            console.error(error.message)
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

    const handlePassword = () => {
        if(showPass === 'password'){
            setShowPass('text')
        }
        else{
            setShowPass('password')
        }
    }
    return (
        <Container className='w-25 mx-auto mt-5 border rounded p-4' style={{ boxShadow: ' -10px 10px #FFE0B3' }}>
            <h3>Sign Up</h3>
            <Form onSubmit={handleRegister}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Your Name</Form.Label>
                    <Form.Control type="text" name='name' required />
                    <Form.Text className="text-muted">

                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" name='email' required />
                    <Form.Text className="text-muted">

                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type={showPass} name='password' required />
                </Form.Group>
                <Form.Text className="text-muted">
                    <p className='text-danger'>{error}</p>
                </Form.Text>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Confirm Password
                    </Form.Label>
                    <Form.Control type="password" name='confirm' required  />
                </Form.Group>
                <Form.Text className="text-muted">
                    <p className='text-danger'>{confirmError}</p>
                </Form.Text>
                <Form.Text className="text-muted">
                    <p onClick={handlePassword} className='btn btn-link'>Show password</p>
                </Form.Text>
                <Button variant="primary fw-semibold w-100" type="submit">
                Sign Up
                </Button>
                <p className='text-center mt-3'>Already Have an Account? <Link to='/login'>Login</Link> </p>
                <div className="mt-5">
                    <p onClick={handleLoginWithGoogle} className="w-100 d-flex align-items-center justify-content-center border border-2 rounded py-2 " style={{cursor: 'pointer'}}> <img className='me-2' style={{ width: '20px' }} src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2008px-Google_%22G%22_Logo.svg.png" alt="" /> Continue with Google</p>
                </div>
            </Form>
        </Container>
    );
};

export default Register;
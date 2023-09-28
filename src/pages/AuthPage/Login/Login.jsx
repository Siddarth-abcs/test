import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../../../components/AuthComponents/LoginForm';

const Login = () => {
  return (
    <div className='container-fluid'>
      <h1 className='display-1 my-5 text-center'>Login Here</h1>
      <div className="row">
        <div className="col-md-5 mx-auto mt-5">
          <LoginForm />
          <p className="mt-3 text-center">
            Not a member? <Link to='/register' className="btn btn-link">Register</Link>
          </p>
        </div> 
      </div>
    </div>
  )
}

export default Login;

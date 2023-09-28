import React from 'react';
import { Link } from 'react-router-dom';
import RegisterForm from '../../../components/AuthComponents/RegisterForm';

function Register() {
  return (
    <div className='container-fluid'>
      <h1 className='display-1 my-5 text-center'>Register Here</h1>
      <div className="row">
        <div className="col-md-5 mx-auto mt-5">
          <RegisterForm />
          <p className="mt-3 text-center">
            Already a member? <Link to='/login' className="btn btn-link">Login</Link>
          </p>
        </div> 
      </div>
    </div>
  )
}

export default Register;

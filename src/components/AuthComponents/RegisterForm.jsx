import React from 'react';
import { useDispatch } from 'react-redux';
import { signUpUser } from '../../redux/actionCreators/authActionCreator';
import { useNavigate } from 'react-router-dom';

function RegisterForm() {
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [passwordConfirmation, setPasswordConfirmation] = React.useState("");
    const [success, setSuccess] = React.useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !email || !passwordConfirmation || !password) {
            alert("Please fill in all fields");
            return;
        }
        if (password !== passwordConfirmation) {
            alert("Passwords do not match");
            return;
        }

        dispatch(signUpUser(name, email, password, setSuccess));
    }

    React.useEffect(() => {
        if (success) {
            navigate("/dashboard");
        }
    }, [success])

    return (
        <form autoComplete='off' onSubmit={handleSubmit}>
            <div className="form-group my-2">
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    id="name"
                    name='name'
                    className='form-control'
                    placeholder='Name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className="form-group my-2">
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    name='email'
                    className='form-control'
                    placeholder='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="form-group my-2">
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    name='password'
                    className='form-control'
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div className="form-group my-2">
                <label htmlFor="passwordConfirmation">Confirm Password</label>
                <input
                    type="password"
                    id="passwordConfirmation"
                    name='passwordConfirmation'
                    className='form-control'
                    placeholder='Confirm Password'
                    value={passwordConfirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                />
            </div>
            <button type='submit' className='btn btn-primary my-2 form-control'>Register</button>
        </form>
    )
}

export default RegisterForm;

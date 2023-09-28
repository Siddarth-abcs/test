import { Link } from 'react-router-dom';
import { useSelector} from 'react-redux/es/hooks/useSelector';
import { signOutUser } from '../../../redux/actionCreators/authActionCreator';
import { useDispatch } from 'react-redux';

function Navbar() {
  
  const { isAuthenticated, user } = useSelector(state => state.auth);

  const dispatch = useDispatch();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-lg p-3">
        <Link className='navbar-brand ms-5' to='/'>
            File Management System
        </Link>

        <ul className='navbar-nav ms-auto me-5'>

          {
            isAuthenticated ? (

          <>
           <li className='nav-item mx-2'>
          <p className='my-0 mt-1 mx-2'>
            <span className='text-dark'>Welcome</span>
            <span className='fw-bold text-yellow ms-2'>{user.email.name}</span>
          </p>
          </li>
          <li className='nav-item mx-2'>
          <Link to="/dashboard" className='btn btn-primary '>Home</Link>
          </li>
          <li className='nav-item mx-2'>
          <Link to="/" className='btn btn-primary ' onClick={ () => dispatch(signOutUser())}>Logout</Link>
          </li>
          </>

            ):(

          <>
          <li className='nav-item mx-2'>
          <Link to="/login" className='btn btn-primary btn-sm'>Login</Link>
          </li>
          <li className='nav-item mx-2'>
          <Link to="/Register" className='btn btn-primary btn-sm'>Register</Link>
          </li>
          </>

            )
          }

        </ul>
    </nav>
  )
}

export default Navbar;

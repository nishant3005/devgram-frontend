import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import Footer from '../components/Footer';

let SignupScreen = () => {
  const navigate = useNavigate();

  let [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  });

  let [userError, setUserError] = useState({
    nameError: '',
    emailError: '',
    passwordError: '',
  });

  let validateUsername = (event) => {
    setUser({ ...user, name: event.target.value });
    let regExp = /^[a-zA-Z0-9]/;
    !regExp.test(event.target.value)
      ? setUserError({ ...userError, nameError: 'Enter a proper Username' })
      : setUserError({ ...userError, nameError: '' });
  };

  let validateEmail = (event) => {
    setUser({ ...user, email: event.target.value });
    let regExp = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;
    !regExp.test(event.target.value) || event.target.value.trim() == ''
      ? setUserError({ ...userError, emailError: 'Enter a proper Email' })
      : setUserError({ ...userError, emailError: '' });
  };

  let validatePassword = (event) => {
    setUser({ ...user, password: event.target.value });
    if (event.target.value.trim() == '')
      setUserError({ ...userError, passwordError: 'Enter a proper Password' });
    else setUserError({ ...userError, passwordError: '' });
  };

  let submitRegistration = async (event) => {
    event.preventDefault();
    if (
      user.name.trim() !== '' &&
      user.email.trim() !== '' &&
      user.password.trim() !== ''
    ) {
      let name = user.name.trim();
      let email = user.email.trim();
      let password = user.password.trim();

      const { status } = await axios.post(
        'https://devgram-backend.onrender.com/api/users/signup',
        { name, email, password },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log(status);
      if (status == 201) {
        Swal.fire('User already exists', '', 'error');
        return;
      } else if (status == 200) {
        Swal.fire('Registration successful', '', 'success');
        navigate('/users/login');
      }
      console.log(user);
    } else {
      Swal.fire('Oh no!', 'Something went wrong! Try again', 'error');
    }
  };

  return (
    <React.Fragment>
      <div className="background cover">
        <div className="d-flex align-items-center pt-5">
          <div className="container h-100 mt-5">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                <div className="card" style={{ borderRadius: '15px' }}>
                  <div className="card-body p-5">
                    <h2 className="text-uppercase text-center mb-5 text-color">
                      Register to dev-gram
                    </h2>

                    <form onSubmit={submitRegistration}>
                      <div className="form-group mb-4">
                        <input
                          required
                          name="name"
                          value={user.name}
                          onChange={validateUsername}
                          type="text"
                          className={`form-control form-control-lg ${
                            userError.nameError.length > 0 ? 'is-invalid' : ''
                          }`}
                          placeholder="Name"
                        />
                        {userError.nameError.length > 0 ? (
                          <small className="text-danger">
                            {userError.nameError}
                          </small>
                        ) : (
                          ''
                        )}
                      </div>
                      <div className="form-group mb-4">
                        <input
                          required
                          name="email"
                          value={user.email}
                          onChange={validateEmail}
                          type="email"
                          className={`form-control form-control-lg ${
                            userError.emailError.length > 0 ? 'is-invalid' : ''
                          }`}
                          placeholder="Email"
                        />
                        {userError.emailError.length > 0 ? (
                          <small className="text-danger">
                            {userError.emailError}
                          </small>
                        ) : (
                          ''
                        )}
                      </div>
                      <div className="form-group mb-4">
                        <input
                          required
                          name="password"
                          value={user.password}
                          onChange={validatePassword}
                          type="password"
                          className={`form-control form-control-lg ${
                            userError.passwordError.length > 0
                              ? 'is-invalid'
                              : ''
                          }`}
                          placeholder="Password"
                        />
                        {userError.passwordError.length > 0 ? (
                          <small className="text-danger">
                            {userError.passwordError}
                          </small>
                        ) : (
                          ''
                        )}
                      </div>
                      <div className="d-flex justify-content-center">
                        <input
                          type="submit"
                          className="btn btn-primary big-btn"
                          style={{ fontSize: '13px' }}
                          value="Register"
                        />
                      </div>
                    </form>
                    <p className="text-center text-muted mt-5 mb-0">
                      Already have an account ?
                      <Link
                        to="/users/login"
                        className="fw-bold text-color link-hover"
                      >
                        {' '}
                        Login
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="cover-footer">
          <Footer />
        </div>
      </div>
    </React.Fragment>
  );
};
export default SignupScreen;

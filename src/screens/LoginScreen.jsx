import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import Footer from '../components/Footer';

let LoginScreen = () => {
  const navigate = useNavigate();
  let [user, setUser] = useState({
    email: '',
    password: '',
  });

  let [userError, setUserError] = useState({
    emailError: '',
    passwordError: '',
  });

  useEffect(() => {
    if (localStorage.getItem('devroom')) {
      navigate('/');
    }
  }, []);

  let validateEmail = (event) => {
    setUser({ ...user, email: event.target.value });
    let regExp = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;
    !regExp.test(event.target.value)
      ? setUserError({ ...userError, emailError: 'Enter a proper Email' })
      : setUserError({ ...userError, emailError: '' });
  };

  let validatePassword = (event) => {
    setUser({ ...user, password: event.target.value });
    if (event.target.value.trim() === '')
      setUserError({ ...userError, passwordError: 'Enter a proper Password' });
    else setUserError({ ...userError, passwordError: '' });
  };
  let submitLogin = async (event) => {
    event.preventDefault();
    if (user.email !== '' && user.password !== '') {
      let email = user.email;
      let password = user.password;
      const { status, data } = await axios.post(
        'https://devgram-backend.onrender.com/api/users/login',
        { email, password },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (status === 201) {
        Swal.fire('Invalid credentials', '', 'error');
      } else if (status === 200) {
        Swal.fire('Login successful', '', 'success');
        localStorage.setItem('devroom', data.token);
        navigate('/developers');
      }
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
                      Login to dev-gram
                    </h2>

                    <form onSubmit={submitLogin}>
                      <div className="form-group mb-4">
                        <input
                          name="email"
                          required
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
                          name="password"
                          required
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
                          value="Login"
                        />
                      </div>
                    </form>
                    <p className="text-center text-muted mt-5 mb-0">
                      Don't have an account ?
                      <Link
                        to="/users/signup"
                        className="fw-bold text-color link-hover"
                      >
                        {' '}
                        Register
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="cover-footer">
        <Footer />
      </div>
    </React.Fragment>
  );
};
export default LoginScreen;

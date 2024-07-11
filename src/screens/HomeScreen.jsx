import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

let HomeScreen = () => {
  let navigate = useNavigate();
  let clickLogOut = async () => {
    localStorage.removeItem('devroom');
    navigate('/users/login');
  };

  return (
    <React.Fragment>
      <div className="landing-page">
        <div className="landing-page-img"></div>
        <div className="wrapper landing-page-text">
          <div className="d-flex flex-column justify-content-center align-items-center text-center h-100 home-item">
            <h2 className="home-xl-text">devgram</h2>
            <h2 className="home-title">where developers meet</h2>

            <p className="animated zoomIn home-para text-white">
              A website for developers where they can post their works, update
              profile and connect to other developers accross the globe
            </p>
            {localStorage.getItem('devroom') ? (
              <div className="animated jello">
                <Link
                  to="/users/signup"
                  className="btn btn-primary"
                  onClick={clickLogOut}
                >
                  Logout
                </Link>
              </div>
            ) : (
              <div className="animated jello">
                <span className="pe-2">
                  <Link to="/users/signup" className="btn btn-primary">
                    Register
                  </Link>
                </span>
                <span className="ps-2">
                  <Link to="/users/login" className="btn btn-primary">
                    Login
                  </Link>
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="cover-footer ">
        <div className="footer">
          <p className="text-center text-white">
            Developed with <span className="heart-color">&hearts;</span> by
            Nishant
          </p>
        </div>
      </div>
    </React.Fragment>
  );
};
export default HomeScreen;

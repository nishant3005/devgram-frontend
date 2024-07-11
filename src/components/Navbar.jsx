import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Logo from '../assets/logo-transparent.png';

let Navbar = () => {
  let navigate = useNavigate();

  const [user, setUser] = useState({});

  const getUser = async () => {
    const { data } = await axios.get(
      'https://devgram-backend.onrender.com/api/users/me',
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('devroom')}`,
        },
      }
    );
    setUser(data.user);
  };
  console.log(user);

  useEffect(() => {
    if (localStorage.getItem('devroom')) getUser();
  }, []);

  let clickLogOut = async () => {
    localStorage.removeItem('devroom');
    navigate('/users/login');
  };

  let beforeLogin = (
    <React.Fragment>
      <li className="nav-item">
        <Link to="/users/signup" className="nav-link nav-item-style">
          Register
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/users/login" className="nav-link nav-item-style">
          Login
        </Link>
      </li>
    </React.Fragment>
  );

  let afterLogin = (
    <React.Fragment>
      <li className="nav-item">
        <Link to="/posts/list" className="nav-link nav-item-style">
          <i className="fa fa-list" />
          All Posts
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/posts/follow-post" className="nav-link nav-item-style">
          <i class="fa fa-user-plus"></i> My Feed
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/profiles/dashboard" className="nav-link nav-item-style">
          <i className="fa fa-sitemap" /> Dashboard
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/" className="nav-link">
          <img
            src={user.avatar}
            alt=""
            width="25"
            height="25"
            className="rounded-circle"
          />
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/" className="nav-link nav-item-style" onClick={clickLogOut}>
          LogOut
        </Link>
      </li>
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <nav className="navbar navbar-expand-sm nav-css">
        <div className="container">
          <Link to="/" className="navbar-brand">
            <img src={Logo} alt="logo" className="logo" />
          </Link>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav  ms-auto">
              <li className="nav-item">
                <Link to="/developers" className="nav-link nav-item-style">
                  <i className="fa fa-user-tie" /> Developers
                </Link>
              </li>
            </ul>
            <ul className="navbar-nav">
              {localStorage.getItem('devroom') ? afterLogin : beforeLogin}
            </ul>
          </div>
        </div>
      </nav>
    </React.Fragment>
  );
};
export default Navbar;

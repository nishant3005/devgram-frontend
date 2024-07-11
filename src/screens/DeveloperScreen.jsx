import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';
import axios from 'axios';
import Footer from '../components/Footer';

let DeveloperScreen = () => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  //Edit
  const [user, setUser] = useState({});

  useEffect(() => {
    if (localStorage.getItem('devroom')) {
      setLoggedIn(true);
    }
  }, []);

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

  console.log(user.name);

  const fetchProfiles = async () => {
    const { data } = await axios.get(
      'https://devgram-backend.onrender.com/api/profiles/all',
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    setProfiles(data.profiles);
    setLoading(false);
    // console.log(data.profiles)
  };

  useEffect(() => {
    fetchProfiles();
    if (loggedIn) {
      getUser();
    }
  }, [loggedIn]);

  let clickFollowUser = async (profileId) => {
    const { data } = await axios.put(
      `https://devgram-backend.onrender.com/api/profiles/follow/${profileId}`,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('devroom')}`,
        },
      }
    );
    fetchProfiles();
  };

  return (
    <React.Fragment>
      <div className="background">
        <section className="p-3">
          <div className="container">
            <div className="row animated zoomIn">
              <div className="col">
                <h2 className="text-white">List of registered developers</h2>
              </div>
            </div>
          </div>
        </section>
        <section>
          {loading ? (
            <Spinner />
          ) : (
            <React.Fragment>
              {profiles.length > 0 ? (
                <React.Fragment>
                  <div className="container">
                    <div className="row">
                      <div className="col">
                        {profiles.map((profile) => {
                          return (
                            <div
                              className="card my-2 animated zoomIn"
                              key={profile._id}
                            >
                              <div className="card-body bg-light-grey">
                                <div className="row">
                                  <div className="col-md-2">
                                    <img
                                      src={profile.user.avatar}
                                      className="img-style"
                                      alt=""
                                    />
                                  </div>
                                  <div className="col-md-5">
                                    <h2>{profile.user.name}</h2>
                                    <div className="pb-3">
                                      <small className="h6">
                                        {profile.website}
                                      </small>
                                      <br />
                                      <small className="h6">
                                        {profile.designation}
                                      </small>
                                      <br />
                                      <small className="h6">
                                        {profile.company},{' '}
                                        <span>
                                          <small>{profile.location}</small>
                                        </span>
                                      </small>
                                      <br />
                                    </div>

                                    <span className="me-3">
                                      <Link
                                        to={`/developers/${profile._id}`}
                                        className="btn btn-primary"
                                      >
                                        View Profile
                                      </Link>
                                    </span>

                                    {loggedIn ? (
                                      <>
                                        {profile.user._id !== user._id &&
                                        loggedIn ? (
                                          profile.followers.includes(
                                            user._id
                                          ) ? (
                                            <button
                                              className="btn btn-primary unfollow-btn me-2"
                                              onClick={clickFollowUser.bind(
                                                this,
                                                profile._id
                                              )}
                                            >
                                              Unfollow
                                            </button>
                                          ) : (
                                            <button
                                              className="btn btn-primary me-2"
                                              onClick={clickFollowUser.bind(
                                                this,
                                                profile._id
                                              )}
                                            >
                                              Follow
                                            </button>
                                          )
                                        ) : (
                                          <></>
                                        )}
                                      </>
                                    ) : (
                                      <></>
                                    )}
                                  </div>
                                  <div className="col-md-5 d-flex justify-content-center flex-wrap ">
                                    {profile.skills.length > 0 &&
                                      profile.skills.map((skill, index) => {
                                        return (
                                          <div key={index}>
                                            <span className="badge badge-success p-2 m-1">
                                              <i className="fa fa-check-circle" />{' '}
                                              {skill}
                                            </span>
                                            <br />
                                          </div>
                                        );
                                      })}
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              ) : null}
            </React.Fragment>
          )}
        </section>
        <Footer />
      </div>
    </React.Fragment>
  );
};
export default DeveloperScreen;

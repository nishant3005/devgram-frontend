import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import Spinner from '../components/Spinner';
import Footer from '../components/Footer';

let PostScreen = () => {
  let [localPost, setLocalPost] = useState({
    title: '',
    text: '',
    image: '',
  });

  let navigate = useNavigate();
  let [user, setUser] = useState({});
  let [posts, setPosts] = useState({});
  let [loading, setLoading] = useState(true);
  let [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    if (!localStorage.getItem('devroom')) {
      navigate('/users/login');
    }
    setLoggedIn(true);
  }, []);

  function timeDifference(current, previous) {
    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    var elapsed = current - previous;

    if (elapsed < msPerMinute) {
      if (elapsed / 1000 < 30) return 'Just now';

      return Math.round(elapsed / 1000) + ' seconds ago';
    } else if (elapsed < msPerHour) {
      return Math.round(elapsed / msPerMinute) + ' minutes ago';
    } else if (elapsed < msPerDay) {
      return Math.round(elapsed / msPerHour) + ' hours ago';
    } else if (elapsed < msPerMonth) {
      return Math.round(elapsed / msPerDay) + ' days ago';
    } else if (elapsed < msPerYear) {
      return Math.round(elapsed / msPerMonth) + ' months ago';
    } else {
      return Math.round(elapsed / msPerYear) + ' years ago';
    }
  }

  function ellipsify(str) {
    if (str.length > 200) {
      return str.substring(0, 180) + '...';
    } else {
      return str;
    }
  }

  const getUser = async () => {
    let { data } = await axios.get(
      'https://devgram-backend.onrender.com/api/users/me',
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('devroom')}`,
        },
      }
    );
    setUser(data.user);
    console.log(data.user);
  };

  const getPosts = async () => {
    let { data } = await axios.get(
      'https://devgram-backend.onrender.com/api/posts/',
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('devroom')}`,
        },
      }
    );
    setPosts(data.posts);
    console.log(data.posts);
    setLoading(false);
  };

  useEffect(() => {
    if (loggedIn) {
      getUser().then(() => {
        getPosts();
      });
    }
  }, [loggedIn]);

  let updateInput = (e) => {
    setLocalPost({
      ...localPost,
      [e.target.name]: e.target.value,
    });
  };

  let submitCreatePost = async (e) => {
    e.preventDefault();
    if (localPost.text.trim() !== '') {
      const { data } = await axios.post(
        'https://devgram-backend.onrender.com/api/posts/',
        localPost,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('devroom')}`,
          },
        }
      );
      Swal.fire('Post created successfully', '', 'success');
      console.log(user);
      getPosts();
    }

    setLocalPost({
      title: '',
      text: '',
      image: '',
    });
  };

  let clickDeletePost = async (postId) => {
    const { data } = await axios.delete(
      `https://devgram-backend.onrender.com/api/posts/${postId}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('devroom')}`,
        },
      }
    );
    let newArr = posts.filter((post) => {
      if (post._id == postId) return false;
      return true;
    });
    setPosts(newArr);
    Swal.fire('Post deleted successfully', '', 'success');
  };

  let clickLikePost = async (postId) => {
    const { data } = await axios.put(
      `https://devgram-backend.onrender.com/api/posts/like/${postId}`,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('devroom')}`,
        },
      }
    );
    getPosts();
  };

  return (
    <React.Fragment>
      <div className="background">
        <section className="p-3">
          <div className="container">
            <div className="row">
              <div className="col">
                <h2 className="text-white">Welcome to devgram Posts</h2>
                <p className="text-white">
                  Post your achievements, suceess and needs and share with other
                  developers!
                </p>
              </div>
            </div>
            <div className="row">
              {Object.keys(user).length > 0 && (
                <div className="col-md-8">
                  <form onSubmit={submitCreatePost}>
                    <div className="d-flex">
                      <div className="input-group-prepend me-3">
                        <img
                          src={user.avatar}
                          alt=""
                          width="50"
                          height="50"
                          className="rounded-circle me-2 mt-3"
                        />
                      </div>
                      <div className="w-100 mt-3">
                        <div className="form-group mb-2">
                          <input
                            name="title"
                            value={localPost.title}
                            onChange={updateInput}
                            type="text"
                            className="form-control form-control-lg"
                            placeholder="Title"
                          />
                        </div>
                        <div className="form-group mb-2">
                          <textarea
                            required
                            name="text"
                            value={localPost.text}
                            onChange={updateInput}
                            rows="3"
                            className="form-control form-control-lg"
                            placeholder="Whats on your mind.."
                            style={{
                              resize: 'none',
                            }}
                          />
                        </div>
                        <div className="input-group mb-3">
                          <div className="input-group-prepend">
                            <span
                              className="input-group-text text-white"
                              id="basic-addon1"
                            >
                              Image Url
                            </span>
                          </div>
                          <input
                            name="image"
                            value={localPost.image}
                            onChange={updateInput}
                            type="text"
                            className="form-control"
                            placeholder="Image Url"
                          />
                        </div>
                        <div>
                          <input
                            type="submit"
                            className="btn btn-primary unfollow-btn btn-sm"
                            value="Post"
                          />
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              )}
            </div>
            <hr />
          </div>
        </section>
        <section>
          {loading ? (
            <Spinner />
          ) : (
            <React.Fragment>
              {posts.length > 0 && (
                <div className="container">
                  <div className="row">
                    <div className="col">
                      {posts
                        .slice(0)
                        .reverse()
                        .map((post) => {
                          return (
                            <div className="card my-2" key={post._id}>
                              <div className="card-body bg-light-grey">
                                <div className="row">
                                  <div className="col-md-2">
                                    <img
                                      src={post.user.avatar}
                                      alt=""
                                      className="rounded-circle"
                                      width="50"
                                      height="50"
                                    />
                                    <br />
                                    <small>{post.name}</small>
                                  </div>
                                  <div className="col-md-8">
                                    <div className="row">
                                      <div className="col-md-6">
                                        <img
                                          src={post.image}
                                          alt=""
                                          className="post-image"
                                        />
                                      </div>
                                    </div>
                                    <h3>{post.title}</h3>
                                    <p style={{ fontWeight: 'bold' }}>
                                      {ellipsify(post.text)}{' '}
                                      <a
                                        href={`/posts/${post._id}`}
                                        className="text-color"
                                        style={{ textDecoration: 'underline' }}
                                      >
                                        read more
                                      </a>
                                    </p>

                                    <small>
                                      {timeDifference(
                                        new Date(),
                                        new Date(post.createdAt)
                                      )}
                                    </small>
                                    <br />

                                    {post.likes.includes(user._id) ? (
                                      <button
                                        className="btn btn-primary me-2"
                                        onClick={clickLikePost.bind(
                                          this,
                                          post._id
                                        )}
                                        style={{ color: 'white' }}
                                      >
                                        <i
                                          className="fa fa-thumbs-up me-2"
                                          style={{ color: 'white' }}
                                        />{' '}
                                        {post.likes.length}
                                      </button>
                                    ) : (
                                      <button
                                        className="btn btn-primary btn-sm me-2"
                                        onClick={clickLikePost.bind(
                                          this,
                                          post._id
                                        )}
                                      >
                                        <i className="fa fa-thumbs-up me-2" />{' '}
                                        {post.likes.length}
                                      </button>
                                    )}

                                    <Link
                                      to={`/posts/${post._id}`}
                                      className="btn btn-warning btn-sm me-2"
                                    >
                                      <i className="fab fa-facebook-messenger me-2" />{' '}
                                      Discussions {post.comments.length}
                                    </Link>

                                    {post.user._id === user._id ? (
                                      <button
                                        className="btn btn-danger btn-sm"
                                        onClick={clickDeletePost.bind(
                                          this,
                                          post._id
                                        )}
                                      >
                                        <i className="fa fa-times-circle" />
                                      </button>
                                    ) : null}
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>
              )}
            </React.Fragment>
          )}
        </section>
        <div>
          <Footer />
        </div>
      </div>
    </React.Fragment>
  );
};
export default PostScreen;

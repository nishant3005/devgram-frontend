import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import Spinner from '../components/Spinner';
import Footer from '../components/Footer';

let PostDetailsScreen = () => {
  let [comment, setComment] = useState({
    text: '',
  });

  let [user, setUser] = useState({});
  let [selectedPost, setSelectedPost] = useState({});
  let [loading, setLoading] = useState(false);
  let [loggedIn, setLoggedIn] = useState(false);
  let postId = useParams().postId;
  let navigate = useNavigate();
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

  let getPost = async () => {
    let { data } = await axios.get(
      `https://devgram-backend.onrender.com/api/posts/${postId}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('devroom')}`,
        },
      }
    );
    setSelectedPost(data.post);
    setLoading(false);
  };
  useEffect(() => {
    if (loggedIn) {
      getUser().then(() => {
        getPost();
      });
    }
  }, [loggedIn]);

  let submitCreateComment = async (e) => {
    e.preventDefault();
    await axios.post(
      `https://devgram-backend.onrender.com/api/posts/comment/${postId}`,
      comment,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('devroom')}`,
        },
      }
    );
    setComment({
      text: '',
    });
    Swal.fire('Comment created sucessfully', '', 'success');
    getPost();
  };

  let clickDeleteComment = async (commentId) => {
    // dispatch(postActions.deleteComment(postId, commentId));
    await axios.delete(
      `https://devgram-backend.onrender.com/api/posts/comment/${postId}/${commentId}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('devroom')}`,
        },
      }
    );
    Swal.fire('Comment deleted suucessfully', '', 'success');
    getPost();
  };

  return (
    <React.Fragment>
      {/* <pre>{JSON.stringify(selectedPost.comments)}</pre> */}
      {loading ? (
        <Spinner />
      ) : (
        <React.Fragment>
          <section className="p-3 background">
            <div className="container">
              <div className="row">
                <div className="col">
                  <Link
                    to="/posts/list"
                    className="btn unfollow-btn btn-sm mb-2"
                  >
                    back
                  </Link>
                </div>
              </div>

              {Object.keys(selectedPost).length > 0 && (
                <div className="card">
                  <div className="d-flex justify-content-center w-50 m-auto">
                    <div className="card-body bg-light-grey">
                      <img
                        src={selectedPost.image}
                        alt=""
                        className="post-detail-image"
                      />
                      <h3 className="text-center mt-4 mb-5 fw-bold">
                        {selectedPost.title}
                      </h3>
                      <div className="d-flex justify-content-between mb-4">
                        <div className="col-md-2">
                          <img
                            src={selectedPost.user.avatar}
                            alt=""
                            className="rounded-circle"
                            width="60"
                            height="60"
                          />
                          <br />
                          <small className="fw-bold text-color">
                            {selectedPost.name}
                          </small>
                        </div>
                        <small className="fw-bold text-color">
                          {timeDifference(
                            new Date(),
                            new Date(selectedPost.createdAt)
                          )}
                        </small>
                      </div>
                      <p className="post-text">{selectedPost.text}</p>

                      <div className="row mt-3">
                        <div className="col">
                          <form onSubmit={submitCreateComment}>
                            <div className="input-group mb-1 ms-2">
                              <div className="input-group-prepend mt-3 ">
                                <img
                                  src={user.avatar}
                                  alt=""
                                  width="50"
                                  height="50"
                                  className="rounded-circle"
                                />
                              </div>
                              <textarea
                                required
                                name="text"
                                value={comment.text}
                                onChange={(e) =>
                                  setComment({ text: e.target.value })
                                }
                                rows="3"
                                className="form-control ms-2"
                                placeholder="Whats on your mind.."
                                style={{
                                  height: '100px',
                                  width: '100px',
                                  resize: 'none',
                                }}
                              />
                            </div>
                            <div className="mt-3">
                              <input
                                type="submit"
                                className="btn btn-primary"
                                value="Comment"
                              />
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {Object.keys(selectedPost).length > 0 &&
                selectedPost.comments.length > 0 && (
                  <div className="container">
                    {/* <div className="row">
                    <div className="col"> */}
                    {selectedPost.comments.map((comment) => {
                      return (
                        <div className="card mt-3" key={comment._id}>
                          <div className="card-body bg-comment">
                            <div className="row">
                              <div className="col-md-2">
                                <img
                                  src={comment.avatar}
                                  alt=""
                                  className="rounded-circle"
                                  width="50"
                                  height="50"
                                />
                                <br />
                                <small>{comment.name}</small>
                              </div>
                              <div className="col-md-8">
                                <p style={{ fontWeight: 'bold' }}>
                                  {comment.text}
                                </p>
                                <small>
                                  {timeDifference(
                                    new Date(),
                                    new Date(comment.date)
                                  )}
                                </small>
                                <br />
                                {comment.user === user._id ? (
                                  <button
                                    className="btn btn-danger btn-sm"
                                    onClick={clickDeleteComment.bind(
                                      this,
                                      comment._id
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
                    {/* </div>
                  </div> */}
                  </div>
                )}
            </div>
            <div>
              <Footer />
            </div>
          </section>

          {/* <section> */}

          {/* </section> */}
        </React.Fragment>
      )}
    </React.Fragment>
  );
};
export default PostDetailsScreen;

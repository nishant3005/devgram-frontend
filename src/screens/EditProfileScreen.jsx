import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';
import axios from 'axios';
import Swal from 'sweetalert2';
import Footer from '../components/Footer';

let EditProfileScreen = () => {
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  let navigate = useNavigate();
  let [localProfile, setLocalProfile] = useState({
    image: '',
    company: '',
    website: '',
    location: '',
    designation: '',
    skills: '',
    bio: '',
    githubUserName: '',
    youtube: '',
    facebook: '',
    twitter: '',
    linkedin: '',
    instagram: '',
  });

  useEffect(() => {
    if (!localStorage.getItem('devroom')) {
      navigate('/users/login');
    }
    setLoggedIn(true);
  }, []);

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setLocalProfile({
      ...localProfile,
      image: base64.toString(),
    });
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (err) => {
        reject(err);
      };
    });
  };

  const getProfile = async (userPassed) => {
    let { status, data } = await axios.get(
      'https://devgram-backend.onrender.com/api/profiles/me',
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('devroom')}`,
        },
      }
    );
    console.log(data);
    if (status == 200) {
      let profile = data.profile;
      setProfile(profile);

      setLocalProfile({
        image: userPassed.avatar,
        company: profile.company ? profile.company : '',
        location: profile.location ? profile.location : '',
        designation: profile.designation ? profile.designation : '',
        website: profile.website ? profile.website : '',
        githubUserName: profile.githubUserName ? profile.githubUserName : '',
        skills: profile.skills ? profile.skills : '',
        bio: profile.bio ? profile.bio : '',
        youtube:
          profile && profile.social?.youtube ? profile.social.youtube : '',
        twitter:
          profile && profile.social?.twitter ? profile.social.twitter : '',
        facebook:
          profile && profile.social?.facebook ? profile.social.facebook : '',
        instagram:
          profile && profile.social?.instagram ? profile.social.instagram : '',
        linkedin:
          profile && profile.social?.linkedin ? profile.social.linkedin : '',
      });
      setLoading(false);
    }
  };

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
    getProfile(data.user);
  };

  useEffect(() => {
    if (loggedIn) {
      getUser();
    }
  }, [loggedIn]);

  let updateInput = (event) => {
    setLocalProfile({
      ...localProfile,
      [event.target.name]: event.target.value,
    });
  };

  let submitUpdateProfile = async (event) => {
    event.preventDefault();

    await axios.put(
      'https://devgram-backend.onrender.com/api/profiles/',
      localProfile,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('devroom')}`,
        },
      }
    );

    Swal.fire('Profile updated successfully', '', 'success');
    navigate('/profiles/dashboard');
  };

  return (
    <React.Fragment>
      <div className="background">
        <section className="p-3">
          <div className="container">
            <div className="row">
              <div className="col">
                <h2 className="h3 text-white">
                  <i className="fa fa-user-cog" /> Edit Profile
                </h2>
                <p className="text-white">Edit your profile!</p>
              </div>
            </div>
          </div>
        </section>
        {loading ? (
          <Spinner />
        ) : (
          <React.Fragment>
            {/* <pre>{JSON.stringify(localProfile)}</pre>*/}
            <section>
              <div className="container">
                <div className="row">
                  <div className="col-md-8">
                    <form onSubmit={submitUpdateProfile}>
                      <div className="col-md-5 border-right">
                        <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                          <img
                            className="rounded mt-5"
                            src={localProfile.image}
                            style={{ width: '80%' }}
                            alt="profile"
                          />

                          <span className="font-weight-bold text-white">
                            Upload Profile Photo <span>&#91;</span>size upto
                            80kb
                            <span>&#93;</span>
                          </span>
                          <input
                            type="file"
                            className="text-center form-control form-control-lg"
                            onChange={(e) => {
                              uploadImage(e);
                            }}
                          />
                        </div>
                      </div>
                      <div className="form-group mb-4">
                        <input
                          name="company"
                          value={localProfile.company}
                          onChange={updateInput}
                          type="text"
                          className="form-control form-control-lg"
                          placeholder="Company"
                        />
                      </div>
                      <div className="form-group mb-4">
                        <input
                          name="website"
                          value={localProfile.website}
                          onChange={updateInput}
                          type="text"
                          className="form-control form-control-lg"
                          placeholder="Website"
                        />
                      </div>
                      <div className="form-group mb-4">
                        <input
                          name="location"
                          value={localProfile.location}
                          onChange={updateInput}
                          type="text"
                          className="form-control form-control-lg"
                          placeholder="Location"
                        />
                      </div>
                      <div className="form-group mb-4">
                        <select
                          name="designation"
                          value={localProfile.designation}
                          onChange={updateInput}
                          className="form-control form-control-lg"
                        >
                          <option value="">Select Designation</option>
                          <option value="Junior Developer">
                            Junior Developer
                          </option>
                          <option value="Senior Developer">
                            Senior Developer
                          </option>
                          <option value="Tech Lead">Tech Lead</option>
                          <option value="Junior Manager">Junior Manager</option>
                          <option value="Senior Manager">Senior Manager</option>
                          <option value="Director">Director</option>
                        </select>
                      </div>
                      <div className="form-group mb-4">
                        <input
                          name="skills"
                          value={localProfile.skills}
                          onChange={updateInput}
                          type="text"
                          className="form-control form-control-lg"
                          placeholder="Write in comma separated format like C,C++,.."
                        />
                      </div>
                      <div className="form-group mb-4">
                        <textarea
                          name="bio"
                          value={localProfile.bio}
                          onChange={updateInput}
                          rows="3"
                          className="form-control form-control-lg"
                          placeholder="Biography"
                        />
                      </div>
                      <div className="form-group mb-4">
                        <input
                          name="githubUserName"
                          value={localProfile.githubUserName}
                          onChange={updateInput}
                          type="text"
                          className="form-control form-control-lg"
                          placeholder="Github Link (start with https://)"
                        />
                      </div>
                      <hr className="text-white" />
                      <small className="text-white">Social Links</small>
                      <div className="form-group mb-4">
                        <input
                          name="youtube"
                          value={localProfile.youtube}
                          onChange={updateInput}
                          type="text"
                          className="form-control form-control-lg"
                          placeholder="YouTube link (start with https://)"
                        />
                      </div>
                      <div className="form-group mb-4">
                        <input
                          name="twitter"
                          value={localProfile.twitter}
                          onChange={updateInput}
                          type="text"
                          className="form-control form-control-lg"
                          placeholder="Twitter link (start with https://)"
                        />
                      </div>
                      <div className="form-group mb-4">
                        <input
                          name="facebook"
                          value={localProfile.facebook}
                          onChange={updateInput}
                          type="text"
                          className="form-control form-control-lg"
                          placeholder="Facebook link (start with https://)"
                        />
                      </div>
                      <div className="form-group mb-4">
                        <input
                          name="linkedin"
                          value={localProfile.linkedin}
                          onChange={updateInput}
                          type="text"
                          className="form-control form-control-lg"
                          placeholder="LinkedIn link (start with https://)"
                        />
                      </div>
                      <div className="form-group mb-4">
                        <input
                          name="instagram"
                          value={localProfile.instagram}
                          onChange={updateInput}
                          type="text"
                          className="form-control form-control-lg"
                          placeholder="Instagram link (start with https://)"
                        />
                      </div>
                      <div className="mt-3 mb-5">
                        <input
                          type="submit"
                          className="btn btn-warning btn-sm"
                          value="Update"
                        />
                        <Link
                          to="/profiles/dashboard"
                          className="btn btn-primary btn-sm ms-2"
                        >
                          Back
                        </Link>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </section>

            <div className="mb-2">
              <Footer />
            </div>
          </React.Fragment>
        )}
      </div>
    </React.Fragment>
  );
};
export default EditProfileScreen;

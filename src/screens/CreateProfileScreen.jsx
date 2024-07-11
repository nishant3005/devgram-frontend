import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import Footer from '../components/Footer';
let CreateProfileScreen = () => {
  let navigate = useNavigate();
  let [profile, setProfile] = useState({
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
  }, []);

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setProfile({
      ...profile,
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

  let updateInput = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  let submitCreateProfile = async (e) => {
    e.preventDefault();
    await axios.post(
      'https://devgram-backend.onrender.com/api/profiles/',
      profile,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('devroom')}`,
        },
      }
    );

    Swal.fire('Profile created successfully', '', 'success');
    navigate('/profiles/dashboard');
  };

  return (
    <React.Fragment>
      <div className="background">
        <section className="p-3">
          <div className="container">
            <div className="row">
              <div className="col">
                <h2 className="text-white">
                  <i className="fa fa-user-circle" /> Create a Profile
                </h2>
                <p className="text-white">Welcome! Create your profile</p>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="container">
            <div className="row">
              <div className="col-md-8">
                <form onSubmit={submitCreateProfile}>
                  <div className="col-md-5 border-right">
                    <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                      <img
                        className="rounded mt-5"
                        src={profile.image}
                        style={{ width: '80%' }}
                        alt=""
                      />

                      <span className="font-weight-bold text-white">
                        Upload Profile Photo
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
                      value={profile.company}
                      onChange={updateInput}
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="Company"
                    />
                  </div>
                  <div className="form-group mb-4 mb-4">
                    <input
                      name="website"
                      value={profile.website}
                      onChange={updateInput}
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="Website"
                    />
                  </div>
                  <div className="form-group mb-4">
                    <input
                      name="location"
                      value={profile.location}
                      onChange={updateInput}
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="Location"
                    />
                  </div>
                  <div className="form-group mb-4">
                    <select
                      name="designation"
                      value={profile.designation}
                      onChange={updateInput}
                      className="form-control form-control-lg"
                    >
                      <option value="">Select Designation</option>
                      <option value="Junior Developer">Junior Developer</option>
                      <option value="Senior Developer">Senior Developer</option>
                      <option value="Tech Lead">Tech Lead</option>
                      <option value="Junior Manager">Junior Manager</option>
                      <option value="Senior Manager">Senior Manager</option>
                      <option value="Director">Director</option>
                    </select>
                  </div>
                  <div className="form-group mb-4">
                    <input
                      name="skills"
                      value={profile.skills}
                      onChange={updateInput}
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="Write in comma separated format like C,C++,.."
                    />
                  </div>
                  <div className="form-group mb-4">
                    <textarea
                      name="bio"
                      value={profile.bio}
                      onChange={updateInput}
                      rows="3"
                      className="form-control form-control-lg"
                      placeholder="Biography"
                    />
                  </div>
                  <div className="form-group mb-4">
                    <input
                      name="githubUserName"
                      value={profile.githubUserName}
                      onChange={updateInput}
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="Github link (start with https://)"
                    />
                  </div>
                  <hr className="text-white" />
                  <small className="text-white ">Social Links</small>
                  <div className="form-group mb-4">
                    <input
                      name="youtube"
                      value={profile.youtube}
                      onChange={updateInput}
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="YouTube link (start with https://)"
                    />
                  </div>
                  <div className="form-group mb-4">
                    <input
                      name="twitter"
                      value={profile.twitter}
                      onChange={updateInput}
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="Twitter link (start with https://)"
                    />
                  </div>
                  <div className="form-group mb-4">
                    <input
                      name="facebook"
                      value={profile.facebook}
                      onChange={updateInput}
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="Facebook link (start with https://)"
                    />
                  </div>
                  <div className="form-group mb-4">
                    <input
                      name="linkedin"
                      value={profile.linkedin}
                      onChange={updateInput}
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="LinkedIn link (start with https://)"
                    />
                  </div>
                  <div className="form-group mb-4">
                    <input
                      name="instagram"
                      value={profile.instagram}
                      onChange={updateInput}
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="Instagram link (start with https://)"
                    />
                  </div>
                  <div className="mb-5">
                    <input
                      type="submit"
                      className="btn btn-primary me-2"
                      value="Create Profile"
                    />
                    <Link
                      to="/profiles/dashboard"
                      className="btn btn-primary btn-sm mt-2"
                    >
                      Back
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div>
            <Footer />
          </div>
        </section>
      </div>
    </React.Fragment>
  );
};
export default CreateProfileScreen;

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import Footer from '../components/Footer';

let AddExperienceScreen = () => {
  let navigate = useNavigate();
  let [experience, setExperience] = useState({
    title: '',
    company: '',
    location: '',
    from: '',
    to: '',
    current: '',
    description: '',
  });
  useEffect(() => {
    if (!localStorage.getItem('devroom')) {
      navigate('/users/login');
    }
  }, []);

  let updateInput = (e) => {
    if (e.target.type === 'checkbox') {
      setExperience({
        ...experience,
        [e.target.name]: e.target.checked,
      });
    } else {
      setExperience({
        ...experience,
        [e.target.name]: e.target.value,
      });
    }
  };

  let submitAddExperience = async (e) => {
    e.preventDefault();
    await axios.put(
      'https://devgram-backend.onrender.com/api/profiles/experience/',
      experience,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('devroom')}`,
        },
      }
    );
    Swal.fire('Experience added successfully', '', 'success');
    navigate('/profiles/dashboard');
  };

  return (
    <div className="background cover">
      <React.Fragment>
        <section className="p-3">
          <div className="container">
            <div className="row">
              <div className="col">
                <h2 className="text-white">
                  <i className="fa fa-user-tie" /> Add Experience
                </h2>
                <p className="text-white">
                  Add your Company or Internship Experience
                </p>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="container">
            <div className="row">
              <div className="col-md-8">
                <form onSubmit={submitAddExperience}>
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text bg-light-grey text-white">
                        Title
                      </span>
                    </div>
                    <input
                      required
                      name="title"
                      value={experience.title}
                      onChange={updateInput}
                      type="text"
                      className="form-control"
                      placeholder="Title"
                    />
                  </div>
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text bg-light-grey text-white">
                        Company
                      </span>
                    </div>
                    <input
                      required
                      name="company"
                      value={experience.company}
                      onChange={updateInput}
                      type="text"
                      className="form-control"
                      placeholder="Company"
                    />
                  </div>
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text bg-light-grey text-white">
                        Location
                      </span>
                    </div>
                    <input
                      required
                      name="location"
                      value={experience.location}
                      onChange={updateInput}
                      type="text"
                      className="form-control"
                      placeholder="Location"
                    />
                  </div>
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text bg-light-grey text-white">
                        From Date
                      </span>
                    </div>
                    <input
                      required
                      name="from"
                      value={experience.from}
                      onChange={updateInput}
                      type="date"
                      className="form-control"
                    />
                  </div>
                  <div className="form-check mb-3">
                    <input
                      name="current"
                      disabled={'true' ? experience.to !== '' : 'false'}
                      value={experience.current}
                      onChange={updateInput}
                      className="form-check-input"
                      type="checkbox"
                      id="defaultCheck1"
                    />
                    <label
                      className="form-check-label text-white"
                      htmlFor="defaultCheck1"
                    >
                      Current
                    </label>
                  </div>
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text bg-light-grey text-white">
                        To Date
                      </span>
                    </div>
                    <input
                      required
                      name="to"
                      value={experience.to}
                      onChange={updateInput}
                      type="date"
                      className="form-control"
                      disabled={experience.current}
                    />
                  </div>
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text bg-light-grey text-white">
                        Description
                      </span>
                    </div>
                    <textarea
                      required
                      name="description"
                      value={experience.description}
                      onChange={updateInput}
                      rows="3"
                      className="form-control"
                      placeholder="Description"
                      style={{
                        height: '100px',
                        width: '100px',
                        resize: 'none',
                      }}
                    />
                  </div>
                  <div>
                    <input
                      type="submit"
                      value="add experience"
                      className="btn btn-success btn-sm"
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
        <div className="cover-footer">
          <Footer />
        </div>
      </React.Fragment>
    </div>
  );
};
export default AddExperienceScreen;

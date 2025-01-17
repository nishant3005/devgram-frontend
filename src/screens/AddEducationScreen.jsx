import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import Footer from '../components/Footer';
let AddEducationScreen = () => {
  let navigate = useNavigate();
  let [education, setEducation] = useState({
    school: '',
    degree: '',
    fieldOfStudy: '',
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
      setEducation({
        ...education,
        [e.target.name]: e.target.checked,
      });
    } else {
      setEducation({
        ...education,
        [e.target.name]: e.target.value,
      });
    }
  };

  let submitAddEducation = async (e) => {
    e.preventDefault();
    await axios.put(
      'https://devgram-backend.onrender.com/api/profiles/education/',
      education,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('devroom')}`,
        },
      }
    );
    Swal.fire('Education added successfully', '', 'success');
    navigate('/profiles/dashboard');
  };

  return (
    <React.Fragment>
      <div className="background cover">
        <section className="p-3">
          <div className="container">
            <div className="row">
              <div className="col">
                <h2 className="text-white">
                  <i className="fa fa-graduation-cap" /> Add Education
                </h2>
                <p className="text-white">
                  Add your Schooling and College degree!
                </p>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="container">
            <div className="row">
              <div className="col-md-8">
                <form onSubmit={submitAddEducation}>
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text bg-light-grey text-white">
                        School
                      </span>
                    </div>
                    <input
                      required
                      name="school"
                      value={education.school}
                      onChange={updateInput}
                      type="text"
                      className="form-control"
                      placeholder="School"
                    />
                  </div>
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text bg-light-grey text-white">
                        Degree
                      </span>
                    </div>
                    <input
                      required
                      name="degree"
                      value={education.degree}
                      onChange={updateInput}
                      type="text"
                      className="form-control"
                      placeholder="Degree"
                    />
                  </div>
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text bg-light-grey text-white">
                        FieldOfStudy
                      </span>
                    </div>
                    <input
                      required
                      name="fieldOfStudy"
                      value={education.fieldOfStudy}
                      onChange={updateInput}
                      type="text"
                      className="form-control"
                      placeholder="Subjects"
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
                      value={education.from}
                      onChange={updateInput}
                      type="date"
                      className="form-control"
                    />
                  </div>
                  <div className="form-check mb-3">
                    <input
                      name="current"
                      value={education.current}
                      disabled={'true' ? education.to !== '' : 'false'}
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
                      value={education.to}
                      onChange={updateInput}
                      type="date"
                      className="form-control"
                      disabled={education.current}
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
                      value={education.description}
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
                      value="add education"
                      className="btn btn-info btn-sm"
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
      </div>
    </React.Fragment>
  );
};
export default AddEducationScreen;

//import hook react
import React, { useState } from 'react';

//import hook useHitory from react router dom
import { useNavigate } from 'react-router-dom';

//import api
import Api from '../../api/index'

// import Link from react router dom
import { Link } from "react-router-dom";

import { toast } from "react-toastify";

function Register() {
  // define state
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [errors, setErrors] = useState({});

  // define history
  const history = useNavigate();

  const handleBtnToast = () => {
    toast.error("Error Notification !", {
      position: "top-left"
    });
  };

  // Function format Errors
  const formatErrors = (messages) => {
      const errors = {};
      messages.forEach(message => {
        const match = message.match(/"([^"]+)"/); // Extract the field name inside quotes
        if (match) {
          const fieldName = match[1];
          errors[fieldName] = message.replace(/"/g, ''); // Remove quotes from the message
        }
      });
      return errors;
    }

  // define function handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Initialize form data
    const formData = new FormData();

    // Append data to form data
    formData.append('name', name);
    formData.append('username', username);
    formData.append('password', password);

    if (password !== passwordConfirm) {
      setErrors({ passwordConfirm: 'Password confirmation does not match' });
      return;
    }

    // Send post request
    try{
      const response = await Api.post('api/users/', {
        name: name,
        username: username,
        password: password,
      });
      toast.success("Register success, please login", {
        position: "bottom-right",
      });
      history('/login');
    }catch(error){
      if(error.response.data.errors){
          const errors = error.response.data.errors.split('. ');
          const errorObj = formatErrors(errors);
          setErrors(errorObj);
      }else{
        toast.error("Something went wrong!, please try again later.", {position: "bottom-right"});
      }
    }
  }
  

  return (
      <div className="container my-5 pt-lg-5">
          <div className="row justify-content-center">
              <div className="col-md-5">
                <h3 className="fw-bold text-center mb-4">Register</h3>
                  <div className="card border-0 rounded shadow-sm">
                      <div className="card-body">
                          <form onSubmit={handleSubmit}>
                              <div className="mb-3">
                                  <label htmlFor="name" className="form-label">Name</label>
                                  <input type="text" className={`form-control rounded-1 ${errors.name ? 'is-invalid' : ''}`} id="name" value={name} onChange={(e) => setName(e.target.value)} />
                                  {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                              </div>
                              <div className="mb-3">
                                  <label htmlFor="username" className="form-label">Username</label>
                                  <input type="text" className={`form-control rounded-1 ${errors.username ? 'is-invalid' : ''}`} id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                                  {errors.username && <div className="invalid-feedback">{errors.username}</div>}
                              </div>
                              <div className="mb-3">
                                  <label htmlFor="password" className="form-label">Password</label>
                                  <input type="password" className={`form-control rounded-1 ${errors.passowrd ? 'is-invalid' : ''}`} id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                  {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                              </div>
                              <div className="mb-3">
                                  <label htmlFor="passwordConfirm" className="form-label">Confirm Password</label>
                                  <input type="password" className={`form-control rounded-1 ${errors.passwordConfirm ? 'is-invalid' : ''}`} id="passwordConfirm" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} />
                                  {errors.passwordConfirm && <div className="invalid-feedback">{errors.passwordConfirm}</div>}
                              </div>
                              <div className="d-grid gap-2">
                                  <button type="submit" className="btn btn-primary">Register</button>
                              </div>
                              <p className="text-center mt-3 mb-0">Already have an account? <Link to="/login">Login</Link> </p>
                          </form>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  )

}

export default Register;
//import hook react
import React, { useState, useEffect } from 'react';

//import hook useHitory from react router dom
import { useNavigate } from 'react-router-dom';

//import api
import Api from '../../api/index'

// import Link from react router dom
import { Link } from "react-router-dom";

import { toast } from "react-toastify";

function Login() {

  // Define state
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const history = useNavigate();

      //hook useEffect
      useEffect(() => {

        //check token
        if(localStorage.getItem('token')) {

            //redirect page dashboard
            history('/dashboard');
        }
    }, []);

  // Funtion format errors
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

  const handleSubmit = async (e) =>  {
    e.preventDefault();

    // Send a POST request to the API endpoint
    try {
      const response = await Api.post('api/users/login',
        {username: username, password: password}
      );
      localStorage.setItem('token', response.data.accessToken);
      toast.success("Login Success!", { position: "bottom-right" });
      history('/dashboard');
    } catch (error) {
      if (error.response.data.errors){
        const errorsArr = error.response.data.errors.split('. ');
          if(errorsArr.length > 1){
            const errorObj = formatErrors(errorsArr);
            setErrors(errorObj);
          }else{
            setErrors({error: error.response.data.errors});
          }
      }else{
          toast.error("Something went wrong!, please try again later.", {position: "bottom-right"});
      }
    }
  }


  return (
      <div className="container" style={{ marginTop: "120px" }}>
          <div className="row justify-content-center">
              <div className="col-md-5">
                <h3 className="fw-bold text-center mb-4">Login</h3>
                {errors.error && (<div className="alert alert-danger rounded" role="alert">{errors.error}</div>)}
                  <div className="card border-0 rounded shadow-sm">
                      <div className="card-body">
                          <form onSubmit={handleSubmit}>
                              <div className="mb-3">
                                  <label htmlFor="username" className="form-label">Username</label>
                                  <input type="text" className={`form-control rounded-1 ${errors.username ? 'is-invalid' : ''}`} id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                                  {errors.username && <div className="invalid-feedback">{errors.username}</div>}
                              </div>
                              <div className="mb-3">
                                  <label htmlFor="password" className="form-label">Password</label>
                                  <input type="password" className={`form-control rounded-1 ${errors.password ? 'is-invalid' : ''}`} id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                  {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                              </div>
                              <div className="d-grid gap-2">
                                  <button type="submit" className="btn btn-primary">Login</button>
                              </div>
                              <p className="text-center mt-3 mb-0">Don't have an account? <Link to="/register">Register</Link> </p>
                          </form>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  )

}

export default Login;
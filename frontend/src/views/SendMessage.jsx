//import hook react
import React, { useState, useEffect } from 'react';

//import hook useHitory from react router dom
import { useNavigate, useParams, Link } from 'react-router-dom';

//import api
import Api from '../api/index'

import { toast } from 'react-toastify';

function SendMessage() {
  // define state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [userExists, setUserExists] = useState(false);

  // define history
  const navigate = useNavigate();

  const { username } = useParams();

    // check if user exists first
    useEffect(() => {
      const checkUser = async () => {
        try {
          const response = await Api.get(`/api/users/${username}`);
          if (response.data.data === 'OK') {
            setUserExists(true);
          } else {
            toast.error('User not found');
            navigate('/');
          }
        } catch (error) {
          toast.error('User not found');
          navigate('/');
        }
      };
      checkUser();
    }, [username, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {}
    if(name) data.name = name;
    if(email) data.email = email;
    data.message = message;

    await Api.post(`/api/contacts/${username}`, data)
    .then((response) => {
      toast.success('Message has been sent');
    })
    .catch((error) => {
      toast.error('Failed to send message');
    });
  }


  return (
    <div className="container">
      <div className="row justify-content-center align-items-center my-5">
        <div className="col-12 col-lg-8">
          <form onSubmit={handleSubmit}>
            {/* Header */}
            <div className="p-3 bg-body rounded-4 shadow-sm">
              <div className="d-flex align-items-center gap-2">
                <img className="rounded-circle" width={42} height={42} src={`https://ui-avatars.com/api/?name=${username}&bold=true&background=random`} alt="rndio Avatar" />
                <div>
                  <h6 className="mb-0">@{username}</h6>
                  <p className="small mb-0">Send message to {username}</p>
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="p-3 bg-body mt-3 rounded-4 shadow-sm">
              <div className="row g-2">
                <div className="col-12 col-md-6">
                  <div className="form-floating">
                    <input type="text" className="form-control rounded" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                    <label htmlFor="name">Name</label>
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="form-floating">
                    <input type="email" className="form-control rounded" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <label htmlFor="email">Email address</label>
                  </div>
                </div>
                <div className="col-12 mb-3">
                  <div className="form-floating">
                    <textarea className="form-control" id="message" rows="3" value={message} onChange={(e) => setMessage(e.target.value)} style={{height: '140px'}} required></textarea>
                    <label className="required" htmlFor="message">Message</label>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-3 bg-body mt-3 rounded-4 shadow-sm">
              <button type="submit" className="w-100 btn btn-success rounded-3">Send Message</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SendMessage
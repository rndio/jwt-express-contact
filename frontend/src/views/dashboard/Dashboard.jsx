import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Api from '../../api/index';
import Navbar from '../../components/Navbar';

function Dashboard() {
  // define state
  const [contacts, setContacts] = useState([]);
  const [userInfo, setUserInfo] = useState(null);

  // define navigate
  const navigate = useNavigate();

  // Function to fetch data
  const fetchData = async (token) => {
    Api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    try {
      const response = await Api.get('/api/contacts');
      setContacts(response.data.data);
    } catch (error) {
      console.error("Error fetching contacts:", error);
      navigate('/login');
    }
  };

  // useEffect hook
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate('/login');
      return;
    }

    let parsedUserInfo;
    try {
      parsedUserInfo = JSON.parse(atob(token.split('.')[1]));
      setUserInfo(parsedUserInfo);
    } catch (error) {
      console.error("Invalid token:", error);
      navigate('/login');
      return;
    }

    fetchData(token);
  }, [navigate]);

  const shareLink = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate('/login');
      return;
    }

    let parsedUserInfo;
    try {
      parsedUserInfo = JSON.parse(atob(token.split('.')[1]));
    } catch (error) {
      console.error("Invalid token:", error);
      navigate('/login');
      return;
    }

    const domain = window.location.origin;
    const link = `${domain}/u/${parsedUserInfo.username}`;
    navigator.clipboard.writeText(link);
    alert('Link copied to clipboard');
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="hero bg-primary rounded-2">
          <div className="p-5 text-white">
            <div className="d-flex gap-2 justify-content-between align-items-center">
              <div>
                {userInfo && (
                  <>
                    <h2 className="text-white">Hi, {userInfo.username}!</h2>
                    <p className="m-0">Welcome to Express Contact!</p>
                  </>
                )}
              </div>
              <div>
                <button className='btn btn-dark rounded-0 shadow-lg' onClick={shareLink}>
                  Share your link!
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;

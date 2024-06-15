//import hook react
import React, { useState, useEffect } from 'react';

//import hook useHitory from react router dom
import { useNavigate, Link } from 'react-router-dom';

//import api
import Api from '../../api/index'

import { parseISO, format } from 'date-fns';

import Navbar from '../../components/Navbar';
import { toast } from 'react-toastify';

// Modal Message Component
const Modal = ({ show, handleClose, children }) => {
  if (!show) return null;

  return (
    <div className={`modal fade ${show != null ? 'show' : 'hide'}`} data-bs-backdrop="static" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content border-start border-primary border-5" style={{border: 'unset'}}>
        <div className="modal-header">
          <div className="d-flex align-items-center gap-2">
            <img id="m-photo" src={`https://ui-avatars.com/api/?name=${children.name}&bold=true&background=random`} className="rounded-1" width="40" height="40"/>
            <div>
              <p id="m-name" className="m-0 fw-medium small">{children.name}</p>
              <p id="m-timestamp" className="m-0 small fw-light">{children.timestamp}</p>
            </div>
          </div>
          <button type="button" className="btn-close small rounded-0" onClick={handleClose} aria-label="Close"></button>
        </div>
          <div className="modal-body rounded-2">
            <p id="m-message" className="m-0 small">{children.message}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function MyMessage() {
  // define state
  const [contacts, setContacts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({});

  // define history
  const history = useNavigate();

  //token
  const token = localStorage.getItem("token");

  // View Message Function
  const handleMessageView = async (contactId) => {
    Api.get(`/api/contacts/${contactId}`)
    .then((response) => {
      const data = response.data.data;
      setModalContent({
        name: data.name ?? 'Anonymous',
        email: data.email ?? '-',
        timestamp: format(parseISO(data.created_at), 'dd MMM yyyy hh:mm a'),
        message: data.message,
      });
      setShowModal(true);
    });
  }

  // Delete Message Function
  const handleMessageDelete = async (contactId) => {
    if(window.confirm('Are you sure you want to delete this message?')) {
      Api.delete(`/api/contacts/${contactId}`)
      .then((response) => {
        fetchData();
        toast.success('Message has been deleted');
      })
      .catch((error) => {
        toast.error('Failed to delete message');
      });
    }
  }


  //function "fetchData"
  const fetchData = async () => {
      //set axios header dengan type Authorization + Bearer token
      Api.defaults.headers.common['Authorization'] = `Bearer ${token}`
      //fetch user from Rest API
      await Api.get('/api/contacts')
      .then((response) => {
          setContacts(response.data.data);
      })
  }

  //hook useEffect
  useEffect(() => {
      //check token empty
      if(!token) history('/login')

      //call function "fetchData"
      fetchData();
  }, []);

  return (
    <>
      <Navbar/>
      <div className="container">
        <div className="card card-body border-0 shadow-sm">
          <div className="d-inline-flex gap-1 mb-0 h5">
            <i className="ri-contacts-book-2-line"></i>
            <span className="fw-bold">Message from User</span>
          </div>
        </div>
          <div className="card card-body border-0 shadow-sm mt-3">
            <table className="table small table-bordered table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th>No</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Timestamp</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {contacts.length === 0 
                ? 
                  (<tr>
                    <td colSpan="5" className="text-center">No contacts available</td>
                  </tr>)
                :
                (contacts.map((contact, index) => (
                  <tr key={contact.id}>
                    <th>C{contact.id}</th>
                    <td>{contact.name ?? 'Anonymous'}</td>
                    <td>{contact.email ?? '-'}</td>
                    <td>{format(parseISO(contact.created_at), 'dd MMM yyyy hh:mm:ss a')}</td>
                    <td>
                      <div className="d-flex gap-1">
                        <button className="btn btn-sm btn-primary rounded-1" onClick={ () => handleMessageView(contact.id) }>
                          <i className="ri-eye-line"></i>
                        </button>
                        <button className="btn btn-sm btn-danger rounded-1" onClick={ () => handleMessageDelete(contact.id) }>
                          <i className="ri-delete-bin-line"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                )))}
              </tbody>
            </table>
          </div>
      </div>
      <Modal show={showModal} handleClose={() => setShowModal(false)}>
        {modalContent}
      </Modal>
    </>
  )
}

export default MyMessage
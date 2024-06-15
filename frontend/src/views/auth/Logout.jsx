import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Api from '../../api/index';
import { toast } from "react-toastify";

const Logout = () => {
    const history = useNavigate();

    useEffect(() => {
        const handleLogout = async () => {
            try {
                localStorage.removeItem('token');
                toast.success("Logout Success!", { position: "bottom-right" });
                history('/login');
            } catch (error) {
              if (error.response.data.errors){
                toast.error("Something went wrong! Please try again later.", { position: "bottom-right" });
              }
            }
        };

        handleLogout();
    }, [history]); // The effect depends on history

    return (
        <div>
            <h1>Logging out...</h1>
        </div>
    );
};

export default Logout;

import { Link } from "react-router-dom"
export default function Home() {
  const token = localStorage.getItem('token');
  return (
    <>
    <div className="p-5 mb-4">
      <div className="container-fluid py-5">
        <div className="d-flex gap-2 flex-wrap align-items-center justify-content-between">
          <div>
            <h1 className="display-5 fw-bold">EXPRESS CONTACT</h1>
            <p className="fs-4">Rendio Simamora - MSIB Batch 6 BISA AI Academy</p>
          </div>
          <div>
            <div className="d-flex gap-1">
              {token ? (
                <Link to="/dashboard" className="btn btn-primary rounded-0">
                  <span>Dashboard</span>
                  <i className="ri-dashboard-line ms-1"></i>
                </Link>
              ) : (
                <>
                  <Link to="/login" className="btn btn-success rounded-0">
                    <span>Login</span>
                    <i className="ri-login-box-line ms-1"></i>
                  </Link>
                  <Link to="/register" className="btn btn-secondary rounded-0">
                    <span>Register</span>
                    <i className="ri-user-add-line ms-1"></i>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
  )
}
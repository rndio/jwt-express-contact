import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <div>
        <nav className="navbar navbar-expand-lg bg-dark mb-3" data-bs-theme="dark">
          <div className="container">
            <Link to="/" className="navbar-brand my-0">
              <img height={40} width={40} src="https://cdn.jsdelivr.net/gh/rndio/rndblog@latest/img/icon/favicon-100x100.webp" />
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse flex-grow-1" id="navbarSupportedContent">
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
  <NavLink 
    to="/dashboard" 
    className={({ isActive }) => "nav-link" + (isActive ? " active" : "")} 
    end 
    title="Dashboard" 
    aria-current="page"
  >
    <i className="ri-dashboard-line" />
  </NavLink>
</li>
<li className="nav-item">
  <NavLink to="/dashboard/mymessage" className={({ isActive }) => "nav-link" + (isActive ? " active" : "")} title="My Message" aria-current="page">
    <i className="ri-question-answer-line" />
  </NavLink>
</li>
              </ul>
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0" role="search">
                <Link to="/logout" className="btn btn-danger rounded-0">
                  <span>Logout</span>
                  <i className="ri-logout-box-line ms-1"></i>
                </Link>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    )
}
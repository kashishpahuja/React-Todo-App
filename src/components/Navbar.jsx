import React, { useState,useEffect,useContext } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import AuthContext from '../auth/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

function Navbar(props) {
// const [user,setUser]=useState(null);
// useEffect(()=>{
//   let localUser=JSON.parse(localStorage.getItem("todoUser"));
//   setUser(localUser);
// },[]);
// console.log(user);
const{user, logout }=useContext(AuthContext)
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">
    <img src={logo} alt="" />
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
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
      {
        !user?
        <>
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/">
            Home
          </Link>
        </li>
        
        </>
        :
        <>
        <li className="nav-item">
          <Link className="nav-link" to="/create-task">
            Create Task
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/task-list">
            Task List
          </Link>
        </li>
        
        <li className="nav-item dropdown">
          <Link
            className="nav-link dropdown-toggle"
            to="/"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {/* /{user?user.name:""} */}
            {user?.name}
          </Link>
          <ul className="dropdown-menu">
            <li>
              <Link className="dropdown-item" to="/profile">
                Profile
              </Link>
            </li>
            <li>
              <a className="dropdown-item" href="#" onClick={logout}>
                Logout
              </a>
            </li>
            
          </ul>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/profile">
          <FontAwesomeIcon icon={faUserCircle} />
          </Link>
        </li>
        </>
      }
      </ul>
    </div>
  </div>
</nav>

  )
}

export default Navbar
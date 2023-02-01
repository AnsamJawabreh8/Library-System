import React, { useContext } from 'react';
import { Link, redirect, useNavigate } from 'react-router-dom';
import nav from './nav.css'
import { ctx } from '../../App';

export default function Navbar() {
  const Navigate = useNavigate();
  const {isLoggedIn,setIsLoggedIn} = useContext(ctx);
  const logOut=()=>{
    localStorage.removeItem('token');
    setIsLoggedIn(false)
    Navigate('../login')

  }
  return (
  localStorage.getItem('token') != null || isLoggedIn==true ?

 ( <div className='nav d-flex justify-content-around'>
  <div className="w-25 d-flex w-50">
  <i class="fa-solid fa-book-open-reader icon mt-2 ms-2 fs-1"></i>
  <h4 className='mt-3 ms-4 icon-text'>Book Library</h4>
  </div>
  <nav className=" navbar navbar-expand-lg">
  <div className="container-fluid">
  <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
  <span className="navbar-toggler-icon" />
  </button>
  <div className="collapse navbar-collapse" id="navbarSupportedContent">
  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
  <li className="nav-item">
  <Link className="nav-link active" aria-current="page" to="Add">Add Book</Link>
  </li>
  <li className="nav-item">
  <Link className="nav-link" to="Search">Search Book</Link>
  </li>
  <li className="nav-item">
  <Link className="nav-link" to="Reserve">Reserve Book</Link>
  </li>
  </ul>
  </div>
  <button type="button" class="btn btn-md ms-3 rounded-5 fs-4" name='Details' onClick={logOut}>  <i class="fa-solid fa-right-from-bracket" ></i>
</button>
  </div>
</nav>
</div>): null
  )
}

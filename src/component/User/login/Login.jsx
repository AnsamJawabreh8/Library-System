import React, { useContext, useState } from 'react'
import FormInput from '../../input/FormInput';
import { Navigate, useNavigate, useNavigation } from 'react-router-dom';
import Register from '../register/Register';
import './login.css';
import { useEffect } from 'react';
import { ClipLoader } from 'react-spinners';

export default function Login() {
const [error, setError] = useState("");
const [token,setToken] = useState(localStorage.getItem('token') ||'');
const [isclick, setClick] = useState(false)
const [loading,setLoading] = useState(false)
const Navigate = useNavigate();
  let [userLogin,setUserLogin] = useState({
        Username:'',
        Password:''
})
  useEffect(()=>{
  setToken(userLogin)
  },[userLogin])

 const user = JSON.parse(localStorage.getItem('users')) || [];
 const [AddBookk,setAddbookk] = useState(false)
  const getVal=(e)=>{
  setUserLogin({ ...userLogin, [e.target.name]: e.target.value });
  }

  const handleClick=(e)=>{  
    e.preventDefault()
    let userFound = false;
    user.map((user) =>
       userLogin.Username === user.Username && userLogin.Password === user.Password
         ? userFound = true
         : null
     )
     if (userFound) {
         setLoading(true);
         setTimeout(() => {
          console.log('timeout')
          setLoading(false);
         }, 5000);
         localStorage.setItem("token", JSON.stringify(token))
         Navigate('../Add')
     } else {
      setError("Incorrect username or password!");
    }
  }

  const createAccount =()=>{
    setClick(true);
  }
  return (
    <>
      {isclick ? (
        <Register />
      ) : loading ? (
        <ClipLoader color={'#D0021B'} loading={loading} size={150} />
      ) : (
        <form onSubmit={handleClick}>
          <div className="signin d-flex justify-content-start w-100 align-items-center">
            <div className="cont rounded-4">
              <h1>
                Login <i className="fa-solid fa-user-lock fs-2" />
              </h1>
              <div className="w-100">
                <FormInput name="Username" type="text" onChange={getVal} screenDisplay="Username" />
                <FormInput name="Password" type="password" onChange={getVal} screenDisplay="Password" />
              </div>
              {error && <p className="error-msg text-danger">{error}</p>}
              <p className="btn mt-3" onClick={createAccount}>
                create account?
              </p>
              <div>
                <button className="sign-btn button btn rounded-5" type="submit">
                  Sign in
                </button>
              </div>
            </div>
          </div>
        </form>
      )}
    </>
  );
   
}
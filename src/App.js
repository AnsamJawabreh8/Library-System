import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./component/navbar/Navbar";
import AddBook from "./component/Book/Add/AddBook";
import Search from "./component/Book/Search/Search";
import Details from "./component/Book/Reserve/Details";
import Login from "./component/User/login/Login";
import { useState } from "react";
import Bayer from "./component/Book/Reserve/Bayer";
import Payment from './component/Book/Reserve/Payment'
import Reserve from "./component/Book/Reserve/Reserve";
import { createContext } from 'react';
import Register from "./component/User/register/Register";
import PrivateRoute from './component/Book/Add/PDF'

export const ctx = createContext();
function App() {
const [isLoggedIn, setIsLoggedIn] = useState(false);
const [isValid,setisValid] = useState(0);
const [AV_Units,setAV_Units]= useState();
const [tagArray , setTagArraty]=useState([]);
return (
<>
<div>
<ctx.Provider value={ {isValid, setisValid,isLoggedIn,setIsLoggedIn ,AV_Units,setAV_Units ,tagArray , setTagArraty} }>
  {localStorage.getItem('token') !=null  ? (
     <>
     <Navbar />
    <Routes>
    <Route path="/" element={<AddBook />} />
    <Route path="Add" element={<AddBook/>} />
    <Route path="Search" element={<Search/>} />
    <Route path="Reserve" element = {<Reserve/>}/>
    <Route path="Details" element={<Details/>}/> 
    <Route path="Bayer"  element={<Bayer/>}/>
    <Route path="Payment"  element={<Payment/>}/>
    <Route path="login" element={<Login/>}/>
    <Route path="reg" element={<Register/>}/>
    </Routes>
    </>
  ) : (
  <Login/>  )
}
</ctx.Provider>
<Routes></Routes>
</div>
</>
)
}
export default App;

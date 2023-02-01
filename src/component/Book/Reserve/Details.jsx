import React, { useContext, useEffect, useState } from 'react'
import { json, Location, useLocation, useNavigate } from 'react-router-dom'
import { Link, Outlet ,Navigate} from 'react-router-dom';
import { ctx } from '../../../App';
import swal from 'sweetalert';
import Resrevenav from './Resrevenav';
import './reserve.css'
export default function Details() {
const {isValid, setisValid,Units ,setUnits,AV_Units, setAV_Units} = useContext(ctx);
const Navigate = useNavigate();
const books = JSON.parse(localStorage.getItem("Books")) || [];
const [book, setBook] = useState({});
const location = useLocation();
const [valID,setVal] =useState(0)
const [valname,setValname] = useState('');

useEffect(() => { 
 let selectBook = JSON.parse(localStorage.getItem("SelectedBook"))||{}
 setBook(selectBook);
 if(location.state){
 setVal(location.state.id)
 setValname(location.state.name);
 const selectedBook = books.find((book) => book.id == location.state.id);
 setBook(selectedBook);
}
}
,[]);

const handleChange = (e) => {
 setVal(e.target.value);
 setValname(e.target.value)
 const id = e.target.value;
 const selectt = books.find((book) => book.id == id);
 setBook(selectt);
}

const handleSave=(e)=>{
setAV_Units(e.target.value)
}

const handleSubmit=(e)=>{
e.preventDefault()
localStorage.setItem('SelectedBook', JSON.stringify(book))
if(AV_Units > 0 && AV_Units <= book.available_units){
 Navigate('../Bayer',{
 state:{ price:book.unit_price ,id:valID}})
   setisValid(1)
 }
else
 swal(`there is ${book.available_units} unit is Available, choose units!`);
}
return (
  <> 
  <Resrevenav/>
  <div className='details w-100 d-flex justify-content-center'>
  <div className=' p-2 rounded-4 mt-1 w-75'>
  <div className='mx-auto w-75'>
  <div className='d-lg-flex mt-5'>
  <label className='fw-bold'>Book id</label>
  <select name='id' value={book.id}  className='form-select ms-5 w-75'  onChange={handleChange}>
  {books.map((book) => (<option key={book.id} value={book.id}>{book.id}</option>))}
  </select>
  </div>
  <div className='d-lg-flex mt-5'>
  <label className='fw-bold'>Book Name</label>
  <select name='name' value={book.id}  className='form-select  ms-3 w-75' onChange={handleChange}>
  {books.map((book) => (<option key={book.id} value={book.id}>{book.name}</option>))}
  </select>
  </div>
  </div>
  <div className='card-wrap card-body shadow bg-light d-flex justify-content-around  mx-auto mt-5 rounded-2 p-3'>
  <div className='book-details w-50 d-flex justify-content-center align-items-center rounded-5 d-none d-lg-block'>
  <h1 className=' d-flex justify-content-center align-items-center mt-5'>YOUR BOOK <br></br>INFORMATION</h1>
  </div>
  <div className='card p-3 d-flex info'>
  <p className='fw-bold'>ID:{book.id}</p>
  <p className='fw-bold'>Name:{book.name}</p>
  <p className='fw-bold'>Author:{book.book_auther}</p>
  <p className='fw-bold'>Publisher:{book.book_publisher}</p>
  <p className='fw-bold' >Publish date:{book.publish_date}</p>
  <p className='fw-bold'>Available Units:{book.available_units}</p>
  <p className='fw-bold'>Unit Price:{book.unit_price}</p>
  <label className='fw-bold'>Number of Units  <input type='number' name='units' onChange={handleSave} min={0} max={book.available_units} value={AV_Units} required></input></label>
  </div>
  </div>  
  <button className='reservebtn mt-2 rounded-5 shadow fw-bold p-2' onClick={handleSubmit}>Save and continue</button>
  </div>  
</div>
    <Outlet/></>
  )
}

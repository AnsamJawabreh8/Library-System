import React, { useContext, useEffect, useState } from 'react'
import { Navigate, useNavigate , Outlet } from 'react-router-dom';
import Details from './Details';
import {ctx} from '../../../App';
import './reserve.css';
export default function Resrevenav() {
const Navigate = useNavigate();
const {isValid, setisValid} = useContext(ctx);

const handleSubmit =(e)=>{ 
//setIsDisplay(false)
console.log ("is valid is ",isValid);
if(e.target.name==='Details')
Navigate('../Details');
if(e.target.name==='Bayer')
Navigate('../Bayer');
if(e.target.name==='Payment')
Navigate('../Payment');
}
  return (
  <>
  <div className='reservenav pt-5'>
  <div className='pt-5 d-flex flex-direction-row justify-content-center'>
  <button type="button" class="btn btn-md ms-3 rounded-5 fs-4" name='Details' onClick={handleSubmit}>Book Details</button>
  <button type="button" class="btn btn-md ms-5 rounded-5 fs-4" name='Bayer' onClick={handleSubmit} disabled={isValid!=1 && isValid!=2}>Bayer Details</button>
  <button type="button" class="btn btn-md ms-3 rounded-5 fs-4" name='Payment' onClick={handleSubmit} disabled={isValid!=2}>Bayment Details</button>
  </div>
  </div>
  <div>
  
  </div>

  </>
  )
}

import React, { useContext , useEffect, useRef} from 'react';
import { ctx } from '../../../App';
import { useNavigate ,Navigate} from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import FieldComponent from '../../input/FieldInput'
import Resrevenav from './Resrevenav';
import { useState } from 'react';
import Joi, { valid } from 'joi';
import FormInput from '../../input/FormInput';

export default function Bayer() {
const formRef = useRef();
const Navigate = useNavigate();
const [errorMsg,setErrorMsg] = useState([])
const { isValid, setisValid } = useContext(ctx);
const [Bayers,setBayers] = useState([]);
const [Bayer,setBayer] = useState({
  Bayer_Name: '',
  Bayer_Address: '',
  Bayer_Phone: '',
  Purchase_date: '',
  National_ID: '',
})

useEffect(() => { 
  setBayers (JSON.parse(localStorage.getItem('Bayers')) || []);
  setBayer(JSON.parse(localStorage.getItem("SelectBayer"))||{})
},[]);

const handleChange = (e) => {
 let myBayer = {...Bayer}
 myBayer[e.target.name] = e.target.value;
 setBayer(myBayer);
}

  const onSubmit=(e) => { 
    e.preventDefault()
    if (!Bayer.Bayer_Name || !Bayer.Bayer_Address || !Bayer.Bayer_Phone || !Bayer.Purchase_date || !Bayer.National_ID) {
      setErrorMsg("All fields are required");
      return;
    }   
    setisValid(2);
    const SameName = Bayers.find((b) => b.Bayer_Name === Bayer.Bayer_Name);    
    console.log("same name",SameName)
    if(!SameName)
   { 
     console.log('already exist name')
    Bayers.push(Bayer);
    localStorage.setItem('Bayers', JSON.stringify(Bayers));
    localStorage.setItem('SelectBayer', JSON.stringify(Bayer)); 
    Navigate('../Payment')
  }
  else {
    console.log('not exist same name')
    const index = Bayers.findIndex((b) => b.Bayer_Name === Bayer.Bayer_Name);
    Bayers.splice(index, 1, Bayer);
    localStorage.setItem('Bayers', JSON.stringify(Bayers));
    localStorage.setItem('SelectBayer', JSON.stringify(Bayer));
    Navigate('../Payment')
  }  
    

}
  return (
    <>
    <Resrevenav/>
      <form className='form-inline Bayerform shadow rounded-4 Bayer p-3' onSubmit={onSubmit} ref={formRef}>
      <FormInput name='Bayer_Name' type='text' placeholder='Bayer Name' onChange={handleChange} value={Bayer.Bayer_Name} />
      <FormInput name='Bayer_Address' type='text' placeholder='Bayer_Address' onChange={handleChange} value={Bayer.Bayer_Address}/>
      <FormInput name='Bayer_Phone' type='number' placeholder='Bayer_Phone' onChange={handleChange} value={Bayer.Bayer_Phone} />
      <FormInput name='Purchase_date' type='date' placeholder='Purchase_date' onChange={handleChange} value={Bayer.Purchase_date}/>
      <FormInput name='National_ID' type='number' placeholder='National_ID' onChange={handleChange} value={Bayer.National_ID}/>
      <button className='btn text-light rounded-4 mt-3' type='submit'>Save and continue</button>
      </form>
      
    </>
  );
}


import React from 'react'
import modal from './modal.css'
import FieldComponent from '../../../input/FieldInput'
export default function AuthorContent() {
  return (
    <form className=''>
    <div className='wrap authorcont mt-5'>
    <div className='mt-1 mx-auto w-100'>
    <FieldComponent name={'Birth of date'} type='date' placeholder={'Birth of date'} required/>
    <FieldComponent name={'Death date'} type='date' placeholder={'Death date'} required/>
    </div>
    <div className='mx-auto w-100 mt-5'>
    <div className='d-flex'>
    <div className='w-25 ms-0'><label className='txt authorcont fw-bold'>Country</label></div>
    <select class="form-select mt-1 w-50" aria-label="Default select example" required>
    <option selected >Select your country</option>
    <option value="1">Palistine</option>
    <option value="2">Jordan</option>
    <option value="3">Lebanon</option>
    </select>
    </div>
    </div>
   <FieldComponent name={'Death date'} type='date' placeholder={'Death date'}/>
    </div>
    </form>
  )
}

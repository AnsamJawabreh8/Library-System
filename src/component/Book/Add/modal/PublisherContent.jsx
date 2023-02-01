import React from 'react'
import FieldComponent from '../../../input/FieldInput'

export default function PublisherContent() {
  return (
    <form className=''>
    <div className='wrap authorcont mt-5'>
    <div className='mt-1 mx-auto w-100'>
    <FieldComponent name={'Birth of date'} type='date' placeholder={'Birth of date'}/>
    <FieldComponent name={'Death date'} type='date' placeholder={'Death date'}/>
    </div>
    </div>
    <label className='fs-6'>still work?</label>
    <input className="form-check-input mt-2 ms-3" type="checkbox" defaultValue aria-label="Checkbox for following text input" />
    </form>
  )
}

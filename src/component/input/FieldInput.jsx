import { Field } from 'formik';

function  FieldComponent({ name, errorname,touched,type,placeholder, defaultValue}) {
  return (
    <>
   <div className='form-group mt-5 d-flex'>
             <label className='w-25 fw-bold text-bold'>{placeholder}</label>
              <Field className='form-control w-50 shadow' name={name} placeholder={placeholder} type={type} defaultValue={defaultValue} required={true} />
   </div>{{errorname} && {touched}? (
      <div className='text-danger text-center fw-bold'>{errorname}</div>
      ) : null}
    </>
  );
}
export default FieldComponent; 

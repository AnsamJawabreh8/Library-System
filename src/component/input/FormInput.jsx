import React from "react";

const FormInput = React.memo(({type,name, onChange,screenDisplay,onBluer,value,accept,placeholder}) => {
  return (
    <>
    <div className="form-input d-lg-flex w-75">
    <label htmlFor={name} className="form-label w-25 fs-6 fw-bold ms-2">{screenDisplay}</label>
    <input value={value} type={type} name={name} accept={accept}  required 
    className="form-control w-75 ms-5 shadow" id={name} aria-describedby="emailHelp" 
    onChange={onChange} onBluer={onBluer} placeholder={placeholder}/>
    </div>
    </>
  );
});

export default FormInput;

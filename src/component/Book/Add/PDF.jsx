import React, {useEffect, useState } from 'react'

const PDF = React.memo(({updatePdfFile}) => {
const [pdfFile, setPdfFile]=useState(null);
const [pdfFileError, setPdfFileError]=useState('');
const fileType=['application/pdf'];

useEffect(() => {
  updatePdfFile(pdfFile);
}, [pdfFile]);


const handlePdfFileChange=(e)=>{
  let selectedFile=e.target.files[0];
  if(selectedFile){
  if(selectedFile && fileType.includes(selectedFile.type)){
    let reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onloadend = (e) =>{
    setPdfFile(e.target.result);
    updatePdfFile(pdfFile);
   }}              
  else{
    setPdfFile(null);
    setPdfFileError('Please select valid pdf file');
    }}}

  return (
  <div className='pdfInput mt-5 ps-0 w-100 d-flex'>
  <label className='w-25 fw-bold'>Book File</label>
  <input type="file" className='form-control w-50'
  required onChange={handlePdfFileChange} accept=".pdf"/>
  {pdfFileError&&<div className='error-msg'>{pdfFileError}</div>}
  <br></br>
  </div>
  )
});

export default PDF;

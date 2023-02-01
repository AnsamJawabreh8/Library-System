import React, { useState } from 'react';
import Modal from 'react-modal';
import FormInput from '../../../input/FormInput';
import AuthorContent from './AuthorContent';
import PublisherContent from './PublisherContent';
import Swal from 'sweetalert2';
const customStyles = {
  content: {top: '50%', left: '50%', right: 'auto', bottom: 'auto', marginRight: '-50%',
  transform: 'translate(-50%, -50%)',},};
Modal.setAppElement('#root');

export default function ModalAdd({Option,updateOption,AuthorList,updateAuthorList,name,person,publisherList}) {
  const [isOpen, setIsOpen] = useState(false);
  const [error,setError] = useState();
const toggleModal = (e) => {
  e.preventDefault();
  setIsOpen(!isOpen);
}
const getVal =(e)=>{
  e.preventDefault();
  updateOption(e.target.value);
}

const addNewVal=(e)=>{
 e.preventDefault();
 if(Option != null)
 {
  setIsOpen(!isOpen);
 (person === 'Author-list')?
  ((!AuthorList.includes(Option))? 
  updateAuthorList([...AuthorList, Option])
 : Swal.fire('Already Exist'))
 : ((!publisherList.includes(Option))
 ? updateAuthorList([...publisherList, Option])
 : Swal.fire('Already Exist')

 );

localStorage.setItem((person === 'Author-list') ? 'Author-list' 
: 'Publisher-list', JSON.stringify((person === 'Author-list') ? AuthorList 
: publisherList));
}
else {
setError('This Input is Requierd')
}
}
return (
<div>
<span onClick={toggleModal} className='btn modalbtn fs-4'><i class="fa-solid fa-plus"></i></span>
<Modal isOpen={isOpen} onRequestClose={toggleModal} style={customStyles}>
<form className='ps-5 modalform'>
<h6 className='pt-2'>Add New {name}</h6>
<FormInput name={name} onChange={getVal} screenDisplay={name}/>
{<div className='text-center text-danger fw-bold'>{error}</div>}
{ name ==='book_auther'?<AuthorContent/>:<PublisherContent/>}
<button onClick={toggleModal} className='modlbtn mt-2 button btn bg-secondary'>Close</button>
<button onClick={addNewVal} className='modlbtn ms-2 mt-2 button btn bg-primary'>Add</button>
</form>
</Modal>
</div>
  );
}


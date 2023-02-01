import React, { useContext, useState } from 'react'
import ModalAdd from '../Book/Add/modal/ModalAdd';
export default function FormInputList({type,name,onChange,screenDisplay,person}) {

  const [AuthorList, setAuthorList] = useState(JSON.parse(localStorage.getItem('Author-list')) || []);
  const [publisherList, setPublisherList] = useState(JSON.parse(localStorage.getItem('Publisher-list')) || []);  
  const [Option,setNewOption]= useState();

  const updateOption = (val)=>{
    setNewOption(val)
  } 
  const updateAuthorList =(newVal)=>{
  (person === 'Author-list') ? setAuthorList(newVal)
  : setPublisherList(newVal);
  }

  (person === 'Author-list') ? localStorage.setItem('Author-list', JSON.stringify(AuthorList))
  : localStorage.setItem('Publisher-list', JSON.stringify(publisherList));

  return (<>
  <div className='d-flex flex-direction-row mt-5 w-100'>  
  <label className=' fw-bold w-25'>{person}</label>
  <div className='inputField d-flex w-75 '>  
  <div className="input-group w-75 " >
  <select className="form-select ms-2" id={name} onChange={onChange} name={name}>
  {person === "Author-list" ? (<>
  <option selected>Choos book Author...</option>
  {AuthorList.map((option, index) => (
  <option key={index} value={option}>{option}</option>
    ))}
  </> 
 ) : (<> 
   <option selected >Choos book Publisher...</option>
   {publisherList.map((option, index) => (
   <option key={index} value={option}>{option}</option>
   ))} </> )
  }
  </select>
</div>
</div>
<div>
<ModalAdd Option={Option} updateOption ={updateOption} AuthorList={AuthorList} 
updateAuthorList={updateAuthorList} name={name} person={person} publisherList={publisherList}/>
</div>
</div>
  </>
  )
}

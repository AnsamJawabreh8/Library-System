import React, { useEffect, useState ,useContext} from 'react'
import { ctx } from '../../../App';

export default function Tags({updateTag ,editingIndex,index,setEditingIndex}) {

 const [inputValue, setInputValue] = useState("");
 const {tagArray , setTagArraty} = useContext(ctx);
 const[newTag , setNewTag] = useState();

useEffect(()=>{
setNewTag(tagArray[index])
},[index])
 
const handleChange3 = (event) => {
 setNewTag(event.target.value);
};

const handleKeyDown2 = (event) => {
  if(event.key ==='Enter')
    {  
      let newTagArray = [...tagArray];
      newTagArray[index] = newTag;
      setTagArraty(newTagArray);
      setNewTag('')
      setEditingIndex(false)
    }
};

 const handleChange2 = (event) => {
  setInputValue(event.target.value);
  console.log(event.target.value);
};

 const handleKeyDown = (event) => {
  if (event.key === "Enter" && inputValue) {
  setTagArraty([...tagArray, inputValue]);
  setInputValue("");   
  console.log(tagArray);
}
};

return (
  <>
  <div className='d-flex'>
  <label className='w-25 mt-5 fw-bold'>Book Tags</label>
  { editingIndex == false? 
  <input type="text" value={inputValue} onChange={handleChange2} onKeyDown={handleKeyDown}
  className="form-control w-50 mt-5"  placeholder="Add tags"/>:
  <input type="text" value={newTag} onChange={handleChange3} onKeyDown={handleKeyDown2}
  className="form-control w-50 mt-5"  placeholder="Add tags"/>
  
  }
  </div>
      </>
  );
  
}

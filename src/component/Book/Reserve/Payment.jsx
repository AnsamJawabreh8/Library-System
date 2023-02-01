import React, { useContext, useState } from 'react';
import { useNavigate,useLocation} from 'react-router-dom';
import { ctx } from '../../../App';
import FormInput from '../../input/FormInput';
import Swal from 'sweetalert2';
import Resrevenav from './Resrevenav';

export default function Payment() {

const Navigate = useNavigate();
const {setisValid,Units,setUnits,AV_Units,setAV_Units} = useContext(ctx);
const location = useLocation();
const Bookselect = JSON.parse(localStorage.getItem("SelectedBook"))
const unit = Bookselect.available_units;
const [updateUnits,setUpdateUnits] =useState()
const [date,setDate] = useState(localStorage.getItem('Date') || '');

const handleSubmit = (e) => {
e.preventDefault();
console.log("select=", Bookselect) 
      Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Reserve!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Done!", "Your Book is Reserved.", "success");
        setisValid(0);
        const Books = JSON.parse(localStorage.getItem("Books"));
        const bookIndex = Books.findIndex((b) => b.id === Bookselect.id);
        Books[bookIndex].available_units = Bookselect.available_units- AV_Units;
        localStorage.setItem("Books", JSON.stringify(Books));
        localStorage.removeItem('SelectedBook');
        localStorage.removeItem('SelectBayer');
        localStorage.removeItem('Date');
        setAV_Units(0)
        Navigate('../Details')
      }
      
    });
};
const handleInputChange=(e)=>{
  setAV_Units(e.target.value)
  }

  const handleDate = (e) => {
    setDate(e.target.value);
    localStorage.setItem('Date', e.target.value);
  };

  return (<>
  <Resrevenav/>
  <div className='Payment w-100 pt-3'>
  <form className='p-2 bg-light mx-auto p-1 rounded-3 ps-3 cont' >
  <div className='d-lg-flex mt-2'>
  <label className='fw-bold PayMethod'>Payment Method</label>
  <select className="form-select ms-5 w-50" aria-label="Default select example">
  <option value={1}>Cash</option>
  <option value={2} disabled>Credit Card</option>
  <option value={3} disabled>Paypal</option>
</select>
 </div >   
     <FormInput name='Number_of_units' type='text' screenDisplay="Units" value={AV_Units} onChange={handleInputChange}/>
     <FormInput name='Unit_price' type='number' screenDisplay="Unit Price" value={Bookselect.unit_price}/>
     <FormInput name='Purchase_date' type='date' screenDisplay="Purchase Date" onChange={handleDate} value={date} />
     <FormInput name='Total_price' type='text' screenDisplay="Total Price" value={Bookselect.unit_price * AV_Units}/>
     <button className='button btn text-light mt-3' onClick={handleSubmit}>Reserve Book</button>
    </form>
    </div>
  </>
  )
}

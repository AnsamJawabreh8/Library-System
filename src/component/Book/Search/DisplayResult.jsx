import React, { useContext } from 'react';
import { Navigate, useNavigate } from 'react-router-dom'; 
import search from './search.css';
import { ctx } from '../../../App';
export default function DisplayResult({results}) {
const Navigate = useNavigate();

const handleSubmit = (event) => {
const id = event.target.dataset.id;
const name = event.target.dataset.name;
console.log(id);
Navigate('../Details',{ state:{id:id, name:name,}})
}

return (
<table className='table table-striped table-hover w-100'>
  <thead>
  <tr>
  <th>ID</th>
  <th>Name</th>
  <th>Author</th>
  <th>Publisher</th>
  <th>Publish Date</th>
  <th>Tags</th>
  <th>Units Available</th>
  <th>Unit Price</th>
 </tr>
  </thead>
  <tbody>
  {results.map((result) => (
  <tr key={result.id}>
  <td>{result.id}</td>
  <td>{result.name}</td>
  <td>{result.book_auther}</td>
  <td>{result.book_publisher}</td>
  <td>{result.publish_date}</td>
  <td>{result.tags}</td>
  <td>{result.available_units}</td>
  <td>{result.unit_price}</td>
  <td>{result.available_units >0? <button className='button rounded-4 reserve-button text-light w-75' data-id={result.id} data-name={result.name} onClick={handleSubmit}>Reserve 
  </button >:<button className='button rounded-4 reserve-button w-75' disabled>Reservs</button>}</td>
  </tr>))}
  </tbody>
</table>
  )
}

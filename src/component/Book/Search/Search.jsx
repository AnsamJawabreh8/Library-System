import React, { useRef, useState } from "react";
import DisplayResult from "./DisplayResult";
import FormInput from '../../input/FormInput';
import search from './search.css';

export default function Search() {
const [query, setQuery] = useState("");
const [field, setField] = useState("name");
const [results, setResults] = useState([]);
const [MintUnits, setMinUnits] = useState(0);
const [MaxUnits, setMaxUnits] = useState(0);
const [MinPrice, setMinPrice] = useState(0);
const [MaxPrice, setMaxPrice] = useState(0);
const searchResultsRef = useRef(null);
const formRef = useRef(null);
let filteredResults,filteredResults2 =[];
const handleInputChange = (e) => {
    e.target.name === 'search' ? setQuery(e.target.value): 
    e.target.name === 'field' ? setField(e.target.value) :
    e.target.name==='Min Units' ? setMinUnits(e.target.value) :
    e.target.name ==='Max Units' ? setMaxUnits(e.target.value) :
    e.target.name ==='Min Price' ? setMinPrice(e.target.value) :
    e.target.name ==='Max Price' ? setMaxPrice(e.target.value) :
    <div></div>
};

const handleSubmit = (event) => {
  event.preventDefault();
  searchResultsRef.current.scrollIntoView({ behavior: 'smooth' });
  setResults([]);
  console.log(field,MinPrice , MaxPrice , MintUnits , MaxUnits , query)
  const books = JSON.parse(localStorage.getItem("Books")) || [];
  console.log("Array",books)
  let searchResults = field === "any" ? books.filter((book) =>
    Object.values(book).some((value) => value.includes(query))) 
    :books.filter((book) =>
    book[field].toLowerCase().includes(query.toLowerCase())
  );
  setResults(searchResults);
  // Filter the results based on units and price
  if(MintUnits != 0 && MaxUnits != 0 && MinPrice != 0 && MaxPrice != 0){
    let filteredResults = searchResults.filter((book) => 
      (MintUnits === 0 || book.available_units >= MintUnits) && 
      (MaxUnits === 0 || book.available_units <= MaxUnits) &&
      (MinPrice === 0 || book.unit_price >= MinPrice) && 
      (MaxPrice === 0 || book.unit_price <= MaxPrice)
    );
    if(filteredResults.length > 0)
   { 
    setResults(filteredResults);
  }
  }
  if(MintUnits != 0 && MaxUnits != 0 && MinPrice == 0 && MaxPrice == 0)
  {
    let filteredResults = searchResults.filter((book) => 
    ( book.available_units >= MintUnits && book.available_units <= MaxUnits))
    setResults(filteredResults)
  }
  if(MintUnits == 0 && MaxUnits == 0 && MinPrice != 0 && MaxPrice != 0)
  {
    let filteredResults = searchResults.filter((book) => 
    ( book.unit_price >= MinPrice && book.unit_price <= MaxPrice))
    setResults(filteredResults)  
  }
  formRef.current.reset();
};

  return ( <>

  <div className="d-flex searchbody">  
  <div className="searchbox rounded-2 shadow d-flex justify-content-start w-100">
  <div className=" cont rounded-5 shadow m-2  pt-5">
  <form onSubmit={handleSubmit} className='search-form d-lg-flex justify-content-center align-items-center w-75 pt-5' ref={formRef}>
    <div className="input-group mb-3 mt-3">
    <input type="text" name='search' value={query} onChange={handleInputChange} className="form-control w-50 ms-3" placeholder="Find your book " aria-label="Recipient's username" aria-describedby="button-addon2" />
    <button className="btn btn-secondary" name="form1" onClick={handleSubmit} type="button" id="button-addon2">Search</button>
    </div>
    <select value={field} name='field' onChange={handleInputChange} className='form-select  ms-3 w-50'>
    <option value="any" selected>Any</option>
    <option value="name" >Name</option>
    <option value="book_auther">Book Auther</option>
    <option value="book_publisher">Book Publisher</option>
    </select>
  </form>

  <div className="mt-0 ps-0 w-100 pt-lg-5 ms-1 p-3">
      <form className=" d-lg-flex justify-content-start align-items-center "  ref={formRef}>
      <FormInput name={'Min Units'} type="number" onChange={handleInputChange} screenDisplay='Min Units' />
      <FormInput name={'Max Units'} type="number" onChange={handleInputChange} screenDisplay='Max Units'/>
      </form>
      <form className="mt-1 d-lg-flex justify-content-start align-items-center w-100"  ref={formRef}>
      <FormInput name={'Min Price'} type="number" onChange={handleInputChange} screenDisplay='Min Price'/>
      <FormInput name={'Max Price'} type="number" onChange={handleInputChange} screenDisplay='Max Price'/>
      </form>
  </div>
  </div>

  <div className=" ms-auto w-50 d-none d-lg-block">
    <h1 className="findbook text-center mt-3">Find Your Book</h1>
    <div className="searchImg text-end mt-5"><img src='last.png' width='500px' height='400px' /></div>
   </div>
</div>

</div> 
 <div className="p-4 search-result d-flex justify-content-center w-100"
  id="search-results" ref={searchResultsRef}>
  { 
   results.length >0 ? (<DisplayResult results={results} />)
  :<p className="resultNF">Result not found !</p>}
  </div> 
  
  </>
    
  );
}

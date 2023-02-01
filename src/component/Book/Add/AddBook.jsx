import React, { useContext, useEffect, useRef, useState } from "react";
import PDF from "./PDF";
import FormInputList from '../../input/FormInputList'
import Swal from "sweetalert2";
import * as Yup from 'yup';
import 'animate.css';
import { Form, Formik } from "formik";
import Tags from "./Tags";
import FieldComponent from "../../input/FieldInput";
import { ctx } from "../../../App";
import './add.css'
import { ClipLoader } from 'react-spinners';

export default function AddBook() {

useEffect(()=>{
  setLoading(true)
  setTimeout(() => {
  setLoading(false);
   }, 2000);
},[])

 const {tagArray , setTagArraty} = useContext(ctx);
 const [nextId, setNextId] = useState((+localStorage.getItem("nextId")||0)+1);;
 const formRef = useRef(null);
 const [loading,setLoading] = useState(false)
 let [Books, setBooks] = useState(JSON.parse(localStorage.getItem('Books'))|| [] );
 let [Bookobj, setBookobj] = useState({
    id:'',
    name: '',
    book_auther:'',
    publish_date: '',
    book_publisher:'',
    choose_file:'',
    tags:[],
    available_units: '',
    unit_price: '',
});

const [editingIndex, setEditingIndex] = useState(false);
const [index,setIndex] =useState()

const handleChange = (e) => {
  let newObj = { ...Bookobj };
  newObj[e.target.name] = e.target.value;
  setBookobj(newObj);
  console.log(newObj)
   };

const updatePdfFile = (AddFile) => {
  setBookobj({...Bookobj, choose_file: AddFile});

};
const updateTag =(newVal)=>{
setBookobj({...Bookobj, tags: newVal});
}
const deleteTag=(index)=>{
  let newTagArray = [...tagArray];
  newTagArray.splice(index, 1);
  setTagArraty(newTagArray);
}
 
const BookSchema = Yup.object().shape({
    name: Yup.string().min(2).max(20).required(),
    publish_date:Yup.string().required(),
    available_units: Yup.number().min(2).max(60).required(),
    unit_price: Yup.number().min(10).max(100).required(),
});
  return (
    <>
  <Formik
  initialValues={{
   name: "",
   publish_date: "",
   available_units: "",
   unit_price: "",}}

   validationSchema={BookSchema}
    onSubmit={(values , { resetForm }) => {
    const SameName = Books.find((book) => book.name === Bookobj.name);
    if (1) {
     Swal.fire({
       title: "Are you sure?",
       text: "You won't be able to revert this!",
       icon: "warning",
       showCancelButton: true,
       confirmButtonColor: "#3085d6",
       cancelButtonColor: "#d33",
       confirmButtonText: "Yes, Added it!",
     }).then((result) => {
     if (result.isConfirmed) {
    setNextId(nextId + 1);
    Bookobj.id = nextId;
    Bookobj.tags=tagArray;
    localStorage.setItem("nextId",nextId); 
    let Book = {...Bookobj,...values}
    let myArr =Books;
    myArr.push(Book)
    setBooks(myArr);
    localStorage.setItem("Books", JSON.stringify(Books)); 
    resetForm();
    setTagArraty([])
    Bookobj.choose_file=''; 
    Swal.fire("Added!", "Your book has been Added.", "success");
       }});
   } 
    else {
     Swal.fire('This name is already exist,Please Change it');
    console.log("There is already a book with the same name or same id in the array");
   }
  
  }
  }
  
    >
 {({ errors, touched }) => (
  loading ? (<div className="Loading"><ClipLoader color={'#fff'} loading={loading} size={150} /></div>)
  :
  <div class="wrapper">
  <div className="wrapform mx-auto shadow rounded-2 d-lg-flex justify-content-start">
  <Form className='content form-inline ms-lg-5 pt-2 rounded-2 shadow ' ref={formRef}>
    <h3>Book Information</h3>
    <FieldComponent name='name' errorname={errors.name} touched={touched.name} type='text' placeholder='Book Name'/>
    <FormInputList name="book_auther" onChange={handleChange} person={'Author-list'} screenDisplay ={"Book Auther"}/>
    <FieldComponent name='publish_date' errorname={errors.publish_date} touched={touched.publish_date} type='date' placeholder='Publish Date'/>
    <FormInputList name="book_publisher" onChange={handleChange} person={'Publisher-list'} screenDisplay ={"Book Publisher"}/>
    <PDF name="choose_file" updatePdfFile={updatePdfFile}/>

  <Tags name="tags" updateTag={updateTag} editingIndex={editingIndex} index={index} setEditingIndex={setEditingIndex}/>

  <div className="tags pt-1">
  {
  tagArray.map((tag, index) => (
  <span key={index} className=" tag rounded-2 ms-1 mt-2 p-2 text-light shadow btn" onClick={()=>{
    setEditingIndex(true);
    setIndex(index);
  }}>
  {tag} <button type="button" class="btn-close" aria-label="Close" onClick={()=>deleteTag(index)}></button>
  </span>))
  } 
</div> 
    <FieldComponent name='available_units' errorname={errors.available_units} touched={touched.available_units} type='number' placeholder='Available Units'/>
    <FieldComponent name='unit_price' errorname={errors.unit_price} touched={touched.unit_price} type='number' placeholder='Unit Price'/>
    <button className='button rounded-5 add w-50 mt-5 p-2 text-light fw-500' type='submit'>Save and continue</button>
    </Form>
    <div className="image d-none d-lg-block">
    <h1>ADD NEW BOOK</h1>
    <img src="add.png" width='400px'/>
    </div>
    </div>
    </div>
   )   
      }
    </Formik>
  </>
  );
  
}

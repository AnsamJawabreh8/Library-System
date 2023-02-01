import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import FieldComponent from '../../input/FieldInput';
import { useContext, useEffect, useState } from 'react';
import './register.css';
import { useNavigate } from 'react-router-dom';

const validationSchema = Yup.object({
  Username: Yup.string().min(2,'too short').max(6,'too long').required(),
  Email: Yup.string().required(),
  Age: Yup.number().min(10,'too short').max(60,'too long').required(),
  Password: Yup.string().min(8).matches(/^(?=.*[A-Z]).{8,}$/, "Password must contain at least 8 characters and one uppercase letter")

});

export default function Register() {
  const [token,setToken] = useState(null);
  const Navigate = useNavigate();
  return (
  <>
  {
   (<Formik
  initialValues={{
  Username: '',
  Email: '',
  Age: '',
  Password: '',}
}
  validationSchema={validationSchema}
  onSubmit={(values) => {
  let users = JSON.parse(localStorage.getItem('users')) || [];
  localStorage.setItem('token', JSON.stringify(values.Username+"  "+values.Password));
  users.push(values);
  localStorage.setItem('users', JSON.stringify(users));
  Navigate('../Add')
  }}>
  {({ errors, touched }) => (
  <div className='d-flex justify-content-start'>
  <Form className='w-50 register rounded-4'>
  <h1>Register Now!</h1>
  <FieldComponent name='Username' errorname={errors.Username} touched={touched.Username} type='text' placeholder='User Name'/>
  <FieldComponent name='Email' errorname={errors.Email} touched={touched.Email} type='email' placeholder='Email'/>
  <FieldComponent name='Age' errorname={errors.Age} touched={touched.Age} type='number' placeholder='Age'/>
  <FieldComponent name='Password' errorname={errors.Password} touched={touched.Password} type='password' placeholder='Password'/>
  <button className='button btn rounded-5 w-50 mt-5' type="submit">Submit</button>
  </Form>
  <div className='greating w-50 rounded-4 d-flex justify-content-center align-items-center ' >
  <div>
  <h1><i class="fa-solid fa-book-open mt-2"></i> Glad to See You ! </h1>
  <p className='mt-5 fs-6'>Lorem ipsum dolor sit, amet consectetur adipisicing elit.<br></br>
   Similique magnam consectetur autem magni sequi neque ab enim pariatur </p>
  </div>
  </div>
  </div>)}
  </Formik>)
      }
    </>
  );
}

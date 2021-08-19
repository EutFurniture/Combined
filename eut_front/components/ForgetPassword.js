import "./Login.css";
import { Link } from "react-router-dom";

import React, {useState} from 'react';
import Axios from 'axios';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import login from "../images/sofa1.jpeg";
import EmailIcon from '@material-ui/icons/Email';
import * as yup from "yup";

const schema = yup.object().shape({
    email:  yup.string().email().required('Enter the email'),
    })

function ForgetPassword() {

  const[forgetStatus, setforgetStatus] = useState();

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

  const forgetinfo = (data) => {
  
    Axios.post("http://localhost:3001/forget", {
     email: data.email,
      
    }).then((response) => {
      console.log(response)
      
      if (response.data.message) {
        setforgetStatus(response.data.message);
        alert(response.data.message)
        window.location.href='/ResetPassword'
      } 
    }
    );
  };

  return (
   
     <div  >
    <div className="content"> 
   
     <div className="left-container">
       <div className="left-container-alpha">
        <img src={login} alt="img3" className="img3"/>  

        
       </div>
     </div>
     {/* <div className="logo">
     <h1>EUT </h1>
     </div> */}
    
     <div className="right-container">
     
         <div className="right-container-flex">
        
             <label className="top">
                 Your Email
             </label>

             <form onSubmit={handleSubmit(forgetinfo)}>
                <ul className='ulist'>
                  <li>
                 <EmailIcon style={{marginRight:'10px'}}/>
                  <input type="email" placeholder="Enter your Account Email" name='email' {...register('email')}   required/><br/><br/>
                  </li>
                  {errors.email?.message && <p className=" errormessage" style={{color:'red',marginLeft:'20px'}}>{errors.email?.message}</p>}
                </ul>
                     
               <button  type="submit"   className="btnlogin">Send</button><br/>
                <div className="mainpage">
                
                </div>
             </form>
         </div>
         
     </div>
     
    </div>
    </div>
    
  );
}

export default ForgetPassword;
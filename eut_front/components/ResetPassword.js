import "./Login.css";
import { Link } from "react-router-dom";

import React, {useState} from 'react';
import Axios from 'axios';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import login from "../images/sofa1.jpeg";
import LockIcon from '@material-ui/icons/Lock';
import VpnKeyIcon from '@material-ui/icons/VpnKey';

import * as yup from "yup";

const schema = yup.object().shape({
    password: yup.string().required("Enter the Password"),
    otp: yup.string().required("Enter the otp code"),
    c_password: yup.string().when('password', (password, schema) => {
      if (password) return schema.required('Confirm Password is required');
  })
      .oneOf([yup.ref('password')], 'Passwords must match')
})

function ResetPassword() {

  const[ResetStatus, setResetStatus] = useState();
  
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

  const Resetinfo = (data) => {
  
    Axios.post("http://localhost:3001/ResetPassword", {
     otp:data.otp,
     password: data.password,
     c_password: data.c_password,
      
    }).then((response) => {
      console.log(response)
      
      if (response.data.message) {
        setResetStatus(response.data.message);
        alert(response.data.message)
        window.location.href='/'
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
     
    
     <div className="right-container">
     
         <div className="right-container-flex">
        
             <label className="top">
                 Reset Password
             </label>
             <div style={{fontWeight:'bold',color:'green'}}>Please Check Your Mail To Get Your OTP Code</div>
             <form onSubmit={handleSubmit(Resetinfo)}>
                <ul className='ulist' style={{marginTop:'20px'}}>
                  
                <li>
                  <VpnKeyIcon style={{marginRight:'10px'}}/>
                  <input type="text" name="otp" placeholder="Your OTP"  {...register('otp')} required/>
                  </li>
                  {errors.otp?.message && <p style={{color:'red',marginLeft:'20px'}}className=" errormessage" >{errors.otp?.message}</p>}
                 <li>

                  <LockIcon style={{marginRight:'10px'}}/>
                  <input type="password" name="password" placeholder="Your New Password"  {...register('password')} required/>
                  </li>
                  {errors.password?.message && <p style={{color:'red',marginLeft:'20px'}}className=" errormessage" >{errors.password?.message}</p>}
                 <li>
                  
                  <LockIcon style={{marginRight:'10px'}}/>
                  <input type="password" name="c_password" placeholder="Confirm New Password"  {...register('c_password')} required/>
                  </li>
                  {errors.c_password?.message && <p style={{color:'red',marginLeft:'20px'}}className=" errormessage" >{errors.c_password?.message}</p>}
                </ul>
                     
               <button  type="submit" className="btnlogin">Reset</button><br/>

                <div class="login" align="center">
                <Link to="/">Login?</Link>
                </div>
                <div className="mainpage">
                
                </div>
             </form>
         </div>
         
     </div>
     
    </div>
    </div>
    
  );
}

export default ResetPassword;
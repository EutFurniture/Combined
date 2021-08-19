import "./Login.css";
import { Link } from "react-router-dom";

import React, {useState} from 'react';
import Axios from 'axios';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import login from "../images/sofa1.jpeg";
import PersonIcon from '@material-ui/icons/Person';
import LockIcon from '@material-ui/icons/Lock';


import * as yup from "yup";

const schema = yup.object().shape({
    email:  yup.string().email().required('Enter the email'),
    password: yup.string().required("Enter the Password"),

})

function Login() {

  const[LoginStatus, setLoginStatus] = useState();
  

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

  const logininfo = (data) => {
  
    Axios.post("http://localhost:3001/login", {
     email: data.email,
     password: data.password,
     role: data.role,
     verify: data.verify,
      
    }).then((response) => {
      console.log(response)
      
      if (response.data.message) {
        setLoginStatus(response.data.message);
      } 
      else if((response.data[0].user_role === 'SalesManager') && (response.data[0].u_verify === 1)){
          window.location.href='/DashboardNew'
        } 
      else if((response.data[0].user_role === 'DeliveryManager') && (response.data[0].u_verify === 1)){
          window.location.href='/dManager/pages/Dashboard'
      }
      else if((response.data[0].user_role === 'Customer') && (response.data[0].u_verify === 1)){
        window.location.href='/dManager/pages/ManageDelivery'
    }
    else if((response.data[0].user_role === 'Deliver') && (response.data[0].u_verify === 1)){
      window.location.href='/dPerson/pages/DpDashboard'
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
                 Log in
             </label>

             <form onSubmit={handleSubmit(logininfo)}>
                <ul className='ulist'>
                  <li>
                 <PersonIcon style={{marginRight:'10px'}}/>
                  <input type="text" placeholder="Username" name='email' {...register('email')}   required/><br/><br/>
                  </li>
                  {errors.email?.message && <p className=" errormessage" style={{color:'red',marginLeft:'20px'}}>{errors.email?.message}</p>}

                 <li>
                  
                  <LockIcon style={{marginRight:'10px'}}/>
                  <input type="password" name="password" placeholder="Password"  {...register('password')} required/>
                  </li>
                  {errors.password?.message && <p style={{color:'red',marginLeft:'20px'}}className=" errormessage" >{errors.password?.message}</p>}
                </ul>
                     
               <button  type="submit"   className="btnlogin">Log in</button><br/>

                <div class="forget">
                <Link to="/ForgetPassword">Forgot Password?</Link>
                </div>
                <div className="mainpage">
                
                </div>
             </form>
             <h3 style={{color:'red'}}>{LoginStatus}</h3>
         </div>
         
     </div>
     
    </div>
    </div>
    
  );
}

export default Login;
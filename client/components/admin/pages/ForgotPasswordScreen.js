import { useState } from "react";
import axios from "axios";
import img3 from "../../../assets/img3.jpg"
import "../css/ForgotPasswordScreen.css";



const ForgotPasswordScreen = () => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
  
    const forgotPasswordHandler = async (e) => {
      e.preventDefault();
  
      const config = {
        header: {
          "Content-Type": "application/json",
        },
      };
  
      try {
        const { data } = await axios.post(
          "/api/auth/forgotpassword",
          { email },
          config
        );
  
        setSuccess(data.data);
      } catch (error) {
        setError(error.response.data.error);
        setEmail("");
        setTimeout(() => {
          setError("");
        }, 5000);
      }
    };
  
    return (

      <div className="content"> 
     <div className="left-container">
       <div className="left-container-alpha">
        <img src={img3} alt="img3" className="img3"/>  

       <div className="footer">
            {/* <p> All rights reserved @ EUT Furniture (Pvt) Ltd.<br/>Email: contact@eutfurniture.com</p> 
            <p>Copyright © 2021 Version 1.0 </p>  */}
        </div>  
       </div>
     </div>
      
     <div className="right-container">
       
        <form
          onSubmit={forgotPasswordHandler}>
         {/* // className="forgotpassword-screen__form"> */}
          <h1 className="forgotpassword-screen__title">Forgot Password</h1>
          {error && <span className="error-message">{error}</span>}
          {success && <span className="success-message">{success}</span>}
          <div className="form-group">
            <p className="forgotpassword-screen__subtext">
              Please enter the email address . We
              will send you reset password confirmation to this email.
            </p>
            {/* <div className="mail-label">
            <label htmlFor="email">Email:</label>
            </div>
             */}
             <div className="mail">
            <input
              type="email"
              required
              id="email"
              placeholder="Enter your Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value) }
              className="field" required
            />
            </div>
          </div>
          <button type="submit" className="btn btn-primary">
            Send Email
          </button>
        </form>
      </div>
      </div> 
     
      
      
    );
  };
  
  export default ForgotPasswordScreen;
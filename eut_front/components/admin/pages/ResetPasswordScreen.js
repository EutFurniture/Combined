import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import img3 from "../../../assets/img3.jpg"
import "../css/ResetPasswordScreen.css";

const ResetPasswordScreen = ({ match }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const resetPasswordHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    if (password !== confirmPassword) {
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        setError("");
      }, 5000);
      return setError("Passwords don't match");
    }

    try {
      const { data } = await axios.put(
        `/api/auth/passwordreset/${match.params.resetToken}`,
        {
          password,
        },
        config
      );

      console.log(data);
      setSuccess(data.data);
    } catch (error) {
      setError(error.response.data.error);
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
      </div>
    </div>
     
    <div className="right-container">
   
      <form
        onSubmit={resetPasswordHandler}
        // className="resetpassword-screen__form"
      >
        <h3 className="resetpassword-screen__title">Reset Password</h3>
        {error && <span className="error-message">{error} </span>}
        {success && (
          <span className="success-message">
            {success} <Link to="/login">Login</Link>
          </span>
        )}
        <div className="form-group">
          <label htmlFor="password">New Password:</label>
          <div className="reset-mail">
          <input
            type="password"
            required
            id="password"
            placeholder="Enter new password"
            autoComplete="true"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="confirmpassword">Confirm New Password:</label>
          <div className="reset-mail">
          <input
            type="password"
            required
            id="confirmpassword"
            placeholder="Re-enter new password"
            autoComplete="true"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          </div>
        </div>
        <button type="submit" className="btn-reset btn-primary">
          Reset Password
        </button>
      </form>
      </div>
    </div>
 
  
  );
};

export default ResetPasswordScreen;
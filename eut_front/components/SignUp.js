import React,{useState} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Axios from'axios';
import './sign.css';
import Footer from './customer/Footer'
import { Fragment } from 'react';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(9),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom:theme.spacing(5),
    marginRight:theme.spacing(2),
    marginLeft:theme.spacing(4),
  },
  
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
 otp: {
    margin: theme.spacing(1,8),
  },
  sign:{
    fontWeight:'bold',
  }
}));

export default function SignUp() {
  const classes = useStyles();
  const[fname,setFName]=useState("");
  const[city,setCity]=useState("");
  const[email,setEmail]=useState("");
  const[phone,setPhone]=useState("");
  const[post,setPost]=useState("");
  const[address,setAddress]=useState("");
  const[password,setPassword]=useState("");
  const[cpassword,setCpassword]=useState("");
  Axios.defaults.withCredentials=true;
  const regist=()=>{
    Axios.post('http://localhost:3001/register',{
      fname:fname,
      email:email,
      phone:phone,
      address:address,
      password:password,
      cpassword:cpassword,
      post:post,
      city:city,
    
  }).then(() =>{
    console.log("success");
  });
  };


  const otpinfo = (data) => {
  
    Axios.post("http://localhost:3001/otpCheck", {
     email: data.email,
     otp: data.otp,
      
    }).then((response) => {
      console.log(response)
      if (response.data.message) {
        setotpStatus(response.data.message);
        alert(response.data.message)
        
      } 
    }
    );
  };
  return (
    <Fragment>
    <div className="cont">
    <div className="contactbox">
  <div className="left"> 
   <h3 className="make">
         Make Your Home Feel Comfortable
        </h3></div>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
     
      <div className={classes.paper}>
        
        <Typography component="h1" className={classes.sign} variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} >
              <TextField
                autoComplete="fname"
                name="fullname"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="Full Name"
                autoFocus
                onChange={(event)=>{setFName(event.target.value); }}
              />
            </Grid>
           
           
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                type="email"
                autoComplete="email"
                onChange={(event)=>{setEmail(event.target.value); }}
              />
            </Grid>
            <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.otp}
            onSubmit={handleSubmit(otpinfo)}
          >
          OTP
          </Button>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
           
                fullWidth
                id="otp"
                label="OTP"
                name="otp"
                type="otp"
                autoComplete="otp"
                
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="city"
                label="Your City"
                name="city"
                autoComplete="city"
                onChange={(event)=>{setCity(event.target.value); }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="address"
                label="Address"
                name="address"
                autoComplete="address"
                onChange={(event)=>{setAddress(event.target.value); }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="postalcode"
                label="Postal Code"
                name="postalcode"
                autoComplete="postalcode"
                onChange={(event)=>{setPost(event.target.value); }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="phone"
                label="Phone no"
                name="phone"
                type="phone"
                autoComplete="phone"
                onChange={(event)=>{setPhone(event.target.value); }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(event)=>{setPassword(event.target.value); }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="cpassword"
                label="Confirm Password"
                type="password"
                id="cpassword"
                autoComplete="conform-password"
                onChange={(event)=>{setCpassword(event.target.value); }}
              />
            </Grid>
           
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={regist}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/signin" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      </Container>
      </div>
      </div>
      <Footer />
     </Fragment>
    
  );
}

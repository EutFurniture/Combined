import React,{useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
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
}));

export default function SignUp() {
  const classes = useStyles();
  const[fname,setFName]=useState("");
  const[lname,setLName]=useState("");
  const[email,setEmail]=useState("");
  const[phone,setPhone]=useState("");
  const[address,setAddress]=useState("");
  const[password,setPassword]=useState("");
  const[cpassword,setCpassword]=useState("");
  Axios.defaults.withCredentials=true;
  const regist=()=>{
    Axios.post('http://localhost:3001/register',{
      fname:fname,
      lname:lname,
      email:email,
      phone:phone,
      address:address,
      password:password,
      cpassword:cpassword
    
  }).then(() =>{
    console.log("success");
  });
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
        
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange={(event)=>{setFName(event.target.value); }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                onChange={(event)=>{setLName(event.target.value); }}
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
                id="phone"
                label="Phone no"
                name="phone"
                type="phone"
                autoComplete="phone"
                onChange={(event)=>{setPhone(event.target.value); }}
              />
            </Grid>
            <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.otp}
            
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

import React, { useState,useEffect } from "react";
import clsx from 'clsx';
import axios from "axios";

import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import {Redirect, useParams} from "react-router-dom"
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import { useForm } from "react-hook-form";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
 import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";


import { mainListItems, Logout } from './listItems';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
   
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
    fontSize:40,
    fontWeight:600,
  },
  userimage : {
    height: 60,
    width: 60,
    borderRadius:100,
    borderColor:'white',

  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
    
  },
 
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    marginTop:'20px',
    marginLeft:'40px',
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 'auto',
  },
  addbutton:{
      backgroundColor:'#0000ff',
      height:'50px',
      width:'160px',
      borderRadius:'5px',
      marginRight:'10px',
      textDecoration:'none',
      textAlign:'center',
      paddingTop:'10px'
  },
  addcategorybox:{
    width: '1100px',
    height:'120px',
    backgroundColor: '#fff',
    marginLeft: '30px',
    display:'flex',
    //boxShadow:'5px 1px 2px 2px '
    
  },
  categorybtn:{
      border:0,
      backgroundColor:'#9bddff',
      width:'800px',
      height:'40px',
      marginTop:'40px',
      marginLeft:'30px',
      fontSize:'20px',
      borderRadius:'5px'

  },
  addcategory:{
    height:'40px'
  },
  categoryimage:{
    height:'500px',
    width:'1100px'
},
btn:{
    color:'white',
    fontSize:'18px',
    width:'150px',
    height:'40px',
    backgroundColor:'blue',
    border:'none',
    borderRadius:'5px'
},
addproducts:{
    display:'flex',
},

  

}));

const styles = {
  side:{
    backgroundColor:'rgb(37, 37, 94)',
  }
};




export default function UpdateCustom() {
  
  const dateOnly = (d) => {
    const date = new Date(d);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year} - ${month} - ${day}`;
  };

  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
 
  
  
 const {customer_id} = useParams();
 const [Dt, setDt] = useState([])
 const [newName, setNewName] = useState();
 const [newRole, setNewRole] = useState();
 const [newEmail,setNewEmail]=useState();
 const [newAddress,setNewAddress]=useState();
 const [newNIC,setNewNIC]=useState();
 const [newPhone,setNewPhone]=useState();
 const [newJob_start_date,setNewJob_start_date]=useState();

const [employeeList, setEmployeeList] = useState([]);

  useEffect(()=>{
    axios.get("http://localhost:3001/employees").then((response)=>{
      setEmployeeList(response.data)
    })
  },[]);

  useEffect(() => {
    const fetchData = async () => {
        const response = await axios.get('http://localhost:3001/view', {
            params: {
               customer_id: customer_id,
                
            }
        });
  /*
        setDt(response.data[0]);
        setNewName(response.data[0].name)
          setNewEmail(response.data[0].email)
          setNewPhone(response.data[0].phone)
          setNewAddress(response.data[0].address)
      */

           console.log(response.data[0]);
    };
    fetchData();
  }, [customer_id]);

  const updateEmployee = (customer_id) => {
    axios.put("http://localhost:3001/updateEmployee", {name: newName,email:newEmail,address:newAddress,phone:newPhone,customer_id:customer_id}).then(
      (response) => {
        
        setEmployeeList(Dt.map((val) => {
          return val.customer_id === customer_id ? {customer_id: val.customer_id, name: val.name, email:val.email,address:val.address,phone:val.phone,
            name: newName, email:newEmail, address:newAddress, phone:newPhone} : val
          
        }))
     }
    )
    alert("Employee Edited successfully")  
  };

  
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  const[isAuth,setIsAuth]=useState(true);

  if(!isAuth){
    return <Redirect to="" />
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar} style={{backgroundColor: 'rgb(37, 37, 94)'}}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            <b>Sales Manager</b>
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>

         
          <IconButton color="inherit" fontSize="inherit">
           <AccountCircleIcon   onClick={handleClick}/>
  
          </IconButton>
          <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={()=>setIsAuth(false)}>Logout</MenuItem>
      </Menu>

        </Toolbar>
        
      </AppBar>
      <div style={styles.side}>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon} style={{backgroundColor: 'rgb(37, 37, 94)', color:'white'}}>
          <IconButton onClick={handleDrawerClose} style={{color:'white'}}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider/>
        <List style={{backgroundColor: 'rgb(37, 37, 94)', color:'white'}}>{mainListItems}</List>
        <Divider/>
        <List style={{backgroundColor: 'rgb(37, 37, 94)', color:'red'}} onClick={()=>setIsAuth(false)}>{Logout}</List>
        <Divider/>
      </Drawer>
      </div>
     
      <main style={{backgroundColor: '#f0f8ff'}} className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container  maxWidth="lg" className={classes.container}>
        
        <Grid  container spacing={10}>
        {/* Recent Orders */}
        <Grid item xs={11}  direction="row"  >
      
        <div >
           <Paper className={classes.paper}>
               
           <Typography component="h1" variant="h6" color="inherit" align="center" width="100%" noWrap className={classes.title}>
                  <strong> Update Customer Details </strong>
                </Typography><br/>

                <Form >
                
                <Form.Group as={Row} controlId="formHorizontalName">
                  <Form.Label column lg={2} >
                    Name :
                  </Form.Label>
                  <Col >
                    <Form.Control type="text"  defaultValue={newName}
       onChange={(event)=> {
         setNewName(event.target.value);
       }}  required />                     
                  </Col>
                </Form.Group><br/>

                

                <Form.Group as={Row} controlId="formHorizontalEmail">
                  <Form.Label column lg={2} >
                   Email :
                  </Form.Label>
                  <Col >
                    <Form.Control type="text" defaultValue={newEmail}  onChange={(event)=> {
         setNewEmail(event.target.value);
       }} required />                     
                  </Col>
                </Form.Group><br/>

                <Form.Group as={Row} controlId="formHorizontalAddress">
                  <Form.Label column lg={2} >
                   Address :
                  </Form.Label>
                  <Col >
                    <Form.Control type="text" defaultValue={newAddress}  onChange={(event)=> {
         setNewAddress(event.target.value);
       }} required />                   
                  </Col>
                </Form.Group><br/>

              

                <Form.Group as={Row} controlId="formHorizontalPhoneNo">
                  <Form.Label column lg={2} >
                   Phone No :
                  </Form.Label>
                  <Col >
                    <Form.Control type="text" defaultValue={newPhone}  onChange={(event)=> {
         setNewPhone(event.target.value);
       }} required />                   
                  </Col>
                </Form.Group><br/>
                <div align="center">
                 <Button  style={{fontSize:'20px',width:'200px'}} type="submit" onClick={() => {updateEmployee(Dt.customer_id)}} >Update</Button>
                 </div> 
               
         </Form>
                
  
    
          </Paper>
         </div>
        
        </Grid>

      </Grid>
        </Container>
      </main>
    </div>
  );
}

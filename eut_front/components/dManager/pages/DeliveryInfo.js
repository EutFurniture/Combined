import React, { useState, useEffect } from "react";
import clsx from 'clsx';
import axios from "axios";

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
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
import NotificationsIcon from '@material-ui/icons/Notifications';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import {useParams} from 'react-router-dom'
import { ListGroup,Alert } from "react-bootstrap";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {Redirect} from "react-router-dom";
import {Link} from 'react-router-dom';
import Axios from 'axios';
import {Button} from '@material-ui/core';

import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { mainListItems, Logo } from './listItems';
import Box from '@material-ui/core/Box';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Eut Furniture
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

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
    backgroundColor:'#f0f8ff'
  },
 
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    alignContent:'center',
    align:'center',
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
}));

const styles = {
  side:{
    backgroundColor:'rgb(37, 37, 94)',
  },

  card:{
    display:"flex",
    flexDirection :"row",
    justifyContent:"space-between",
  }
};

const dateOnly = (d) => {
  const date = new Date(d);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year} - ${month} - ${day}`;
};

toast.configure()

export default function DeliveryInfo() {
  const { order_id } = useParams();
  const [Dt, setDt] = useState([])

  const [paymentNotifyCount,setpaymentNotifyCount]=useState([])
  useEffect(()=>{
    Axios.get("http://localhost:3001/cashPaymentnotifyCount").then((response)=>{
      setpaymentNotifyCount(response.data)
      
    })
  },[])

  const paymentcount=paymentNotifyCount.map(record=>record.count);
  console.log(paymentcount);


  const [returnNotifyCount,setreturnNotifyCount]=useState([])
  useEffect(()=>{
    Axios.get("http://localhost:3001/returnnotifyCount").then((response)=>{
      setreturnNotifyCount(response.data)
      
    })
  },[])

  const returncount=returnNotifyCount.map(record=>record.r_count);
  console.log(returncount);

  const [orderNotifyCount,setorderNotifyCount]=useState([])
  useEffect(()=>{
    Axios.get("http://localhost:3001/ordernotifyCount").then((response)=>{
      setorderNotifyCount(response.data)
      
    })
  },[])

  const ordercount=orderNotifyCount.map(record=>record.o_count);
  console.log(ordercount);

  const [returnNotifymess,setreturnNotifymess]=useState([])
  useEffect(()=>{
    Axios.get("http://localhost:3001/returnnotifymess").then((response)=>{
      setreturnNotifymess(response.data)
      
    })
  },[])
  const returnmesscount=returnNotifymess.map(record=>record.r_count);

  const [paymentNotifymess,setpaymentNotifymess]=useState([])
  useEffect(()=>{
    Axios.get("http://localhost:3001/paymentnotifymess").then((response)=>{
      setpaymentNotifymess(response.data)
      
    })
  },[])
  const paymentmesscount=paymentNotifymess.map(record=>record.count);
 

  const [orderNotifymess,setorderNotifymess]=useState([])
  useEffect(()=>{
    Axios.get("http://localhost:3001/ordernotifymess").then((response)=>{
      setorderNotifymess(response.data)
      
    })
  },[])
  const ordermesscount=orderNotifymess.map(record=>record.o_count);


  const total = Number(paymentcount) + Number(returncount) + Number(ordercount)

  const NotificationClick = async () => {
     const response = await Axios.get('http://localhost:3001/cashpaymentnotifyDeactive', {
     });
    
     const responses = await Axios.get('http://localhost:3001/returnnotifyDeactive', {
    });

    const responsee = await Axios.get('http://localhost:3001/ordernotifyDeactive', {
    });

    if(paymentmesscount>0)
    {
      const customToast=()=>{
        return(
          <div style={{fontSize:'15px'}}>
            You have {paymentmesscount} New Payment Confirmations from Deliver Person! <br></br><br></br>
            <Button variant="contained" color="primary" onClick={Notification_page_payment}>View</Button>
          </div>
        )
      }

      const notify=()=>{
       
        toast.info(customToast,{position:toast.POSITION.TOP_RIGHT,autoClose:false})
          }
          notify();
          

    }

    

      if(returnmesscount>0)
      {
        const customToasts=()=>{
          return(
            <div style={{fontSize:'15px'}}>
              You have {returnmesscount} New Return Delivery Confirmations from Deliver Person! <br></br><br></br>
              <Button variant="contained" color="primary" onClick={Notification_page_return}>View</Button>
            </div>
          )
        }

        const notifye=()=>{
       
          toast.info(customToasts,{position:toast.POSITION.TOP_RIGHT,autoClose:false})
        
        
            }
        notifye();
      }

      if(ordermesscount>0)
      {
        const customToastse=()=>{
          return(
            <div style={{fontSize:'15px'}}>
              You have New {ordermesscount} Delivery Confirmations from Deliver Person! <br></br><br></br>
              <Button variant="contained" color="primary" onClick={Notification_page_order}>View</Button>
            </div>
          )
        }

        const notifyee=()=>{
       
          toast.info(customToastse,{position:toast.POSITION.TOP_RIGHT,autoClose:false})
        
        
            }
        notifyee();
      }


    
      
      const Notification_page_payment=()=>{
      window.location.href='/dManager/pages/Notification_payment'
      }
      
      const Notification_page_return=()=>{
        window.location.href='/dManager/pages/Notification_return'
        }

        const Notification_page_order=()=>{
          window.location.href='/dManager/pages/Notification_order'
          }
  }
 
 useEffect(() => {
  const fetchData = async () => {
      const response = await axios.get('http://localhost:3001/viewDeliveryDetails', {
          params: {
              order_id: order_id,
              
          }
          
      });

      setDt(response.data[0]);
         console.log(response.data[0]);

  };
  fetchData();
}, [order_id]);

  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

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
            <strong>DELIVERY MANAGER</strong>
          </Typography>

          <IconButton color="inherit">
            <Badge badgeContent={total} color="secondary">
              <NotificationsIcon onClick={NotificationClick}/>
            </Badge>
          </IconButton>

          <IconButton color="inherit" fontSize="inherit">
           <AccountCircleIcon onClick={handleClick}  />
          </IconButton>

          <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
            <MenuItem onClick={handleClose}><Link to='/dManager/pages/ManageProfile' style={{textDecoration:'none',color:'black'}}>Profile</Link></MenuItem>
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

        <Divider />
        <List style={{backgroundColor: 'rgb(37,37,94)', color:'white'}}>{Logo}</List>
        <Divider />
        <Divider />
        <List style={{backgroundColor: 'rgb(37,37,94)', color:'white'}}>{mainListItems}</List>
        <Divider />
        
      </Drawer>
      </div>
     
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
                  
           
            <Grid item xs={12}  direction="row"  >
            <div >
              <Paper className={classes.paper}>
              <Typography component="h1" variant="h6" color="inherit" align="center" width="100%" noWrap className={classes.title}>
                    <strong> DELIVERY  INFORMATION</strong>
              </Typography>
              <br></br>
              <div align="center" style={{fontSize:'15px'}}>
                
              <ListGroup style={{ width: '20rem',textAlign: 'left'}}>
                  <ListGroup.Item  active> Order Details</ListGroup.Item>
                  <ListGroup.Item >Order Id : {Dt.order_id} </ListGroup.Item>
                  <ListGroup.Item > Order Type : {Dt.order_type} </ListGroup.Item>
                  <ListGroup.Item >Order Date : {dateOnly(Dt.o_date)}</ListGroup.Item>
                  <ListGroup.Item >Last Date : {dateOnly(Dt.order_last_date)}</ListGroup.Item>

              </ListGroup>
              
              <br></br>
              <div style={styles.card} >
                
              <ListGroup style={{ width: '20rem',textAlign: 'left'}}>
                  <ListGroup.Item  active> Customer Details</ListGroup.Item>
                  <ListGroup.Item >Name : {Dt.fname} </ListGroup.Item>
                  <ListGroup.Item > Email : {Dt.email} </ListGroup.Item>
                  <ListGroup.Item >Phone Number  : {Dt.phone}</ListGroup.Item>
                  <ListGroup.Item >Address : {Dt.address}</ListGroup.Item>

              </ListGroup>
              
                
                <ListGroup style={{ width: '20rem',textAlign: 'left'}}>
                    <ListGroup.Item  active> Delivery Details</ListGroup.Item>
                    <ListGroup.Item >Deliver Id : {Dt.employee_id} </ListGroup.Item>
                    <ListGroup.Item > Delivery Date : {dateOnly(Dt.order_last_date)} </ListGroup.Item>
                    <ListGroup.Item >Delivery Status : {Dt.status}</ListGroup.Item>
                    <ListGroup.Item>{Dt.status === "Completed" ? <Alert size = "small" variant="success"></Alert > : Dt.status === "Returned" ? <Alert  variant="danger"></Alert > : Dt.status === "Pending" ? <Alert  variant="secondary"></Alert > : Dt.status === "R_Pending" ? <Alert  variant="secondary"></Alert > : <Alert variant="primary"></Alert > }</ListGroup.Item>
  
                </ListGroup>
                
                </div>
                </div>
              </Paper>
              </div>
            </Grid>
 
          </Grid>
          
          <Box pt={4}>
            <Copyright />
          </Box>

        </Container>
      </main>
    </div>
  );
}

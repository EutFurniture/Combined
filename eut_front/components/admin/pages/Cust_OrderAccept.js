import React,{useEffect,useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import clsx from 'clsx';
import ReactNotification from 'react-notifications-component'
import {store} from "react-notifications-component"
import "animate.css"
import "react-notifications-component/dist/theme.css"


import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {Redirect} from "react-router-dom"
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import {useParams} from 'react-router-dom'

import { mainListItems, Logout } from './listItems';
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

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
    fontSize:40,
    fontWeight:600,
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
    position:'relative',
    align:'center',
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    marginLeft:'200px',
    marginTop:'70px'
   
  },
  fixedHeight: {
    height: 240,
  },
  imageInput:{
    border:'none',
    borderColor:'white'
  }
  
}));

const styles = {
  side:{
    backgroundColor:'rgb(37,37,94)',
  },
 
  
};

toast.configure()

export default function Cust_OrderAccept() {

  const dateOnly = (d) => {
    const date = new Date(d);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year} - ${month} - ${day}`;
  };

  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [state,setState]=useState({file:'',product_img:'',message:'',success:false})
  const[name,setName]=useState("");
  const {cus_product_id} = useParams();
  const [Dt, setDt] = useState([])
  const [newdelivery_date, setNewDelivery] = useState();
  const [newadvanced_payment, setNewAdvanced] = useState();
  const [newtotal_payment, setNewTotal] = useState();

  useEffect(() => {
    const fetchData = async () => {
        const response = await axios.get('http://localhost:3001/ViewCusOrder', {
            params: {
               cus_product_id: cus_product_id,
                
            }
        });
  
        setDt(response.data[0]);
       
        
    };
    fetchData();
  }, [cus_product_id]);

  const [categoryList,setCategoryList]=useState([])
 useEffect(()=>{
   axios.get("http://localhost:3001/loadcusorder").then((response)=>{
     setCategoryList(response.data)
   })
 },[])

 
    
    
 
  
  const updateCustomized = (cus_product_id) => {
    axios.put("http://localhost:3001/InsertCustomized", {delivery_date: newdelivery_date,advanced_payment:newadvanced_payment,total_payment:newtotal_payment,cus_product_id: cus_product_id}).then(
      (response) => {
        
        setCategoryList(Dt.map((val) => {
          return val.cus_product_id === cus_product_id ? {cus_product_id: val.cus_product_id, delivery_date: val.delivery_date, advanced_payment: val.advanced_payment,total_payment:val.total_payment, delivery_date: newdelivery_date,advanced_payment:newadvanced_payment,total_payment:newtotal_payment} : val
          
        }))
     }
    )
   notify();
   
  
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

  const notify=()=>{
   
    toast.info('Your Accept message has been sent.',{position:toast.POSITION.TOP_RIGHT,autoClose:false})
  
      }
  


  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar} style={{backgroundColor: 'rgb(37,37,94)'}}>
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
            <strong>ADMIN</strong>
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
        <div className={classes.toolbarIcon} style={{backgroundColor: 'rgb(37,37,94)', color:'white'}}>
          <IconButton onClick={handleDrawerClose} style={{color:'white'}}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List style={{backgroundColor: 'rgb(37,37,94)', color:'white'}}>{mainListItems}</List>
        
        <Divider />
        <List style={{backgroundColor: 'rgb(37,37,94)', color:'red'}}>{Logout}</List>
        <Divider />
      </Drawer>
      </div>
      <main  className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={20} >
        
            
            

            {/* Recent Orders */}
            <Grid item xs={10} direction="row"  >
            
           
            <div >
              <Paper className={classes.paper}>
              <Typography component="h2" variant="h6" color="inherit"  align="center" width="100%" noWrap className={classes.title}>
              <strong>ORDER ACCEPTANCE</strong>
              
            </Typography><br/>
            <p style={{marginLeft:'30px',color:'red',fontSize:'18px'}}>Dear {Dt.name},<br/>Your Order has been accepted. You can continue your payment process.</p>
             
            <Form>
             
<Form.Group as={Row} controlId="formHorizontalName">
     <Form.Label column lg={3} >
      Delivery Date :
     </Form.Label>
     <Col >
       <Form.Control type="text" 
       onChange={(event)=> {
         setNewDelivery(event.target.value);
       }}
       ></Form.Control>
     </Col>
   </Form.Group><br/>

   <Form.Group as={Row} controlId="formHorizontalPrice">
     <Form.Label column lg={3} >
    Advanced Payment :
     </Form.Label>
     <Col >
       <Form.Control type="text"  onChange={(event)=> {
         setNewAdvanced(event.target.value);
       }}
     
       />
     </Col>
   </Form.Group><br/>

   <Form.Group as={Row} controlId="formHorizontalPrice">
     <Form.Label column lg={3} >
    Total Payment :
     </Form.Label>
     <Col >
       <Form.Control type="text"  onChange={(event)=> {
         setNewTotal(event.target.value);
       }}
     
       />
     </Col>
   </Form.Group><br/>
  
   
  <div align="center">
       <Button  type="submit"   style={{fontSize:'20px',width:'200px'}} onClick={() => {updateCustomized(Dt.cus_product_id)}} >Send</Button>
    
       </div><br/><br/>
       <div >
      
       </div>

</Form>
{/* <Home />  */}
            
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

// function Home(){
//     const handleOnClickDefault=()=>{
        
//   store.addNotification({
//     title:'New card added',
//     message:'Tom added the card',
//     type:'success',
//     container:"top-right",
//     insert:"top",
//     animationIn:["animated","fadeIn"],
//     animation:["animated","fadeOut"],
//     dismiss:{
//       duration:2000,
//       showIcon:true,
//     },
//     width:600
//   })
//     }
  
   
//     return(
//       <div>
//         <button onClick={handleOnClickDefault}>
//           default
//         </button>
        
//       </div>
//     )
  
//   }
  
//   function MyNotify(){
//     return(
//       <div className="bg-primary text-white">
//         <h1>New Card Added</h1>
//         <h4>Tom added the card</h4>
//       </div>
//     )
//   }

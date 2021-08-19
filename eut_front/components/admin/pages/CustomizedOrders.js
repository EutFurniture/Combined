import clsx from 'clsx';
import sofa from '../../../assets/sofa.jpg'
import React, { useState,useEffect } from 'react';
import '../css/popupmodel.css'
import {Link, useParams} from 'react-router-dom'
import axios from 'axios'
import "../css/manageEmployee.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Table} from 'react-bootstrap';
import ReactNotification from 'react-notifications-component'
import {store} from "react-notifications-component"
import "animate.css"
import "react-notifications-component/dist/theme.css"

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
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Grid from '@material-ui/core/Grid';
import {Button} from 'react-bootstrap';
import SearchIcon from '@material-ui/icons/Search';
import Box from '@material-ui/core/Box';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import NotificationImportantIcon from '@material-ui/icons/NotificationImportant';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { mainListItems, Logout } from './listItems';
import Popup from './Popup'
import Divider from '@material-ui/core/Divider';

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
    marginBottom:'1px'
  },
  userimage : {
    height: 60,
    width: 60,
    // borderRadius:100,
    borderColor:'white',
    display:'none'
   

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
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    marginTop:'20px',
  },
  paper: {
    padding: theme.spacing(1),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 'auto',
  },
  viewbutton:{
      backgroundColor:'#00ced1',
      height:'40px',
      color:'#ffffff',
      width:'120px',
      borderRadius:'5px',
      marginRight:'5px',
      marginLeft:'1050px',
      textDecoration:'none',
      textAlign:'center',
      paddingTop:'5px'
     
     
  },
  custom:{
      display:'flex',
      
     
  },
  orderbox:{
    display:'flex',
    height:'auto',
    backgroundColor:'rgb(63, 111, 199)',
    marginTop:'10px',
  },
  searchItem:{
    backgroundColor:'blue',
    height:'30px',
    width:'500px',
    marginLeft:'15px'
  },
  searchicon:{
    marginLeft:'50px'
  },
 formbox:{
   marginLeft:'20px',
   fontSize:'15px'
 },
 accept:{
   marginLeft:'200px',
   backgroundColor:'#32cd32',
   padding:'10px 30px 10px 30px',
   border:'none',
   borderRadius:'5px',
   color:'white',
   fontSize:'18px',
   textDecoration:'none'
 },
 reject:{
  marginLeft:'20px',
  backgroundColor:'#ff0000',
  padding:'10px 30px 10px 30px',
  border:'none',
  borderRadius:'5px',
  color:'white',
  fontSize:'18px',
  textDecoration:'none'

},
furimg:{
  width:'150px',
  height:'100px'
},
addbtn:{
  width:'100px',
  height:'40px',
  backgroundColor:'blue',
  border:'none',
  borderRadius:'5px',
  marginTop:'20px',
  color:'white',
  fontSize:'18px',
  marginLeft:'250px'
},
categoryInput:{
  border:'1px',
  borderColor:'black'
},
cusbutton:{
  marginLeft:'20px',
  width:'100px',
  marginTop:'10px',
  border:'none',
  borderRadius:'10px',
  backgroundColor:'blue',
  color:'white'
}


}));

const styles = {
  side:{
    backgroundColor:'rgb(37, 37, 94)',
  }
};



export default function CustomizedOrders() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const [searchTerm,setSearchTerm]=useState("");
  const [isOpen, setIsOpen] = useState(false);

  const [cus_orderList,setCus_OrderList]=useState([])
 useEffect(()=>{
   axios.get("http://localhost:3001/Customized").then((response)=>{
    setCus_OrderList(response.data)
   })
 },[])

 const [orderview,setOrderView]=useState([])
const {cus_product_id}=useParams();
  
 const viewOrder = async (cus_product_id) => {
     const response = await axios.get('http://localhost:3001/ViewCusOrder', {
         params: {
             cus_product_id:cus_product_id,  
         }
         
     });

     setOrderView(response.data);
        console.log(response.data[0]);

 }

 const deleteOrder = async (cus_product_id) => {
   await axios.put('http://localhost:3001/DeleteCustomizedOrder', {
      params: {
          cus_product_id:cus_product_id,  
      }
      
  });

}


const statusUpdate = async (cus_product_id) => {
  const response = await axios.get('http://localhost:3001/OrderStatus', {
      params: {
          cus_product_id:cus_product_id,  
      }
      
  });
alert("Order Removed from list");
}

const [newdelivery_date,setDate] = useState(0);
const [newtotal_payment,setTotal] = useState(0);
const [newadvanced_payment,setAdvanced] = useState(0);
const {customer_id}=useParams();
const [Dt, setDt] = useState([])


//   const orderData = async (customer_id) => {
//     console.log(customer_id)
//       const response = await axios.get('http://localhost:3001/updateCustomized', {
//           params: {
//             customer_id: customer_id,
              
//           }
//       });

//       setDt(response.data[0]);
      
//   };
  

// const [categoryList,setCategoryList]=useState([])
// useEffect(()=>{
//   axios.get("http://localhost:3001/loadcusorder").then((response)=>{
//     setCategoryList(response.data)
//   })
// },[])

// const InsertOrder = (customer_id) => {
//   axios.put("http://localhost:3001/InsertCustomized", {delivery_date: newdelivery_date,total_payment:newtotal_payment,advanced_payment:newadvanced_payment,customer_id: customer_id}).then(
//     (response) => {
      
//       setCategoryList(Dt.map((val) => {
//         return val.customer_id === customer_id ? {customer_id: val.customer_id, delivery_date: val.delivery_date,total_payment: val.total_payment,advanced_payment:val.advanced_payment,  delivery_date: newdelivery_date,total_payment:newtotal_payment,advanced_payment:newadvanced_payment} : val
        
//       }))
//    }
//   )
//   alert("Category Edited successfully")  
// };

// const addCustomizedOrder =  async (customer_id)=>{

//   await axios.post('http://localhost:3001/AddCustomizedOrder',{
//     params: {
//       customer_id:customer_id,  
//   },
//      delivery_date:delivery_date,
//      total_payment:total_payment,
//      advanced_payment:advanced_payment,
     

//     }).then(()=>{
//      alert('Category added successfully')
//      window.location.href='/admin/pages/CustomizedOrders'
//      });
// };

//  const deleteOrder =(cus_product_id)=>{
//   axios.delete("http://localhost:3001/DeleteCustomizedOrder");
// }

  const [reject, setReject] = useState(false);

  const toggleReject = () => {
    setReject(!reject);
  };

  if(reject) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

  const [accept, setAccept] = useState(false);

  const toggleAccept = (customer_id) => {
    setAccept(!accept);
  };

  if(accept) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
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
            <b>ADMIN</b>
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton color="inherit" fontSize="inherit">
           <AccountCircleIcon   />
  
          </IconButton>
          
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
        <List style={{backgroundColor: 'rgb(37, 37, 94)', color:'red'}}>{Logout}</List>
        <Divider/>
      </Drawer>
      </div>
      
      <main style={{backgroundColor: '#f0f8ff'}} className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
        
        <Grid container spacing={1}>
        {/* Recent Orders */}
        <Grid item xs={12}  direction="row"  >
        
        <div >
        
           <Paper  className={classes.paper}>
           <Typography component="h1" variant="h6" color="inherit" align="center" width="100%" noWrap className={classes.title}>
                  <strong>  CUSTOMIZED ORDERS </strong>
                
                </Typography>
                <Button  className={classes.viewbutton} href='\admin\pages\ViewCustomizedOrder'> View</Button>
              
              
               
               <Paper className={classes.orderbox}>
                  <div className={classes.orderboxleft} style={{ width: '50%' }}>
                  <Box display="flex" flexDirection="row" p={0} m={1} bgcolor="background.paper" style={{ height: '40px',marginTop:'20px' }}>
                     <Box p={0} style={{ fontSize:'25px',marginLeft:'100px' }}><h2 ><b>REQUESTED ORDERS</b> </h2></Box>
                   </Box>
                   
                   <Box display="flex" flexDirection="row" p={0} m={1} bgcolor="background.paper" style={{ height: '40px' }} >
                     <Box p={1} ><input type="text"  placeholder="Search" onChange={(e)=>{setSearchTerm(e.target.value);}} style={{border:'none'}} /> </Box>
                     <Box p={1} style={{ marginLeft: '380px' }}><SearchIcon/> </Box>
                   </Box>
                   <Table striped bordered hover responsive style={{width:'590px',marginLeft:'10px',backgroundColor:'white'}}>
        <thead className="tableheading">
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Product Name</th>
            <th align="center">Action</th>
            
          </tr>
        </thead>
       <tbody className="tablebody">
                   {cus_orderList.map((record)=>{
                       return(
                        <tr align='center'>
                        <th scope="row">{record.customer_id}</th>
                        <td>{record.product_name}</td>
                       
                        <td align="center">
                          
                          <Link onClick={()=>{viewOrder(record.cus_product_id)}} className="viewbtn" > View </Link>
                         <Link onClick={()=>{deleteOrder(record.cus_product_id)}} 
                         style={{marginLeft:'20px'}} className="deletebtn" onClick={()=>{statusUpdate(record.cus_product_id)}}>Remove</Link>
                        
                            
                        </td>
                      </tr>
                       )
                       })}
                  
                  </tbody> 
      </Table>
                  
      
     
     
                  </div> 
                  <div className={classes.orderboxright}>
                  {orderview.map((record)=>{
                       return(
                      <Box  bgcolor="background.paper" style={{ height: 'auto',borderRadius:'10px',width:'600px',marginTop:'15px' }}>
                      <h1 align='center'><b>ORDER DETAILS</b></h1><br/>
                     <Box display='flex' marginLeft='20px'>
                  
                        <div className={classes.formbox}>
                         
                        
                           
                           <p><b>Customer Name:</b> {record.name}</p>
                           <p><b>Customer ID:</b>{record.customer_id}</p>
                           <p><b>Product Name:</b>{record.product_name}</p>
                           <p><b>Product Design:</b></p>
                           <img src={record.design} className={classes.furimg}/>
                           <p><b>Description:</b> {record.description}</p>
                           <p><b>Measurement:</b> {record.measurement}</p>
                           <p><b>Material:</b> {record.material}</p>
                           <p><b>Color:</b> {record.color}</p>
                           </div>
                      
                          </Box>
                          <div display='flex'>
                            
                          <Link to={location=> `/Customize/${record.cus_product_id}`}  className={classes.accept}  >Accept</Link>
                          <Link className={classes.reject} onClick={toggleReject}>Reject</Link>
                          </div>
                           <br/>
                      </Box>
                        )
                      })}
                      <br/>
                  </div> 
                
                </Paper>
          </Paper>
          
          </div>
         
        </Grid>
       
      </Grid>
      
        </Container>

      </main>
     

{reject && (
        <div className="reject">
          <div onClick={toggleReject} className="overlay"></div>
          <div className="modal-content">
            <h6>Sorry, Your Order has been rejected.We couldn't make item which you are orderd.</h6>
            <button type="submit" size='md' className={classes.addbtn} > Send</button>
            <button align='center' className="close-modal" onClick={toggleReject}>
             <HighlightOffIcon/>
            </button>
          </div>
        </div>
      )}
     
    </div>
    
  );
}

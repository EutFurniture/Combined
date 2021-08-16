import clsx from 'clsx';
import sofa from '../../../assets/sofa.jpg'
import React, { useState } from 'react';
import '../css/popupmodel.css'
import {Link} from 'react-router-dom'

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
   width:'120px',
   height:'40px',
   border:'none',
   borderRadius:'5px',
   color:'white',
   fontSize:'18px'
 },
 reject:{
  marginLeft:'20px',
  backgroundColor:'#ff0000',
  width:'120px',
  height:'40px',
  border:'none',
  borderRadius:'5px',
  color:'white',
  fontSize:'18px'

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

  const [isOpen, setIsOpen] = useState(false);

  

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

  const toggleAccept = () => {
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
                <Button  className={classes.viewbutton} href='\admin\pages\ViewCustomizedOrder'> View</Button><br/>
              
              
               
               <Paper className={classes.orderbox}>
                  <div className={classes.orderboxleft} style={{ width: '45%' }}>
                  <Box display="flex" flexDirection="row" p={0} m={1} bgcolor="background.paper" style={{ height: '40px',marginTop:'20px' }}>
                     <Box p={0} style={{ fontSize:'25px',marginLeft:'100px' }}><b>Requested Order Lists </b></Box>
                   </Box>
                   <Box display="flex" flexDirection="row" p={0} m={1} bgcolor="background.paper" style={{ height: '40px' }}>
                     <Box p={1} >Search here </Box>
                     <Box p={1} style={{ marginLeft: '380px' }}><SearchIcon/> </Box>
                   </Box>
                   <Box display="flex" flexDirection="row" p={0} m={1} bgcolor="background.paper" style={{ height: '40px',borderRadius:'10px' }}>
                     <Box style={{ marginLeft: '20px' }} p={1} p={1} >ID: 2 </Box>
                     <Box style={{ marginLeft: '50px' }} p={1} >Productname: Sofa </Box>
                     <Box p={1} style={{ marginLeft: '210px' }}>< NotificationImportantIcon/> </Box>
                   </Box>
                   <Box display="flex" flexDirection="row" p={0} m={1} bgcolor="background.paper" style={{ height: '40px',borderRadius:'10px' }}>
                     <Box style={{ marginLeft: '20px' }} p={1} p={1} >ID: 5 </Box>
                     <Box style={{ marginLeft: '50px' }} p={1} >Productname: Table </Box>
                     <Box p={1} style={{ marginLeft: '205px' }}>< NotificationImportantIcon/> </Box>
                   </Box>
                   <Box display="flex" flexDirection="row" p={0} m={1} bgcolor="background.paper" style={{ height: '40px',borderRadius:'10px' }}>
                     <Box style={{ marginLeft: '20px' }} p={1} p={1} >ID: 7 </Box>
                     <Box style={{ marginLeft: '50px' }} p={1} >Productname: Cupboard </Box>
                     <Box p={1} style={{ marginLeft: '175px' }}>< NotificationImportantIcon/> </Box>
                   </Box>
                   <Box display="flex" flexDirection="row" p={0} m={1} bgcolor="background.paper" style={{ height: '40px',borderRadius:'10px' }}>
                     <Box style={{ marginLeft: '20px' }} p={1} p={1} >ID: 12 </Box>
                     <Box style={{ marginLeft: '40px' }} p={1} >Productname: Dining </Box>
                     <Box p={1} style={{ marginLeft: '200px' }}>< NotificationImportantIcon/> </Box>
                   </Box>
                   <Box display="flex" flexDirection="row" p={0} m={1} bgcolor="background.paper" style={{ height: '40px',borderRadius:'10px' }}>
                     <Box style={{ marginLeft: '20px' }} p={1} p={1} >ID: 17 </Box>
                     <Box style={{ marginLeft: '40px' }} p={1} >Productname: Track </Box>
                     <Box p={1} style={{ marginLeft: '205px' }}><CheckIcon/> </Box>
                   </Box>
                   <Box display="flex" flexDirection="row" p={0} m={1} bgcolor="background.paper" style={{ height: '40px',borderRadius:'10px' }}>
                     <Box style={{ marginLeft: '20px' }} p={1} p={1} >ID: 11 </Box>
                     <Box style={{ marginLeft: '40px' }} p={1} >Productname: Bookshelf </Box>
                     <Box p={1} style={{ marginLeft: '180px' }}><CheckIcon/> </Box>
                   </Box>
                   <Box display="flex" flexDirection="row" p={0} m={1} bgcolor="background.paper" style={{ height: '40px',borderRadius:'10px' }}>
                     <Box style={{ marginLeft: '20px' }} p={1} p={1} >ID: 15 </Box>
                     <Box style={{ marginLeft: '40px' }} p={1} >Productname: Chair</Box>
                     <Box p={1} style={{ marginLeft: '205px' }}><CloseIcon/> </Box>
                   </Box>
      
     
     
                  </div> 
                  <div className={classes.orderboxright}>
                  
                      <Box  bgcolor="background.paper" style={{ height: 'auto',borderRadius:'10px',width:'650px',marginTop:'15px' }}>
                      <h1 align='center'>Order Details</h1>
                     <Box display='flex' marginLeft='20px'>
                        <div className={classes.formbox}>
                         
                           {/* <p><br/></p> */}
                           
                           <p><b>Customer Name:</b> Suviththa Yoganathan</p>
                           <p><b>Customer ID:</b> 2</p>
                           <p><b>Product Name:</b> Sofa</p>
                           <p><b>Product Design:</b> </p>
                           <img src={sofa} className={classes.furimg}/>
                           <p><b>Description:</b> Make a bold and appealing statement to  living space with this 3-seater fabric sofa</p>
                           <p><b>Measurement:</b> 82.75" W x 33.25" D x 35.25" H</p>
                           <p><b>Material:</b> Fabric</p>
                           <p><b>Color:</b> Blue</p>
                           </div>
                           
                          </Box>
                          <div display='flex'>
                            
                          <Button className={classes.accept} onClick={toggleAccept}>Accept</Button>
                          <Button className={classes.reject} onClick={toggleReject}>Reject</Button>
                          </div>
                           <br/>
                      </Box>
                      <br/>
                  </div> 
                
                </Paper>
          </Paper>
          
          </div>
         
        </Grid>
       
      </Grid>
      
        </Container>

      </main>
      {accept && (
        <div className="reject">
        <div onClick={toggleAccept} className="overlay"></div>
        <div className="modal-content">
        <h6>Your Order has been accepted.<br/>You can see payment and delivery date details below.</h6>
            <label>Delivery Date</label>
            <input type="Date"  className='categoryInput' required /><br/>
            <label>Advanced Payment</label>
            <input type="text" className='categoryInput' required /><br/>
            <label>Total Payment</label>
            <input type="text" className='categoryInput' required /><br/>
          <button type="submit" size='md' className={classes.addbtn} > Send</button>
          <button align='center' className="close-modal" onClick={toggleAccept}>
           <HighlightOffIcon/>
          </button>
        </div>
      </div>
      
      )}

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

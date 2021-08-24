
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import clsx from 'clsx';
import React, { useState, useEffect } from "react";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
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
import { useParams } from 'react-router-dom';
import { DpListItems, Logout } from './dplistItems';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';

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


const drawerWproduct_idth = 240;

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
    transition: theme.transitions.create(['wproduct_idth', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWproduct_idth,
    wproduct_idth: `calc(100% - ${drawerWproduct_idth}px)`,
    transition: theme.transitions.create(['wproduct_idth', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHproduct_idden: {
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
    wproduct_idth: drawerWproduct_idth,
    transition: theme.transitions.create('wproduct_idth', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hproduct_idden',
    transition: theme.transitions.create('wproduct_idth', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    wproduct_idth: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      wproduct_idth: theme.spacing(9),
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
  sproduct_ide:{
    backgroundColor:'rgb(37,37,94)',
  },
 
  
};



export default function UpdateCashOnDeliveryBill() {


  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const {payment_id} = useParams();
  const [state,setState]=useState({file:'',pBill_image:'',message:'',success:false})
  const [newActive,setNewActive]=useState();
  const [newPBill_image,setNewPBill_image]=useState();
  const [Dt, setDt] = useState([])
  const [ReturnList, setReturnList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
        const response = await axios.get('http://localhost:3001/ConfirmCashonFetch', {
            params: {
               payment_id: payment_id,
                
            }
        });
  
        setDt(response.data[0]);
        
       
        console.log(response.data[0]);
    };
    fetchData();
  }, [payment_id]);

    
  const UpdateCashOnDeliveryBill = (payment_id) => {
      if(state.file)
      {
        let formData=new FormData();
        formData.append('file',state.file) 
        axios.post('http://localhost:3001/imageUpload',formData,{
            'content-Type':'multipart/form-data',
          })
    
          axios.put(`http://localhost:3001/confirmcashondelivery/${payment_id}`, { active:newActive, pBill_image:state.file.name, payment_id:payment_id}).then(
            (response) => {
              setReturnList(Dt.map((record) => {
                return record.id === payment_id ? {payment_id: record.payment_id, active:record.active, pBill_image:record.pBill_image, active:newActive, pBill_image:newPBill_image} : record
                
              }))
           }
          )
          alert("Payment is Confirmed")  
        }
        
    };

    const handleInput =(e) =>{
      let reader =new FileReader();
      let file=e.target.files[0]
      reader.onloadend =() =>{
        setState({
          ...state,
          file:file,
          pBill_image:reader.result,
          message:""
        })
       
      }
      reader.readAsDataURL(file);
    }

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
            <strong>DELIVERY PERSON</strong>
          </Typography>

          <IconButton color="inherit" fontSize="inherit">
           <AccountCircleIcon   onClick={handleClick}/>
  
          </IconButton>
          <Menu
        product_id="simple-menu"
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
      <div style={styles.sproduct_ide}>
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
        <List style={{backgroundColor: 'rgb(37,37,94)', color:'white'}}>{DpListItems}</List>
        
        <Divider />
        <List style={{backgroundColor: 'rgb(37,37,94)', color:'red'}}>{Logout}</List>
        <Divider />
      </Drawer>
      </div>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWproduct_idth="lg" className={classes.container}>
          <Grid container spacing={18}>
        
            
            

            {/* Recent Orders */}
            <Grid item xs={11} direction="row"  >
            
  
            <div >
              <Paper className={classes.paper}>
              <Typography component="h1" variant="h6" color="inherit"  align="center" width="100%" noWrap className={classes.title}>
              <strong>CONFIRM PAYMENT DETAILS</strong>
            </Typography><br/>
            <Form >
            <Form.Group as={Row} controlId="formHorizontalName">
     <Form.Label column lg={2} >
     Order Id :
     </Form.Label>
     <Col >
     <Form.Label column lg={2} >
        {Dt.order_id}
     </Form.Label>
      </Col>
   </Form.Group><br/>
  
   <Form.Group as={Row} controlproduct_id="formHorizontalQuantity">
     <Form.Label column lg={2} >
     Active :
     </Form.Label>
     <Col >
       <Form.Control type="text" defaultValue={newActive}
       onChange={(event)=> {
         setNewActive(event.target.value);
       }}
       />
     </Col>
   </Form.Group><br/>
  
   

   <Form.Group as={Row} controlId="formHorizontalFile" className="mb-3">
     <Form.Label column lg={2}>
      Bill Image :</Form.Label>
     <Col >
     <Form.Control type="file"  defaultValue={newPBill_image} className={classes.imageInput}
      onChange={handleInput}
     />                  
     </Col>
     </Form.Group>  
    
     {state.message && <h6 className={classes.mess}>{state.message}</h6>}            
     <div style={{marginLeft:'227px'}}>
   {state.pBill_image && (<img src={state.pBill_image}  width="20%" height="20%"  alt="preview" />)}
   </div><br/>

   
       <div align="center">
       <Button  style={{fontSize:'20px',width:'200px'}} type="submit" onClick={() => {UpdateCashOnDeliveryBill(Dt.payment_id)}} >Update</Button>
       </div>
      

</Form>
                
            
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
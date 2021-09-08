import React, { useState,useEffect } from "react";
import clsx from 'clsx';
import axios from "axios";
import { Link} from "react-router-dom";
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
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { DpListItems, Logout } from './dplistItems';

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


const dateOnly = (d) => {
    const date = new Date(d);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year} - ${month} - ${day}`;
  };



export default function UpdateReturnDetail() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
 
  
 const {order_id} = useParams();
 const [Dt, setDt] = useState([])
 const [newProduct_id,setNewProduct_id]=useState(0);
 const [newReturn_date, setNewReturn_date] = useState(0);
 const [newReason,setNewReason]=useState(0);
 

  const [ReturnList, setReturnList] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
        const response = await axios.get('http://localhost:3001/ReturnItemview', {
            params: {
               order_id: order_id,
                
            }
        });
  
        setDt(response.data[0]);
        console.log(response.data[0]);
    };
    fetchData();
  }, [order_id]);

  const UpdateReturnDetail = (order_id) => {
    axios.put(`http://localhost:3001/UpdateReturn/${order_id}`, {product_id:newProduct_id, return_date:newReturn_date,reason:newReason ,order_id:order_id}).then(
      (response) => {
        setReturnList(Dt.map((record) => {
          return record.id === order_id ? {order_id: record.order_id, product_id:record.product_id,  return_date: record.return_date,reason:record.reason, 
            product_id:newProduct_id,  return_date:newReturn_date, reason: newReason} : record
          
        }))
     }
    )
    alert("Return Item Edited successfully")  
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
        <List style={{backgroundColor: 'rgb(37,37,94)', color:'white'}}>{Logout}</List>
        <Divider />
      </Drawer>
      </div>  
     
      <main style={{backgroundColor: '#f0f8ff'}} className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container  maxWidth="lg" className={classes.container}>
        
        <Grid  container spacing={10}>
      
        <Grid item xs={11}  direction="row"  >
      
        <div >
           <Paper className={classes.paper}>
               
           <Typography component="h1" variant="h6" color="inherit" align="center" width="100%" noWrap className={classes.title}>
                  <strong> UPDATE RETURN ITEMS DETAILS </strong>
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

              <Form.Group as={Row} controlId="formHorizontalReturnDate">
                  <Form.Label column lg={2} >
                   Product ID :
                  </Form.Label>
                  <Col >
                    <Form.Control type="text" defaultValue={(Dt.product_id)}  onChange={(event)=> {
         setNewProduct_id(event.target.value);
        }} required />                      
                  </Col>
                </Form.Group><br/>

                <Form.Group as={Row} controlId="formHorizontalReturnDate">
                  <Form.Label column lg={2} >
                   Return Date :
                  </Form.Label>
                  <Col >
                    <Form.Control type="date" defaultValue={dateOnly(Dt.return_date)}  onChange={(event)=> {
        setNewReturn_date(event.target.value);
       }} required />                      
                  </Col>
                </Form.Group><br/>
                
                 <Form.Group as={Row} controlId="formHorizontalReason">
                  <Form.Label column lg={2} >
                   Reason :
                  </Form.Label>
                  <Col >
                    <Form.Control type="text" defaultValue={Dt.reason}  onChange={(event)=> {
         setNewReason(event.target.value);
       }} required />                   
                  </Col>
                </Form.Group><br/>



              
                <div align="center">
                 <Button  style={{fontSize:'20px',width:'200px'}} type="submit" onClick={() => {UpdateReturnDetail(Dt.order_id)}} >Update</Button>
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
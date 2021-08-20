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
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {Redirect} from "react-router-dom";
import {Link} from 'react-router-dom';

import { mainListItems, Logout, Profile } from './listItems';
import { Form, Row, Col, Button } from "react-bootstrap";


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
    }
  };


export default function UpdateDelivery() {

    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const {order_id} = useParams();
    const [Dt, setDt] = useState([])
    const [newStatus, setNewStatus] = useState();
    const [newDeliver_id, setNewDeliver_id] = useState();
  
    const [typeList,setTypeList]=useState([])
    useEffect(()=>{
      axios.get('http://localhost:3001/orderstatus').then((response)=>{
        setTypeList(response.data)
      })
    }, [])

    const [deliverList,setdeliverList]=useState([])
    useEffect(()=>{
      axios.get('http://localhost:3001/deliverid').then((response)=>{
        setdeliverList(response.data)
      })
    }, [])
  
    useEffect(() => {
      const fetchData = async () => {
          const response = await axios.get('http://localhost:3001/viewDeliveryDetails', {
              params: {
                 order_id: order_id,
              }
          });
          setDt(response.data[0]);
          setNewStatus(response.data[0].o_status)
          setNewDeliver_id(response.data[0].employee_id)
             console.log(response.data[0]);
      };
      fetchData();
    }, [order_id]);
  
    const [DeliveryList,setDeliveryList]=useState([])
    useEffect(()=>{
    axios.get("http://localhost:3001/delivery").then((response)=>{
    setDeliveryList(response.data)
    })
    },[])
    
    const updateDeliveryStatus = (order_id) => {
      axios.put("http://localhost:3001/updateDeliveryStatus", {status: newStatus,Deliver_id:newDeliver_id,order_id: order_id}).then(
        (response) => {
          setDeliveryList(Dt.map((val) => {
            return val.order_id === order_id ? {order_id: val.order_id, status: val.o_status, Deliver_id: val.employee_id,  status: newStatus,Deliver_id:newDeliver_id} : val  
          }))
       }
      )
      alert("Updated successfully")  
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
            <strong>DELIVERY MANAGER</strong>
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
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
        <List style={{backgroundColor: 'rgb(37,37,94)', color:'white'}}>{mainListItems}</List>
        <Divider />
        <List style={{backgroundColor: 'rgb(37,37,94)', color:'white'}}>{Profile}</List>
        <Divider />
        <Divider />
        <List style={{backgroundColor: 'rgb(37,37,94)', color:'white'}}>{Logout}</List>
        <Divider />
      </Drawer>
      </div>
     
      <main style={{backgroundColor: '#f0f8ff'}} className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container  maxWidth="lg" className={classes.container}>
        
        <Grid  container spacing={3}>
        {/* Recent Orders */}
        <Grid item xs={12}  direction="row"  >
            <div >
              <Paper className={classes.paper}>
              <Typography component="h1" variant="h6" color="inherit"  align="center" width="100%" noWrap className={classes.title}>
              <strong>UPDATE DELIVERY</strong>
              </Typography><br/>

             
            <Form>   
            <Form.Group as={Row} controlId="formHorizontalPrice">
                  <Form.Label column lg={2} >
                   Order Id :
                  </Form.Label>
                  <Col >
                  <Form.Label column lg={2} >
                   {Dt.order_id}
                  </Form.Label>
                  </Col>
              </Form.Group><br/>

            <Form.Group as={Row} controlId="formHorizontalPrice">
                  <Form.Label column lg={2} >
                  Deliver Id :
                  </Form.Label>
                  <Col >
                  <Form.Control as="Select" name="id" onChange={(event) =>{setNewDeliver_id(event.target.value);}} required>
                    <option>{newDeliver_id}</option>
                    {deliverList.map((record) => {return(
                      <option value={record.employee_id} > {record.employee_id}-{record.e_name}</option>
                    )})}
                    <option>0</option>
                  </Form.Control>
                  </Col>
              </Form.Group><br/>

              <Form.Group as={Row} controlId="formHorizontalName">
                  <Form.Label column lg={2} >
                  Delivery Status :
                  </Form.Label>
                  <Col >
                
                  <Form.Control as="Select" name="Status" onChange={(event) =>{setNewStatus(event.target.value);}} required>
                    <option>{newStatus}</option>
                    <option>Returned</option>
                    <option>Completed</option>
                    <option>Ready to deliver</option>
                    <option>R_Pending</option>
                    <option>Pending</option>
                  </Form.Control>
                  </Col>
              </Form.Group><br/>
    
              <div align="center">
              <Button  type="submit"   style={{fontSize:'20px',width:'200px'}} onClick={() => {updateDeliveryStatus(Dt.order_id)}} >Update</Button>
              </div><br/><br/>
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

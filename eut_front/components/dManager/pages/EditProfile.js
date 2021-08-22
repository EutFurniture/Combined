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
import { mainListItems, Logout, Profile } from './listItems';
import { Form, Row, Col, Button } from "react-bootstrap";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {Redirect} from "react-router-dom";
import {Link} from 'react-router-dom';

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


export default function EditProfile() {

    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const {employee_id} = useParams();
    const [Dt, setDt] = useState([])
    const [newName, setNewName] = useState();
    const [newEmail, setNewEmail] = useState();
    const [newPhone, setNewPhone] = useState();
    const [newAddress, setNewAddress] = useState();

    
  
    useEffect(() => {
      const fetchData = async () => {
          const response = await axios.get('http://localhost:3001/viewDeliveryManager', {
              params: {
                 employee_id: employee_id,
              }
          });
          setDt(response.data[0]);
          setNewName(response.data[0].e_name)
          setNewEmail(response.data[0].e_email)
          setNewPhone(response.data[0].e_phone)
          setNewAddress(response.data[0].e_address)
             console.log(response.data[0]);
      };
      fetchData();
    }, [employee_id]);
  
    const [DeliverList,setDeliverList]=useState([])
    useEffect(()=>{
    axios.get("http://localhost:3001/delivers").then((response)=>{
    setDeliverList(response.data)
    })
    },[])
    
    const editDeliver = (employee_id) => {
      axios.put("http://localhost:3001/UpdateDelivers", {
          name: newName,
          email: newEmail,
          phone:newPhone,
          address:newAddress,
          employee_id: employee_id}).then(
        (response) => {
          console.log(response.e_name)
          
          setDeliverList(Dt.map((val) => {
            return val.employee_id === employee_id ? {employee_id: val.employee_id, name: val.e_name,email: val.e_email, phone: val.e_phone, address: val.e_address
                } : val  
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
              <strong>UPDATE PROFILE</strong>
              </Typography><br/>

            
            <Form>           
              <Form.Group as={Row} controlId="formHorizontalName">
                  <Form.Label column lg={2} >
                   Employee Id :
                  </Form.Label>
                  <Col >
                  <Form.Label column lg={2} >
                   {Dt.employee_id}
                  </Form.Label>
                  </Col>
              </Form.Group><br/>

              <Form.Group as={Row} controlId="formHorizontalPrice">
                  <Form.Label column lg={2} >
                   Name :
                  </Form.Label>
                  <Col >
                  <Form.Control type="text"  defaultValue={newName}  onChange={(event)=> {
                      setNewName(event.target.value);
                  }} required
                  />
                  </Col>
              </Form.Group><br/>

              <Form.Group as={Row} controlId="formHorizontalPrice">
                  <Form.Label column lg={2} >
                   Email :
                  </Form.Label>
                  <Col >
                  <Form.Control type="email" defaultValue={newEmail}  onChange={(event)=> {
                      setNewEmail(event.target.value);
                  }} required
                  />
                  </Col>
              </Form.Group><br/>

              <Form.Group as={Row} controlId="formHorizontalName">
                  <Form.Label column lg={2} >
                   NIC :
                  </Form.Label>
                  <Col >
                  <Form.Label column lg={2} >
                   {Dt.e_nic}
                  </Form.Label>
                  </Col>
              </Form.Group><br/>

              <Form.Group as={Row} controlId="formHorizontalPrice">
                  <Form.Label column lg={2} >
                   Phone :
                  </Form.Label>
                  <Col >
                  <Form.Control type="text" defaultValue={newPhone}  onChange={(event)=> {
                      setNewPhone(event.target.value);
                  }} required
                  />
                  </Col>
              </Form.Group><br/>

              <Form.Group as={Row} controlId="formHorizontalPrice">
                  <Form.Label column lg={2} >
                   Address :
                  </Form.Label>
                  <Col >
                  <Form.Control type="text" defaultValue={newAddress}  onChange={(event)=> {
                      setNewAddress(event.target.value);
                  }} required
                  />
                  </Col>
              </Form.Group><br/>
    
              <div align="center">
              <Button  type="submit"   style={{fontSize:'20px',width:'200px'}} onClick={() => {editDeliver(Dt.employee_id)}} >Update</Button>
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

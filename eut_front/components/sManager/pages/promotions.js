import React ,{Fragment}from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Axios from 'axios';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import clsx from 'clsx';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import Drawer from '@material-ui/core/Drawer';

import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import axios from 'axios';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';

import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';





import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';

import { FormGroup, Label, Input, FormText } from 'reactstrap';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';


import { mainListItems, Logout } from './listItems';
import Chart from './Chart';
import Deposits from './Deposits';




//import { mainListItems, Logout } from './listItems';



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
    paddingTop: theme.spacing(-2),
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
    height: 240,
  },
 
  
}));

const styles = {
  side:{
    backgroundColor:'rgb(37,37,94)',
  }
  
  
};



export default function Dashboard() {

  
  
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
  const[isAuth,setIsAuth]=React.useState(true);

  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [state,setState]=useState({file:'',name:'',description:'',userImage:"",message:"",success:false})
  const[name,setName]=useState("");
  const[description,setDescription]=useState("");
  const[price,setPrice]=useState("");
  const[material,setMaterial]=useState("");
  const[start_date,setStartdate]=useState("");
  const[end_date,setEnddate]=useState("");
  const[image,setImage]=useState("");
  

  const submitForm =(e) =>{
    e.preventDefault();
      
    if(state.file)
    {
      let formData=new FormData();
      formData.append('file',state.file)
     

    
      Axios.post('http://localhost:3001/sales_customization', {
     
       
            image:state.file.name,
            name:name,
            description:description,
            price:price,
            start_date:start_date,
            end_date:end_date,
            material:material,
            
          })

    }else{
      setState({
        ...state,
        message:'please select image'
      })
     
    }

  }

  const handleInput =(e) =>{
    let reader =new FileReader();
    let file=e.target.files[0]
    reader.onloadend =() =>{
      setState({
        ...state,
        file:file,
        userImage:reader.result,
        message:""
      })
     
    }
    reader.readAsDataURL(file);
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
            <strong>SALES MANAGER</strong>
          </Typography>
          <IconButton color="inherit" fontSize="inherit">
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
        <List style={{backgroundColor: 'rgb(37,37,94)', color:'red'}} onClick={()=>setIsAuth(false)}>{Logout}</List>
        <Divider />
      </Drawer>
      </div>
      <main style={{backgroundColor: '#f0f8ff'}} className={classes.content}>
        <div className={classes.appBarSpacer} />
        <br/>
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
        
            
            

            {/* Recent Orders */}
            <Grid item xs={10} style={styles.pack} >
            
  
            <div >
              <Paper className={classes.paper}>
              <Typography component="h1" variant="h6" color="inherit"  width="100%" noWrap className={classes.title}>
              <strong>Publish Promotion</strong>
            </Typography><br/>

                 <Form  onSubmit={submitForm} >
                    <Form.Group as={Row} controlId="formHorizontalName">
                      <Form.Label className={classes.lab} column lg={2} >
                        Name :
                      </Form.Label>
                      <Col sm={10}>
                        <Form.Control type="text" placeholder="chair,table and etc" 
                        onChange={(event)=> {
                          setName(event.target.value);
                        }}
                        />
                      </Col>
                    </Form.Group><br/>

                    
                    <Form.Group as={Row} controlId="formHorizontalNIC">
                      <Form.Label className={classes.lab} column lg={2}>
                       Price :
                      </Form.Label>
                      <Col sm={10}>
                        <Form.Control type="text" placeholder="Price" 
                        onChange={(event)=> {
                          setPrice(event.target.value);
                        }}
                        />
                      </Col>
                    </Form.Group><br/>

                    <Form.Group as={Row} controlId="formHorizontalmaterial">
                      <Form.Label className={classes.lab} column lg={2}>
                       Material :
                      </Form.Label>
                      <Col sm={10}>
                        <Form.Control type="text" placeholder="type" 
                        onChange={(event)=> {
                          setMaterial(event.target.value);
                        }}/>
                      </Col>
                    </Form.Group><br/>

                    <Form.Group as={Row} controlId="formHorizontalNIC">
                      <Form.Label className={classes.lab} column lg={2}>
                       Description :
                      </Form.Label>
                      <Col sm={10}>
                        <Form.Control type="text" placeholder="Description" 
                        onChange={(event)=> {
                          setDescription(event.target.value);
                        }}
                        />
                      </Col>
                      </Form.Group><br/>

                     
                    <Form.Group as={Row} controlId="formHorizontalFile" className="mb-3">
                      <Form.Label className={classes.lab} column lg={2}>
                        Image :</Form.Label>
                      <Col sm={10}>
                        <Form.Control type="file"  name="img"
                        onChange={handleInput}
                          
                       />
                      </Col>
                      </Form.Group>  
                      {state.message && <h6 className={classes.mess}>{state.message}</h6>}            
                      <div>
                 {state.userImage && (<img src={state.userImage}  width="10%" height="10%" alt="preview" />)}
               </div>
             
                    <Form.Group as={Row} controlId="formHorizontaladdress">
                      <Form.Label className={classes.lab} column lg={2}>
                     From:
                      </Form.Label>
                      <Col sm={10}>
                        <Form.Control type="date" placeholder="01/01/2021" 
                        onChange={(event)=> {
                          setStartdate(event.target.value);
                        }}/>
                      </Col>
                    </Form.Group><br/>

                    <Form.Group as={Row} controlId="formHorizontaladdress">
                      <Form.Label className={classes.lab} column lg={2}>
                     To:
                      </Form.Label>
                      <Col sm={10}>
                        <Form.Control type="date" placeholder="01/01/2021" 
                        onChange={(event)=> {
                          setEnddate(event.target.value);
                        }}/>
                      </Col>
                    </Form.Group><br/>

                  

                    

                                   

                    
                        <div  style={styles.button_style}>
                       
                        <Button  type="submit"  size='lg' >Post</Button>
                        </div>
           
                </Form>
               
              </Paper>
              </div>
            </Grid>
         
          </Grid>
          
          <Box pt={4}>
           
          </Box>
        </Container>
       
      </main>
    </div>
    

  );
}
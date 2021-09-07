import React,{useEffect,useState} from 'react';
import clsx from 'clsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Table} from 'react-bootstrap';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link, Switch } from "react-router-dom";
import BarChartIcon from '@material-ui/icons/BarChart';
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
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import TimelineIcon from '@material-ui/icons/Timeline';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import {Redirect} from "react-router-dom"
import TrendingDownIcon from '@material-ui/icons/TrendingDown';


import {Bar, Pie, Doughnut} from 'react-chartjs-2'

import { mainListItems, Logout } from './listItems';
//import {Doughnut} from '../../charts/Doughnut'
//import Adminmain from "../main/Adminmain"
import '../css/Dashboard.css'

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
   
  },
  custom:{
    display:'flex',
    paddingLeft:'20px',
    
   height:'80px',
   paddingBottom:'10px',
    color:'black',
    fontSize:'20px',
   
  
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
  maindash:{
    display:'flex'
  },
  piechart:{
      display:'flex'
  },
  pieleft:{
 width:'400px',
 marginLeft:'100px'
  },
  pieright:{
    width:'400px',
    marginLeft:'300px'
     },
 datesalign:{
  display:'flex'
},
dateleft:{
    marginRight:'100px',
    marginBottom:'20px',
    marginLeft:'30px'
},
profile_img:{
  width:'50px',
  height:'50px',
  borderRadius:'50px'
}

}));

const styles = {
  side:{
    backgroundColor:'rgb(37, 37, 94)',
  }
};


 



const MovingItems=()=> {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const {id}=useParams();
  const [Dt, setDt] = useState([])
  const[to_date,setTodate]=useState("");
  const[from_date,setFromdate]=useState("");

  useEffect(() => {
    const fetchData = async () => {
        const response = await axios.get('http://localhost:3001/viewAdmin', {
            params: {
                id: id,  
            }
            
        });
   
        setDt(response.data[0]);
           console.log(response.data[0]);
   
    };
    fetchData();
   }, [id]);

   const [cus,setCus]=useState([])

  
    const customer = async () => {
        const response = await axios.get('http://localhost:3001/CusWithDate', {
            params: {
               to_date:to_date,  
               from_date:from_date
            }
            
        });
   
        setCus(response.data);
           
   
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

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

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
            <b>ADMIN</b>
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>

         
          {/* <IconButton color="inherit" fontSize="inherit">
           <AccountCircleIcon   onClick={handleClick}/>
  
          </IconButton> */}

          <img src={`/${Dt.emp_img}`} onClick={handleClick} className={classes.profile_img}/>
   <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}><Link to='/admin/pages/ViewProfile' style={{textDecoration:'none',color:'black'}}>Profile</Link></MenuItem>
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
        <List style={{backgroundColor: 'rgb(37, 37, 94)', color:'white'}}>{mainListItems}</List>
        <Divider />
        <List style={{backgroundColor: 'rgb(37, 37, 94)', color:'red'}} onClick={()=>setIsAuth(false)}>{Logout}</List>
        <Divider />
      </Drawer>
      </div>

      {/* <main className={classes.content}>
      <Adminmain />
        

 </main> */}
 <main style={{backgroundColor: '#f0f8ff'}} className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={1}>
          
           
           
               <h1><b>CUSTOMER DETAILS</b></h1><br/>
               <div style={{display:'flex'}}>
                   <div style={{width:'1220px'}}>
               <Grid item xs={16}  direction="row">
              <Paper style={{height:'70px'}}>
                  <div style={{display:'flex'}}>
                  <h4 style={{color:'red',marginLeft:'10px',paddingTop:'10px',marginTop:'10px'}}>Enter Dates</h4>
                  <p>From Date</p>
                  <input type='date' style={{width:'400px',height:'40px',border:'none',backgroundColor:'aliceblue',paddingLeft:'20px',marginTop:'10px',marginLeft:'20px',borderRadius:'10px'}} placeholder='From Date' 
                   onChange={(event)=> {
                    setFromdate(event.target.value);
                  }} ></input>
 <p>To Date</p>
<input type='date' style={{width:'400px',height:'40px',border:'none',backgroundColor:'aliceblue',paddingLeft:'20px',marginTop:'10px',marginLeft:'20px',borderRadius:'10px'}} placeholder='To date' 
                   onChange={(event)=> {
                    setTodate(event.target.value);
                  }} ></input>
                  <button style={{marginLeft:'30px',fontSize:'20px',width:'150px',height:'50px',backgroundColor:'#0070ff',border:'none',borderRadius:'10px',color:'white',marginTop:'10px'}}
                  onClick={()=>{customer()}}>Click to View</button>
                  </div>

                  {cus.map((record)=>{
                       return(
                  <div ><br/>
                
                  <div style={{display:'flex'}}><label className={classes.formlabel1}><b style={{marginRight:'65px'}}>Customer ID :</b>{record.customer_id}</label></div>
                  <label className={classes.formlabel1}><b style={{marginRight:'30px'}}>Customer Name :</b > {record.fname}</label><br/>
                  <label className={classes.formlabel1}><b style={{marginRight:'100px'}}>Address : </b>{record.address}</label><br/>
                  <label className={classes.formlabel1}><b style={{marginRight:'50px'}}>Phone No :</b>{record.phone} </label><br/>
                       
                  </div>
              )
            })}
              </Paper>
              </Grid><br/>
              </div>
              </div>
              </Grid>
        </Container>
      </main>
    </div>
  );
}

export default MovingItems;
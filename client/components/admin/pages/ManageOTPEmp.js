import React,{useState,useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import clsx from 'clsx';
import axios from 'axios';
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
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {Redirect} from "react-router-dom";
import {Link} from 'react-router-dom';
import {toast} from 'react-toastify'
import { mainListItems } from './listItems';
import { useParams } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import WeekendIcon from '@material-ui/icons/Weekend'
import AddEmployeeOTPcheck from './AddEmployeeOTPcheck';

export const Logo = (
  <div>
    <ListItem >
      <ListItemIcon style={{color:'white'}}>
        <WeekendIcon/>
      </ListItemIcon >
      <ListItemText primary="EUT FURNITURE"/>
    </ListItem>
  </div>
);
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
  title1: {
    flexGrow: 1,
    fontSize:40,
    fontWeight:600,
    align:'left'
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
    backgroundColor:'#ede7f6'
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
  profile_img:{
    width:'50px',
    height:'50px',
    borderRadius:'50px'
  }
  
}));

const styles = {
  side:{
    backgroundColor:'rgb(37,37,94)',
  },
  pack:{
    justifyContent:'flex-around',
    marginLeft:'20px'
  }  ,
  
};




export default function ManageOTPEmp() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [Dt, setDt] = useState([])
  const { id } = useParams();
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

  useEffect(() => {
    const fetchData = async () => {
        const response = await axios.get('http://localhost:3001/viewAdmin', {
            params: {
                id: id,  
            }
            
        });
  
        setDt(response.data[0]);
          //  console.log(response.data[0]);
  
    };
    fetchData();
  }, [id]);

  const [catList,setCatList]=useState([])
useEffect(()=>{
  axios.get("http://localhost:3001/CategoryNoChart").then((response)=>{
    setCatList(response.data)
    // console.log(response)
  })
},[])

const arr=catList.map(record=>record.quantity);
const cat=catList.map(record=>record.name);


const [cusorderCount,setCusOrderCount]=useState([])
  useEffect(()=>{
    axios.get("http://localhost:3001/CustomizedOrderCount").then((response)=>{
      setCusOrderCount(response.data)
      
    })
  },[])

const NotificationClick = async () => {
  axios.get('http://localhost:3001/NoficationActive', {
     
      
  });
  
  const customToast=()=>{
    return(
      <div>
        You have requested customized Order from Customer!
        <button style={{marginLeft:'10px',border:'none',backgroundColor:'skyblue',borderRadius:'5px'}} onClick={Cuspage}>View</button>
      </div>
    )
  }

  const notify=()=>{
   
    toast.info(customToast,{position:toast.POSITION.TOP_RIGHT,autoClose:false})
  
  
      }
      notify();

}

const customizedcount=cusorderCount.map(record=>record.count);
const total=Number(customizedcount);
console.log(customizedcount);

  const[isAuth,setIsAuth]=useState(true);

  if(!isAuth){
    return <Redirect to="" />
  }
  const Cuspage=()=>{
    window.location.href='/CustomizeOrder'
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
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title1}>
            <strong>ADMIN</strong>
          </Typography>
         

          
          <IconButton color="inherit">
            <Badge badgeContent={total} color="secondary">
              <NotificationsIcon onClick={NotificationClick}/>
            </Badge>
          </IconButton>
           

         
          {/* <IconButton color="inherit" fontSize="inherit">
           <AccountCircleIcon   onClick={handleClick}/>
  
          </IconButton> */}

          <img src={`/${Dt.emp_img}`} onClick={handleClick} className={classes.profile_img} alt='/Noimage'/>
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
        <div className={classes.toolbarIcon} style={{backgroundColor: 'rgb(37,37,94)', color:'white'}}>
          <IconButton onClick={handleDrawerClose} style={{color:'white'}}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        
 <Divider />
        <List style={{backgroundColor: 'rgb(37,37,94)', color:'white'}}>{Logo}</List> 
        <Divider />
        <List style={{backgroundColor: 'rgb(37,37,94)', color:'white'}}>{mainListItems}</List>
       
       
      </Drawer>
      </div>
      <main style={{backgroundColor: '#f0f8ff'}} className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
        
            <Typography component="h1" variant="h6" color="inherit" align="center" width="100%" noWrap className={classes.title1}>
                  <strong> EMPLOYEE MANAGEMENT</strong>
            </Typography>
            

            {/* Recent Orders */}
            <Grid item xs={12}  direction="row"  >
            
  
            <div >
              <Paper className={classes.paper}>
                <AddEmployeeOTPcheck/>
              </Paper>
              </div>
            </Grid>
 
          </Grid>
          
         
        </Container>
      </main>
    </div>
  );
}


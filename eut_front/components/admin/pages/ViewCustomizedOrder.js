import React,{useEffect,useState} from 'react';
import clsx from 'clsx';
import {toast} from 'react-toastify'
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
import axios from 'axios'
import { useParams } from 'react-router-dom';

import LoadOrder from './LoadOrder'

import { mainListItems, Logout } from './listItems';



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
    marginTop:'20px',
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
  addbutton:{
      backgroundColor:'#0000ff',
      height:'50px',
      width:'160px',
      borderRadius:'5px',
      marginRight:'50px',
      textDecoration:'none',
      textAlign:'center',
      paddingTop:'10px'
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


export default function Categories() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const { id } = useParams();
  const [Dt, setDt] = useState([])
 
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

const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

const NotificationClick = async () => {
  const response = await axios.get('http://localhost:3001/NoficationActive', {
     
      
  });
  notify();
}

const [cusorderCount,setCusOrderCount]=useState([])
  useEffect(()=>{
    axios.get("http://localhost:3001/CustomizedOrderCount").then((response)=>{
      setCusOrderCount(response.data)
      
    })
  },[])
const customizedcount=cusorderCount.map(record=>record.count);
console.log(customizedcount);

const customToast=()=>{
  return(
    <div>
      You have requested customized Order from Customer!
      <button style={{marginLeft:'10px',border:'none',backgroundColor:'white',borderRadius:'5px'}} onClick={Cuspage}>View</button>
    </div>
  )
}

const Cuspage=()=>{
window.location.href='/admin/pages/CustomizedOrders'
}


const notify=()=>{
   
  toast.info(customToast,{position:toast.POSITION.TOP_RIGHT,autoClose:false})


    }
  
 // const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

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
            <Badge badgeContent={customizedcount} color="secondary">
              <NotificationsIcon onClick={NotificationClick}/>
            </Badge>
          </IconButton>
          
          <img src={`/${Dt.emp_img}`} onClick={handleClick} className={classes.profile_img}/>
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
        
        <Grid container spacing={3}>
        {/* Recent Orders */}
        <Grid item xs={12}  direction="row"  >
        
        <div >
        
           <Paper className={classes.paper}>
               
                <Typography component="h1" variant="h6" color="inherit" align="center" width="100%" noWrap className={classes.title}>
                  <strong> CUSTOMIZED ORDER DETAILS </strong>
                </Typography>
               
                <LoadOrder/>
                     
          </Paper>
          </div>
        </Grid>

      </Grid>
        </Container>
      </main>
    </div>
  );
}

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import clsx from 'clsx';
import Axios from 'axios';
import { useState } from 'react';

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
import ViewStreamIcon from '@material-ui/icons/ViewStream';
import {Button} from 'react-bootstrap';
import {Card} from 'react-bootstrap';
//import CardColumns from 'react-bootstrap/CardColumns'
//import CardDeck from 'react-bootstrap/CardDeck'

import { mainListItems, Logout,Profile } from './listItems';
import Assign from './Assign';

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
  
}));

const styles = {
  side:{
    backgroundColor:'rgb(37,37,94)',
  },
  pack:{
    justifyContent:'flex-around',
    marginLeft:'20px'
  }  ,
  card:{
    display:"flex",
    flexDirection :"row",

  }
  
};

const dateOnly = (d) => {
  const date = new Date(d);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year} - ${month} - ${day}`;
};

export default function AssignDelivers() {
  const classes = useStyles();

  const [statusList, setstatusList] = useState([]);

  const getStatus = () => {
    Axios.get("http://localhost:3001/viewStatus").then((response) => {
      setstatusList(response.data)
    })
  }

  const [open, setOpen] = React.useState(true);
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
        <div className={classes.toolbarIcon} style={{backgroundColor: 'rgb(37,37,94)', color:'white'}}>
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

      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>   
            <Typography component="h1" variant="h6" color="inherit"  width="100%" align="center" noWrap className={classes.title}>
                  <strong> ASSIGN DELIVERS</strong>
            </Typography>      
            <Grid item xs={12}  direction="row" >
                
                <div >
                  <Paper className={classes.paper}>
                  <div align="right"> 
                  <Button onClick={getStatus} type="submit" size='lg'><ViewStreamIcon/> Pending</Button>
                  </div>
                  <br></br>
                  <div  style={styles.card}>
                  {statusList.map((val, key) => {
                    return (
                      <div>
                        
                        <Card style={{ width: '18rem' }} border="primary" >
                          <Card.Header>DELIVER ID : {val.employee_id}</Card.Header>
                          <Card.Body>
                          <Card.Text>Name : {val.e_name}</Card.Text>
                          <Card.Text>Shipping Address : {val.c_address}</Card.Text>
                          <Card.Text>Delivery Date : {dateOnly(val.order_last_date)}</Card.Text>
                          <Card.Text>Scheduled : {val.pending}</Card.Text>
                          
                        </Card.Body>
                        </Card>
                        
                      
                      </div>
                      
                    )
                  })}
                  </div>
                  
                  <br/>
                    <Assign/>
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


   
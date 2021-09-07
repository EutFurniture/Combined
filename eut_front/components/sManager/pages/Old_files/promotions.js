import React from 'react';
import clsx from 'clsx';

//from customer
import '../../../App.css';
import { useState } from 'react';
import Axios from 'axios';
//
import Button from 'react-bootstrap/Button';
import back from "./pro.gif";
import styled from 'styled-components';

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
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';

import { Form, FormGroup, Label, Input, FormText } from 'reactstrap';



import { mainListItems, Logout } from './listItems';
import Chart from './Chart';
import Deposits from './Deposits';
import Orders from './Orders';





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

const ModelImg = styled.img`
    width: 100%;
    height: 100%;
    background: green;

`


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
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
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
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  //fromCustomer
const [name, setName]=useState("");
const [price, setPrice] = useState("");
const [brand, setBrand] = useState("");
const [description, setDescription] = useState("");

const [promotionsList, setPromotionsList] = useState([]);


const addPromotion = () => {
  Axios.post('http://localhost:3001/sales_create_pro', {
    name: name,  
    price: price, 
    brand: brand,
    description: description
  }).then(() => {
    setPromotionsList([
      ...promotionsList,
      {
        name: name, 
        price: price, 
        brand: brand
      },
    ]);
  });
};//

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
          <IconButton color="inherit" href="/sManager/pages/Notification">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
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
        <div className={classes.toolbarIcon} style={{backgroundColor: 'rgb(37,37,94)', color:'white'}}>
          <IconButton onClick={handleDrawerClose} style={{color:'white'}}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List style={{backgroundColor: 'rgb(37,37,94)', color:'white'}}>{mainListItems}</List>
        <Divider />
        <List style={{backgroundColor: 'rgb(37,37,94)', color:'red'}}>{Logout}</List>
        <Divider />
      </Drawer>
      </div>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <br/>
        

        <Container>
        <h3> Promotions</h3>
          <br/>
          <div class="card">
            
            <ModelImg src={back}
                    alt='default'/>
            <br/>
            <p><Button variant="warning">Add New Image</Button></p>
          </div>

          

        </Container>

       
       
       
        <Container maxWidth="lg" className={classes.container}>
        <div className="information_pro">
        <form>
        <div>
            <label>
                Name
            </label>
        </div>

        <div>
            <input type="text" className="pro_inp" 
            onChange={(event)=>{
              setName(event.target.value);
            }}
            />
        </div>

        <div>
            <label>
                Price
            </label>
        </div>

        <div>
            <input type="text" className="pro_inp"
            onChange={(event)=>{
              setPrice(event.target.value);
            }}
            />
        </div>

        <div>
            <label>
                Brand
            </label>
        </div>

        <div>
            <input type="text" className="pro_inp"
             onChange={(event)=>{
              setBrand(event.target.value);
            }}
            />
        </div>

        <div>
            <label>
                Description
            </label>
        </div>

        <textarea class="pro_txt"
              onChange={(event)=>{
              setDescription(event.target.value);
            }}>
        </textarea>

        <br/>
        <div>
            <Button variant="warning" onClick={addPromotion}>Publish</Button>
        </div>

        </form>
        </div>
       
        
        </Container>

        <Box pt={4}>
            <Copyright />
          </Box>
        
      </main>
    </div>
  );
}

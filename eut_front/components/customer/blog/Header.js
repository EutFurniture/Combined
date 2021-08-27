import React,{useState,useEffect} from 'react';
import PropTypes from 'prop-types';
import { makeStyles,withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import AddShoppingCart from '@material-ui/icons/AddShoppingCart';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Feedback from '@material-ui/icons/Feedback';
import Redeem from '@material-ui/icons/Redeem';
import ListAlt from '@material-ui/icons/ListAlt';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ExitToApp from '@material-ui/icons/ExitToApp';
import Modal from '@material-ui/core/Modal';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Pay from '../Products/Pay'
import {Redirect} from 'react-router-dom';
import Badge from '@material-ui/core/Badge';
import axios from 'axios';
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import NotificationUI from '../NotificationUI';
function rand() {
  return Math.round(Math.random() * 20) - 10;
}

 function getModalStyle() {
   const top = 50 + rand();
  const left = 50 + rand();

   return {
     top: `${top}%`,
     left: `${left}%`,
     transform: `translate(-${top}%, -${left}%)`,
   };
}

const useStyles = makeStyles((theme) => ({
 
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    borderRadius:'7px',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),

  },
  toolbarSecondary: {
    justifyContent: 'space-between',
    overflowX: 'auto',
    backgroundColor:'rgb(226, 226, 230)',
    color:'black',
    marginTop:theme.spacing(3),
    padding:"1%",
  },
  toolbarTitle:{
    fontWeight:'bold',
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
    textDecoration:'none',
    '&:focus':{
      backgroundColor:'black',
      color:'white',
     textDecoration:'none',
    },
    '&:hover':{
      backgroundColor:'black',
      color:'white',
     textDecoration:'none',
    }
  },
  head:{
    fontWeight:'bold',
    color:'grey',

  },

  
}));

const StyledMenu = withStyles({
  
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);



export default function Header(props) {
  const classes = useStyles();
  const { sections, title,cust } = props;
  
  const [anchorEl, setAnchorEl] = useState(null );
  const [isAuth, setIsAuth]= useState(true);
   const [modalStyle] =useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [cusorderCount,setCusOrderCount]=useState([])
  const [cartCount,setCartCount]=useState([])
  
  const  logout = (req,res) => {
    req.session.destroy((err) =>{
       res.redirect('/landing');
    })
};
  
if(!isAuth){
  return <Redirect to='/landing' />
}
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  toast.configure()
  const a=cust.customer_id

   const response1= axios.get("http://localhost:3001/CustomizedOrderCount").then((response)=>{
      setCusOrderCount(response.data)
      
    })
    const response2= axios.get("http://localhost:3001/cartCount",{
      params:{
        customer_id:a,
      }
    }).then((response)=>{
      setCartCount(response.data)
      
    })
  
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleOpen = () => {
    setOpen(true);
  };
 

  const handleCloses= () => {
    setOpen(false);
  };
  
  const NotificationClick = async () => {
    const response = await axios.get('http://localhost:3001/NoficationActive', {
       
        
    });
    notify();
  }
  const notify=()=>{
   
    toast.info(customToast,{position:toast.POSITION.TOP_CENTER,autoClose:false})
  
  
      }

      const customToast=()=>{
        return(
          <div>
            Hello,
            Your customized Order has confirmed.
            Pay the advance payment for this product.
            <button style={{marginLeft:'10px',border:'none',backgroundColor:'white',padding:'5px 10px',borderRadius:'5px'}} onClick={Cuspage}>PAY</button>
          </div>
        )
      }
      const Cuspage=()=>{
        window.location.href='/customer/notification'
      }
     const customizedcount=cusorderCount.map(record=>record.count);
     const cardcount=cartCount.map(record=>record.count);
     console.log(customizedcount);

  const body = (
    <div style={modalStyle} className={classes.paper}  onClose={handleCloses}>
      <h2 id="simple-modal-title" className={classes.head}> Gift Data</h2>
      <p id="simple-modal-description">
      You can get your gift based on your point.check below...
      </p>
      <Pay   />
    </div>
  );

  return (
    <React.Fragment>
    
      <Toolbar component="nav" variant="dense" className={classes.toolbarSecondary}>
      <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          className={classes.toolbarTitle}
        >
          {title}
        </Typography>
          <Link
            color="inherit"
            noWrap
            variant="body2"
            href='/customer/dashboard'
            className={classes.toolbarLink}
          >
            Home
          </Link>

          <Link
            color="inherit"
            noWrap
            variant="body2"
            href='/customer/about'
            className={classes.toolbarLink}
          >
            About Us
          </Link>

          <Link
            color="inherit"
            noWrap
            variant="body2"
            href='/customer/dining'
            className={classes.toolbarLink}
          >
           Product
          </Link>

          <Link
            color="inherit"
            noWrap
            variant="body2"
            href='/customer/customization'
            className={classes.toolbarLink}
          >
           Customization
          </Link>

          <div>
          <Link
            color="inherit"
            noWrap
            aria-controls="customized-menu"
            aria-haspopup="true"
            onClick={handleClick}
            variant="body2"
            href='#'
            className={classes.toolbarLink}
          >
           My Account
          </Link>
          <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem onClick={handleClose}>
          <ListItemIcon >
            <AccountCircle fontSize="small" />
          </ListItemIcon>
          <Link color="inherit"  className={classes.toolbarLink} variant="body2" href="/customer/profile"><ListItemText primary="Profile" /></Link>
        </StyledMenuItem>   
        <StyledMenuItem onClick={handleClose}>     
        <ListItemIcon >
            <ListAlt fontSize="small" />
          </ListItemIcon>
          <Link color="inherit"  className={classes.toolbarLink} variant="body2" href="/customer/history"><ListItemText primary="Order History" /></Link>
        </StyledMenuItem>
        <StyledMenuItem onClick={handleClose}>     
        <ListItemIcon >
            <Feedback fontSize="small" />
          </ListItemIcon>
          <Link color="inherit"  className={classes.toolbarLink} variant="body2" href="/customer/feedback"><ListItemText primary="Feedback" /></Link>
        </StyledMenuItem>
        {/* <StyledMenuItem onClick={handleClose}>     
        <ListItemIcon >
        <Redeem fontSize="small" />
          </ListItemIcon>
          <Link color="inherit"  className={classes.toolbarLink} variant="body2" ><ListItemText primary="Gift Data" /></Link>
        </StyledMenuItem> */}
        <StyledMenuItem onClick={handleClose}>
          <ListItemIcon>
            <Redeem fontSize="small" />
          </ListItemIcon>
        
         <Link color="inherit" className={classes.toolbarLink}  variant="body2" onClick={handleOpen}> <ListItemText primary="Gift Data" /></Link>
         <Modal
        open={open}
        onClose={handleCloses}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
     
        </StyledMenuItem>
       
        <StyledMenuItem onClick={handleClose}>
          <ListItemIcon>
            <ExitToApp fontSize="small" />
          </ListItemIcon>
         <Link color="inherit" href="/landing"  variant="body2" className={classes.toolbarLink} onClick={() =>setIsAuth(false)}> <ListItemText primary="Logout" /></Link>
        </StyledMenuItem>
      </StyledMenu>
         
        </div>
        <Link
            color="inherit"
            noWrap
            variant="body2"
            href='/customer/cart'
            className={classes.toolbarLink}
          >
          <Badge badgeContent={cardcount} color="secondary">
           <AddShoppingCart />
           </Badge>
          </Link>

          <IconButton color="inherit">
            <Badge badgeContent={customizedcount} color="secondary">
              <NotificationsIcon onClick={NotificationClick}/>
            </Badge>
          </IconButton>
           
      </Toolbar>
    </React.Fragment>
  );
}

Header.propTypes = {
  sections: PropTypes.array,
  title: PropTypes.string,
};

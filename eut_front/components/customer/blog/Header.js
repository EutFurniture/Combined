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

import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';

import CloseIcon from '@material-ui/icons/Close';

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
 
 
  toolbarSecondary: {
    justifyContent:"space-between",
    //overflowX: 'auto',
    backgroundColor:'rgb(226, 226, 230)',
    color:'black',  
    
       padding:"1%",
    boxShadow: theme.shadows[5],
  },
  toolbarTitle:{
    fontWeight:'bold',
    
 justifyContent:'flex-start',
    display:'grid',
  },
  toolbarLink: {
    justifyContent:'flex-end',
    display:'grid',
    fontWeight:'bold',
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
  check:{
    backgroundColor:'grey',
    fontWeight:'bold',
  },
  ass:{
    textDecoration:'none',
    color:"white",
    '&:hover':{
      textDecoration:'none',
      color:'white',
    }
  }
  
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

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },

  gift:{
    padding:"20px",
    position:"relative",
    right:"20%",
    marginTop:'80%',
    backgroundCloor:"black",
    color:'white',
  },
  
 
});



const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);


export default function Header(props) {
  const classes = useStyles();
  const { sections, title,cust } = props;
  
  const [anchorEl, setAnchorEl] = useState(null );
  const [isAuth, setIsAuth]= useState(true);
   const [modalStyle] =useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [openpop, setOpenpop] = useState(false);
  const [cusorderCount,setCusOrderCount]=useState([])
  const [cartCount,setCartCount]=useState([])
  const [customer,setCustomer]=useState([])
  
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
    const response3= axios.get("http://localhost:3001/customer").then((response)=>{
      setCustomer(response.data)
      
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
    const response = await axios.get('http://localhost:3001/customerNoficationActive', {
       
        
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
    <div className="shap"> 
   
   
   <Dialog onClose={handleCloses} aria-labelledby="customized-dialog-title" open={open}>
     <DialogTitle id="customized-dialog-title" onClose={handleCloses}>
     <h3 className="gitt"> Surprise gift !</h3>
     </DialogTitle>
     <DialogContent dividers>
       <Typography gutterBottom>
        <img src="../../images/giftt.jpg" className="giftt" />
       </Typography>
       <Typography gutterBottom>
         You got 15 points
         so we  give small gift for you.
       </Typography>
       <Typography gutterBottom>
        So you can order gift below 15 points.
       </Typography>
     </DialogContent>
     <DialogActions>
       <Button autoFocus onClick={handleCloses} class='btn btn-primary'>
           <Link href='/customer/gift' className={classes.ass}>
         Select gift
         </Link>
       </Button>
     </DialogActions>
   </Dialog>
   </div>
      
  
   
     
  );

  return (
    <React.Fragment>
   
      <Toolbar component="nav"  className={classes.toolbarSecondary}>
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

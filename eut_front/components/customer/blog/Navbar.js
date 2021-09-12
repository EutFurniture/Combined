import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AddShoppingCart from '@material-ui/icons/AddShoppingCart';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import StarIcon from '@material-ui/icons/StarBorder';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Feedback from '@material-ui/icons/Feedback';
import Redeem from '@material-ui/icons/Redeem';
import ListAlt from '@material-ui/icons/ListAlt';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ExitToApp from '@material-ui/icons/ExitToApp';
import axios from 'axios';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Modal from '@material-ui/core/Modal';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Badge from '@material-ui/core/Badge';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
      '@global': {
            ul: {
                  margin: 0,
                  padding: 0,
                  listStyle: 'none',
            },
      },
      appBar: {
            borderBottom: `1px solid ${theme.palette.divider}`,
      },
      toolbar: {
            backgroundColor: 'rgb(226, 226, 230)',
            color: 'black',

            padding: "1%",

      },
      toolbarTitle: {
            flexGrow: 1,
            fontWeight: 'bold',
      },
      link: {

            margin: theme.spacing(1, 1.5),
            fontWeight: 'bold',
            flexShrink: 0,
            padding: theme.spacing(1),
            textDecoration: 'none',
            '&:focus': {
                  backgroundColor: 'black',
                  color: 'white',
                  textDecoration: 'none',
            },
            '&:hover': {
                  backgroundColor: 'black',
                  color: 'white',
                  textDecoration: 'none',
            }

      },
      heroContent: {
            padding: theme.spacing(8, 0, 6),
      },
      cardHeader: {
            backgroundColor:
                  theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
      },
      cardPricing: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'baseline',
            marginBottom: theme.spacing(2),
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

const styles = (theme) => ({
      // root: {
      //   margin: 0,
      //   padding: theme.spacing(2),
      // },
      closeButton: {
            position: 'absolute',
            right: theme.spacing(1),
            top: theme.spacing(1),
            color: theme.palette.grey[500],
      },

      gift: {
            padding: "20px",
            position: "relative",
            right: "20%",
            marginTop: '80%',
            backgroundCloor: "black",
            color: 'white',
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


export default function Pricing() {
      const classes = useStyles();
      const [anchorEl, setAnchorEl] = useState(null);

      const [open, setOpen] = useState(false);
      const handleClick = (event) => {
            setAnchorEl(event.currentTarget);
      };
      const handleClose = () => {
            setAnchorEl(null);
      };
      const handleOpen = () => {
            setOpen(true);
      };


      const handleCloses = () => {
            setOpen(false);
      };
      toast.configure()
      const logout = () => {
            axios.post("http://localhost:3001/logout").then((response) => {
                  window.location.href = '/'
            })
      }
      const NotificationClick = async () => {
            const response = await axios.get('http://localhost:3001/customerNoficationActive', {


            });
            notify();
      }
      const notify = () => {

            toast.info(customToast, { position: toast.POSITION.TOP_RIGHT, autoClose: false })


      }

      const customToast = () => {
            return (
                  <div>
                        Hello,
                        Your customized Order has confirmed.
                        Pay the advance payment for this product.
                        <button style={{ marginLeft: '10px', border: 'none', backgroundColor: 'white', padding: '5px 10px', borderRadius: '5px' }} onClick={Cuspage}>PAY</button>
                  </div>
            )
      }
      const Cuspage = () => {
            window.location.href = '/customer/notification'
      }
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
                                    You got  points
                                    so we  give small gift for you.
                              </Typography>
                              <Typography gutterBottom>
                                    So you can order gift below Rs. .
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
                  <CssBaseline />
                  <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
                        <Toolbar className={classes.toolbar}>
                              <Typography variant="h5" color="inherit" noWrap className={classes.toolbarTitle}>
                                    EUT FURNITURE
                              </Typography>
                              <nav>
                                    <Link variant="body2" noWrap color="inherit" href="/customer/dashboard" className={classes.link}>
                                          Home
                                    </Link>
                                    <Link variant="body2" noWrap color="inherit" href="/customer/about" className={classes.link}>
                                          About
                                    </Link>
                                    <Link variant="body2" noWrap color="inherit" href="/customer/dining" className={classes.link}>
                                          Product
                                    </Link>
                                    <Link variant="body2" noWrap color="inherit" href="/customer/customization" className={classes.link}>
                                          Customization
                                    </Link>

                                    <Link
                                          color="inherit"
                                          noWrap
                                          aria-controls="customized-menu"
                                          aria-haspopup="true"
                                          onClick={handleClick}
                                          variant="body2"
                                          href='#'
                                          className={classes.link}
                                    >
                                          <AccountCircle fontSize="small" />
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
                                                <Link color="inherit" className={classes.toolbarLink} variant="body2" href="/customer/profile"><ListItemText primary="Profile" /></Link>
                                          </StyledMenuItem>
                                          <StyledMenuItem onClick={handleClose}>
                                                <ListItemIcon >
                                                      <ListAlt fontSize="small" />
                                                </ListItemIcon>
                                                <Link color="inherit" className={classes.toolbarLink} variant="body2" href="/customer/history"><ListItemText primary="Order History" /></Link>
                                          </StyledMenuItem>
                                          <StyledMenuItem onClick={handleClose}>
                                                <ListItemIcon >
                                                      <Feedback fontSize="small" />
                                                </ListItemIcon>
                                                <Link color="inherit" className={classes.toolbarLink} variant="body2" href="/customer/feedback"><ListItemText primary="Feedback" /></Link>
                                          </StyledMenuItem>

                                          <StyledMenuItem onClick={handleClose}>
                                                <ListItemIcon>
                                                      <Redeem fontSize="small" />
                                                </ListItemIcon>

                                                <Link color="inherit" className={classes.toolbarLink} variant="body2" onClick={handleOpen}> <ListItemText primary="Gift Data" /></Link>
                                                <Modal
                                                      open={open}
                                                      onClose={handleCloses}
                                                      aria-labelledby="simple-modal-title"
                                                      aria-describedby="simple-modal-description"
                                                >
                                                      {body}

                                                </Modal>

                                          </StyledMenuItem>

                                          <StyledMenuItem onClick={logout}>
                                                <ListItemIcon>
                                                      <ExitToApp fontSize="small" />
                                                </ListItemIcon>
                                                <ListItemText primary="Logout" />
                                          </StyledMenuItem>
                                    </StyledMenu>


                                    <Link
                                          color="inherit"
                                          noWrap
                                          variant="body2"
                                          href='/customer/cart'
                                          className={classes.toolbarLink}
                                    >
                                          <Badge color="secondary">
                                                <AddShoppingCart badgeContent />
                                          </Badge>
                                    </Link>

                                    <IconButton onClick={NotificationClick} color="inherit">
                                          <Badge badgeContent color="secondary">
                                                <NotificationsIcon />
                                          </Badge>
                                    </IconButton>

                              </nav>
                              {/* <Button href="#" color="primary" variant="outlined" className={classes.link}>
            Login
          </Button> */}
                        </Toolbar>
                  </AppBar >



            </React.Fragment >
      );
}
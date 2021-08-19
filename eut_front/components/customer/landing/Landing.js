import React,{useState} from 'react';
import PropTypes from 'prop-types';
import { makeStyles,withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles((theme) => ({
  
  
  toolbarSecondary: {
    justifyContent: 'space-between',
    overflowX: 'auto',
    backgroundColor:'rgb(226, 226, 230)',
    color:'black',
    marginTop:theme.spacing(2),
    height:'70px',
    
    borderBottom: `1px solid ${theme.palette.divider}`,
  
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
  const { sections, title } = props;
  const [anchorEl, setAnchorEl] = React.useState(null );

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  

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
            href='/'
            className={classes.toolbarLink}
          >
            Home
          </Link>

          <Link
            color="inherit"
            noWrap
            variant="body2"
            href='/aboutl'
            className={classes.toolbarLink}
          >
            About Us
          </Link>

          <Link
            color="inherit"
            noWrap
            variant="body2"
            href='/dining'
            className={classes.toolbarLink}
          >
           Product
          </Link>

        <Button variant="outlined" size="small"><Link color="inherit" href='/signin' >
         LogIn
          </Link>
        </Button>
        
      </Toolbar>
    </React.Fragment>
  );
}

Header.propTypes = {
  sections: PropTypes.array,
  title: PropTypes.string,
};

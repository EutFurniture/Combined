import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
  
  
  toolbarSecondary: {
    justifyContent: 'space-between',
    overflowX: 'auto',
    backgroundColor:'rgb(226, 226, 230)',
    color:'black',
    height:'70px',
    
    borderBottom: `1px solid ${theme.palette.divider}`,
  
  },
  toolbarTitle:{
    fontWeight:'bold',
  },
  toolbarLink: {
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
login:{
  textDecoration:'none',
  '&:focus':{
   textDecoration:'none',
   
  },
  '&:hover':{ 
   textDecoration:'none',
  }
},
logbut:{
  fontWeight:'bold',
  backgroundColor:'black',
  color:'white',
  '&:focus':{
    backgroundColor:'black',
    color:'white',
    textDecoration:'none'
    
   },
   '&:hover':{ 
    backgroundColor:'black',
  color:'white',
  textDecoration:'none',
   }
}
  
}));



export default function Header(props) {
  const classes = useStyles();
  const { title } = props;
 

  

  

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

        <Button className={classes.logbut} size="small"><Link color="inherit" className={classes.login} href='/signin' >
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

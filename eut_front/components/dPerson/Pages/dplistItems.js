import React from 'react';
import { Link } from 'react-router-dom'
//import { makeStyles, withStyles } from "@material-ui/core/styles";
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import DashboardIcon from '@material-ui/icons/Dashboard';
import Search from '@material-ui/icons/Search';
import MyLocationIcon from '@material-ui/icons/MyLocation';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import DoneOutlineSharpIcon from '@material-ui/icons/DoneOutlineSharp';
import RoomSharpIcon from '@material-ui/icons/RoomSharp';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import PersonIcon from '@material-ui/icons/Person';
export const DpListItems = (
  <div  style={{backgroundColor: '#25255e'}}>
    <ListItem button component={Link} to="/DpDashboard">
      <ListItemIcon style={{color:'white'}}>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
    <ListItem button component={Link} to="/employee/ViewAvailableDelivery">
      <ListItemIcon style={{color:'white'}}>
      <Search />
      </ListItemIcon>
      <ListItemText primary="Available Delivery" />
    </ListItem>
    <ListItem button component={Link} to="/employee/AddReturnedItem">
      <ListItemIcon style={{color:'white'}}>
      <AddCircleOutlineIcon />
      </ListItemIcon>
      <ListItemText primary="Add Returned Item" />
    </ListItem>
    <ListItem button component={Link} to="/employee/ConfirmCashPay">
      <ListItemIcon style={{color:'white'}}>
        < CheckCircleIcon />
      </ListItemIcon>
      <ListItemText primary="ConfirmCashPay" />
    </ListItem>
    <ListItem button component={Link} to="/employee/ConfirmDelivery">
      <ListItemIcon style={{color:'white'}}>
        < DoneOutlineSharpIcon />
      </ListItemIcon>
      <ListItemText primary="ConfirmDelivery" />
    </ListItem>
    
    
    <ListItem button component={Link} to="/Maps">
      <ListItemIcon style={{color:'white'}}>
        < RoomSharpIcon />
      </ListItemIcon>
      <ListItemText primary="Maps" />
    </ListItem>
    

  <ListItem button component={Link} to="/Locate">
      <ListItemIcon style={{color:'white'}}>
        < MyLocationIcon />
      </ListItemIcon>
      <ListItemText primary="Locate Me" />
</ListItem> 

   <ListItem button component={Link} to="/employee/DpProfile">
      <ListItemIcon style={{color:'white'}}>
        <PersonIcon/>
      </ListItemIcon>
      <ListItemText primary="Profile" />
    </ListItem>
    <br/>
     
  {/*} <ListItem button component={Link} to="/CalendarEvent">
      <ListItemIcon style={{color:'white'}}>
        < MyLocationIcon />
      </ListItemIcon>
      <ListItemText primary="Events" />
</ListItem> 
<br/> */}
     
  </div>
);



export const Logout = (
  <div  style={{backgroundColor: '#25255e'}}>
    <ListItem button component={Link} to="/">
      <ListItemIcon >
        <PowerSettingsNewIcon style= {{fontSize:25, color:"white"}}/>
      </ListItemIcon >
      <strong><h4 >LOG OUT</h4></strong>
    </ListItem>
  </div>
)
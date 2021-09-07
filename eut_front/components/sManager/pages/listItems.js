import React from 'react';
import { Link } from 'react-router-dom'
//import { makeStyles, withStyles } from "@material-ui/core/styles";
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import DashboardIcon from '@material-ui/icons/Dashboard';
import PersonIcon from '@material-ui/icons/Person';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import UndoIcon from '@material-ui/icons/Undo';
import DateRangeIcon from '@material-ui/icons/DateRange';
import PeopleIcon from '@material-ui/icons/People';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import AssignmentIcon from '@material-ui/icons/Assignment';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';


export const mainListItems = (
  <div>
    <ListItem button component={Link} to="/sManager/pages/Dashboard">
      <ListItemIcon style={{color:'white'}}>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
    <ListItem button component={Link} to="/sManager/pages/ManageOrders">
      <ListItemIcon style={{color:'white'}}>
        <LocalShippingIcon />
      </ListItemIcon>
      <ListItemText primary="Orders" />
    </ListItem>


    <ListItem button component={Link} to="/sManager/pages/promotions">
      <ListItemIcon style={{color:'white'}}>
        <FormatListNumberedIcon />
      </ListItemIcon>
      <ListItemText primary="Promotions" />
    </ListItem>
    <ListItem button component={Link} to="/sManager/pages/payments">
      <ListItemIcon style={{color:'white'}}>
        <AttachMoneyIcon />
      </ListItemIcon>
      <ListItemText primary="Payments" />
    </ListItem>

    <ListItem button component={Link} to="/sManager/pages/ManageCustom">
      <ListItemIcon style={{color:'white'}}>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Manage Customers" />
    </ListItem>


    <ListItem button component={Link} to="/sManager/pages/GenerateReport">
      <ListItemIcon style={{color:'white'}}>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Generate Reports" />
    </ListItem>
    
  </div>
);



export const Logout = (
  <div>
    <ListItem button>
      <ListItemIcon >
        <PowerSettingsNewIcon style= {{fontSize:40,color:"red"}}/>
      </ListItemIcon >
      <strong><h1>LOGOUT</h1></strong>
    </ListItem>
  </div>
)
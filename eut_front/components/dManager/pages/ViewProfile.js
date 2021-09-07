import React, { useState, useEffect } from "react";
import axios from "axios";

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {useParams} from 'react-router-dom'
import { Form,Row,Col } from "react-bootstrap";
import {Link} from 'react-router-dom';
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
     
    },
    toolbar: {
      paddingRight: 24, // keep right padding when drawer closed
    },
  
    title: {
      flexGrow: 1,
    },
    user1:{
      width:'170px',
      height:'250px',
      marginTop:'20px',
      align:'center',
      marginLeft:'60px',
      borderRadius:'50px',
      borderWidth:'4px',
      borderColor:'rgb(37, 37, 94)'
     }
   
   
  }));

const styles = {
    
  updatebtn:{
    backgroundColor: '#9933CC',
    width: '200px',
    textDecoration: 'none',
    height: '100px',
    marginRight: '5px',
    fontSize: '17px',
    paddingLeft: '15px',
    paddingRight: '15px',
    paddingTop: '5px',
    paddingBottom: '5px',
    color: 'white',
    borderRadius: '7px',
    align:'right',
  },
 
  }

const dateOnly = (d) => {
  const date = new Date(d);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year} - ${month} - ${day}`;
};

export default function ViewProfile() {
  const { employee_id } = useParams();
  const [Dt, setDt] = useState([])
 
 useEffect(() => {
  const fetchData = async () => {
      const response = await axios.get('http://localhost:3001/ViewDeliveryManager', {
          params: {
              employee_id: employee_id,  
          }
          
      });

      setDt(response.data[0]);
         console.log(response.data[0]);

  };
  fetchData();
}, [employee_id]);

  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };


  return (
    
              <div>
              <Typography component="h1" variant="h6" color="inherit" align="center" width="100%" noWrap className={classes.title}>
                    <strong> VIEW PROFILE</strong>
              </Typography>
              <br></br>
              <div style={{display:"flex" , justifyContent:"space-even" , flexWrap:"wrap"}}>
                <div>
                  <img src={`/${Dt.emp_img}`} className={classes.user1} align='center'></img>
                </div>

                <div style={{width:'900px'}} >
                    <Form >
                    <Form.Group as={Row} controlId="formHorizontalName">
                        <Form.Label column lg={2} >
                        Employee ID :
                        </Form.Label>
                        <Col >
                        <Form.Label column lg={2} >
                        {Dt.id}
                        </Form.Label>
                        </Col>
                    </Form.Group><br/>
                    <Form.Group as={Row} controlId="formHorizontalName">
                        <Form.Label column lg={2} >
                        Full Name :
                        </Form.Label>
                        <Col >
                        <Form.Label column lg={2} >
                        {Dt.name}
                        </Form.Label>
                        </Col>
                    </Form.Group><br/>
                    <Form.Group as={Row} controlId="formHorizontalName">
                        <Form.Label column lg={2} >
                        NIC :
                        </Form.Label>
                        <Col >
                        <Form.Label column lg={2} >
                        {Dt.NIC}
                        </Form.Label>
                        </Col>
                    </Form.Group><br/>
                    <Form.Group as={Row} controlId="formHorizontalName">
                        <Form.Label column lg={2} >
                        Email :
                        </Form.Label>
                        <Col >
                        <Form.Label column lg={2} >
                        {Dt.email} 
                        </Form.Label>
                        </Col>
                    </Form.Group><br/>
                    <Form.Group as={Row} controlId="formHorizontalName">
                        <Form.Label column lg={2} >
                        Phone Number :
                        </Form.Label>
                        <Col >
                        <Form.Label column lg={2} >
                        {Dt.phone_no} 
                        </Form.Label>
                        </Col>
                    </Form.Group><br/>
                    <Form.Group as={Row} controlId="formHorizontalName">
                        <Form.Label column lg={2} >
                        Address :
                        </Form.Label>
                        <Col >
                        <Form.Label column lg={2} >
                          {Dt.address} 
                        </Form.Label>
                        </Col>
                    </Form.Group><br/>
                    
                    <Form.Group as={Row} controlId="formHorizontalName">
                        <Form.Label column lg={2} >
                        Job start Date :
                        </Form.Label>
                        <Col >
                        <Form.Label column lg={2} >
                        {dateOnly(Dt.job_start_date)}
                        </Form.Label>
                        </Col>
                    </Form.Group><br/>

                    </Form> 
                    <div align="right">
                      <Link  style={styles.updatebtn} to={location=>`/EditProfileRoute/${Dt.id}`} >  Edit Profile</Link>
                    </div>
                  </div>
              </div>
              </div>
              
              
          
        
  );
}

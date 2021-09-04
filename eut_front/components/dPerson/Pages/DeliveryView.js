import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useParams ,Link} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Table} from 'react-bootstrap';
import Typography from '@material-ui/core/Typography';

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

const styles = {
  viewbtn:{
  backgroundColor: '#33b5e5',
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
}
}

export default function DeliveryView(userData) {
  const { employee_id } = useParams();


  const [deliveryList,setDeliveryList]=useState([])
  useEffect(()=>{
    axios.get("http://localhost:3001/viewAvailableDelivery").then((response)=>{
      setDeliveryList(response.data)
    })
  },[])



    return(
      <div ><br/>
                <div className='box-main'>
                           
                </div>
        <Table striped bordered hover responsive>
        <thead className="tableheading">
          <tr>
            <th scope="col">Order ID</th>
            <th scope="col">Customer Name</th>
            <th scope='col'>Address</th>
            <th align="center">Phone Number</th>
            <th scope='col'>Action</th>
          </tr>
        </thead> 
     
       <tbody className="tablebody">
       {deliveryList.map((record)=>{
                       return(
              <tr>
              <th scope="row">{record.order_id}</th>
              <td>{record.fname}</td>
              <td>{record.address}</td>
              <td>{record.phone}</td>
              <td align="center">
              <Link style={styles.viewbtn} to={location=> `/employee/AvailableDeliveryInfoRoute/${record.order_id}`}> View </Link>
              
                  
              </td>
            </tr>
          )
        })}

             
          
        </tbody> 
      </Table>
    
   </div>
    );
      }

    
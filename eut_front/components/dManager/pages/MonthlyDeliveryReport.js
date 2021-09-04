import React,{ useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Table} from 'react-bootstrap';
import axios from "axios";

import MonthlyCashOnDeliveryReport from "./MonthlyCashOnDeliveryReport";
import Linechart from './Linechart';
import Donutchart from './Donutchart';
import MonthlyReturnReport from "./MonthlyReturnReport";
import Radial from "./Radial";
import MonthlyDeliverReport from "./MonthlyDeliverReport";
import Mychart from "./Mychart";

const dateOnly = (d) => {
  const date = new Date(d);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year} - ${month} - ${day}`;
};


export default function MonthlyDeliveryReport(){
  const [deliveryList,setDeliveryList]=useState([])
  useEffect(()=>{
    axios.get("http://localhost:3001/deliveryReport").then((response)=>{
      setDeliveryList(response.data)
    })
  },[])

  return(
    <div>
    <h2 style={{marginLeft:'20px'}}><b>Monthly Delivery Details</b></h2>
    <Table striped bordered hover responsive>
      <thead >
        <tr>
          <th scope="col">OrderId</th>
          <th scope="col">Customer</th>
          <th scope="col">Status</th>
          <th scope="col">Shipping to</th>
          <th scope="col">Delivery Date</th> 
         
        </tr>
      </thead>

     <tbody>
     {deliveryList.map((record)=>{
      return(
        <tr>
        <th scope="row">{record.order_id}</th>
        <td>{record.fname}</td>
        <td>{record.status}</td>
        <td>{record.address}</td>
        <td>{dateOnly(record.order_last_date)}</td>   
      </tr>
       )
       })}
        
      </tbody> 
    </Table>
    <Mychart/>
    <Linechart/>
    <h2 style={{marginLeft:'20px'}}><b>Monthly Cash On Delivery Details</b></h2>
    <MonthlyCashOnDeliveryReport/>
    <Donutchart/>
    <h2 style={{marginLeft:'20px'}}><b>Monthly Return Delivery Details</b></h2>
    <MonthlyReturnReport/>
    <Radial/>
    <h2 style={{marginLeft:'20px'}}><b>Monthly Deliver Details</b></h2>
    <MonthlyDeliverReport/>
    </div>
  
)

}

  

import React,{ useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Table} from 'react-bootstrap';
import axios from "axios";


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
        <td>{record.c_name}</td>
        <td>{record.o_status}</td>
        <td>{record.c_address}</td>
        <td>{dateOnly(record.order_last_date)}</td>   
      </tr>
       )
       })}
        
      </tbody> 
    </Table>
    </div>
  
)

}

  

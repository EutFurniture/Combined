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


export default function MonthlyDeliverReport(){
  const [cashList,setcashList]=useState([])
  useEffect(()=>{
    axios.get("http://localhost:3001/DeliverReport").then((response)=>{
      setcashList(response.data)
    })
  },[])

  return(
    <div>
    <Table striped bordered hover responsive>
      <thead >
        <tr>
          <th scope="col">Deliver</th>
          <th scope="col">Number of Orders</th>
        </tr>
      </thead>

     <tbody>
     {cashList.map((record)=>{
      return(
        <tr>
        <th scope="row">{record.name}</th>
        <td>{record.count}</td>
      </tr>
       )
       })}
        
      </tbody> 
    </Table>
    </div>
  
)

}

  

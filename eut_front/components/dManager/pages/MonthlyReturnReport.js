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


export default function MonthlyReturnReport(){
  const [cashList,setcashList]=useState([])
  useEffect(()=>{
    axios.get("http://localhost:3001/ReturnReport").then((response)=>{
      setcashList(response.data)
    })
  },[])

  return(
    <div>
    <Table striped bordered hover responsive>
      <thead >
        <tr>
          <th scope="col">OrderId</th>
          <th scope="col">Return Date</th>
          <th scope="col">Reason</th>
          <th scope="col">Status</th>
        </tr>
      </thead>

     <tbody>
     {cashList.map((record)=>{
      return(
        <tr>
        <th scope="row">{record.order_id}</th>
        <td>{dateOnly(record.return_date) }</td>
        <td>{record.reason}</td>
        <td>{record.return_status}</td>
        
      </tr>
       )
       })}
        
      </tbody> 
    </Table>
    </div>
  
)

}

  

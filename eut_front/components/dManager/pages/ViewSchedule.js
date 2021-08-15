import React ,{ useState, useEffect } from 'react';
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

export default function ViewSchedule()
{
  const [ScheduleList,setScheduledList]=useState([])
    useEffect(()=>{
      axios.get('http://localhost:3001/viewDeliverySchedule').then((response)=>{
        setScheduledList(response.data)
      })
    },[])
    
     return(  
  
              <Table striped bordered hover responsive>
              <thead >
                <tr>
                  <th scope="col">OrderId</th>
                  <th scope="col">DeliverId</th>
                  <th scope="col">Order Date</th>
                  <th scope="col">Last Date</th>
                </tr>
              </thead>

             <tbody>
                 {ScheduleList.map((record)=>{
                   return(
                    <tr>
                    <th scope="row">{record.order_id}</th>
                    <td>{record.employee_id}</td>
                    <td>{dateOnly(record.o_date)}</td>
                    <td>{dateOnly(record.order_last_date)}</td>                    
                  </tr>
                   )
                 })}
              </tbody> 
            </Table>
           
    
     )
    }


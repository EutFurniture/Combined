import "../css/manageEmployee.css";
import SearchIcon from '@material-ui/icons/Search';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Table} from 'react-bootstrap';

import React, { useState, useEffect } from "react";
import axios from "axios";


export default function LoadCustomer() {
  const [searchTerm,setSearchTerm]=useState("");
  const [employeeList,setEmployeeList]=useState([])
 useEffect(()=>{
   axios.get("http://localhost:3001/loadcustomer").then((response)=>{
     setEmployeeList(response.data)
   })
 },[])


  return(
              <div>
                <br/>
                   <div className="searchbar">
                   <input type="text" onChange={(e)=>{setSearchTerm(e.target.value);}} placeholder="Search"/>
                   <SearchIcon  className='searchicon'/>
                    </div><br/><br/>
              
              
                <Table striped bordered hover responsive>
                  <thead className="tableheading">
                    <tr>
                    <th scope="col">ID</th>
                  <th scope="col">Full Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Address</th>
                  <th scope="col">Phone No</th>
                  <th scope="col">Points</th>
                  <th scope="col">Order Frequency</th>
                    </tr>
                  </thead>
                 <tbody className="tablebody">
                     {employeeList.filter(val=>{if(searchTerm===""){
                       return val;
                     }else if(
                       val.name.toLowerCase().includes(searchTerm.toLowerCase()) || val.email.toLowerCase().includes(searchTerm.toLowerCase())
                       ||  val.address.toLowerCase().includes(searchTerm.toLowerCase()))
                     {
                       return val
                     }
                    }).map((record)=>{
                       return(
                        <tr>
                         <th scope="row">{record.customer_id}</th>
                         <td>{record.name}<br/></td>
                          <td>{record.email}</td>
                        <td>{record.address}</td>
                        <td>{record.phone_no}</td>
                        <td>{record.points}</td>
                        <td>{record.order_frequency}</td>
                        
                      </tr>
                       )
                     })}
                     
    
                    
                      
                    
                  </tbody> 
                </Table>
                </div> 
            
  )
}
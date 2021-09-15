import "../../../css/manageCustom.css";
import { Link, Switch } from "react-router-dom";
import SearchIcon from '@material-ui/icons/Search';
import { BrowserRouter as Router,  Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Table, Alert} from 'react-bootstrap';




export default function OrdersView() {
  const [searchTerm,setSearchTerm]=useState("");
  const [employeeList,setEmployeeList]=useState([])
 useEffect(()=>{
   axios.get("http://localhost:3001/sales_loadOrders").then((response)=>{
     setEmployeeList(response.data)
   })
 },[])


const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  if(modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }



  return(
 
              <div ><br/>
                <div className='box-main'>
                <div className="searchbar">
                   <input type="text" onChange={(e)=>{setSearchTerm(e.target.value);}} placeholder="Search by Status"/>
                   <SearchIcon  className='searchicon'/>
                </div>
                <Link  to='/sManager/pages/AddOrderForm' className="Addbtn"><AddCircleIcon style={{marginTop:'0px'}}/> Add New</Link>
               
                </div><br/>
               
                <Table striped bordered hover responsive>
                  <thead className="tableheading">
                    <tr>
                      <th scope="col">Order ID</th>
                      <th scope="col">Cust ID</th>
                      <th scope="col">Type</th>
                      <th scope="col">Quantity</th>
                      <th scope="col">Total </th>
                      <th scope="col">Status</th>
                      <th scope="col">Order Date</th>
                      <th scope="col">Due Date</th>
                     
                      <th>Action</th>
                    </tr>
                  </thead>
                 <tbody className="tablebody">
                     {employeeList.filter(val=>{if(searchTerm===""){
                       return val;
                     }else if(
                       val.status.toLowerCase().includes(searchTerm.toLowerCase()) ||  val.order_type.toLowerCase().includes(searchTerm.toLowerCase())
                       ) 
                     {
                       return val
                     }
                    }).map((record)=>{
                       return(
                        <tr>
                         <th scope="row"><br/>{record.order_id}</th>
                     
                         <td align="center"><br/>{record.customer_id}</td>
                         <td align="center">{record.order_type === "Showroom" ? <Alert variant="info">Showroom</Alert> : record.order_type === "Online" ? <Alert variant="primary">Online</Alert> : record.order_type === "Customized" ? <Alert variant="success">Customized</Alert> : record.order_type}</td>
                   
                         <td align="center"><br/>{record.quantity}</td>

                         <td align="center"><br/>Rs. {record.total_price}</td>



                     <td align="center">{record.status === "Completed" ? <Alert variant="success">Completed</Alert> : record.status === "Returned" ? <Alert variant="danger">Returned</Alert> : record.status === "Pending" ? <Alert variant="warning">Pending</Alert> : record.status}</td>
                     <td align="center"><br/>{record.o_date}</td>
                     <td align="center">{record.order_last_date == "00-00-00" ? <Alert variant="danger">Fill date</Alert> : <Alert variant="primary">{record.order_last_date}</Alert>}</td>
                     <td align="center"><br/>
                         
                          <Link to={location=> `/OrdersEdit/${record.order_id}`} className="updatebtn ">
                            Edit
                          </Link>
            
                        </td>
                      </tr>
                       )

                     
                     })}
                             
                  </tbody> 
                </Table>  
              </div>
           
  )
}




import React ,{useState,useEffect} from 'react';
import { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Table,Alert} from 'react-bootstrap';
import { Link} from "react-router-dom";
import SearchIcon from '@material-ui/icons/Search';
import axios from "axios";

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
},
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
},

searchbar:{
  display: 'flex', 
  width: '1200px',
  height: '40px',
  boxShadow: '0px 0px 12px -5px rgba(0, 0, 0, 0.75)',
},

input:{
  border:'none',
  fontSize:'18px',
  paddingLeft:'10px',
},

icon:{
  marginTop:'7px',
  marginLeft:'930px',
  color:'grey',
},

}

export default function ViewCashOnDelivery(){
  const [searchTerm, setSearchTerm] = useState("");
  const [cashList,setcashList]=useState([])
  useEffect(()=>{
    axios.get("http://localhost:3001/cashOnDelivery").then((response)=>{
      setcashList(response.data)
    })
  },[])
       
     return(  
          <div>
            <div style={styles.searchbar}>
            <input type="text" onChange={(e)=>{setSearchTerm(e.target.value);}} placeholder="Search" style={styles.input}/>
            <SearchIcon  className='searchicon' style={styles.icon}/>
            </div>
            <br></br>
  
              <Table striped bordered hover responsive>
              <thead >
                <tr>
                  <th scope="col">OrderId</th>
                  <th scope="col">DeliverId</th>
                  <th scope="col">Payable Amount</th>
                  <th scope="col">Payment</th>
                  <th scope="col">Order</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>

             <tbody>
             {cashList.filter(val=>{if(searchTerm == ""){
                 return val;
                }
                else if(
                  val.status.toLowerCase().includes(searchTerm.toLocaleLowerCase()) || val.payment_status.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())   )
                  {
                    return val
                  }
              }).map((record) => {
                   return(
                    <tr>
                    <th scope="row">{record.order_id}</th>
                    <td>{record.employee_id}</td>
                    <td>{record.total_price - record.advance_price}</td>
                    <td>{record.payment_status === "Paid" ? <Alert variant="success">Paid</Alert> : <Alert variant="secondary">Advance Paid</Alert>}</td>
                    <td>{record.status === "Completed" ? <Alert variant="success">Completed</Alert> : record.status === "Returned" ? <Alert variant="danger">Returned</Alert> : record.status === "Pending" ? <Alert variant="secondary">Pending</Alert> : record.status}</td>                    
                    <td>
                    <Link style={styles.viewbtn} to={location=> `/CashOnDeliveryInfoRoute/${record.order_id}`}> View </Link>
                    <Link style={styles.updatebtn} to={location=> `/UpdateCashOnDeliveryRoute/${record.order_id}`}> Update </Link>
                    </td>
                    
                  </tr>
                   )
                 })}
              </tbody> 
            </Table>

          </div>
           
    
     )
    }


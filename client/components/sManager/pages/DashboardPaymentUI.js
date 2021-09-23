import React ,{useState,useEffect} from 'react';
import { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Table,Alert} from 'react-bootstrap';
import { Link} from "react-router-dom";
import SearchIcon from '@material-ui/icons/Search';
import axios from "axios";
import Title from './Title';

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
  marginLeft:'120px',
  color:'grey',
},

}

export default function ViewCashOnDelivery(){
  const [searchTerm, setSearchTerm] = useState("");
  const [cashList,setcashList]=useState([]);

  
  useEffect(()=>{
    axios.get("http://localhost:3001/sales_cashOnDeliveryDashboard").then((response)=>{
      setcashList(response.data)
    })
  },[])
       
     return(  
          <div>
           <Title>Recent Payments </Title>
  
              <Table striped bordered hover responsive>
              <thead >
                <tr className="tableheading">

                  <th scope="col">Total</th>
                  <th scope="col">Advance</th>
                  <th scope="col">Rest</th>
                  <th scope="col">Payment</th>
                  <th scope="col">Method</th>
                  <th scope="col">Order</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
             

             <tbody>
             {cashList.map((record) => {
                   return(
                    <tr>
                    {/* <th scope="row"><br/>{record.order_id}</th> */}
                    <td><br/>Rs. {record.total_price}</td>
                    <td>{record.advance_price=== 0 ? <Alert variant="info">None</Alert> : <Alert variant="primary">Rs.{record.advance_price}</Alert>}</td>
                    <td>{record.payment_status === "Paid" ? <Alert variant="success">None (Rs.{record.total_price - record.advance_price})</Alert> : <Alert variant="warning">Rs.{record.total_price - record.advance_price}</Alert>}</td>
                    <td>{record.payment_status === "Paid" ? <Alert variant="success">Paid</Alert> : <Alert variant="warning">Partial</Alert>}</td>
                    <td>{record.payment_method === "cash on delivery" ? <Alert variant="info">Cash</Alert> : <Alert variant="primary">Card</Alert>}</td>
                    <td>{record.status === "Completed" ? <Alert variant="success">Completed</Alert> : record.status === "Returned" ? <Alert variant="danger">Returned</Alert> : record.status === "Pending" ? <Alert variant="warning">Pending</Alert> : record.status}</td>                    
                    <td align="center">
                      <br/>
                    <Link style={styles.viewbtn} to={location=> `/Sales_CashOnDeliveryInfoRoute/${record.order_id}`}> View </Link>
                    {/* <Link style={styles.updatebtn} to={location=> `/UpdateCashOnDeliveryRoute/${record.order_id}`}> Update </Link> */}
                    </td>
                    
                  </tr>
                   )
                 })}
              </tbody> 
            </Table>

          </div>
           
    
     )
    }


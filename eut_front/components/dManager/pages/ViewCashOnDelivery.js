import React from 'react';
import { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Table,Alert} from 'react-bootstrap';
import { Link} from "react-router-dom";

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
}

class ViewCashOnDelivery extends Component{
  constructor(props) {
    super(props);
    this.state = {
      records: [],
      isLoaded: false,
    };
  }

  componentDidMount() {
    fetch('http://localhost:3001/cashOnDelivery')
      .then(res => res.json())
      .then(result => {
        this.setState({
          isLoaded: true,
          records: result,
        });
      });
      
  }

    render(){
      // const viewCash =(order_id)=>{
      //   console.log(order_id);
      //   Axios.get(`http://localhost:3001/CashOnDeliveryInfo/${order_id}`);
      //   if(order_id){
      //     window.location.href='/dManager/pages/CashOnDeliveryInfo'
      //   }
      // }

      //const { records } = this.state;
     return(  
  
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
                 {this.state.records.map((record)=>{
                   return(
                    <tr>
                    <th scope="row">{record.order_id}</th>
                    <td>{record.employee_id}</td>
                    <td>{record.total_price - record.advance_price}</td>
                    <td>{record.payment_status === "Paid" ? <Alert variant="success">Paid</Alert> : <Alert variant="secondary">Advance Paid</Alert>}</td>
                    <td>{record.o_status === "Completed" ? <Alert variant="success">Completed</Alert> : record.o_status === "Returned" ? <Alert variant="danger">Returned</Alert> : record.o_status === "Pending" ? <Alert variant="secondary">Pending</Alert> : record.o_status}</td>                    
                    <td>
                    <Link style={styles.viewbtn} to={location=> `/CashOnDeliveryInfoRoute/${record.order_id}`}> View </Link>
                    <Link style={styles.updatebtn} to={location=> `/UpdateCashOnDeliveryRoute/${record.order_id}`}> Update </Link>
                    </td>
                    
                  </tr>
                   )
                 })}
              </tbody> 
            </Table>
           
    
     )
    }
}

export default ViewCashOnDelivery;

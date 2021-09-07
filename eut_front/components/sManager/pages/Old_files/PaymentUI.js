import '../../../App.css';
import React ,{useState} from 'react';

import Axios from 'axios';

import { Component } from 'react';

import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

class PaymentUI extends Component{
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false,
    };
  }

  componentDidMount()  {
    fetch('http://localhost:3001/sales_pposts')
      .then(res => res.json())
      .then(result => {
        this.setState({
          isLoaded: true,
          items: result
        });
      });
  }


 
   
  render(){
    const { items } = this.state;
      return (
       <Table striped bordered hover>
         <thead>
            <tr>
                  <td align="center"><h6>#</h6></td>
                  <td align="center"><h6>Order</h6></td>
                  <td align="center"><h6>Payments</h6></td>
                  <td align="center"><h6>Payment state</h6></td>
                  
              </tr>
          </thead>
          <tbody>
          {items.map(item => (

            <tr key={item.payment_id}>
                  <td align="center">{item.payment_id}</td>
                  <td align="center">{item.order_name}</td>
                  <td align="center">{item.payment}</td>
                  <td align="center">{item.payment_status}</td>
                 
               </tr>
               
          ))}
          </tbody>
      </Table>
      );
    }
  
  }

export default PaymentUI;
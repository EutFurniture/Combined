import React ,{useState} from 'react';
import '../../../App.css';

import Axios from 'axios';

import { Component } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

import ViewOrderPU from './ViewOrderPU';
import StatusOrderPU from './StatusOrderPU';
import DetailOrderPU from './DetailOrderPU';


class OrdersUI extends Component{
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false,
    };
  }



  componentDidMount()  {
    fetch('http://localhost:3001/OrdersUI')
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
         
          <td align="center"><h6>Status</h6></td>
          <td align="center"><h6>Cust ID</h6></td>
          <td align="center"><h6>Date</h6></td>
          <td align="center"><h6>DueDate</h6></td>
          <td align="center"><h6>Quantity</h6></td>
          <td align="center"><h6>Amount</h6></td>
         
          </tr>
          </thead>
          <tbody>
          {items.map(item => (
           
            <tr key={item.order_id}>
              <td align="center">{item.status}</td>
              <td align="center">{item.customer_id}</td>
              <td align="center">{item.o_date}</td>
              <td align="center">{item.order_last_date}</td>
              <td align="center">{item.quantity}</td>
              <td align="center">{item.total}</td>
            </tr>
                 
          ))}
        </tbody>
        </Table>
      );
    }
  
  }

export default OrdersUI;
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
          <td align="center"><h6>#</h6></td>
          <td align="center"><h6>Product</h6></td>
          <td align="center"><h6>Price</h6></td>
          <td></td>
          <td></td>
          <td></td>
         
          </tr>
          </thead>
          <tbody>
          {items.map(item => (
           
            <tr key={item.order_id}>
              <td align="center">{item.order_id}</td>
              <td align="center">{item.order_name}</td>
              <td align="center">{item.payment}</td>
              <td align="center"><StatusOrderPU/></td>
              <td align="center"><ViewOrderPU/></td>
              <td align="center"><DetailOrderPU/></td>
            </tr>
                 
          ))}
        </tbody>
        </Table>
      );
    }
  
  }

export default OrdersUI;
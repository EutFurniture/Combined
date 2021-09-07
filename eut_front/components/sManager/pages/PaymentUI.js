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
         <thead className="tableheading">
            <tr>  
                  <td align="center"><h6>ID</h6></td>
                  <td align="center"><h6>Order ID</h6></td>
                  <td align="center"><h6>Value</h6></td>
                  <td align="center"><h6>Payment Method</h6></td>
                  <td align="center"><h6>Payment status</h6></td>
                  <td align="center"><h6>Bill</h6></td>
                  <td align="center"><h6>View</h6></td>
                  
              </tr>
          </thead>
          <tbody>
          {items.map(item => (

            <tr key={item.payment_id}>
                  <td align="center">{item.payment_id}</td>
                  <td align="center">{item.order_id}</td>
                  <td align="center">{item.total_price}</td>
                  <td align="center">{item.payment_method}</td>
                  <td align="center">{item.payment_status}</td>
                  <td align="center"><img src={item.product_img} className='image'/></td>
                  <td align="center"><Button>view</Button></td>
                 
               </tr>
               
          ))}
          </tbody>
      </Table>
      );
    }
  
  }

export default PaymentUI;
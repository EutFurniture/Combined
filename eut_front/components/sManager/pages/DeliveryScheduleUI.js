import React ,{useState} from 'react';
import '../../../App.css';

import Axios from 'axios';

import { Component } from 'react';

import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

class DeliveryScheduleUI extends Component{
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false,
    };
  }

  componentDidMount()  {
    fetch('http://localhost:3001/sales_DeliverySchedule')
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
              <td align="center"><h6>Order Id</h6></td>
               <td align="center"><h6>Order Name</h6></td>
               <td align="center"><h6>Ordered Date</h6> </td>
               <td align="center"><h6>Due Date </h6></td>
               <td></td>
          </tr>
        </thead>
        
        <tbody>
          {items.map(item => (
           
            <tr key={item.order_id}>
              <td align="center">{item.order_id}</td>
              <td align="center">{item.order_name}</td>
              <td align="center">{item.date}</td>
              <td align="center">{item.due_date}</td>
              <td align="center"><Button>Update</Button></td>
            </tr>
       
          ))}
           </tbody>
        </Table>
     
      );
    }
  
  }

export default DeliveryScheduleUI;
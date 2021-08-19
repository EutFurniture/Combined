import React ,{useState} from 'react';
import '../../../App.css';

import Axios from 'axios';

import { Component } from 'react';

import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

class StatusOrderResult extends Component{
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false,
    };
  }

  componentDidMount()  {
    fetch('http://localhost:3001/OrdersStatus')
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
         
           <th>Ordered Date</th>
           <th>Due Date</th>
           <th>Status</th>
           
          </tr>
        </thead>
        
        <tbody>
          {items.map(item => (
           
            <tr key={item.order_id}>
             
              <td>{item.date}</td>
              <td>{item.due_date}</td>
              <td>{item.status}</td>
              
            </tr>
       
          ))}
           </tbody>
        </Table>
     
      );
    }
  
  }

export default StatusOrderResult;
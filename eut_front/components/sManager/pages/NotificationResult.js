import React ,{useState} from 'react';
import '../../../App.css';

import Axios from 'axios';

import { Component } from 'react';

import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

class NotificationResult extends Component{
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false,
    };
  }

  componentDidMount()  {
    fetch('http://localhost:3001/sales_NotificationUI')
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
         
           <th></th>
           
      
          </tr>
          <tr>
         
         <th></th>
         
    
        </tr>
         <tr>
         
           <th></th>
           
      
          </tr>
        </thead>
        
        <tbody>
          {items.map(item => (
           
            <tr key={item.order_id}>
             
              <td>{item.notification}</td>
              
            </tr>
       
          ))}
           </tbody>
        </Table>
     
      );
    }
  
  }

export default NotificationResult;
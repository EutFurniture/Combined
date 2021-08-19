import React ,{useState} from 'react';
import '../../../App.css';

import Axios from 'axios';

import { Component } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';


class NotificationUI extends Component{
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false,
    };
  }



  componentDidMount()  {
    fetch('http://localhost:3001/NotificationUI')
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
               <th>Ordered Date </th>
               <th>Due Date </th>
            </tr>
          </thead>
          {items.map(item => (
         
          <tbody>
            <tr key={item.notification_id}>
              <td><Button variant="light">{item.notification}</Button></td>
              <td>{item.received_time}</td>
            </tr>
            </tbody>
          ))}
          </Table>
  
      );
    }
  
  }

export default NotificationUI;
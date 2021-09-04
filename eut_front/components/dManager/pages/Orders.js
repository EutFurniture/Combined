import React from 'react';
import { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Table} from 'react-bootstrap';
import Title from './Title';

const dateOnly = (d) => {
  const date = new Date(d);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year} - ${month} - ${day}`;
};

class Orders extends Component{
  constructor(props) {
    super(props);
    this.state = {
      records: [],
      isLoaded: false,
    };
  }

  componentDidMount() {
    fetch('http://localhost:3001/deliverys')
      .then(res => res.json())
      .then(result => {
        this.setState({
          isLoaded: true,
          records: result,

        });
      });
      
  }

    render(){
      //const { records } = this.state;
     return(
       
      <React.Fragment>
      <Title>Recent Delivery Details</Title>
      
              <Table striped bordered hover responsive>
              <thead >
                <tr>
                  <th scope="col">OrderId</th>
                  <th scope="col">Last Date</th>
                  <th scope="col">Name</th>
                  <th scope="col">Ship To</th>
                  <th scope="col">Status</th>
                  <th scope="col">DeliverId</th>
                  

                </tr>
              </thead>

             <tbody>
                 {this.state.records.map((record)=>{
                   
                   return(
                     
                    <tr>
                    <th scope="row">{record.order_id}</th>
                    <td>{dateOnly(record.order_last_date)}</td>
                    <td>{record.fname}</td>
                    <td>{record.address}</td>
                    <td>{record.status}</td>
                    <td>{record.employee_id}</td>
                  </tr>
                   )
                 })}
                 

                
                  
                
              </tbody> 
            </Table>
            </React.Fragment>
     )
    }
}

export default Orders;


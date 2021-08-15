import React from "react";
import { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Table} from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert'
import { Link } from "react-router-dom";

const dateOnly = (d) => {
  const date = new Date(d);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year} - ${month} - ${day}`;
};

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

class ViewDelivery extends Component{
  constructor(props) {
    super(props);
    this.state = {
      records: [],
      isLoaded: false,
    };
  }

  componentDidMount() {
    fetch('http://localhost:3001/delivery')
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
            <Table striped bordered hover responsive>
              <thead >
                <tr>
                  <th scope="col">OrderId</th>
                  <th scope="col">Last Date</th>
                  <th scope="col">Name</th>
                  <th scope="col">Ship To</th>
                  <th scope="col">Status</th>
                  <th scope="col">DeliverId</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>

             <tbody>
                 {this.state.records.map((record)=>{
                   return(
                    <tr>
                    <th scope="row">{record.order_id}</th>
                    <td>{dateOnly(record.order_last_date)}</td>
                    <td>{record.c_name}</td>
                    <td>{record.c_address}</td>
                    <td>{record.o_status === "Completed" ? <Alert size = "small" variant="success">Completed</Alert> : record.o_status === "Returned" ? <Alert variant="danger">Returned</Alert> : record.o_status === "Pending" ? <Alert variant="secondary">Pending</Alert> :record.o_status === "Scheduled" ? <Alert variant="secondary">Scheduled</Alert> : record.o_status}</td>
                    <td>{record.employee_id === 0 ? <Alert variant="warning">Not Assign</Alert> : record.employee_id}</td>
                    <td>
                        <Link style={styles.viewbtn} to={location=> `/DeliveryInfoRoute/${record.order_id}`}> View </Link>
                        <Link style={styles.updatebtn} to={location=> `/UpdateDeliveryRoute/${record.order_id}`} >  Update </Link>
                    </td>
                  </tr>
                   )
                 })}
                
              </tbody> 
            </Table>
          
     )
    }
}

export default ViewDelivery;

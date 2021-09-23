import React from 'react';
import { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Table} from 'react-bootstrap';
import axios from 'axios'
import { Link } from "react-router-dom";
// import lLink from '@material-ui/core';

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
deletebtn:{
  backgroundColor: '#CC0000',
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
editbtn:{
  backgroundColor: '#ffbb33',
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

class ViewDelivers extends Component{
  constructor(props) {
    super(props);
    this.state = {
      records: [],
      isLoaded: false,
    };
  }

  componentDidMount() {
    fetch('http://localhost:3001/delivers')
      .then(res => res.json())
      .then(result => {
        this.setState({
          isLoaded: true,
          records: result
        });
      });
  }

  

    render(){
      const deleteDeliverPerson =(email)=>{
        axios.delete(`http://localhost:3001/deleteDeliver/${email}`);
      }
      
     return(
        
              <Table striped bordered hover responsive>
              <thead >
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Full Name</th>
                  <th scope="col">NIC</th>
                  <th scope="col">Mobile</th>
                  <th scope="col">Email</th>
                  <th>Action</th>
                </tr>
              </thead>

             <tbody>
                 {this.state.records.map((record)=>{
                   return(
                    <tr>
                    <th scope="row">{record.id}</th>
                    <td>{record.name}</td>
                    <td>{record.NIC}</td>
                    <td>{record.phone_no}</td>
                    <td>{record.email}</td>
                    
                    <td>
                    <Link style={styles.viewbtn} to={location=> `/DeliverInfoRoute/${record.id}`}> View </Link>
                    <Link style={styles.editbtn} to={location=> `/EditDeliversRoute/${record.id}`}> Edit </Link>
                     {/* <lLink style={styles.deletebtn} onClick={()=>{deleteDeliverPerson(record.email)}}>Delete</lLink>  */}
                    </td>
                  </tr>
                   )
                 })}
              </tbody> 
            </Table>
          
     )
    }
}

export default ViewDelivers;

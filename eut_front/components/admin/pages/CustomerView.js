import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Table} from 'react-bootstrap';
import { Component } from 'react';

class CustomerView extends Component{

    searchArray =[];

  constructor(props) {
    super(props);
    this.state = {
      records: [],
      isLoaded: false,
    };
  }

  componentDidMount()  {
    fetch('http://localhost:3001/loadCustomer')
      .then(res => res.json())
      .then(result => {
        this.setState({
          isLoaded: true,
          records: result
        });
      });
  }

 

//   onChangeHandler(e){
//       console.log(e.target.value);
//       let newArray = this.searchArray.filter((d)=>{
//           console.log(d);
//           let searchValue = d.name.toLowerCase();
//           return searchValue.indexOf(e.target.value !== -1
//     );
//       this.setState({records:newwArray})
//   }
    render(){
      const { records } = this.state;
     return(
      
      <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Username</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        <tr>
          <td>3</td>
          <td colSpan="2">Larry the Bird</td>
          <td>@twitter</td>
        </tr>
      </tbody>
    </Table>
         
     )
    }
}

export default CustomerView
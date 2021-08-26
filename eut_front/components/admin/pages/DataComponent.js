import React from 'react';
import CustomerChart from '../../charts/CustomerChart';
import OrderChart from '../../charts/OrderChart';
import CustomerData from './CustomerData';
import ReturnItem from './ReturnItem';
import CustomizeData from './CustomizeData'
import DeliveryData from './DeliveryData';

  
class DataComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          records: [],
          isLoaded: false,
        };
      }
    
      componentDidMount() {
        fetch('http://localhost:3001/CustomerReport')
          .then(res => res.json())
          .then(result => {
            this.setState({
              isLoaded: true,
              records: result,
    
            });
          });
          
      }
    

    render() {
      return (
          <div>
              <h2 style={{marginLeft:'20px'}}><b>Monthly Customer Details</b></h2>
        <table  className="table">
          <thead>
              <tr>
                <th>Customer ID</th>
               
                <th >Full Name</th>
                  <th >Email</th>
                  <th>Address</th>
                  <th>Phone No</th>
                  <th>Points</th>
                  <th>Order Frequency</th>
              </tr>
          </thead>
          <tbody>
          {this.state.records.map((record)=>{
                   return(
              <tr>
                <td>{record.customer_id}</td>
                <td>{record.fname}</td>
                <td>{record.email}</td>
                <td>{record.address}</td>
                <td>{record.phone}</td>
                <td>{record.points}</td>
                <td>{record.order_frequency}</td>
              </tr>
                   )
                })}
                
          </tbody>
          <caption>Customer Details</caption>
        </table> 
        <CustomerChart/> 
        <h2 style={{marginLeft:'20px'}}><b>Monthly Order Details</b></h2>
        <CustomerData />
        <OrderChart/>
        <h2 style={{marginLeft:'20px'}}><b>Monthly Return Item Details</b></h2>
        <ReturnItem />
        <h2 style={{marginLeft:'20px'}}><b>Monthly Customized Order Details</b></h2>
        <CustomizeData />
        <h2 style={{marginLeft:'20px'}}><b>Monthly Delivery Details</b></h2>
        <DeliveryData />
        </div>    
      );
    }
  }

  export default DataComponent;
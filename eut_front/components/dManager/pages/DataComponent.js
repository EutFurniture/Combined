import React from 'react';
import CustomerChart from '../../charts/CustomerChart';
import OrderChart from '../../charts/OrderChart';
import CustomerData from './CustomerData';
import ReturnItem from './ReturnItem';
import CustomizeData from './CustomizeData'
import DeliveryData from './DeliveryData';
import MonthlyDeliverReport from './MonthlyDeliverReport';


  
class DataComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          records: [],
          isLoaded: false,
        };
      }
    
      componentDidMount() {
        fetch('http://localhost:3001/DeliverReport')
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
              <h2 style={{marginLeft:'20px'}}><b>Monthly Deliver Details</b></h2>
        <table  className="table">
          <thead>
            <tr>
              <th scope="col">Deliver</th>
              <th scope="col">Number of Orders</th>
            </tr>
          </thead>
          <tbody>
          {this.state.records.map((record)=>{
                   return(
              <tr>
                <td>{record.e_name}</td>
                <td>{record.count}</td>
              </tr>
                   )
                })}
                
          </tbody>
          <caption>Customer Details</caption>
        </table> 
        <CustomerChart/> 
        <h2 style={{marginLeft:'20px'}}><b>Monthly Order Details</b></h2>
        <MonthlyDeliverReport />
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
import React from 'react';
const dateOnly = (d) => {
    const date = new Date(d);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year} - ${month} - ${day}`;
  };

  
class DeliveryData extends React.Component {

   

    constructor(props) {
        super(props);
        this.state = {
          records: [],
          isLoaded: false,
        };
      }
    
      componentDidMount() {
        fetch('http://localhost:3001/DeliveryReport')
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
        <table  className="table">
          <thead>
              <tr>
                <th>Order ID</th>
               
                <th >Product Name</th>
                  <th >Delivery Date</th>
                  <th>Status</th>
                 
                  
              </tr>
          </thead>
          <tbody>
          {this.state.records.map((record)=>{
                   return(
              <tr>
                <td>{record.order_id}</td>
                <td>{record.product_name}</td>
                <td>{dateOnly(record.order_last_date)}</td>
                <td>{record.status}</td>
              
             
              </tr>
                   )
                })}
                
          </tbody>
          <caption>Delivery Details</caption>
        </table>       
      );
    }
  }

  export default DeliveryData;
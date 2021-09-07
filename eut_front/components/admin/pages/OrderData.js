import React from 'react';
const dateOnly = (d) => {
    const date = new Date(d);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year} - ${month} - ${day}`;
  };

  
class OrderData extends React.Component {

   

    constructor(props) {
        super(props);
        this.state = {
          records: [],
          isLoaded: false,
        };
      }
    
      componentDidMount() {
        fetch('http://localhost:3001/OrderReport')
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
        <table style={{backgroundColor:'#f2f3f4'}} className="table">
          <thead>
              <tr>
                <th>Order ID</th>
               
                <th >Product Name</th>
                  <th >Order Date</th>
                  <th>Quantity</th>
                  <th>Total Price</th>
                  
              </tr>
          </thead>
          <tbody>
          {this.state.records.map((record)=>{
                   return(
              <tr>
                <td>{record.order_id}</td>
                <td>{record.product_name}</td>
                <td>{dateOnly(record.o_date)}</td>
                <td>{record.quantity}</td>
                <td>{record.total_price}</td>
             
              </tr>
                   )
                })}
                
          </tbody>
          <caption>Order Details</caption>
        </table>       
      );
    }
  }

  export default OrderData;
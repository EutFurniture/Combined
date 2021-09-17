// import '../../../App.css';
// import React ,{useState} from 'react';

// import Axios from 'axios';

// import { Component } from 'react';

// import Table from 'react-bootstrap/Table';
// import Button from 'react-bootstrap/Button';

// class PaymentUI extends Component{
//   constructor(props) {
//     super(props);
//     this.state = {
//       items: [],
//       isLoaded: false,
//     };
//   }

//   componentDidMount()  {
//     fetch('http://localhost:3001/sales_pposts')
//       .then(res => res.json())
//       .then(result => {
//         this.setState({
//           isLoaded: true,
//           items: result
//         });
//       });
//   }


 
   
//   render(){
//     const { items } = this.state;
//       return (
//        <Table striped bordered hover>
//          <thead className="tableheading">
//             <tr>  
//                   <td align="center"><h6>ID</h6></td>
//                   <td align="center"><h6>Order ID</h6></td>
//                   <td align="center"><h6>Value</h6></td>
//                   <td align="center"><h6>Payment Method</h6></td>
//                   <td align="center"><h6>Payment status</h6></td>
//                   <td align="center"><h6>Bill</h6></td>
//                   <td align="center"><h6>View</h6></td>
                  
//               </tr>
//           </thead>
//           <tbody>
//           {items.map(item => (

//             <tr key={item.payment_id}>
//                   <td align="center">{item.payment_id}</td>
//                   <td align="center">{item.order_id}</td>
//                   <td align="center">{item.total_price}</td>
//                   <td align="center">{item.payment_method}</td>
//                   <td align="center">{item.payment_status}</td>
//                   <td align="center"><img src={item.product_img} className='image'/></td>
//                   <td align="center"><Button>view</Button></td>
                 
//                </tr>
               
//           ))}
//           </tbody>
//       </Table>
//       );
//     }
  
//   }

// export default PaymentUI;

// import '../../../App.css';
// import React ,{useState} from 'react';

// import Axios from 'axios';

// import { Component } from 'react';

// import Table from 'react-bootstrap/Table';
// import Button from 'react-bootstrap/Button';

// class PaymentUI extends Component{
//   constructor(props) {
//     super(props);
//     this.state = {
//       items: [],
//       isLoaded: false,
//     };
//   }

//   componentDidMount()  {
//     fetch('http://localhost:3001/sales_pposts')
//       .then(res => res.json())
//       .then(result => {
//         this.setState({
//           isLoaded: true,
//           items: result
//         });
//       });
//   }


 
   
//   render(){
//     const { items } = this.state;
//       return (
//        <Table striped bordered hover>
//          <thead className="tableheading">
//             <tr>  
//                   <td align="center"><h6>ID</h6></td>
//                   <td align="center"><h6>Order ID</h6></td>
//                   <td align="center"><h6>Value</h6></td>
//                   <td align="center"><h6>Payment Method</h6></td>
//                   <td align="center"><h6>Payment status</h6></td>
                  
//                   <td align="center"><h6>View</h6></td>
                  
//               </tr>
//           </thead>
//           <tbody>
//           {items.map(item => (

//             <tr key={item.payment_id}>
//                   <td align="center">{item.payment_id}</td>
//                   <td align="center">{item.order_id}</td>
//                   <td align="center">{item.total_price}</td>
//                   <td align="center">{item.payment_method}</td>
//                   <td align="center">{item.payment_status}</td>
                
//                   <td align="center"><Button>view</Button></td>
                 
//                </tr>
               
//           ))}
//           </tbody>
//       </Table>
//       );
//     }
  
//   }

// export default PaymentUI;


import React ,{useState,useEffect} from 'react';
import { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Table,Alert} from 'react-bootstrap';
import { Link} from "react-router-dom";
import SearchIcon from '@material-ui/icons/Search';
import axios from "axios";

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

searchbar:{
  display: 'flex', 
  width: '1200px',
  height: '40px',
  boxShadow: '0px 0px 12px -5px rgba(0, 0, 0, 0.75)',
},

input:{
  border:'none',
  fontSize:'18px',
  paddingLeft:'10px',
},

icon:{
  marginTop:'7px',
  marginLeft:'120px',
  color:'grey',
},

}

export default function ViewCashOnDelivery(){
  const [searchTerm, setSearchTerm] = useState("");
  const [cashList,setcashList]=useState([]);

  
  useEffect(()=>{
    axios.get("http://localhost:3001/sales_cashOnDelivery").then((response)=>{
      setcashList(response.data)
    })
  },[])
       
     return(  
          <div>
            <div className="searchbar">
            <input type="text" onChange={(e)=>{setSearchTerm(e.target.value);}} placeholder="Search by Status" style={styles.input}/>
            <SearchIcon  className='searchicon' style={styles.icon}/>
            </div>
            <br></br>
  
              <Table striped bordered hover responsive>
              <thead >
                <tr className="tableheading">
                  <th scope="col">OrderId</th>
                  <th scope="col">Total</th>
                  <th scope="col">Advance</th>
                  <th scope="col">Rest</th>
                  <th scope="col">Payment</th>
                  <th scope="col">Method</th>
                  <th scope="col">Order</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>

             <tbody>
             {cashList.filter(val=>{if(searchTerm == ""){
                 return val;
                }
                else if(
                  val.status.toLowerCase().includes(searchTerm.toLocaleLowerCase()) || val.payment_status.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()) || val.payment_method.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())  )
                  {
                    return val
                  }
              }).map((record) => {
                   return(
                    <tr>
                    <th scope="row"><br/>{record.order_id}</th>
                    <td><br/>Rs. {record.total_price}</td>
                    <td><br/>Rs.{record.advance_price}</td>
                    <td>{record.payment_status === "Paid" ? <Alert variant="success">None (Rs.{record.total_price - record.advance_price})</Alert> : <Alert variant="warning">Rs.{record.total_price - record.advance_price}</Alert>}</td>
                    <td>{record.payment_status === "Paid" ? <Alert variant="success">Paid</Alert> : <Alert variant="warning">Partial</Alert>}</td>
                    <td>{record.payment_method === "cash on delivery" ? <Alert variant="info">Cash</Alert> : <Alert variant="primary">Card</Alert>}</td>
                    <td>{record.status === "Completed" ? <Alert variant="success">Completed</Alert> : record.status === "Returned" ? <Alert variant="danger">Returned</Alert> : record.status === "Pending" ? <Alert variant="warning">Pending</Alert> : record.status}</td>                    
                    <td align="center">
                      <br/>
                    <Link style={styles.viewbtn} to={location=> `/Sales_CashOnDeliveryInfoRoute/${record.order_id}`}> View </Link>
                    {/* <Link style={styles.updatebtn} to={location=> `/UpdateCashOnDeliveryRoute/${record.order_id}`}> Update </Link> */}
                    </td>
                    
                  </tr>
                   )
                 })}
              </tbody> 
            </Table>

          </div>
           
    
     )
    }


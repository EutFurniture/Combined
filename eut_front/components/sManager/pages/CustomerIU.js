import '../../../App.css';
import { useState } from 'react';
import Axios from 'axios';

import Button from 'react-bootstrap/Button';

import Table from 'react-bootstrap/Table';

function CustomerIU() {

  const [customer_id, setCustomer_id] = useState(0);
  const [o_date, setDate] = useState("");
  const [order_last_date, setDue_date] = useState("");
  const [order_description, setOrder_description] = useState("");
  const [total_price, setTotal_price] = useState(0);

  const [newDue_date, setNewDue_date] = useState("");
  //const [newAddress, setNewAddress] = useState("");
  //const [newPhone, setNewPhone] = useState(0);

  const [orderList, setOrderList] = useState([]);
  

  const addOrder = () => {
    Axios.post('http://localhost:3001/create_order', {
      customer_id: customer_id, 
      o_date: o_date, 
      order_last_date: order_last_date, 
      order_description: order_description, 
      total_price: total_price
    }).then(() => {
      setOrderList([
        ...orderList,
        {
          customer_id: customer_id, 
          o_date: o_date, 
          order_last_date: order_last_date, 
          order_description: order_description, 
          total_price: total_price,
        },
      ]);
    });
  };

  /*const displayInfo = () => {
    console.log(name + age + address + orders + loyalty);
  };*/

  const getOrders = () => {
    Axios.get('http://localhost:3001/order_check').then((response) => {
      setOrderList(response.data);
    });
  };

  const updateDate = (order_id) => {
    Axios.put("http://localhost:3001/updateDate", {order_last_date: newDue_date,  order_id: order_id}).then(
      (response) => {
        setOrderList(orderList.map((val) => {
          return val.order_id === order_id ? {order_id: val.order_id, order_last_date: val.due_date} : val
        }))
     }
    );
  };

  
  return (
    <div className="App">
       <div className="information">
          <label>Customer ID</label>
          <input type="text" className="pro_inp"
           onChange={(event) => {
            setCustomer_id(event.target.value);
          }}
          />
          <label>Date</label> 
          <input type="date" className="pro_inp"
           onChange={(event) => {
            setDate(event.target.value);
          }}
          />
          <label>Due Date</label> 
          <input type="date" className="pro_inp"
           onChange={(event) => {
            setDue_date(event.target.value);
          }}
          />
          <label>Order description</label> 
          <input type="text" className="pro_inp"
           onChange={(event) => {
            setOrder_description(event.target.value);
          }}
          />
          <label>Total Price</label> 
          <input type="text" className="pro_inp"
           onChange={(event) => {
            setTotal_price(event.target.value);
          }}
          />
            <br/>

          <Button variant="warning"  onClick={addOrder}>Add Order</Button>
         
       </div>
       <div>
          <br/>
          <hr/>
       </div>

     
       <div className="customers">

       <Button variant="warning"  onClick={getOrders}>Show Order List</Button>

       <br/>

       {orderList.map((val,key) => {
         return <div>
          <div className="customer_list">
          <Table striped bordered hover>
           <thead>
            <tr>
                  <th>ID</th>
                  <th>Customer ID</th>
                  <th>Date</th>
                  <th>Due Date</th>
                  <th>order_description</th>
                  <th>Total_price</th>
              </tr>
          </thead>
          <tbody>
           <tr>
           <td>{val.order_id}</td>
           <td>{val.customer_id}</td>
           <td>{val.o_date}</td>
           <td>{val.order_last_date}</td>
           <td>{val.order_description}</td>
           <td>{val.total_price}</td>
           </tr>
           
           {/*<tr>
          <td colSpan="6" align="right">
            <Button variant="danger" onClick={() => {deleteCustomer(val.id)}}>Delete</Button>
            </td>
           </tr>*/}

          </tbody>
          </Table>
        </div>
        <div className="customer_list">
          <Table striped bordered hover>
          <tbody>

          <tr>
           <td colSpan="4">
            {" "}
             <input type="date"   
              onChange={(event) => {
                setNewDue_date(event.target.value);
            }}
            />
            </td>
            <td colSpan="2" align="right">
            <Button variant="success" onClick={() => {updateDate(val.order_id)}}>Update</Button>
            </td>
          </tr>

          </tbody>
          </Table>
        </div>
        </div>
       
       })}
       
       </div>
    </div>
  );
}

export default CustomerIU;

import '../../../App.css';
import { useState } from 'react';
import Axios from 'axios';

import Button from 'react-bootstrap/Button';

import Table from 'react-bootstrap/Table';

function CustomerIU() {

  const [name, setName] = useState("");
  const [phone, setPhone] = useState(0);
  const [address, setAddress] = useState("");
  const [orders, setOrders] = useState("");
  const [loyalty, setLoyalty] = useState(0);

  const [newName, setNewName] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const [newPhone, setNewPhone] = useState(0);

  const [customerList, setCustomerList] = useState([]);
  

  const addCustomer = () => {
    Axios.post('http://localhost:3001/create', {
      name: name, 
      phone: phone, 
      address: address, 
      orders: orders, 
      loyalty: loyalty
    }).then(() => {
      setCustomerList([
        ...customerList,
        {
          name: name, 
          phone: phone, 
          address: address, 
          orders: orders, 
          loyalty: loyalty,
        },
      ]);
    });
  };

  /*const displayInfo = () => {
    console.log(name + age + address + orders + loyalty);
  };*/

  const getCustomers = () => {
    Axios.get('http://localhost:3001/customers').then((response) => {
      setCustomerList(response.data);
    });
  };

  const updateCustomerName = (id) => {
    Axios.put("http://localhost:3001/updateName", {name: newName,  id: id}).then(
      (response) => {
        setCustomerList(customerList.map((val) => {
          return val.id === id ? {id: val.id, name: newName, phone: val.phone, address: val.address, orders: val.orders, loyalty: val.loyalty} : val
        }))
     }
    );
  };

  
  const updateCustomerAddress = (id) => {
    Axios.put("http://localhost:3001/updateAddress", {address: newAddress,  id: id}).then(
      (response) => {
        setCustomerList(customerList.map((val) => {
          return val.id === id ? {id: val.id, name: val.name, phone: val.phone, address: newAddress, orders: val.orders, loyalty: val.loyalty} : val
        }))
     }
    );
  };


  const updateCustomerPhone = (id) => {
    Axios.put("http://localhost:3001/updatePhone", {phone: newPhone,  id: id}).then(
      (response) => {
        setCustomerList(customerList.map((val) => {
          return val.id === id ? {id: val.id, name: val.name, phone: newPhone, address: val.address, orders: val.orders, loyalty: val.loyalty} : val
        }))
     }
    );
  };



  const deleteCustomer = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
    setCustomerList(customerList.filter((val) => {
      return val.id !== id
    }))
  })
  };





  return (
    <div className="App">
       <div className="information">
          <label>Name</label>
          <input type="text" className="pro_inp"
           onChange={(event) => {
            setName(event.target.value);
          }}
          />
          <label>Phone</label> 
          <input type="number" className="pro_inp"
           onChange={(event) => {
            setPhone(event.target.value);
          }}
          />
          <label>Address</label> 
          <input type="text" className="pro_inp"
           onChange={(event) => {
            setAddress(event.target.value);
          }}
          />
          <label>Orders</label> 
          <input type="text" className="pro_inp"
           onChange={(event) => {
            setOrders(event.target.value);
          }}
          />
          <label>Loyalty (year)</label> 
          <input type="number" className="pro_inp"/>
            <br/>

          <Button variant="warning"  onClick={addCustomer}>Add Customer</Button>
         
       </div>
       <div>
          <br/>
          <hr/>
       </div>

     
       <div className="customers">

       <Button variant="warning"  onClick={getCustomers}>Show Customer List</Button>

       <br/>

       {customerList.map((val,key) => {
         return <div>
          <div className="customer_list">
          <Table striped bordered hover>
           <thead>
            <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Address</th>
                  <th>Order</th>
                  <th>Points</th>
              </tr>
          </thead>
          <tbody>
           <tr>
           <td>{val.id}</td>
           <td>{val.name}</td>
           <td>{val.phone}</td>
           <td>{val.address}</td>
           <td>{val.orders}</td>
           <td>{val.loyalty}</td>
           </tr>
           <tr>
          <td colSpan="6" align="right">
            <Button variant="danger" onClick={() => {deleteCustomer(val.id)}}>Delete</Button>
            </td>
          </tr>
          </tbody>
          </Table>
        </div>
        <div className="customer_list">
          <Table striped bordered hover>
          <tbody>

          <tr>
           <td colSpan="4">
            {" "}
             <input type="text" placeholder="name"  
              onChange={(event) => {
                setNewName(event.target.value);
            }}
            />
            </td>
            <td colSpan="2" align="right">
            <Button variant="success" onClick={() => {updateCustomerName(val.id)}}>Update</Button>
            </td>
           
          </tr>

          <tr>
           <td colSpan="4">
            {" "}
             <input type="text" placeholder="phone"  
              onChange={(event) => {
                setNewPhone(event.target.value);
            }}
            />
            </td>
            <td colSpan="2" align="right">
            <Button variant="success" onClick={() => {updateCustomerPhone(val.id)}}>Update</Button>
            </td>
          </tr>

          <tr>
           <td colSpan="4">
            {" "}
             <input type="text" placeholder="address"  
              onChange={(event) => {
                setNewAddress(event.target.value);
            }}
            />
            </td>
            <td colSpan="2" align="right">
            <Button variant="success" onClick={() => {updateCustomerAddress(val.id)}}>Update</Button>
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

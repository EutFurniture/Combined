import React from 'react'
import { Fragment,useEffect,useState} from 'react';
import './mad.css';
import Footer from './Footer';
import Axios from 'axios';
import { useParams } from "react-router-dom";
export default function  History (userData) {
    const { customer_id } = useParams();
    const [user,setUser]=useState([])
 
    useEffect(() => {
      const fetchData = async () => {
          const response = await Axios.get('http://localhost:3001/orderHistory', {
              params: {
                customer_id:userData.userData.customer_id,
                  
              }
          });
       
          setUser(response.data);
         
           
      };
      fetchData();
    }, [customer_id]);
    return (
        <Fragment>
   
        <div class="details">
           <h3>Order History</h3>  
                    <table class="tbl2 content-table">
                        <thead>
                            <tr>
                                <th>Order Id</th>
                                <th>Date</th>
                                <th>Product Image</th>
                                <th>Product Name</th>
                                <th> Quantity </th>
                                <th>Price</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                        <Fragment>
                            {user.map(item=>
                            <tr key={item.order_id}>
                                <td>{item.order_id}</td>
                                <td>{item.o_date}</td>
                                <td><img className="image"src={item.product_img} width="50"/></td>
                                <td>{item.product_name}</td>
                                <td>{item.quantity}</td>
                                <td>{item.price}</td>                               
                                <td>{item.status}</td>
                            </tr>
                            )}
                             </Fragment>
                            
                            
                        </tbody>
                    </table>

                </div>
               <Footer />
                </Fragment>


      
    )
}

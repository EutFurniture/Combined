import React, {Component,useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import Title from '../Title';
import Product from './Product';
//import {storeProducts} from '../../../../data';
import { ProductConsumer } from '../../../../context';
// import PropTypes from 'prop-types';
// import Modal from '../Modal';
// import Cart from '../Cart'
// import Blog from '../../blog/Blog'
//import { Navbar } from 'react-bootstrap';
import Navbar from '../Navbar';
import styled from 'styled-components';
import AddShoppingCart from '@material-ui/icons/AddShoppingCart';
import axios from 'axios';
import {  useParams } from "react-router-dom";
import Pproduct from "../../Pproduct";
import Footer from '../../Footer'
export default function ProductList (userData){
    const { customer_id } = useParams();

    const [product, setDt] = useState([])
    const [customerid, setcustomerid] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('http://localhost:3001/bed', {
                
            });

            setDt(response.data);

        };
        fetchData();
    }, []);

    const addToCart=(id,price)=>{
        const custid=userData.userData.customer_id;
        console.log(custid)
        console.log(id)
       axios.get('http://localhost:3001/checkproduct', {
         params: {
            cid: custid,
            pid:id,
            price:price
         }
     });
   }

	
   
  
    
      
          return(
              <React.Fragment>
             <Pproduct/>
            
                  <div className="py-5">
                  <Title name="Beds" />
                      <div className="container">
                         
                          
                          <div className="row">
                          
                              {
                                  product.map(item  => (
                                  
                                    <ProductWrapper className="col-9 mx-auto col-md-6 col-lg-3 my-3">
                                    <div className ="card" key={item.product_id}>
                                        
                                        
                                       
                                     
                                        <div className="img-container p-5">
                                        <Link to={location =>`/customer/detail/${item.product_id}`}>
                                        <img src={item.product_img} alt="proudct" className="card-img-top"/>
                                        </Link>
                                   
                                   
                                    <button className="cart-btn"  onClick={() => {
                                     //  console.log(product.product_id); 
                                      addToCart(item.product_id,item.price);
                                     
                                    //   this.openModal(product.product_id);
                                      
                                    }}>
                                  
                                   
                                    
                                    <AddShoppingCart />
                                   
                                 
                              
                                  </button> 
                                        </div>
                                        
                                       
                    
                                        
                                        <div className="card-footer d-flex justify-content-between">
                                            <p className="align-self-center mb-0 font-weight-bold">
                                                {item.product_name}
                                            </p>
                                            <h5 className="text-blue font-italic  mb-0">
                                                <span className="mr-1">Rs.</span>
                                                {item.price}
                                            </h5>
                                          
                                        </div>
                                        {/* { product.quantity > 0 ?
                                        <div>
                                            <button className="btn btn-sm btn-warning float-right" onClick={this.addToCart(product.product_id)}>Add to cart</button>
                                            <input type="number" value={this.state.quantity} name="quantity" onChange={this.handleInputChange} className="float-right" style={{ width: "60px", marginRight: "10px", borderRadius: "3px"}}/>
                                        </div> : 
                                        <p className="text-danger"> product is out of stock </p>
                                     } */}
                                         
                                    </div>
                                
                                </ProductWrapper>
                          
                                )
                                  
                                 )
                                 
                                      
                                  
                                  }
                         
                             
                          </div>
                      </div>
                  </div>
                <Footer /> 
              </React.Fragment>
                // <Product />
              
          )
    }
  
  const ProductWrapper = styled.div`
.card{
    border-color: transparent;
    transition: all 1s linear;
    height:100%;
}

.card-footer{
    background: transparent;
    border-top: transparent;
    transition: all 1s linear;
}
&:hover{
    .card{
        border:0.04rem solid rgba(0,0,0,0.2);
        box-shadow:2px 2px 5px 0px rgba(0,0,0,0.2)

    }
    .card-footer{
        backgrouns: rgba(247,247,247);
    }
}
.img-container{
    position:relative;
    overflow: hidden;
}
.card-img-top{
    transition: all 1s linear;
}
.img-container:hover .card-img-top{
    transform: scale(1.2);
}
.cart-btn{
    position: absolute;
    bottom:0;
    right:0;
    padding: 0.2rem 0.4rem;
    background:var(--lightBlue);
    border:none;
    color:var(--mainWhite);
    font-size:1.4rem;
    border-radius:0.5rem 0 0 0;
    transform: translate(100%, 100%);
    transition: all 1s linear;
}

.img-container:hover .cart-btn{
    transform: translate(0, 0);
}

.cart-btn:hover{
    color:var(--mainBlue);
    cursor: pointer;
}
`;

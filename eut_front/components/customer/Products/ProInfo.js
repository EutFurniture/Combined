import React, {useState,useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import {ButtonContainer} from './Button';
import axios from 'axios';
import Footer from '../Footer'
export default function ProInfo (){
    const [product, setproduct] = useState([])
    const{id}=useParams()
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('http://localhost:3001/Allproduct', {
                params:{id:id}
                
            });
            console.log(id);
            setproduct(response.data[0]);

        };
        fetchData();
    }, [id]);

    const propath =(catid)=>{
        if(catid == 1){
            window.location.href='/customer/dining';
        }
        else if(catid == 2){
            window.location.href='/customer/table';
        }
        else if(catid == 3){
            window.location.href='/customer/chair';
        }
        else if(catid == 4){
            window.location.href='/customer/sofa';
        }
        else if(catid == 5){
            window.location.href='/customer/bed';
        }


    }
        return(
            <React.Fragment>
              
               
                      <div className="container py-5">
                    
                      <div className="row">
                          <div className="col-10 mx-auto col-md-6 my-3 text-capitalize">
                                <img src={product.product_img} className="img-fluid" width="300" height="300" alt="product"/>
                          </div>
                          {/* Product text */}
                          <div className="col-10 mx-auto col-md-6 my-3 text-capitalize">
                                <h2 className="ttile">model : {product.product_name}</h2>  
                                {/* <h4 className="text-title text-uppercase text-muted mt-3 mb-2">
                                    made by: <span className="text-uppercase">
                                    {company}
                                    </span>
                                    
                                </h4> */}
                                <h4 className="text-blue">
                                    <strong>
                                        price:<span>Rs.</span>
                                        {product.price}
                                    </strong>
                                </h4>
                                <p className="text-capitalize font-weight-bold mt-3 mb-0">
                                    some info about the product:
                                </p>
                                <p className="text-muted lead">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                </p>
                                {/* buttons */}
                                <div>
                                    
                                        <ButtonContainer onClick={()=>propath(product.category_id)}>
                                            back to products
                                        </ButtonContainer>
                                    
                                    {/* <ButtonContainer
                                    cart
                                    disabled={inCart?true:false}
                                    onClick={() => {
                                      value.addToCart(id);
                                      value.openModal(id);
                                    }}
                                    >
                                        {inCart? 'inCart':'add to cart'}
                                    </ButtonContainer> */}
                                </div>
                          </div>
                      </div>
                      </div>
                  
              <Footer />
           
            </React.Fragment>
        );
    }

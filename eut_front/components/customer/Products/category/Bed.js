import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Title from '../Title';
//import styled from 'styled-components';
import './productstyle.css'
import axios from 'axios';
import { useParams } from "react-router-dom";
import Pproduct from "../../Pproduct";
import Footer from '../../Footer'
export default function ProductList(userData) {
    const { customer_id } = useParams();
    const [product, setDt] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('http://localhost:3001/bed', {

            });

            setDt(response.data);

        };
        fetchData();
    }, []);

    const addToCart = (id, price) => {
        const custid = userData.userData.customer_id;
        console.log(custid)
        console.log(id)

        axios.get('http://localhost:3001/checkproduct', {
            params: {
                cid: custid,
                pid: id,
                price: price
            }
        });
       
    }

    return (
        <React.Fragment>
            <Pproduct />

            <div className="py-5">
                <Title name="Dining" title="Set" />
                <div className="container">


                    <div className="row ">

                        {
                            product.map(item => (

                                <div className="col-8 mr-auto  col-md-6 col-lg-3 my-2 ">
                                    <div className="card" key={item.product_id}>




                                        <div className="img-container p-5">

                                            <Link to={location => `/customer/detail/${item.product_id}`}>
                                                <img src={item.product_img} alt="proudct" className="card-img-top" />
                                            </Link>


                                        </div>

                                        <div className="card_body">
                                            <h2>{item.product_name}</h2>
                                            <div className="price">
                                                <span>{item.currency}</span>
                                                <h6>{item.price}.00</h6>
                                            </div>
                                            <hr className="new" />
                                            <div className="cta_group">
                                                {item.quantity > 0 ?
                                                    <div>
                                                        <Link className="button-atc" onClick={() => {
                                                            addToCart(item.product_id, item.price)
                                                        }}>ADD to cart </Link>
                                                         
                                                    </div>
                                                   
                                                    
                                                    :
                                                    <p className="text"> product is out of stock </p>
                                                }

                                            </div>
                                        </div>



                                    </div>

                                </div>

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


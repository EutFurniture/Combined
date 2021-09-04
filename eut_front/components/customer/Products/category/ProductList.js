import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Title from '../Title';
import styled from 'styled-components';
import axios from 'axios';
import { useParams } from "react-router-dom";
import Pproduct from "../../Pproduct";
import Footer from '../../Footer'
export default function ProductList(userData) {
    const { customer_id } = useParams();
    const [product, setDt] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('http://localhost:3001/dining', {

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

                                <ProductWrapper className="col-8 mr-auto  col-md-6 col-lg-3 my-2 ">
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
                width:100%;
                height:95%;
                position: relative;
                border-radius: 10px;
               
                
               
}

&:hover{
    .card{
        background-color:rgb(119, 124, 126);
       
    }
    .new{
        border:1px solid white;
    } 
    .button-atc
   {
    color:white;

   }
   .text{
    color:red;
   }
}

          
      
           
  
}
            .img-container{
                position:relative;
            overflow: hidden;
            height:60%;
}
            .card-img-top{
                transition: all 1s linear;
               
}
            .img-container:hover .card-img-top{
                transform: scale(1.2);
               
}
         
.card_body{
    padding:0 5px;
    width:100%;
    height:65%;
    
}
.card_body h2{
    
        text-align: center;
        font-weight: bold;
        text-transform: uppercase;
        margin:10px 0;
        font-size: 17px;
        color: black;
        
        
    }
    .card_body p{
        text-align: center;
        font-size: 13px;
        line-height: 1.5;
        margin-bottom: 10px;
    }

.price_section{
    justify-content: space-between;
    display: flex;
    justify-content: center;
    align-items: center;
}
.price{
    display: flex;
    text-align:center;
    justify-content: center;
    align-items: center;
    color:rgb(190, 17, 17);
    font-size: 15px;
    }
.price span{
        margin-right: 6px;
        display:grid;
        font-size: 18px;
        font-weight:bold;
    }

    .price h6{
        margin-top: 8px;
       font-weight:bold;
        
    }
    .cta-group{
        display: flex;
        justify-content: center;
        align-items: center;
    }
            .button-atc{
            position:absolute;
            color: rgb(32, 119, 219);
            text-transform: uppercase;
            font-weight: bold;
            font-size: 16px;
            transition: all .3s ease-in-out;
           margin-left:28%;
           text-decoration:none;
           text-align:center;
           text-shadow:0px 4px 10px grey;   
}

           
            .img-container:hover .cart-btn{
                transform: translate(0, 0);
}
.text{
    text-align:center;
    font-weight:bold;
   font-size:20px;

}
.new{
    border:1px solid grey;
    margin-top:8%;
}
.new:hover{
    border:1px solid white;
}      
            `;

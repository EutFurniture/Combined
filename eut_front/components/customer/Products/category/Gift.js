import React, { Component, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Title from '../Title';
import styled from 'styled-components';
import axios from 'axios';
import { useParams } from "react-router-dom";
import Pproduct from "../../Pproduct";
import Footer from '../../Footer'
export default function Gift(userData) {
    const { customer_id } = useParams();

    const [product, setDt] = useState([])
    const [customer, setcustomer] = useState([])
    const [custpoint, setcustpoint] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('http://localhost:3001/gift', {

            });

            setDt(response.data);

        };
        fetchData();
    }, []);

    const orderToCart = async(id, price) => {
        const custid = userData.userData.customer_id;
        console.log(custid)
        console.log(id)
        const response1 = await axios.get('http://localhost:3001/customer', {
            params: {
                  customer_id: custid,
                  
              }
      });

    const  custpoint=response1.data[0].points;

      console.log(response1.data[0].points)
     if(custpoint >= price)
     {
      axios.get('http://localhost:3001/ordergift', {
            params: {
                cid: custid,
               
            }
        });
      const response3=await  axios.get('http://localhost:3001/ordergift_id', {
            params: {
                cid: custid,
               
            }
        });
        const o_id=response3.data[0].order_id;

        axios.get('http://localhost:3001/insertordergift', {
            params: {
                oid: o_id,
                pid:id,
                cid: custid,
                price:price,
            }
           
        });
        axios.get('http://localhost:3001/decreasepoint', {
            params: {
                cid: custid,
                price:price,
            }
           
        });
        alert("Successfully ordered.");
      

     }else{
           alert("your points not enough to get this gift.");
     }
      
    }

    return (
        <React.Fragment>
           

            <div className="py-5">
                <Title name="Select Your" title="Gift" />
                <div className="container">


                    <div className="row">

                        {
                            product.map(item => (

                                <ProductWrapper className="col-9 mx-auto col-md-6 col-lg-3 my-3">
                                    <div className="card" key={item.product_id}>




                                        <div className="img-container p-5">

                                            <Link to={location => `/customer/detail/${item.product_id}`}>
                                                <img src={item.product_img} alt="proudct" width='100' height='150' className="card-img-top" />
                                            </Link>


                                        </div>

                                        <div className="card_body">
                                            <h2>{item.product_name}</h2>
                                            <div className="price">
                                                <span>Points</span>
                                                <h6>{item.price}</h6>
                                            </div>
                                            <hr  className="new" />
                                            <div className="cta_group">
                                                {item.quantity > 0 ?
                                                    <div>
                                                        <Link className="button-atc" onClick={() => {
                                                            orderToCart(item.product_id, item.price)
                                                        }}>Order</Link>

                                                    </div> :
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
                height:100%;
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
            height:80%;
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
           margin-left:34%;
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

import React, { useState, useEffect } from 'react';
import CartColumns from './CartColumns';
import EmptyCart from './EmptyCart';
import axios from 'axios'
import { useParams, Link } from "react-router-dom";
import { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Footer from '../../Footer'
import DeleteIcon from '@material-ui/icons/Delete';
import {apiurl} from '../../../../utils/common'
import Navbar from '../../blog/Navbar'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
//import Link from '@material-ui/core/Link';
import IconButton from '@material-ui/core/IconButton';
import AddShoppingCart from '@material-ui/icons/AddShoppingCart';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Badge from '@material-ui/core/Badge';
const useStyles = makeStyles((theme) => ({
    container2: {
        marginLeft: '85%',
        marginBottom: '15%',
        marginTop: "3%",
    },
    total: {
        marginLeft: '-30%',
        fontWeight: 'bold',
        textAlign: 'center'

    },
    

}));
export default function Cart(userData) {
    const [cart, setCartdata] = useState([])
    const { customer_id } = useParams();
    const classes = useStyles();
    const [cartCount,setCartCount]=useState([]);
 const[order,setOrder]=useState([]);
    const id = userData.userData.customer_id

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(apiurl +'/getcart', {
                params: {
                    customer_id: id
                }
            });

            setCartdata(response.data);
            const response2=await axios.get(apiurl +'/cartCount',{
                params:{
                  customer_id:id,
                }
              })
               
              setCartCount(response2.data[0].count)
                
               
        };

       
        fetchData();
    }, [customer_id]);
    
    const increaseQuantity = async (customer_id, product_id, price) => {
        const response3 = await axios.get(apiurl +'/qut', {
            params: {
                pid: product_id
            }
        })
        const quty = response3.data[0].cquty;
        const quty1 = response3.data[0].pquty;
        if (quty < quty1) {
            axios.get(apiurl +'/increasequantity', {
                params: {
                    cid: customer_id,
                    pid: product_id,
                    price: price,
                }
            }).then((response) => {
                window.location.reload();
            })
        }
        else {
            alert("Only " + quty1 + " " + response3.data[0].product_name + " in the stock.");
        }
    }

    const decreaseQuantity = async (product_id, price) => {
        
        const response4= await axios.get(apiurl +'/qut', {
            params: {
                pid: product_id
            }
        })
        const quty = response4.data[0].cquty
        if (quty > 1) {
            axios.get(apiurl +'/decreasequantity', {
                params: {
                    cid: id,
                    pid: product_id,
                    price: price
                }
            }).then((response) => {
                window.location.reload();

            })
        }
        else {
            removeItem( product_id)
        }
    }


    function removeItem( product_id) {

        axios.get(apiurl +'/removeitem', {
            params: {
                cid: id,
                pid: product_id,
            }
        }).then((response) => {
             window.location.reload();
        })
    }

    function clearCart() {

        axios.get(apiurl +'/clearcart', {
            params: {
                cid: id,

            }
        }).then((response) => {
            window.location.reload();
        })
    }
    var totalprice = 0;
    var totalitems = 0;
    var total = 0;
    var advance = 0;
    cart.map(function (a) { return totalprice += a.price * a.quantity }, 0);
    cart.map(function (a) { return totalitems += 100 * a.quantity }, 0);
    cart.map(function (a) { return total = totalprice + totalitems }, 0);
    cart.map(function (a) { return advance = total * 0.2 }, 0);

    var roundadvance=Math.round(advance);
    
    
    const insertorder = async (total) => {

        axios.get(apiurl +'/orderproduct', {
            params: {
                cid: id,
                total:total,
                advance:roundadvance,


            }
        }).then((response) => {
            window.location.reload();
        })

        const response1=await  axios.get(apiurl +'/ordergift_id', {
            params: {
                cid:id,
               
            }
        });
        const o_id=response1.data[0].order_id;
        setOrder(response1.data[0].order_id);
        console.log(order);
        cart.map(function(a){
            
            return axios.get(apiurl +'/insertorderproduct', {
                params: {
                    oid: o_id,
                    pid:a.product_id,
                    quty:a.quantity,
                    total:a.totalprice
                }
               
            });
        
        
        
        });    

        clearCart();
        window.location.href=`/customer/checkout/${o_id}`;

    }

    return ( 
  <Fragment>


      {cartCount == 0 ? <EmptyCart /> :
        <Fragment>
       
            <CartColumns />

            <div className="container-fluid">
                {
                    cart.map(item => (
                        <div className="row my-2 text-capitalize text-center" key={item.cart_id}>
                            <div className="col-10 mx-auto col-lg-2">
                               <img src={item.product_img} style={{ width: '5rem', height: '5rem' }}
                                    className="img-fluid" alt="product" />
                            </div>
                            <div className="col-10 mx-auto col-lg-2">
                                <span className="d-lg-none">product : </span>
                                {item.product_name}
                            </div>
                            <div className="col-10 mx-auto col-lg-2">
                                <span className="d-lg-none">price : </span>
                                {item.price}
                            </div>
                            <div className="col-10 mx-auto col-lg-2 my-2 my-lg-0">
                                <div className="d-flex justify-content-center">
                                    <div>
                                        <span className="btn btn-black mx-1" onClick={() => decreaseQuantity( item.product_id, item.price)}>
                                            -
                                        </span>
                                        <span className="btn btn-black mx-1">
                                            {item.quantity}
                                        </span>
                                        <span className="btn btn-black mx-1" onClick={() => increaseQuantity(item.customer_id, item.product_id, item.price)}>
                                            +
                                        </span>

                                    </div>
                                </div>
                            </div>
                           
                            <div className="col-10 mx-auto col-lg-2">
                                <div className="cart-icon" onClick={() => removeItem(item.product_id)} >
                                    <DeleteIcon />
                                </div>
                            </div>
                            <div className="col-10 mx-auto col-lg-2">
                                <strong> item total : Rs.{item.totalprice}</strong>
                            </div>
                        </div>
                    ))
                }

            </div>
            <div className={classes.container2}>
                <div className="row">
                    <div className="col-10 mt-2 ml-sm-3 ml-md-2 col-sm-8 text-capitalize text-right">
                        <Link to='/customer/dining'>
                            <button id="cart-to" className="btn btn-primary text-uppercase mb-2 px-2 mr-2" type="button"
                                onClick={() => clearCart()}
                            >
                                clear cart
                            </button>
                        </Link>

                        <h5>
                            <span className={classes.total}>
                                subTotal:
                            </span>
                            <strong>Rs{totalprice}</strong>
                        </h5>
                        <h5>
                            <span className={classes.total}>
                                tax:
                            </span>
                            <strong className="mr-2">Rs{totalitems}</strong>
                        </h5>
                        <h5>
                            <span className={classes.total}>
                                total:
                            </span>
                            <strong>Rs{total}</strong>
                        </h5>
                        <button id="cart-to" onClick={() => insertorder(total)} className="btn btn-primary text-uppercase mb-2 px-3 mr-2">pay</button>
                    </div>
                </div>
            </div>
        
        </Fragment>
}
{/* <Link to={location =>`/customer/checkout/${userData.userData.customer_id}`} className="payment">Payhere</Link> */}

<Footer />
        </Fragment>  
      
      
    );
}








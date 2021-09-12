import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { PayHereButton } from 'react-payhere-button'
import { Fragment } from 'react';
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
    fontSize: 40,
    fontWeight: 600,
  },
  userimage: {
    height: 60,
    width: 60,
    borderRadius: 100,
    borderColor: 'white',

  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
    alignItems: 'center',
    justifyItems: 'center',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    marginLeft: '28%',
  },
  custom: {
    display: 'flex',
    paddingLeft: '20px',
    alignItems: 'center',
    justifyContent: 'center',
    height: '80px',
    paddingBottom: '10px',
    color: 'black',
    fontSize: '20px',
    width: '50%',

  },
  paper: {
    padding: theme.spacing(1),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fixedHeight: {
    height: 'auto',
  },
  maindash: {
    display: 'flex'
  },
  piechart: {
    display: 'flex'
  },
  pieleft: {
    width: '400px',
    marginLeft: '100px'
  },
  pieright: {
    width: '400px',
    marginLeft: '300px'
  },
  datesalign: {
    display: 'flex'
  },
  dateleft: {
    marginRight: '100px',
    marginBottom: '20px',
    marginLeft: '30px'
  },


}));

const styles = {
  side: {
    backgroundColor: 'rgb(37, 37, 94)',
  }
};


toast.configure()
const Notification = (userData) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const { todate } = useParams();
  const { fromdate } = useParams();
  const [user, setUser] = useState([])

  const OnSuccess = async (id) => {
    axios.get('http://localhost:3001/insertpayment', {
      params: {
        oid: id,

      }
    });
  }
  const OnfullSuccess = async (id) => {
    axios.get('http://localhost:3001/insertfullpayment', {
      params: {
        oid: id,

      }
    });
  }


  const [custproduct, setCusproduct] = useState([])
  useEffect(async () => {
    axios.get("http://localhost:3001/confirmproduct", {
      params: {
        customer_id: userData.userData.customer_id,
      }
    }).then((response) => {
      setCusproduct(response.data)
    })
    const response2 = await axios.get('http://localhost:3001/profile', {
      params: {
        customer_id: userData.userData.customer_id,

      }
    });

    setUser(response2.data[0]);


  }, [])


  const b = custproduct;
  console.log(b);




  const { id } = useParams();
  const [Dt, setDt] = useState([])

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const increaseQuantity = async (order_id, product_id, price, quantity) => {
    const response = await axios.get('http://localhost:3001/qut', {
      params: {
        pid: product_id
      }
    })


    axios.get('http://localhost:3001/increasecustquantity', {
      params: {
        oid: order_id,
        pid: product_id,
        price: price,

      }
    }).then((response) => {
      window.location.reload();
    })

    const qty = quantity + 1;
    const total_price = (price * qty) + (qty * 100)
    const advance = ((price * qty) + (qty * 100)) * 0.2
    axios.get('http://localhost:3001/insertcustorder', {
      params: {
        oid: order_id,
        price: price,
        quantity: qty,
        total_price: total_price,
        advance: advance,

      }
    }).then((response) => {
      window.location.reload();
    })


  }
  const decreaseQuantity = async (order_id, product_id, price, quantity) => {
    const response = await axios.get('http://localhost:3001/qut', {
      params: {
        pid: product_id
      }
    })

    const qty = quantity - 1;
    const total_price = (price * qty) + (qty * 100)
    const advance = ((price * qty) + (qty * 100)) * 0.2

    if (quantity > 1) {
      axios.get('http://localhost:3001/decreasecustquantity', {
        params: {
          oid: order_id,
          pid: product_id,
          price: price,

        }
      }).then((response) => {
        window.location.reload();

      })
      axios.get('http://localhost:3001/insertcustorder', {
        params: {
          oid: order_id,
          price: price,
          quantity: qty,
          total_price: total_price,
          advance: advance,


        }
      }).then((response) => {
        window.location.reload();
      })

    }

  }
  const OnDismissed = () => alert('onDismissed');
  const [activeStep, setActiveStep] = React.useState('');
  const handleNext = () => {
    setActiveStep("full");
  };

  const handleBack = () => {
    setActiveStep('advance');
  };





  return (
    <div className={classes.root}>
      <CssBaseline />

      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={1}>

            <Grid item xs={12}  >
              <Paper className={classes.custom}>
                <h3><b>Customized Order Payment</b></h3>

              </Paper>
              <Paper className={fixedHeightPaper}>



                {custproduct.map((record) => {
                  return (
                    <Fragment>
                      <div>
                        <p style={{ fontSize: '25px' }}>{record.product_name}</p>



                        <img src={record.product_img} alt="proudct" width='110' height='110' />
                        <br /><br />
                        <div>
                          <span className="btn btn-black mx-1" onClick={() => decreaseQuantity(record.order_id, record.product_id, record.price, record.quantity)}>
                            -
                          </span>
                          <span className="btn btn-black mx-1">
                            {record.quantity}
                          </span>
                          <span className="btn btn-black mx-1" onClick={() => increaseQuantity(record.order_id, record.product_id, record.price, record.quantity)}>
                            +
                          </span>

                        </div>
                        <br />
                        <p>SubTotal:-Rs.{record.total}.00</p>
                        <p>Tax     :-Rs.{record.quantity * 100}.00</p>
                        <p>Total   :-Rs.{record.total_price}.00</p>





                      </div>

                      <p>Select your payment method</p>
                      <span> <input type="radio" value="Full" name="method" onClick={handleNext} />Full payment</span>
                      <span><input type="radio" value="Advance" name="method" onClick={handleBack} />Advance Payment</span><br />
                      {activeStep === 'full' ?
                        <Fragment>
                          <p> Now you need to pay full ammount Rs.{record.total_price}</p>
                          <div className={classes.buttons}>

                            <PayHereButton
                              sandbox={true}
                              merchant_id={'1218334'}
                              onCompleted={OnfullSuccess(record.order_id)}
                              onDismissed={OnDismissed}
                              //onError={onError}
                              // order_id={custproduct.order_id}
                              // items={custproduct.product_name}
                              amount={record.total_price}

                              currency={'LKR'}
                              full_name={user.fname}
                              email={user.email}
                              phone={user.phone}
                              address={user.address}
                              city={user.city}
                              country={'Sri Lanka'}
                              options={{
                                delivery_address: 'No. 123, Galle road, Colombo 03',
                                delivery_city: 'Kollupitiya',
                                delivery_country: 'Sri Lanka',
                                custom_1: '',
                                custom_2: '',
                                return_url: 'http://sample.com/return',
                                cancel_url: 'http://sample.com/cancel',
                                notify_url: 'http://sample.com/notify',
                              }}
                            />

                          </div>
                        </Fragment> :
                        <Fragment>
                          <p> Now you need to pay advance ammount Rs.{record.advanced_price}</p>
                          <div className={classes.buttons}>


                            <PayHereButton
                              sandbox={true}
                              merchant_id={'1218334'}
                              onCompleted={OnSuccess(record.order_id)}
                              onDismissed={OnDismissed}
                              //onError={onError}
                              //order_id={custproduct.order_id}
                              //items={custproduct.product_name}
                              amount={record.advanced_price}

                              currency={'LKR'}
                              full_name={user.fname}
                              email={user.email}
                              phone={user.phone}
                              address={user.address}
                              city={user.city}
                              country={'Sri Lanka'}
                              options={{
                                delivery_address: 'No. 123, Galle road, Colombo 03',
                                delivery_city: 'Kollupitiya',
                                delivery_country: 'Sri Lanka',
                                custom_1: '',
                                custom_2: '',
                                return_url: 'http://sample.com/return',
                                cancel_url: 'http://sample.com/cancel',
                                notify_url: 'http://sample.com/notify',
                              }}
                            />

                          </div>
                        </Fragment>
                      }



                    </Fragment>)


                })}







                <br />



              </Paper>
            </Grid>
          </Grid>


        </Container>
      </main>
    </div>
  );
}

export default Notification;



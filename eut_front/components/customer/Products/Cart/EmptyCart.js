import React from 'react'
import { Fragment } from 'react'
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    container: {
       
        marginBottom: '18%',
        marginTop: "5%",
    },
  

}));
export default function EmptyCart() {
    const classes = useStyles();
    return (
        <Fragment>
       
        <div className={classes.container}>
            <div className="row">
              <div className="col-10 mx-auto text-center text-title">
                  <h1>your cart is currently empty</h1>
                  </div>  
            </div>
            
        </div>
        </Fragment>
    )
}

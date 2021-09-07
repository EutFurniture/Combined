import { BrowserRouter as Router, Route, Switch, Link, useParams } from "react-router-dom";
import AcceptOrder from './AcceptOrder'
import Cust_OrderAccept from "./Cust_OrderAccept";
const Customize=()=>{
    return(
        <div>
            <Switch>
                <Route path="/Customize/:customer_id/:cus_product_id">
                    <AcceptOrder />
                </Route>
            </Switch>
        </div>
    )
}

export default Customize;
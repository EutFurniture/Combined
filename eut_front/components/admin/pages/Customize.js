import { BrowserRouter as Router, Route, Switch, Link, useParams } from "react-router-dom";
import Cust_OrderAccept from './Cust_OrderAccept'
const Customize=()=>{
    return(
        <div>
            <Switch>
                <Route path="/Customize/:cus_product_id">
                    <Cust_OrderAccept />
                </Route>
            </Switch>
        </div>
    )
}

export default Customize;
import { Route, Switch } from "react-router-dom";
import AcceptOrder from './AcceptOrder'

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
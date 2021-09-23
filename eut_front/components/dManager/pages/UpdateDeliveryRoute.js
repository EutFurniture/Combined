import { Route, Switch } from "react-router-dom";
import UpdateDelivery from './UpdateDelivery'

const UpdateDeliveryRoute=()=>{
    return(
        <div>
            <Switch>
                <Route path="/UpdateDeliveryRoute/:order_id">
                    <UpdateDelivery/>
                </Route>
            </Switch>
        </div>
    )
}

export default UpdateDeliveryRoute;
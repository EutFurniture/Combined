import { Route, Switch } from "react-router-dom";
import UpdateCashOnDeliveryBill from './UpdateCashOnDeliveryBill'

const UpdateCashOnDeliveryBillRoute=()=>{
    return(
        <div>
            <Switch>
                <Route path="/UpdateCashOnDeliveryBillRoute/:payment_id">
                    <UpdateCashOnDeliveryBill />
                </Route>
            </Switch>
        </div>
    )
}

export default UpdateCashOnDeliveryBillRoute;
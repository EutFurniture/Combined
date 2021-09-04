import { Route, Switch } from "react-router-dom";
import UpdateReturnDetail from './UpdateReturnDetail'

const UpdateReturnDetailRoute=()=>{
    return(
        <div>
            <Switch>
                <Route path="/employee/UpdateReturnDetailRoute/:order_id">
                    <UpdateReturnDetail/>
                </Route>
            </Switch>
        </div>
    )
}

export default UpdateReturnDetailRoute;
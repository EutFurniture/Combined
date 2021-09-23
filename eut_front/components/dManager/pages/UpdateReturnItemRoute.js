import {  Route, Switch } from "react-router-dom";
import UpdateReturnItem from './UpdateReturnItem';

const UpdateReturnItemRoute=()=>{
    return(
        <div>
            <Switch>
                <Route path="/UpdateReturnItemRoute/:order_id">
                    <UpdateReturnItem/>
                </Route>
            </Switch>
        </div>
    )
}

export default UpdateReturnItemRoute;
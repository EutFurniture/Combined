import {Route, Switch } from "react-router-dom";
import EditDelivers from './EditDelivers';

const EditDeliversRoute=()=>{
    return(
        <div>
            <Switch>
                <Route path="/EditDeliversRoute/:employee_id">
                    <EditDelivers/>
                </Route>
            </Switch>
        </div>
    )
}

export default EditDeliversRoute;
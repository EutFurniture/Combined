import {Route, Switch } from "react-router-dom";
import EditProfile from './EditProfile';

const EditProfileRoute=()=>{
    return(
        <div>
            <Switch>
                <Route path="/EditProfileRoute/:employee_id">
                    <EditProfile/>
                </Route>
            </Switch>
        </div>
    )
}

export default EditProfileRoute;
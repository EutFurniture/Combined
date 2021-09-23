import {Route, Switch } from "react-router-dom";
import UpdateProfile from './UpdateProfile';

const EditPro=()=>{
    return(
        <div>
            <Switch>
                <Route path="/EditPro/:id">
                    <UpdateProfile/>
                </Route>
            </Switch>
        </div>
    )
}

export default EditPro;
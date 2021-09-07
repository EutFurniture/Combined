import { BrowserRouter as Router, Route, Switch, Link, useParams } from "react-router-dom";
import CustomInfo from './CustomInfo'
const Custom=()=>{
    return(
        <div>
            <Switch>
                <Route path="/Custom/:customer_id">
                    <Customnfo />
                </Route>
            </Switch>
        </div>
    )
}

export default Employee;
import { BrowserRouter as Router, Route, Switch, Link, useParams } from "react-router-dom";
import ProInfo from './ProInfo'
const Employee=()=>{
    return(
        <div>
            <Switch>
                <Route path="/customer/detail/:id">
                    <ProInfo />
                </Route>
            </Switch>
        </div>
    )
}

export default Employee;
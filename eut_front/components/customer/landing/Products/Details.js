import { BrowserRouter as Router, Route, Switch, Link, useParams } from "react-router-dom";
import ProInfo from './ProInfo'
const Employee=()=>{
    return(
        <div>
            <Switch>
                <Route path="/detaill/:id">
                    <ProInfo />
                </Route>
            </Switch>
        </div>
    )
}

export default Employee;
import { BrowserRouter as Router, Route, Switch, Link, useParams } from "react-router-dom";
import GiftInfo from './GiftInfo'
const Gift=()=>{
    return(
        <div>
            <Switch>
                <Route path="/Gift/:ID">
                    <GiftInfo />
                </Route>
            </Switch>
        </div>
    )
}

export default Gift;
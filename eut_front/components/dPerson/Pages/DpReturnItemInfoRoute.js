import {Route, Switch} from "react-router-dom";

import DpReturnItemInfo from './DpReturnItemInfo'

const DpReturnItemInfoRoute=()=>{
    return(
        <div>
            <Switch>
                <Route path="/employee/DpReturnItemInfoRoute/:order_id">
                    <DpReturnItemInfo/>
                </Route>
            </Switch>
        </div>
    )
}

export default DpReturnItemInfoRoute;
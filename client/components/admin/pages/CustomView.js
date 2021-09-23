import { BrowserRouter as Router, Route, Switch, Link, useParams } from "react-router-dom";
import CustomizeInfo from './CustomizeInfo'
const CustomView=()=>{
    return(
        <div>
            <Switch>
                <Route path="/CustomView/:cus_product_id">
                    <CustomizeInfo />
                </Route>
            </Switch>
        </div>
    )
}

export default CustomView;
import { BrowserRouter as Router, Route, Switch, Link, useParams } from "react-router-dom";
import EditCategory from './EditCategory'
const Category=()=>{
    return(
        <div>
            <Switch>
                <Route path="/Category/:category_id">
                    <EditCategory />
                </Route>
            </Switch>
        </div>
    )
}

export default Category;
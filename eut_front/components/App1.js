import React, {useEffect,useState} from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Axios from 'axios';
import { useParams } from "react-router-dom";
import ViewAvailableDelivery from './components/dPerson/pages/ViewAvailableDelivery';
import LoginScreen from './components/Login/Pages/LoginScreen';
import DpProfile from './components/dPerson/pages/DpProfile';
import UpdateEprofile from './components/dPerson/pages/UpdateEprofile';
import AddReturnedItem from './components/dPerson/pages/AddReturnedItem';
import ConfirmCashPay from './components/dPerson/pages/ConfirmCashPay';
import ConfirmDelivery from './components/dPerson/pages/ConfirmDelivery';
import Maps from './components/dPerson/pages/Maps';
import Locate from './components/dPerson/pages/Locate';
import DpDashboard from './components/dPerson/pages/DpDashboard';
import AvailableDeliveryInfo from './components/dPerson/pages/AvailableDeliveryInfo';
import AvailableDeliveryInfoRoute from './components/dPerson/pages/AvailableDeliveryInfoRoute';
import DpReturnItemInfo from './components/dPerson/pages/DpReturnItemInfo';
import DpReturnItemInfoRoute from './components/dPerson/pages/DpReturnItemInfoRoute';
import UpdateReturnDetail from './components/dPerson/pages/UpdateReturnDetail';
import UpdateReturnDetailRoute from './components/dPerson/pages/UpdateReturnDetailRoute';
import UpdateCashOnDeliveryBill from './components/dPerson/pages/UpdateCashOnDeliveryBill';
import UpdateCashOnDeliveryBillRoute from './components/dPerson/pages/UpdateCashOnDeliveryBillRoute';
import UpdateConDeliveryRoute from './components/dPerson/pages/UpdateConDeliveryRoute';
import UpdateConDelivery from './components/dPerson/pages/UpdateConDelivery';


const App1 = () => {
    const[LoginSt, setLoginSt] = useState();
    const[email, setEmail] = useState();
    const[user , setUser] = useState([]);
    const { employee_id } = useParams();
  
    useEffect(() => {
  
        const fetchData = async () => {
            
            const response = await Axios.get("http://localhost:3001/login");

         if (response.data.loggedIn) {

           const nm= response.data.user[0].employee_id;
            const response1 = await Axios.get('http://localhost:3001/employee', {
              params: {
               employee_id: nm
             }
            });
            
               setEmail(response.data.user);
             
               const element = (
               <div>
                
               <div>
                <Switch>
                <Route path='/employee/ViewAvailableDelivery'  >
                <ViewAvailableDelivery  userData={response1.data[0]}  />
                </Route>
              
                <Route path='/employee/AddReturnedItem'  >
                < AddReturnedItem  userData={response1.data[0]}  />
                </Route>

                <Route path='/employee/ConfirmCashPay'  >
                < ConfirmCashPay  userData={response1.data[0]}  />
                </Route>

                <Route path='/employee/ConfirmDelivery'  >
                <ConfirmDelivery  userData={response1.data[0]}  />
                </Route>

                 <Route path='/employee/DpProfile'  >
                <DpProfile  userData={response1.data[0]}  />
                </Route>
              

                <Route path='/employee/updateEprofile'  >
                < UpdateEprofile userData={response1.data[0]} />
               </Route>
          
               <Route path='/employee/AvailableDeliveryInfo'  >
                <AvailableDeliveryInfo userData={response1.data[0]} />
               </Route>

               <Route path='/employee/AvailableDeliveryInfoRoute'  >
                <AvailableDeliveryInfoRoute userData={response1.data[0]} />
               </Route>
               
               <Route path='/employee/DpReturnItemInfo'  >
                <DpReturnItemInfo userData={response1.data[0]} />
               </Route>

               <Route path='/employee/DpReturnItemInfoRoute'  >
                <DpReturnItemInfoRoute userData={response1.data[0]} />
               </Route>

               <Route path='/employee/UpdateReturnDetail'  >
                <UpdateReturnDetail userData={response1.data[0]} />
               </Route>

               <Route path='/employee/UpdateReturnDetailRoute'  >
                <UpdateReturnDetailRoute userData={response1.data[0]} />
               </Route>
              
               <Route path='/employee/UpdateCashOnDeliveryBill'  >
                <UpdateCashOnDeliveryBill userData={response1.data[0]} />
               </Route>

               <Route path='/employee/UpdateCashOnDeliveryBillRoute'  >
                < UpdateCashOnDeliveryBillRoute userData={response1.data[0]} />
               </Route>

               
               <Route path='/employee/UpdateConDelivery'  >
                <UpdateConDelivery userData={response1.data[0]} />
               </Route>

               <Route path='/employee/UpdateConDeliveryRoute'  >
                <UpdateConDeliveryRoute userData={response1.data[0]} />
               </Route>

             </Switch>
              </div>
             
              </div>       
                );
  
               setLoginSt(element);
            }
         else{
             const element = (<LoginScreen />);
              setLoginSt(element);
          } 
           
  
        };
        fetchData();
    },[employee_id]);
  
    return (
        <div className="">
  
                {LoginSt}
            
        </div>
    );
  };
  
  export default App1;
  
  
           
             
             
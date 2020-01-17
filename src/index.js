import React from 'react';
import ReactDOM from 'react-dom';
import {Provider } from "react-redux";
import {store} from "./store/store"
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import { Route,  BrowserRouter as Router, withRouter, Redirect, Switch } from 'react-router-dom';
import Authenticate from "./components/authentication"
ReactDOM.render(
<Provider store={store}>
    
        <Router  >
    <Switch>
             <Route exact path="/" > <Authenticate /> </Route>
             <Route  path="/App" > 
             {
                window.localStorage.getItem("accessToken")? <App />: <Authenticate/>
            }
              </Route>
            
            {/* <Authenticate excat path="/" /> */}
            <Route path="*"> <center><h1> 404 </h1> </center></Route>
</Switch>

        
         
        </Router>

    
     
</Provider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();

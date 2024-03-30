import React from "react";
import { Fragment } from "react";
import { Detalhes } from '../../Pages/Detalhes';
import { Pagamento } from '../../Pages/Pagamento';
import {Principal} from '../../Pages/Principal';
import{ BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export const AppRouter = () => {
   return ( 
        <Router>
            <Fragment>
                <Switch>
                    <Route path="/"><Principal /></Route>
                    <Route path="/detalhes"><Detalhes /></Route>
                    <Route path="/pagamento"><Pagamento /></Route>
                </Switch>
            </Fragment>
        </Router>
   );
}
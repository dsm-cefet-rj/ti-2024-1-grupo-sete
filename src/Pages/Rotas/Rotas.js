import Detalhes from '../Detalhes/Detalhes';
import Pagamento from '../Pagamento/Pagamento';
import Principal from '../Principal/Principal';
import SobreNos from '../SobreNos/index';
import FAQ from '../FAQ/index';
import Contatos from '../Contatos/index';
import Login from '../Login/Login'
import{ BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export const AppRouter =() => {
    return(
        <Router>
    <div>
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/detalhes">Detalhes</Link></li>
                <li><Link to="/pagamento">Pagamento</Link></li>
            </ul>
        </nav>
              <Switch>
              <Route path="/pagamento"><Pagamento /></Route>
              <Route path="/detalhes"><Detalhes /></Route>
              <Route path="/sobre-nos"><SobreNos/></Route>
              <Route path="/FAQ"><FAQ/></Route>
              <Route path="/contatos"><Contatos/></Route>
              <Route path="/login"><Login /></Route>
              <Route path="/"><Principal /></Route>
              </Switch>
      </div>
  </Router> 
    );
}
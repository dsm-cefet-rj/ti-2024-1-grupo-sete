import Detalhes from '../Detalhes/Detalhes';
import Pagamento from '../Pagamento/Pagamento';
import Principal from '../Principal/Principal';
import SobreNos from '../SobreNos/index';
import FAQ from '../FAQ/index';
import Contatos from '../Contatos/index';
import Login from '../Login/Login'
import Alugar from '../Aluguel';
import Planos from '../Planos/planos';
import Footer from "../../Components/Footer/footer";
import HeaderMain from "../../Components/Header";
import Historico from "../Pagamento/historico";
import Home from "../Home/home";
import{ BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export const AppRouter =() => {
    return(
        <Router>
            <HeaderMain />
    <div>
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/pagamento">Pagamento</Link></li>
            </ul>
        </nav>
              <Switch>
              <Route path={`/detalhes/:id`}><Detalhes /></Route>
              <Route path="/sobre-nos"><SobreNos/></Route>
              <Route path="/FAQ"><FAQ/></Route>
              <Route path="/contatos"><Contatos/></Route>
              <Route path="/login"><Login /></Route>
              <Route path={`/Aluguel/:id`}><Alugar/></Route>
              <Route path="/"><Principal /></Route>
              <Route path="/home"><Home /></Route>
              <Route path="/pagamento"><Pagamento /></Route>
              <Route path="/planos"><Planos /></Route>
              <Route path="/historico"><Historico /></Route>
              </Switch>
      </div>
      <Footer />
  </Router> 
    );
}

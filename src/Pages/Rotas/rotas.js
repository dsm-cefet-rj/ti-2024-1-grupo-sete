import Detalhes from '../Detalhes/Detalhes';
import Pagamento from '../Pagamento/Pagamento';
import Principal from '../Principal/Principal';
import SobreNos from '../SobreNos/index';
import FAQ from '../FAQ/index';
import Contatos from '../Contatos/index';
import Login from '../Login/Login';
import Alugar from '../Aluguel';
import Criarcarro from '../Criarcarro/Criarcarro';
import{ BrowserRouter as Router, Switch, Route} from "react-router-dom";
import HistoricoDetalhes from '../Pagamento/historicoDetalhes';
import Historico from '../Pagamento/historico';

export const AppRouter =() => {
    return(
        <Router>
    <div>

              <Switch>
              <Route path="/pagamento"><Pagamento /></Route>
              <Route path={`/detalhes/:id`}><Detalhes /></Route>
              <Route path="/sobre-nos"><SobreNos/></Route>
              <Route path="/FAQ"><FAQ/></Route>
              <Route path="/contatos"><Contatos/></Route>
              <Route path="/login"><Login /></Route>
              <Route path={`/Aluguel/:id`}><Alugar/></Route>
              <Route path="/criarcarro"><Criarcarro /></Route>
              <Route path={"/historico/:index"}><HistoricoDetalhes /></Route>
              <Route path="/historico"><Historico /></Route>
              <Route path="/"><Principal /></Route>

              

              </Switch>
      </div>
  </Router> 
    );
}
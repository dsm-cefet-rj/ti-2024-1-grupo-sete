import Detalhes from '../Detalhes/Detalhes';
import Pagamento from '../Pagamento/Pagamento';
import Principal from '../Principal/Principal';
import Atualizarcarro from '../Atualizarcarro/Atualizarcarro';
import FAQ from '../FAQ/index';
import Contatos from '../Contatos/index';
import Login from '../Login/Login';
import Alugar from '../Aluguel';
import Criarcarro from '../Criarcarro/Criarcarro';
import Atualizardadoscarro from '../Atualizardadoscarro/Atualizardadoscarro'
import{ BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Historico from '../Pagamento/historico';

export const AppRouter =() => {
    return(
        <Router>
    <div>

              <Switch>
              <Route path="/pagamento"><Pagamento /></Route>
              <Route path={`/detalhes/:id`}><Detalhes /></Route>
              <Route path="/atualizarcarro"><Atualizarcarro/></Route>
              <Route path="/FAQ"><FAQ/></Route>
              <Route path="/contatos"><Contatos/></Route>
              <Route path="/login"><Login /></Route>
              <Route path={`/Aluguel/:id`}><Alugar/></Route>
              <Route path="/criarcarro"><Criarcarro /></Route>
              <Route path="/atualizardadoscarro/:id"><Atualizardadoscarro/></Route>
              <Route path={"/historico/:index"}><Historico /></Route>
              <Route path="/"><Principal /></Route>
              

              

              </Switch>
      </div>
  </Router> 
    );
}
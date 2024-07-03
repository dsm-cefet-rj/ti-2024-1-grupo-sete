import Detalhes from "../Detalhes/Detalhes";
import Pagamento from "../Pagamento/Pagamento";
import Principal from "../Principal/Principal";
import Atualizarcarro from "../Atualizarcarro/Atualizarcarro";
import FAQ from "../FAQ/index";
import Contatos from "../Contatos/index";
import Login from "../Login/Login";
import Alugar from "../Aluguel";
import Criarcarro from "../Criarcarro/Criarcarro";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HistoricoDetalhes from "../Pagamento/historicoDetalhes";
import Historico from "../Pagamento/historico";
import Atualizardadoscarro from "../Atualizardadoscarro/Atualizardadoscarro";
import FormClientes from "../formClientes/formClientes";

export const AppRouter = () => {
  return (
    <Router>
  <div>
        <Switch>
          <Route path="/pagamento" exact>
            <Pagamento />
          </Route>
          <Route path="/detalhes/:id" exact>
            <Detalhes />
          </Route>
          <Route path="/atualizarcarro" exact>
            <Atualizarcarro />
          </Route>
          <Route path="/FAQ" exact>
            <FAQ />
          </Route>
          <Route path="/contatos" exact>
            <Contatos />
          </Route>
          <Route path="/login" exact>
            <Login />
          </Route>
          <Route path="/aluguel/:id" exact>
            <Alugar />
          </Route>
          <Route path="/criarcarro" exact>
            <Criarcarro />
          </Route>
          <Route path="/historico/:index" exact>
            <HistoricoDetalhes />
          </Route>
          <Route path="/historico" exact>
            <Historico />
          </Route>
          <Route path="/atualizardadoscarro/:id" exact>
            <Atualizardadoscarro />
          </Route>
          <Route path="/clientes" exact>
            <FormClientes />
          </Route>
          <Route path="/" exact>
            <Principal />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

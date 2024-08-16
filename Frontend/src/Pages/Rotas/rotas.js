import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HeaderMain from "../../Components/Header";
import Detalhes from "../Detalhes/Detalhes";
import Principal from "../Principal/Principal";
import Atualizarcarro from "../Atualizarcarro/Atualizarcarro";
import FAQ from "../FAQ/index";
import Contatos from "../Contatos/index";
import Login from "../Login/Login";
import Alugar from "../Aluguel";
import Criarcarro from "../Criarcarro/Criarcarro";
import HistoricoDetalhes from "../Pagamento/historicoDetalhes";
import Historico from "../Pagamento/historico";
import Pagamento from "../Aluguel/Pagamento"
import Atualizardadoscarro from "../Atualizardadoscarro/Atualizardadoscarro";
import FormClientes from "../formClientes/formClientes";
import AtualizarClientes from "../atualizarClientes/atualizarClientes";
import PrivateRoute from "../../Components/PrivateRoute/PrivateRoute";


export const AppRouter = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/login" exact component={Login} />
          <Route path="/FAQ" exact component={FAQ} />
          <Route path="/contatos" exact component={Contatos} />
          <Route path="/clientes" exact component={FormClientes} />
          <Route path="/" exact component={Principal} />

          <PrivateRoute path="/detalhes/:id" exact component={Detalhes} />
          <PrivateRoute
            path="/atualizarcarro"
            exact
            component={Atualizarcarro}
          />
          <PrivateRoute path="/aluguel/:id" exact component={Alugar} />
          <PrivateRoute path="/pagamento/:id" exact component={Pagamento} /> 
          <PrivateRoute path="/criarcarro" exact component={Criarcarro} />
          <PrivateRoute
            path="/historico/:index"
            exact
            component={HistoricoDetalhes}
          />
          <PrivateRoute path="/historico" exact component={Historico} />
          <PrivateRoute
            path="/atualizardadoscarro/:id"
            exact
            component={Atualizardadoscarro}
          />
          <PrivateRoute
            path="/atualizarcliente"
            exact
            component={AtualizarClientes}
          />
        </Switch>
      </div>
    </Router>
  );
};

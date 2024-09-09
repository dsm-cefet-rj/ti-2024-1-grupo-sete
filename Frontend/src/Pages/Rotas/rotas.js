import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Detalhes from "../Detalhes/Detalhes";
import Principal from "../Principal/Principal";
import Atualizarcarro from "../Atualizarcarro/Atualizarcarro.js";
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
import AluguelAtivo from "../AluguelCliente/aluguelativo.js";
import AtualizarClientes from "../atualizarClientes/atualizarClientes";
import PrivateRoute from "../../Components/PrivateRoute/PrivateRoute";
import Perfil from "../Perfil/perfil";
import ProtectedAdminRoutes from "./ProtectedAdminRoutes";
import Admin from "../AdminPages/admin";
import AdminAlugueis from "../AdminPages/adminAlugueis";
import AdminCarros from "../AdminPages/adminCarros";
import AdminRegistros from "../AdminPages/adminRegistros";
import AdminUsers from "../AdminPages/adminUsers";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
export const AppRouter = () => {
  return (
    <Router>
      <div>
      <ToastContainer
        position="top-center"
        autoClose={2700}
        theme="colored"
        containerId="shared-toast-container" // Define o ID do contêiner
      />
        <Switch>
          <Route path="/login" exact component={Login} />
          <Route path="/FAQ" exact component={FAQ} />
          <Route path="/contatos" exact component={Contatos} />
          <Route path="/cadastro" exact component={FormClientes} />
          <ProtectedAdminRoutes path="/admin" exact component={Admin} />
          <Route path="/" exact component={Principal} />
          
          <ProtectedAdminRoutes path="/admin/registros" exact component={AdminRegistros} />
          <ProtectedAdminRoutes path="/admin/carros" exact component={AdminCarros} />
          <ProtectedAdminRoutes path="/admin/users" exact component={AdminUsers} />
          <ProtectedAdminRoutes path="/admin/alugueis" exact component={AdminAlugueis} />
          <PrivateRoute path="/detalhes/:id" exact component={Detalhes} />
          <PrivateRoute
            path="/atualizarcarro"
            exact
            component={Atualizarcarro}
          />
          <PrivateRoute path="/aluguelativo" exact component={AluguelAtivo} />
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
            path="/profile"
            exact
            component={Perfil}
          />
        </Switch>
      </div>
    </Router>
  );
};

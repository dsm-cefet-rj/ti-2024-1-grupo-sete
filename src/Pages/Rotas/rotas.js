import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Pagamento from '../Pagamento/Pagamento';
import Planos from '../Planos/planos';
import Footer from "../../Components/Footer/footer";
import HeaderMain from "../../Components/Header/index";
import Historico from '../Pagamento/historico';

import Forms from "../../components/forms/forms";
import Principal from '../Principal/Principal';
import FAQ from '../FAQ/index';
import Criarcarro from "../CriarCarro";
import Atualizarcarro from '../Atualizarcarro/Atualizarcarro';
import Atualizardadoscarro from '../Atualizardadoscarro/Atualizardadoscarro'
import Contatos from '../Contatos/index';
import Detalhes from '../Detalhes/Detalhes';
import Alugar from '../Aluguel';
import HistoricoDetalhes from '../Pagamento/historicoDetalhes';
import Clientes from "../clientes";
import AtualizarDadosClientes from "../atualizarDadosClientes/atualizarDadosClientes";
import CadastrarClientes from "../cadastrarClientes/cadastrarClientes";
import AtualizarClientes from "../atualizarClientes/atualizarClientes";

export const AppRouter = () => {
    return (
        <Router>
            <HeaderMain />
            <div>
                <Routes>
                    <Route exact path="/" Component={Principal}></Route>
                    <Route path="/pagamentos" Component={Pagamento}></Route>
                    <Route path="/planos" Component={Planos}></Route>
                    <Route path="/historico" Component={Historico}></Route>
                    <Route path="/forms" Component={Forms}></Route>
                    <Route path="/faq" Component={FAQ}></Route>
                    <Route path="/criarcarro" Component={Criarcarro}></Route>
                    <Route path="/registar" Component={CadastrarClientes}></Route>
                    <Route path="/atualizarcarro" Component={Atualizarcarro}></Route>
                    <Route path={`/atualizardadoscarro/:id`} Component={Atualizardadoscarro}></Route>
                    <Route path="/contatos" Component={Contatos}></Route>
                    <Route path={`/detalhes/:id`} Component={Detalhes}></Route>
                    <Route path={`/aluguel/:id`} Component={Alugar}></Route>
                    <Route path={"/historico/:index"} Component={HistoricoDetalhes}></Route>
                    <Route path="/listarcliente" Component={Clientes}></Route>
                    <Route path="/atualizarcliente" Component={AtualizarClientes}></Route>
                    <Route path={`/atualizardadoscliente/:id`} Component={AtualizarDadosClientes}></Route>
                </Routes>
            </div>
            <Footer />
        </Router>
    );
}

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Pagamentos from '../pagamentos/pagamentos';
import Planos from '../planos/planos';
import Footer from "../../components/footer/footer";
import HeaderMain from "../../components/header/header";
import Historico from "../pagamentos/historico";

import Forms from "../../components/forms/forms";
import { Principal } from "../principal";
import Faq from "../faq";
import Criarcarro from "../criarCarro";
import Atualizarcarro from "../atualizarCarro/atualizarCarro";
import Atualizardadoscarro from "../atualizarCarro/atualizarDadosCarro/atualizarDadosCarro";
import Contatos from "../contatos";
import Detalhes from "../detalhes";
import Alugar from "../aluguel";
import HistoricoDetalhes from "../pagamentos/historicoDetalhes";
import Clientes from "../clientes";
import AtualizarDadosCliente from "../clientes/atualizarClientes/atualizarDadosClientes/atualizarDadosClientes";
import CadastrarClientes from "../clientes/cadastrarClientes/cadastrarClientes";
import AtualizarClientes from "../clientes/atualizarClientes/atualizarClientes";

export const AppRouter = () => {
    return (
        <Router>
            <HeaderMain />
            <div>
                <Routes>
                    <Route exact path="/" Component={Principal}></Route>
                    <Route path="/pagamentos" Component={Pagamentos}></Route>
                    <Route path="/planos" Component={Planos}></Route>
                    <Route path="/historico" Component={Historico}></Route>
                    <Route path="/forms" Component={Forms}></Route>
                    <Route path="/faq" Component={Faq}></Route>
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
                    <Route path={`/atualizardadoscliente/:id`} Component={AtualizarDadosCliente}></Route>
                </Routes>
            </div>
            <Footer />
        </Router>
    );
}
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Pagamentos from '../pagamentos/pagamentos';
import Planos from '../planos/planos';
import Footer from "../../components/footer/footer";
import HeaderMain from "../../components/header/header";
import Historico from "../pagamentos/historico";
import Home from "../home/home";
import Forms from "../../components/forms/forms";

export const AppRouter = () => {
    return (
        <Router>
            <HeaderMain />
            <div>
                <Routes>
                    <Route exact path="/" Component={Home}></Route>
                    <Route path="/pagamentos" Component={Pagamentos}></Route>
                    <Route path="/pagamentos/:id" Component={Pagamentos}></Route>
                    <Route path="/planos" Component={Planos}></Route>
                    <Route path="/historico" Component={Historico}></Route>
                    <Route path="/forms" Component={Forms}></Route>
                    {/* <Route path="/detalhes"><Detalhes /></Route>
                    <Route path="/sobre-nos"><SobreNos /></Route> */}
                    {/* <Route path="/FAQ"><FAQ /></Route>
                    <Route path="/contatos"><Contatos /></Route>
                    <Route path="/login"><Login /></Route> */}
                    {/* <Route path="/Aluguel"><Alugar /></Route> */}

                </Routes>
            </div>
            <Footer />
        </Router>
    );
}
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Pagamentos from '../pagamentos/pagamentos';
import Planos from '../planos/planos';
import Footer from "../../components/footer/footer";
import HeaderMain from "../../components/header/header";
import Historico from "../pagamentos/historico";
import Home from "../home/home";

export const AppRouter = () => {
    return (
        <Router>
            <HeaderMain />
            <div>
                <Switch>
                    <Route exact path="/" component={Home}></Route>
                    <Route path="/pagamentos" component={Pagamentos}></Route>
                    <Route path="/planos" component={Planos}></Route>
                    <Route path="/historico" component={Historico}></Route>
                    {/* <Route path="/detalhes"><Detalhes /></Route>
                    <Route path="/sobre-nos"><SobreNos /></Route> */}
                    {/* <Route path="/FAQ"><FAQ /></Route>
                    <Route path="/contatos"><Contatos /></Route>
                    <Route path="/login"><Login /></Route> */}
                    {/* <Route path="/Aluguel"><Alugar /></Route> */}

                </Switch>
            </div>
            <Footer />
        </Router>
    );
}
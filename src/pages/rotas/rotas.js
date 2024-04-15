import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Pagamentos from '../pagamentos/pagamentos';
import Planos from '../planos/planos';
import Footer from "../../components/footer/footer";
import HeaderMain from "../../components/header/header";
import Historico from "../pagamentos/historico";

export const AppRouter = () => {
    return (
        <Router>
            <HeaderMain />
            <div>
                <Switch>
                    <Route path="/pagamentos"><Pagamentos /></Route>
                    <Route path="/planos"><Planos /></Route>
                    <Route path="/historico"><Historico /></Route>
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
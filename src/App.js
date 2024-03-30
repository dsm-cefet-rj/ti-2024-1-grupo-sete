import './App.css';
import Detalhes from './Pages/Detalhes/Detalhes';
import Pagamento from './Pages/Pagamento/Pagamento';
import Principal from './Pages/Principal/Principal';
import{ BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";



const App = (props) => {
  return (
    <Router>
    <div>
          <nav>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/detalhes">Detalhes</Link></li>
              <li><Link to="/pagamento">Pagamento</Link></li>
            </ul>
          </nav>
              <Switch>
              <Route path="/pagamento"><Pagamento /></Route>
              <Route path="/detalhes"><Detalhes /></Route>
              <Route path="/"><Principal /></Route>
              </Switch>
      </div>
  </Router>

 );
}

export default App;

import './App.css';
import { AppRouter } from './Pages/Rotas/rotas';

/**
 * Componente principal da aplicação.
 * O componente 'App' utiliza o 'AppRouter' para definir as rotas da aplicação.
 * @function App
 * @param {Object} props - Propriedades passadas para o componente.
 * @returns {JSX.Element} O componente 'App' que renderiza o 'AppRouter'.
 */
const App = (props) => {
  return (
    <AppRouter>
    </AppRouter>
 );
}

export default App;

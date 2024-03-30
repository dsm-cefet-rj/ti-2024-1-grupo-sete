import Header from './components/header/header';
import Footer from './components/footer/footer';
import Planos from './pages/planos/planos';
import Pagamentos from './pages/pagamentos/pagamentos';

export default function App() {
  return (
    <>
      <Header />
        <Planos />
        <Pagamentos />
      <Footer />
    </>
  );
}
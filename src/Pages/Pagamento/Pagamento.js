import React from 'react';
import Tabela from '../../Components/tabela/tabela';
import HeaderMain from '../../Components/Header';
import Footer from '../../Components/Footer/footer';
import './styles.css';

export function Pagamentos() {


  return (
    <div className="pagamentos">
      <HeaderMain />
      <Tabela />
      <Footer />
    </div>
  );
}

export default Pagamentos;
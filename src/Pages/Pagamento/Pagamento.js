import React from 'react';
import Tabela from '../../Components/tabela/tabela';
import "./styles.css";
import HeaderMain from '../../Components/Header';
import Footer from '../../Components/Footer/footer';

export function Pagamentos() {


  return (
    <div className="pagamentos">
      <HeaderMain />;
      <Tabela />;
      <Footer />;

    </div>
  );
}

export default Pagamentos;
import React from 'react';
import HistoricoTabela from '../../Components/historico/historicoTabela';
import HeaderMain from '../../Components/Header';
import Footer from '../../Components/Footer/footer';

export function Historico() {


  return (
    <div className="historico">
      <HeaderMain />
      <HistoricoTabela/>
      <Footer />
    </div>
  );
}

export default Historico;
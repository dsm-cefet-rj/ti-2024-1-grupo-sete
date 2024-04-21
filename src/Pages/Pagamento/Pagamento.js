import React from 'react';
import Tabela from '../../Components/Tabela/tabela';
import "./styles.css";
import { Button } from 'react-bootstrap';

export function Pagamento() {
  const adicionarPagamento = (e) => {
    
  };

  return (
    <div className="pagamento">
      <Button variant="primary" onClick={adicionarPagamento()}>
        Adicionar
      </Button>
      <p>Pagamento</p>
      <Tabela />

    </div>
  );
}

export default Pagamento;

import React from 'react';
import Tabela from '../../components/tabela/tabela';
import "./styles.css";
import { Button } from 'react-bootstrap';

export function Pagamentos() {
  const adicionarPagamento = (e) => {
    
  };

  return (
    <div className="pagamentos">
      <Button variant="primary" onClick={adicionarPagamento()}>
        Adicionar
      </Button>
      <p>Pagamentos</p>
      <Tabela />

    </div>
  );
}

export default Pagamentos;
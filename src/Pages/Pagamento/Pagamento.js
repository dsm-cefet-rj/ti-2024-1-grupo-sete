import React from 'react';

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
      

    </div>
  );
}

export default Pagamento;

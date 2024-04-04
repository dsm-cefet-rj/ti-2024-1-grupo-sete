import React, { useState } from 'react';
import carros from '../Carros/carros';

import './style.css';
import { Card, CardBody, CardImg, CardText, CardTitle, Row, Col } from 'reactstrap';

export default function Pesquisa() {
  const [busca, setBusca] = useState('');
  console.log(busca);

  return (
    <div>
      <h1>O que está buscando?</h1>
      <input
        type="text"
        value={busca}
        onChange={(ev) => setBusca(ev.target.value)}
      />

      <Row>

        {Object.keys(carros).map((carroId) => {
          const carro = carros[carroId];
          return (
            <Col xs={12} md={6} lg={4} key={carroId}>
              <Card className="card-carros">
                <CardBody>
                  <CardImg
                    src={carro.Image}
                    alt={carro.modelo}
                    onError={(error) => console.error('Erro ao carregar imagem:', error)}
                  />
                  <CardTitle><h2>{carro.modelo}</h2></CardTitle>
                  <CardText>
                    <p>Ano: {carro.ano}</p>
                    <p>Dono: {carro.dono}</p>
                    <p>Cidade: {carro.cidade}</p>
                  </CardText>
                </CardBody>
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
}
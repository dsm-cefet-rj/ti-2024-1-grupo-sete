import React, { useState } from 'react';
import carros from '../Carros/carros';

import './style.css';
import { Card, CardBody, CardImg, CardText, CardTitle, Row, Col, Container } from 'reactstrap';
import{ BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";


export default function Pesquisa() {
  const [busca, setBusca] = useState('');
  console.log(busca);

  return (
    <div>
      <div className="pesquisa">
        <div className="pesquisa-conteudo">
          <h1>O que está buscando?</h1>
          <input
            type="text"
            value={busca}
            onChange={(ev) => setBusca(ev.target.value)}
          />
        </div>
      </div>

      <Row >

        {Object.keys(carros).map((carroId) => {
          const carro = carros[carroId];
          return (
            <Col xs={12} md={6} lg={4} key={carroId}>
              <Card className="card-carros">
                <Link to="/detalhes" className="link">
                <CardBody>
                  <CardImg
                    src={carro.Image}
                    alt={carro.modelo}
                    onError={(error) => console.error('Erro ao carregar imagem:', error)}
                  />
                  <CardTitle><h2>{carro.modelo}</h2></CardTitle>
                  <CardText>
                    <Row className="card-text-columns">
                    <Col><p>Ano: {carro.ano}</p>
                    <p>Dono: {carro.dono}</p>
                    <p>Cidade: {carro.cidade}</p>
                    </Col>
                    <Col className="justify-center">
                    <Container>
                    <p className="preco"> Preço </p></Container>
                    <h1 className="preco">R$ {carro.preco}/dia</h1>
                    </Col>
                    </Row>
                  </CardText>
                </CardBody>
                </Link>
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
}
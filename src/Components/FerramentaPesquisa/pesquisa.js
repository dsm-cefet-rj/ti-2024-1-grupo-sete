import React, { useState } from 'react';
import carros from '../Carros/carros';
import BarraPesquisa from './barrapesquisa';
import format from 'date-fns/format';
import './style.css';
import { Card, CardBody, CardImg, CardText, CardTitle, Row, Col, Container } from 'reactstrap';
import{ BrowserRouter as Router, Switch, Route, Link, useHistory } from "react-router-dom";

function containsArray(array1, array2) {
  for (let i = 0; i < array1.length; i++) {
    const elemento = format(array1[i], "dd/MM/yyyy");

    if (array2.includes(elemento)) {
      console.log("bateu");
      return true;
    }

    console.log(elemento);
  }

  return false;
}

export default function Pesquisa() {
  const [busca, setBusca] = useState("");
  const [diasEntreDatas, setDiasEntreDatas] = useState([]);
  const history = useHistory();
  console.log(busca);

  const handleCardClick = (carroId) => {
    history.push(`/aluguel/${carroId}`, { selectedDiasEntreDatas: diasEntreDatas });
  };

  let primeiroDia = diasEntreDatas.length > 0 ? format(diasEntreDatas[0], "dd/MM/yyyy") : '';
  let ultimoDia = diasEntreDatas.length > 0 ? format(diasEntreDatas[diasEntreDatas.length - 1], "dd/MM/yyyy") : '';

  return (
    <div>
      <div>
        <BarraPesquisa
            busca={busca}
            setBusca={setBusca}
            diasEntreDatas={diasEntreDatas}
            setDiasEntreDatas={setDiasEntreDatas}
        />
      </div>
      <h1>Busca para: Cidade "{busca}" e para {diasEntreDatas.length} dias ({primeiroDia} até {ultimoDia})</h1>
      <Row >

        {Object.keys(carros).filter(
          ((carroId) =>{
            if(busca === "") return true;
            const busca2 = busca.toLowerCase();
            const carroCompar = carros[carroId].cidade.toLowerCase();
            return carroCompar.includes(busca2);
          })
        ).filter(
          ((carroId) =>{
            return !containsArray(diasEntreDatas,carros[carroId].diasAlugado);
          })
        ).map((carroId, index) => {
          const carro = carros[carroId];
          return (
            <Col xs={12} md={6} lg={4} key={index}>
              <Card onClick={() => handleCardClick(carroId)} className="card-carros">
                <Link to={`/detalhes/${carroId}`} className="link">
                <CardBody >
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



                    <p className="preco"> Preço </p>
                    <h1 className="preco">R$ {carro.preco}/dia</h1>
                    <div className= "buttonDetails"><button className="btn btn-primary" type="submit"> Mais Detalhes </button> </div>


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
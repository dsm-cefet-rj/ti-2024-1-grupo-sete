import React, { useState } from 'react';
import carros from '../Carros/carros';
import BarraPesquisa from './barrapesquisa';
import format from 'date-fns/format';
import './style.css';
import { Card, CardBody, CardImg, CardText, CardTitle, Row, Col, Container } from 'reactstrap';
import{ BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

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
  console.log(busca);


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

      <Row >

        {Object.keys(carros).filter(
          ((carroId) =>{
            if(busca === "") return true;
            return carros[carroId].cidade === busca;
          })
        ).filter(
          ((carroId) =>{
            return !containsArray(diasEntreDatas,carros[carroId].diasAlugado);
          })
        ).map((carroId, index) => {
          const carro = carros[carroId];
          return (
            <Col xs={12} md={6} lg={4} key={index}>
              <Card className="card-carros">
                <Link to={`/detalhes/${carroId}`} className="link">
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
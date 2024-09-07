import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BarraPesquisa from './barrapesquisa';
import format from 'date-fns/format';
import './style.css';
import useAluguelStore from '../Zustand/storeAluguel';
import { Card, CardBody, CardImg, CardText, CardTitle, Row, Col } from 'reactstrap';
import { Link } from "react-router-dom";
import FiatUno21 from '../../Assets/Fiat-uno21.jpg';
import FordKa from '../../Assets/FordKa.jpg';
import Bmw from '../../Assets/bmw.png';
import Mercedes from '../../Assets/Mercedes.jpg';
import FiatUno from '../../Assets/fiat-uno.jpg';
import Tesla from '../../Assets/Tesla.jpg';
import Honda from '../../Assets/honda.jpg';
import { getAllCarrosByUser, getAllCarros } from '../../Pages/Services/carrosServices';

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
  const [carros, setCarros] = useState([]);
  const busca = useAluguelStore((state) => state.buscar);
  const diasEntreDatas = useAluguelStore((state) => state?.diasAluguel);
  const setCarroId = useAluguelStore((state) => state.setCarroId);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchCarros = async () => {
      try {
        console.log("\n\n\nFETCH CARROS TOKEN:", localStorage.getItem('token'))
        const data = await getAllCarros();
        console.log("Carros encontrados:", data);
        setCarros(data.data.results);


        //console.log("PREÇO:", carros.results);

        
      } catch (error) {
        console.error("Erro ao buscar carros:", error);
        setMessage("Erro ao buscar carros. Tente novamente mais tarde.");
        setCarros([]); 
      }
    };

  
    fetchCarros();
  }, [diasEntreDatas]);

  let primeiroDia = diasEntreDatas?.length > 0 ? format(diasEntreDatas[0], "dd/MM/yyyy") : '';
  let ultimoDia = diasEntreDatas?.length > 0 ? format(diasEntreDatas[diasEntreDatas.length - 1], "dd/MM/yyyy") : '';


  //console.log("\n\nDias entre datas:", format(diasEntreDatas[0], "dd/MM/yyyy"));
  //console.log(diasEntreDatas);


  //função ativada quando clica em um card de carro
  const handleCardClick = (carroId) => {
    setCarroId(carros.find(carro => carro.id === carroId));
  };

  const imagensCarros = {
    4: FiatUno,
    5: FordKa,
    6: Mercedes,
    7: Bmw,
    8: Honda,
    9: Tesla,
    10: FiatUno21,
  };

  return (
    <div>
      <div>
        <BarraPesquisa />
      </div>
      <h1 className='t1'>
        {busca ? `Busca para: Cidade "${busca}" e para ${diasEntreDatas?.length} dias (${primeiroDia} até ${ultimoDia})` : `Busca para: ${diasEntreDatas.length} dias (${primeiroDia} até ${ultimoDia})`}
      </h1>

      <Row>
        {carros.filter((carro) => {
          if (!busca) return true;
          const buscaLower = busca.toLowerCase();
          const carroCidadeLower = carro.cidade.toLowerCase();
          console.log(`Busca: ${buscaLower}, Cidade do carro: ${carroCidadeLower}`);
          return carroCidadeLower.includes(buscaLower);
        }).filter((carro) => {
          return !containsArray(diasEntreDatas, carro.diasAlugado);
        }).map((carro, index) => {
          return (
            <Col xs={12} md={6} lg={4} key={index}>
              <Card className="card-carros" onClick={() => handleCardClick(carro.id)}>
                <Link to={`/detalhes/${carro.id}`} className="link">
                  <CardBody>
                    <CardImg
                      src={carro.fotoLink1} 
                      alt={carro.modelo}
                      onError={(error) => console.error('Erro ao carregar imagem:', error)}
                    />
                    <CardTitle><h2 className='titleCard'>{carro.modelo}</h2></CardTitle>
                    <CardText>
                      <p>Ano: {carro.ano}</p>
                      <p>Dono: {carro.userName}</p>
                      <p>Cidade: {carro.cidade}</p>
                      <p className="preco">Preço</p>
                      <h1 className="preco">R$ {carro.precoPorDia}/dia</h1>
                      <div className="buttonDetails">
                        <button className="btn btn-primary" type="submit">Mais Detalhes</button>
                      </div>
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

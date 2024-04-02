import React, {useState} from 'react';
import carros from '../Carros/carros'
import { Card, CardBody, CardImg, CardText, CardTitle } from 'reactstrap';
import './style.css';



export default function Pesquisa(){
    const[busca, setBusca] = useState('');
   console.log( busca);



    return(
        <div>
            <h1>O que está buscando?</h1>
            <input
                type="text"
                value={busca}
                onChange={(ev) => setBusca(ev.target.value)}
            />

            <ul>
            {Object.keys(carros).map((carroId) => {
        const carro = carros[carroId];
        return (
            <Card className='card-carros' style={{width: '15rem'}}>
                <CardBody>
                    <div key={carroId}>
                        <CardImg src={carro.Image} alt={carro.modelo} onError={(error) => console.error('Erro ao carregar imagem:', error)}/>
                        <CardTitle><h2>{carro.modelo}</h2></CardTitle>
                        <CardText>
                        <p>Ano: {carro.ano}</p>
                        <p>Dono: {carro.dono}</p>
                        <p>Cidade: {carro.cidade}</p>
                        </CardText>
                    </div>
                </CardBody>
          </Card>
        );
      })}
            </ul>
        </div>
    )
}
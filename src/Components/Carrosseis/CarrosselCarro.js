import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import Carousel from 'react-bootstrap/Carousel';
import Ferrari from '../../Assets/Ferrari.jpeg';
import BMW from '../../Assets/bmw.png';
import Mercedes from '../../Assets/Mercedes.jpg';
import FiatUno from '../../Assets/Fiat-uno.jpg';
import Tesla from '../../Assets/Tesla.jpg';
import Honda from '../../Assets/Honda.jpg';
import './style.css';


 
 


export default function CarrosselCarro(props){
    return(       
        <>
        <div>
            <h4>Alguns Carros Disponíveis</h4>
            <Carousel  indicators={false} variant="dark">
                <Carousel.Item>
                    <img className="carro" src= {BMW}/>
                </Carousel.Item>
                <Carousel.Item>
                    <img className="carro" src={Ferrari} />
                </Carousel.Item>
                <Carousel.Item>
                    <img className="carro" src={Mercedes} />
                </Carousel.Item>
                <Carousel.Item>
                    <img className="carro" src={FiatUno} />
                </Carousel.Item>
                <Carousel.Item>
                    <img className="carro" src={Tesla} />
                </Carousel.Item>
                <Carousel.Item>
                    <img className="carro" src={Honda} />
                </Carousel.Item>
            </Carousel>
        </div>
    </>);
}
import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import Carousel from 'react-bootstrap/Carousel';
import FordKa from '../../assets/FordKa.jpg'
import BMW from '../../assets/bmw.png';
import Mercedes from '../../assets/Mercedes.jpg';
import FiatUno from '../../assets/fiat-uno.jpg';
import Tesla from '../../assets/Tesla.jpg';
import Honda from '../../assets/honda.jpg';
import './style.css';

export default function CarrosselCarro(props){
    return(       
        <>
        <div>
            <div className="carCar">
                <h2>Alguns Carros Disponíveis</h2>
            </div> 
            <Carousel  indicators={false} variant="dark">
                <Carousel.Item>
                    <img alt="" className="carro" src= {BMW}/>
                </Carousel.Item>
                <Carousel.Item>
                    <img alt="" className="carro" src={FordKa} />
                </Carousel.Item>
                <Carousel.Item>
                    <img alt="" className="carro" src={Mercedes} />
                </Carousel.Item>
                <Carousel.Item>
                    <img alt="" className="carro" src={FiatUno} />
                </Carousel.Item>
                <Carousel.Item>
                    <img alt="" className="carro" src={Tesla} />
                </Carousel.Item>
                <Carousel.Item>
                    <img alt="" className="carro" src={Honda} />
                </Carousel.Item>
            </Carousel>
        </div>
    </>);
}
import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import Carousel from 'react-bootstrap/Carousel';
import FordKa from '../../Assets/ford-ka.jpg'
import BMW from '../../Assets/bmw.png';
import Mercedes from '../../Assets/mercedes.jpg';
import FiatUno from '../../Assets/fiat-uno.jpg';
import Tesla from '../../Assets/tesla.jpg';
import Honda from '../../Assets/honda.jpg';
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
                    <img className="carro" src={FordKa} />
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
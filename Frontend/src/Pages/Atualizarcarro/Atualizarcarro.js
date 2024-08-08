import React from "react";
import {useState, useEffect} from 'react';
import HeaderMain from "../../Components/Header";
import Footer from "../../Components/Footer/footer";
import Message from "../../Components/Message/Message";
import Atualizarcarrocard from '../../Components/Cardatualizarcarro/Atualizarcarrocard';

import './Atualizarcarro.css'



export default function Atualizarcarro(){

    const [carros, setCarros] = useState([])

    const [messageRemove, setMessageRemove] = useState('');

    useEffect(() => {
        fetch('http://localhost:4000/carros', {
            method: 'GET',
            headers: {
                'Content-Type': 'aplication/json',
            }
        }).then(resp => resp.json())
        .then((data) => {
            setCarros(data)
        })
        .catch((err) => console.log(err))
    }, [])

    function RemoveCarro(id) {
        fetch(`http://localhost:4000/carros/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'aplication/json'
        },
    }).then(resp => resp.json)
    .then(data => {
        setCarros(carros.filter((carro) => carro.id !== id))
        //message
        setMessageRemove('Carro foi removido com sucesso!')
    })
    .catch(err => console.log(err))
    }
    return (
    <>
        <HeaderMain/>
        {messageRemove && <Message type="success" msg={messageRemove}/>}
            <div className="carro-container">
                <div className="carro-titulo">
                    <h1>Meus carros</h1>
                </div>
                <div className="carro">
                    {carros.length > 0 &&
                    carros.map((carro) => (
                        <Atualizarcarrocard id={carro.id}
                            dono={carro.dono}
                            modelo={carro.modelo}
                            ano={carro.ano}
                            cidade={carro.cidade}
                            preco={carro.preco}
                            key={carro.id}
                            handleRemove={RemoveCarro}
                            />
                    ))}
                </div>
            </div>
        <footer>
            <Footer/>
        </footer>
    </>
    );
}


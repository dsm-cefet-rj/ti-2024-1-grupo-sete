import React, { useState, useEffect } from "react";
import { Table, Button, Form } from "react-bootstrap";
import axios from "axios";
import HeaderMain from "../../Components/Header";
import Footer from "../../Components/Footer/footer";
import "./style.css"; 
import useUserStore from "../../Components/Zustand/storeUser";
import { Container } from "reactstrap";

export default function Perfil() {
  const user = useUserStore((state) => state.usuario);

  return (
    <div className="page-container">
      <HeaderMain />
        <Container>
        <div className="titulo">
            <h1>Perfil</h1>
        </div>
                <Form>
                    <Form.Group controlId="formCardNumber">
                        <Form.Label className='pag'>Nome: </Form.Label>
                        <Form.Control
                            aria-label="Default select example"
                            type="text"
                            placeholder="Carro alugado"
                            name="carro"
                            value={user?.name}
                            disabled
                        />

                    </Form.Group>

                    <Form.Group controlId="formExpirationDate">
                        <Form.Label className='pag'>Email: </Form.Label>
                        <Form.Control
                            aria-label="Default select example"
                            type="text"
                            placeholder=""
                            name="email"
                            value={user?.email}
                            disabled
                        />
                    </Form.Group>

                    <Form.Group controlId="formCVV">
                        <Form.Label className='pag'>Telefone: </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="5 dias"
                            name="quantDias"
                            value={user?.telefone}
                            disabled
                        />
                    </Form.Group>

                    <Form.Group controlId="formExpirationDate">
                        <Form.Label className='pag'>Endereço: </Form.Label>
                        <Form.Control
                            aria-label="Default select example"
                            type="text"
                            placeholder="Sem endereço"
                            name="valorDiario"
                            value={user?.endereco}
                            disabled
                        />
                    </Form.Group>
                </Form>
                
            </Container>
      <div></div>      
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
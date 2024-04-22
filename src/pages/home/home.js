import React, { useState } from 'react';
import Pesquisa from '../../components/pesquisa/pesquisa';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import carrosData from '../../data/data';
import { useNavigate } from 'react-router-dom';

export function Home() {

  const [car] = useState(carrosData)

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/pagamentos', { state: car });
  };

  return (
    <div className="App">
      <Pesquisa />
      <Container>
        <h1 className="mt-4 mb-4">Alugueis</h1>
        <Row className="mb-4">
          {carrosData.map((carro) => (
            <Col md={4}>
              <Card key={carro.id}>
                <Card.Img variant="top" src={carro.img} /><Card.Body>
                  <Card.Title>{carro.marca}</Card.Title>
                  <Card.Text>
                    {carro.modelo}
                  </Card.Text>
                  <Button variant="primary" onClick={handleNavigate}>Alugar</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}

        </Row>
      </Container>
    </div >
  );
}

export default Home;
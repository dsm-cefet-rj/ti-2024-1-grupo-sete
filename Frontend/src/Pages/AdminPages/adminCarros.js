import React, {useEffect,useState} from "react";
import HeaderMain from "../../Components/Header/index";
import AdminMenu from "../../Components/MenuAdmin/AdminMenu";
import {getAllCarros } from '../../Pages/Services/carrosServices';
import { Card, CardBody, CardImg, CardText, CardTitle, Row, Col } from 'reactstrap';
import { Link } from "react-router-dom";
import useAluguelStore from "../../Components/Zustand/storeAluguel";



export default function AdminCarros() {
  const [carros, setCarros] = useState([]);
  const setCarroId = useAluguelStore((state) => state.setCarroId);
  const [message, setMessage] = useState('');
  const diasEntreDatas = useAluguelStore((state) => state?.diasAluguel);


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

const handleCardClick = (carroId) => {
  setCarroId(carros.find(carro => carro.id === carroId));
};
  return (
    <>
    <HeaderMain/>
    <AdminMenu/>

    <h1 className="titulo">Carros cadastrados</h1>

    <div>
      <Row>
        {carros.map((carro, index) => {
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
                        <button className="btn btn-primary" type="submit" style={{ marginRight: '10px' }} >Mais Detalhes</button> 
                        <button className="btn btn-danger" type="submit">Deletar Carro</button>
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
    </>
  );
}
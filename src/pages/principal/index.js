import React from 'react';
import Pesquisa from '../../components/pesquisa/pesquisa';
import { useLocation } from 'react-router-dom';
import CarrosselCarro from '../../components/carrosseis/carrosselCarro';
import Mensagem from '../../components/message/message';

export function Principal() {

  const location = useLocation()
  let message = ''
  if(location.state) {
      message = location.state.message
  }

  return (
    <div className="App">
      {message && <Mensagem type="success" msg={message} />}
      <CarrosselCarro />
      <Pesquisa />
    </div >
  );
}

export default Principal;
import React from "react";
import { Route, Redirect } from "react-router-dom";

/**
 * Componente de rota privada que controla o acesso a rotas com base na autenticação do usuário.
 * @param {object} props - Propriedades passadas para o componente.
 * @param {React.ComponentType} props.component - O componente a ser renderizado se o usuário estiver autenticado.
 * @param {...object} rest - Outras propriedades passadas para o componente Route.
 * @returns {React.ReactElement} Um componente Route que renderiza o componente fornecido se o usuário estiver autenticado, ou redireciona para a 
 * página de login se não estiver autenticado.
 * Utiliza a propriedade 'render' do componente `Route` para decidir qual conteúdo renderizar.
 */
const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = !!localStorage.getItem("token"); 

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" /> 
        )
      }
    />
  );
};

export default PrivateRoute;

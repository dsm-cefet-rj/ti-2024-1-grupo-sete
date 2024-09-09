import React from "react";
import { Route, Redirect } from "react-router-dom";

/**
 * Componente de rota privada que protege as rotas que exigem autenticação. 
 * Este componente verifica se o usuário está autenticado antes de renderizar o componente solicitado. 
 * Se o usuário não estiver autenticado, ele será redirecionado para a página de login.
 * @component
 * @param {Object} props - Propriedades passadas para o componente.
 * @param {React.ComponentType} props.component - Componente a ser renderizado se o usuário estiver autenticado.
 * @param {...any} rest - Outras propriedades passadas para o componente 'Route'.
 * @returns {JSX.Element} Retorna um componente 'Route' que renderiza o componente fornecido se autenticado, 
 * ou redireciona para a página de login se não autenticado.
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

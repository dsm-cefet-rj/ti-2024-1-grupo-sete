import React from "react";
import { Route, Redirect } from "react-router-dom";
import useUserStore from "../../Components/Zustand/storeUser";

/**
 * Componente de rota protegida que controla o acesso a rotas com base na autenticação do usuário e permissões de administrador.
 * @param {object} props - Propriedades passadas para o componente.
 * @param {React.ComponentType} props.component - O componente a ser renderizado se o usuário estiver autenticado e for um administrador.
 * @param {...object} rest - Outras propriedades passadas para o componente Route.
 * @returns {React.ReactElement} Um componente Route que renderiza o componente fornecido se o usuário estiver autenticado e for um administrador, 
 * ou redireciona para páginas específicas caso contrário:
 *- Redireciona para a página '/not-authorized' se o usuário não for um administrador.
 *- Redireciona para a página de login ('/login') se o usuário não estiver autenticado.
 * Utiliza a propriedade 'render' do componente 'Route' para decidir qual conteúdo renderizar.
 */
const ProtectedAdminRoutes = ({ component: Component, ...rest }) => {
    const isAuthenticated = !!localStorage.getItem("token");
    const isAdmin = useUserStore((state) => state.usuario.isAdm)
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          isAdmin ? (
            <Component {...props} />
          ) : (
            <Redirect to="/" />
          )
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default ProtectedAdminRoutes;

import React from "react";
import { Route, Redirect } from "react-router-dom";
import useUserStore from "../../Components/Zustand/storeUser";

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
            <Redirect to="/not-authorized" />
          )
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default ProtectedAdminRoutes;

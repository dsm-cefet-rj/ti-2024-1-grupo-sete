import React from "react";
import AdminMenu from "../../Components/MenuAdmin/AdminMenu"
import HeaderMain from "../../Components/Header/index"

/**
 * Componente da página do administrador.
 * @returns {React.ReactElement} O layout da página de administração, incluindo o cabeçalho e o menu do administrador.
 * @description
 * O componente 'Admin' exibe a página principal do administrador. Inclui o cabeçalho ('HeaderMain') e o menu de administração ('AdminMenu').
 * Também exibe um título que indica que a página é destinada ao administrador.
 */
export default function Admin() {
  return (
    <>
    <HeaderMain/>
    <AdminMenu/>

    <h1 className="titulo">Menu do Administrador</h1>
    </>
  );
}

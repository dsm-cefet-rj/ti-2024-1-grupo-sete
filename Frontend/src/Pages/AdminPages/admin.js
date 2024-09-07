import React from "react";
import AdminMenu from "../../Components/MenuAdmin/AdminMenu"
import HeaderMain from "../../Components/Header/index"
export default function Admin() {
  return (
    <>
    <HeaderMain/>
    <AdminMenu/>

    <h1 className="titulo">Menu do Administrador</h1>
    </>
  );
}

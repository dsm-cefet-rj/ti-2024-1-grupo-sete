import React from "react";
import HeaderMain from "../../Components/Header/index";
import AdminMenu from "../../Components/MenuAdmin/AdminMenu";

export default function AdminRegistros() {
  return (
    <>
    <HeaderMain/>
    <AdminMenu/>

    <h1 className="titulo">Registros de Pagamentos</h1>
    </>
  );
}
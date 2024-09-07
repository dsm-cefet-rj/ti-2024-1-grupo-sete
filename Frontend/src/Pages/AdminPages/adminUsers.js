import React from "react";
import HeaderMain from "../../Components/Header/index";
import AdminMenu from "../../Components/MenuAdmin/AdminMenu";

export default function AdminUsers() {
  return (
    <>
    <HeaderMain/>
    <AdminMenu/>

    <h1 className="titulo">Usuários Cadastrados</h1>
    </>
  );
}

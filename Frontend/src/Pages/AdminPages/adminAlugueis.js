import React from "react";
import HeaderMain from "../../Components/Header/index";
import AdminMenu from "../../Components/MenuAdmin/AdminMenu";

export default function AdminAlugueis() {
  return (
    <>
    <HeaderMain/>
    <AdminMenu/>

    <h1 className="titulo">Aluguéis em andamento</h1>
    </>
  );
}
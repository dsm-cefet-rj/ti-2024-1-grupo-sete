import React, { useState } from "react";
import "./header.css";
import Logo from "../../Assets/Logo2.png";
import { RiLoginBoxLine } from "react-icons/ri";
import { FaPersonCirclePlus } from "react-icons/fa6";
import { GrUserAdmin } from "react-icons/gr";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom";
import {
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
  Nav,
} from "reactstrap";
import useUserStore from "../Zustand/storeUser";
import { FaUser } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/**
 * Componente de Cabeçalho Principal.
 * Exibe um cabeçalho com navegação e opções de menu, que muda dependendo do estado de autenticação do usuário.
 * Inclui links para páginas principais, opções de perfil do usuário autenticado, e funcionalidades de login e cadastro para usuários não autenticados.
 * Também fornece uma funcionalidade de logout que limpa o estado de autenticação e redireciona o usuário para a página inicial.
 */
export default function HeaderMain(props) {
  const isLogged = useUserStore((state) => state.isAuthenticated);
  const userName = useUserStore((state) => state.usuario.name);
  const isAdmin = useUserStore((state) => state.usuario.isAdm)
  const firstName = userName ? userName.split(" ")[0] : "";
  const [isOpen, setIsOpen] = useState(false);
  const history = useHistory();

  /**
   * Manipula o logout do usuário. Limpa o estado de autenticação e remove o token do localStorage.
   * Exibe uma notificação de sucesso e redireciona o usuário para a página inicial após um pequeno atraso.
   */
  const handleLogout = () => {
    useUserStore.getState().logout();
    localStorage.removeItem("token");
    console.log(isLogged);
    toast.info('Você foi desconectado com sucesso!',
      {
        position: "top-center",
        autoClose: 2700,
        containerId: "shared-toast-container"
      }
    );
    setTimeout(() => {
      history.push('/');
    }, 2000); 
  };

  /**
   * Alterna o estado de visibilidade do menu colapsável.
   */
  const toggle = () => setIsOpen(!isOpen);
  return (
    <>
      <div className="all">
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <Link className="nav-link" to="/">
              <img className="ImgLogo" src={Logo} alt="DriveZoom Logo" />
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarScroll"
              aria-controls="navbarScroll"
              aria-expanded="false"
              aria-label="Toggle navigation"
              onClick={toggle}
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <Collapse isOpen={isOpen} navbar>
              <Nav className="me-auto" navbar>
                <li className="nav-item">
                  <Link className="nav-link" aria-current="page" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    aria-current="page"
                    to="/criarcarro"
                  >
                    Cadastre seu carro
                  </Link>
                </li>
                <UncontrolledDropdown nav inNavbar className="dropdown2">
                  <DropdownToggle nav caret>
                    Mais informações
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem>
                      <Link className="nav-link" aria-current="page" to="/FAQ">
                        FAQ
                      </Link>
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>
                      <Link
                        className="nav-link"
                        aria-current="page"
                        to="/contatos"
                      >
                        Contatos
                      </Link>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </Nav>
              <Nav navbar>
                {isLogged ? (
                  <>
                    <UncontrolledDropdown nav inNavbar className="dropdown2">
                      <DropdownToggle nav caret>
                        <FaUser className="fa-user" /> Bem vindo, {firstName}
                      </DropdownToggle>
                      <DropdownMenu>
                      {isAdmin && (
                          <DropdownItem>
                            <Link
                              className="nav-link"
                              aria-current="page"
                              to="/admin"
                            >
                            <GrUserAdmin />  ADMIN
                            </Link>
                          </DropdownItem>
                        )}
                        <DropdownItem>
                          <Link
                            className="nav-link"
                            aria-current="page"
                            to="/profile"
                          >
                            <FaUser className="fa-user" /> Perfil
                          </Link>
                        </DropdownItem>
                        <DropdownItem>
                          <Link
                            className="nav-link"
                            aria-current="page"
                            to="/atualizarcarro"
                          >
                            Seus Carros
                          </Link>
                        </DropdownItem>
                        <DropdownItem>
                          <Link
                            className="nav-link"
                            aria-current="page"
                            to="/aluguelativo" // CONTRUIR!!!!!!!!
                          >
                            Aluguéis em Andamento
                          </Link>
                        </DropdownItem>
                        <DropdownItem>
                          <Link
                            className="nav-link"
                            aria-current="page"
                            to="/historico"
                          >
                            Histórico de Pagamento
                          </Link>
                        </DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem onClick={handleLogout}>
                          <RiLoginBoxLine className="HiOutlineLogout" /> Logout
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </>
                ) : (
                  <>
                    <li className="nav-item">
                      <Link
                        className="nav-link"
                        aria-current="page"
                        to="/cadastro"
                      >
                        <FaPersonCirclePlus className="fa-cadastro" />{" "}
                        Cadastre-se
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        className="nav-link"
                        aria-current="page"
                        to="/login"
                      >
                        <RiLoginBoxLine className="fa-login" /> Login
                      </Link>
                    </li>
                  </>
                )}
              </Nav>
            </Collapse>
          </div>
        </nav>
      </div>
    </>
  );
}

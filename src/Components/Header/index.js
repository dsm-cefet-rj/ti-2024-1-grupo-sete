import React, {useState} from "react";
import './header.css';
import Logo from "../../Assets/Logo2.png";
import { RiLoginBoxLine } from "react-icons/ri";
import { FaPersonCirclePlus } from "react-icons/fa6";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { Collapse, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown, Nav } from "reactstrap";

export default function HeaderMain(props){

const [isOpen, setIsOpen] = useState(false);

const toggle = () => setIsOpen(!isOpen);
return(
  <>
  <div className="all">
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="nav-link" to="/"><img className="ImgLogo" src={Logo} alt="DriveZoom Logo" /></Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation" onClick={toggle}>
          <span className="navbar-toggler-icon"></span>
        </button>
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/historico">Historico de Aluguéis</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/criarcarro">Cadastre seu carro</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/clientes">Clientes</Link>
            </li>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Mais informações
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem>
                  <Link className="nav-link" aria-current="page" to="/atualizarcarro">Edite seu carro</Link>
                </DropdownItem>
                <DropdownItem>
                  <Link className="nav-link" aria-current="page" to="/FAQ">FAQ</Link>
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                  <Link className="nav-link" aria-current="page" to="/contatos">Contatos</Link>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          <Nav navbar>
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/">
              <FaPersonCirclePlus className="fa-cadastro" /> Cadastre-se</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link " aria-current="page" to="/login">
              <RiLoginBoxLine className="fa-login" /> Login</Link>
            </li>
          </Nav>
        </Collapse>
      </div>
    </nav>
    </div>

       </>
)

}

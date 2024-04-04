import React, {useState} from "react";
import './header.css';
import Logo from "../../Assets/Logo2.png";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { Collapse, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown, Nav } from "reactstrap";


export default function HeaderMain(props){

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
return(
  <>
  <div className ="all">
  <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <a className="navbar-brand" ><Link to="/"><img className="ImgLogo" src={Logo} alt="DriveZoom Logo" /></Link></a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation" onClick={toggle}>
      <span className="navbar-toggler-icon"></span>
    </button>
    <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
        <li className="nav-item">
        <Link className="nav-link" aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Conheça nossa frota</a>
        </li>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Mais informações
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>Quem somos</DropdownItem>
                <DropdownItem>Option 2</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Reset</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
      </Nav>
      <Nav navbar>
        <li className="nav-item">
          <Link className="nav-link" aria-current="page" to="/">Cadastre-se</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link " aria-current="page" to="/">Login</Link>
        </li>
      </Nav>
    </Collapse>
  </div>
</nav>
</div>

  </>
)
  
}
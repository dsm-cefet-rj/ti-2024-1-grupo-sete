import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function AdminMenu() {
  return (
    <Nav variant="tabs" defaultActiveKey="/admin">
      <Nav.Item>
        <Nav.Link as={Link} to="/admin">Menu Admin</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} to="/admin/users">Usuários</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} to="/admin/carros">Carros</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} to="/admin/alugueis">Aluguéis</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} to="/admin/registros">Registros</Nav.Link>
      </Nav.Item>
    </Nav>
  );
}

export default AdminMenu;

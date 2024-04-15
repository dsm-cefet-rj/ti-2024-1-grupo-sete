import Form from 'react-bootstrap/Form';

export function Pesquisa(_params) {
    return (
        <>
            <Form.Label htmlFor="searchItems">Buscar</Form.Label>
            <Form.Control
                type="search"
                id="searchItems"
                aria-describedby="searchItens"
                style={{width: 500, padding:5}}
            />
            <Form.Text id="searchItens" muted>
                Pesquise por itens
            </Form.Text>
        </>
    );
}

export default Pesquisa;
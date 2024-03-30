import React from "react";
import { Link } from "react-router-dom";
const HeaderMain = () => {
    return(
        <div>
        <nav className='Menu' style={{backgroundColor: '#333'}}>
        <ul style={{display: 'flex', justifyContent: 'space-between', marginLeft: '100px', marginRight: '100px', textDecoration: 'none', color: 'white'}}>
          <div><Link to="/">Página Principal</Link></div>
          <div><Link to="/detalhes">Detalhes</Link></div>
          <div><Link to="/pagamento">Pagamento</Link></div>
        </ul>
      </nav>
      </div>
    )
}

export default HeaderMain;
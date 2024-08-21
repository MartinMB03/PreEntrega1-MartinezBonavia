import logo from '../../assets/logo.png';
import CartWidget from '../CartWidget';
import ItemList from '../ItemList';

const Navbar = () => {

    return(
        <header className="header">
            <nav className="navbar container">
                <figure className="navbar__logo">
                    <img  src={logo} width={80} alt="logo navbar"  />
                </figure>
                <menu className="navbar__menu">
                    <ItemList label="Tienda"/>
                    <ItemList label="Contacto"/>
                    <ItemList label="Conocenos"/>
                    <ItemList label="Login"/>
                    <li>
                        <a href="" className="navbar__link"><CartWidget/>
                        </a>
                    </li>
                </menu>
            </nav>
        
        </header>
    );
}

export default Navbar;
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import Menu from '../../components/Menu';
import CartWidget from '../../components/CartWidget';

const Header = () => {

  const links = [
    {
      label: 'Home',
      href: '/'
    },
    {
      label: 'Tienda',
      href: '/tienda'
    },
    {
      label: 'Contacto',
      href: '/contacto'
    },
  ];

  return (
    <header className="header">
      <nav className="navbar container">
        <a className="navbar__logo" href="/">
          <figure className="navbar__img">
            <img src={logo} width={160}  alt="Logo de tienda" />
          </figure>
        </a>
        <Menu className="navbar" links={links}>
          <li>
            <a href="/cart" className='navbar__link-button'>
              <CartWidget quantity={0} />
            </a>
          </li>
        </Menu>
      </nav>
    </header>
  );
};

export default Header;
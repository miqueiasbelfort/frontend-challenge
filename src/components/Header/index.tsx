import React, {useContext} from 'react';
import styles from './Header.module.css';
import { NavLink } from 'react-router-dom';
import { Context } from '../../context/authentication';

const Header: React.FC = () => {

  const authContext = useContext(Context)

  const isActiveLink = (isActive: boolean): string => {
    return isActive ? styles.active : ""
  }

  return (
    <ul className={styles.container}>
        <li>
            <NavLink className={({isActive}) => isActiveLink(isActive)} to="/">Usuários</NavLink>
        </li>
        <li>
          <NavLink className={({isActive}) => isActiveLink(isActive)} to="/cats">Gatinhos</NavLink>
        </li>
        <li>
          <NavLink className={({isActive}) => isActiveLink(isActive)} to="/dogs">Cachorrinhos</NavLink>
        </li>
        <li>
          <NavLink className={({isActive}) => isActiveLink(isActive)} to="/clients">Clientes</NavLink>
        </li>
        <li className={styles.exit} onClick={() => authContext?.logout()}>Sair</li>
    </ul>
  );
}

export default Header;
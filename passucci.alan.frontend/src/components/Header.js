import React from 'react'
import Titulo from './Titulo';
import logo from '../components/assets/logo.png';

const Header = ({titulo}) => {
    return (
        <header>
            <img src={logo} alt="Logo de la pagina"/>
            <Titulo titulo={titulo}/>
        </header>
    );
};

export default Header;

import React from 'react';
import { NavLink } from 'react-router-dom';
import BotonRuta from './BotonRuta';

const Navegacion = () => {
    return (
        <div className="navBar">
            <nav className="navbar">
                <BotonRuta tipo="Perro"/>
                <BotonRuta tipo="Gato"/>
                <BotonRuta tipo="Reptil"/>
                <BotonRuta tipo="Pez"/>
                <BotonRuta tipo="Roedor"/>
                <NavLink className="navbar-item" exact to="/">Cerrar Sesión</NavLink>
            </nav>
        </div>
        
    );
};

export default Navegacion;

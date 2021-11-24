import React from 'react'
import Header from '../components/Header';
import { Link } from 'react-router-dom';

const Error404 = () => {
    return (
        <>
            <Header titulo="CRUD Mascotas"/>
            <nav className="navbar">
                <Link to="/home" className="navbar-item">Volver</Link>
            </nav>
            <div className="centrado">
                <h1 className="title">Error 404: Página no encontrada :(</h1>
            </div>
        </>
    );
};

export default Error404;
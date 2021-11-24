import React, { useEffect } from 'react'
import { useHistory } from 'react-router';
import Crud from '../components/Crud';
import Header from '../components/Header';
import Navegacion from '../components/Navegacion';

const Home = () => {

    const history = useHistory();

    useEffect(() => {
        const token = window.localStorage.getItem("token");
        if(!token){
            history.push("/");
        }
    });

    return (
        <>
            <Header titulo="CRUD Mascotas"/>
            <Navegacion/>
            <div className="container">
                <Crud />
            </div>
        </>
    );
};

export default Home;

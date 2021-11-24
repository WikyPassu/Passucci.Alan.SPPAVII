import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from "react-router";
import { Link } from 'react-router-dom';
import Spinner from '../components/Spinner';
import Header from '../components/Header';

const Animales = () => {
    const token = window.localStorage.getItem("token");
    const {tipo} = useParams();
    const [lista, setLista] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory();

    useEffect(() => {
        const token = window.localStorage.getItem("token");
        if(!token){
            history.push("/");
        }
    });

    useEffect(() => {
        setIsLoading(true);
        fetch("http://localhost:5000/api/mascotas/", {
            method: "GET",
            headers: { "Authorization": token }
        })
        .then(res=>res.ok?res.json():Promise.reject(res.status + ": " + res.statusText))
        .then(lista=>{
            setLista(lista.filter(mascota => mascota.tipo === tipo));
        })
        .catch(err=>console.error(err))
        .finally(() => setIsLoading(false));
    }, [tipo, token]);

    return (
        <>
            <Header titulo="CRUD Mascotas"/>
            <nav className="navbar">
                <Link to="/home" className="navbar-item">Volver</Link>
            </nav>
            <h2 className="title is-4" style={{textAlign: "center"}}>Mascotas que son {tipo}</h2>
            <div className="animalesCentrado">
                {
                    isLoading?<Spinner/>:
                    <>
                        {
                            lista.length?
                            <>
                            {
                                lista.map(mascota => {
                                    return (
                                        <div key={mascota.id}>
                                            <div className="card" style={{width: "350px"}}>
                                                <div className="card-content">
                                                    <div className="content">
                                                    <p><b>Nombre:</b> {mascota.nombre}</p>
                                                    <p><b>Edad:</b> {mascota.edad} años</p>
                                                    <p><b>Tipo:</b> {mascota.tipo}</p>
                                                    <p><b>Vacunado:</b> {mascota.vacunado?"Si":"No"}</p>
                                                    <p><b>Observaciones:</b> {mascota.observaciones?mascota.observaciones:"No hay observaciones"}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ); 
                                })
                            }
                            </>:<h2 className="title is-5">No se encontraron resultados...</h2>
                        }
                    </>
                }
            </div>
        </>
    );
};

export default Animales;
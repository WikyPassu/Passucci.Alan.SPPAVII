import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from "react-router";
import { Link } from 'react-router-dom';
import Spinner from '../components/Spinner';
import Header from '../components/Header';

const Detalle = () => {
    const token = window.localStorage.getItem("token");
    const {id} = useParams();
    const [pet, setPet] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const {nombre, edad, tipo, vacunado, observaciones} = pet;
    const history = useHistory();

    useEffect(() => {
        const token = window.localStorage.getItem("token");
        if(!token){
            history.push("/");
        }
    });

    useEffect(() => {
        setIsLoading(true);
        fetch("http://localhost:5000/api/mascotas/"+id, {
            method: "GET",
            headers: { "Authorization": token }
        })
        .then(res=>res.ok?res.json():Promise.reject(res.status + ": " + res.statusText))
        .then(mascota=>{
            setPet(mascota);
        })
        .catch(err=>{
            console.error(err);
            history.push("/404");
        })
        .finally(() => setIsLoading(false));
    }, [id, history, token]);

    return (
        <>
            <Header titulo="CRUD Mascotas"/>
            <nav className="navbar">
                <Link to="/home" className="navbar-item">Volver</Link>
            </nav>
            <h2 className="title is-4" style={{textAlign: "center"}}>Información de la Mascota</h2>
            <div className="animalesCentrado">
                {
                    isLoading?<Spinner/>:
                    <>
                        <div className="card" style={{width: "350px"}}>
                            <div className="card-content">
                                <div className="content">
                                <p><b>Nombre:</b> {nombre}</p>
                                <p><b>Edad:</b> {edad} años</p>
                                <p><b>Tipo:</b> {tipo}</p>
                                <p><b>Vacunado:</b> {vacunado?"Si":"No"}</p>
                                <p><b>Observaciones:</b> {observaciones?observaciones:"No hay observaciones"}</p>
                                </div>
                            </div>
                        </div>
                    </>
                }
            </div>
        </>
    );
};

export default Detalle;
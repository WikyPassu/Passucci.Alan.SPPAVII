import React, { useEffect, useState } from 'react';
import "./Credenciales.css";
import { Link } from 'react-router-dom';
import { useHistory } from "react-router";

const URL_LOGIN = "http://localhost:5000/api/credenciales/login";
const URL_REGISTRO = "http://localhost:5000/api/credenciales/registro";
const initialForm = {
    username: "",
    password: "",
    rePassword: ""
}

const Registro = () => {

    const [form, setForm] = useState(initialForm);
    const {username, password, rePassword} = form;
    const history = useHistory();

    useEffect(() => {
        window.localStorage.removeItem("token");
    });

    const handleChange = ({target}) => {
        setForm(() => { return { ...form, [target.name]: target.value } });
    };

    const handleSubmit = e => {
        e.preventDefault();
        if(!username || !password || !rePassword){
            alert("Faltan datos...");
            return;
        }
        if(password !== rePassword){
            alert("Las contraseñas no coinciden...");
            return;
        }
        const user = { username, password };
        fetch(URL_REGISTRO, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then(data => {
            if(data.id){
                fetch(URL_LOGIN, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(user)
                })
                .then(res => res.json())
                .then(data => {
                    if(data.token){
                        window.localStorage.setItem("token", `Bearer ${data.token}`);
                        history.push("/home");
                    }
                    else{
                        alert(data.message);
                    }
                })
                .catch(err => console.log(err));
            }
            else{
                alert(data.message);
            }
        })
        .catch(err => console.log(err));
    };

    return (
        <div className="divBody">
            <div className="centrado">
                <div className="card" style={{width: "350px"}}>
                    <div className="card-content">
                        <div className="content">
                            <h1 style={{textAlign: "center"}}>Crear Cuenta</h1>
                            <form onSubmit={handleSubmit}>
                            <input className="input is-link"
                                    type="text"
                                    name="username" 
                                    placeholder="Nombre de usuario" 
                                    autoComplete="off"
                                    onChange={handleChange}
                                    value={username}
                                />
                                <input className="input is-link"
                                    type="password"
                                    name="password" 
                                    placeholder="Contraseña" 
                                    autoComplete="off"
                                    onChange={handleChange}
                                    value={password}
                                />
                                <input className="input is-link"
                                    type="password"
                                    name="rePassword" 
                                    placeholder="Repetir Contraseña" 
                                    autoComplete="off"
                                    onChange={handleChange}
                                    value={rePassword}
                                />
                                <button className="button is-black is-fullwidth"
                                    style={{marginLeft: "3px", marginTop: "10px"}}
                                    type="submit"
                                    >Registrarme</button>
                                <Link to="/">
                                    <button className="button"
                                        style={{marginLeft: "3px", marginTop: "10px"}}
                                        >Ya tengo una cuenta</button>
                                </Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Registro;

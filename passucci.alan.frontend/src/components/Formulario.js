import React, { useState, useEffect } from 'react';
import Tipo from './Tipo';

const initialForm = {
    id: null,
    nombre: "",
    edad: "",
    tipo: "",
    vacunado: false,
    observaciones: ""
};

const Formulario = ({createPet, updatePet, petEdit, setPetEdit, tipos}) => {

    const [form, setForm] = useState(initialForm);
    const {id, nombre, edad, tipo, vacunado, observaciones} = form;

    useEffect(() => {
        if(petEdit){
            setForm(petEdit);
        }
    }, [petEdit])

    const handleChange = ({target}) => {
        if(target.name === "vacunado") {
            if(target.checked){
                setForm(() => { return { ...form, [target.name]: true } });
            }
            else{
                setForm(() => { return { ...form, [target.name]: false } });
            }
        }
        else if(target.name === "edad"){
            setForm(() => { return { ...form, [target.name]: parseInt(target.value) } });
        }
        else{
            setForm(() => { return { ...form, [target.name]: target.value } });
        }
    };

    const handleSubmit = e => {
        e.preventDefault();
        if(!nombre || !edad || !tipo){
            alert("Faltan datos...");
            return;
        }
        if(id){
            updatePet(form);
        }
        else{
            createPet(form);
        }
        handleReset();
    };

    const handleReset = e => {
        setForm(initialForm);
        setPetEdit(null);
    };

    return (
        <>
            <h2 className="title is-4">{id?"Modificar Mascota":"Agregar Mascota"}</h2>
            <div className="columns is-centered">
                <div className="column is-6">
                    <form onSubmit={handleSubmit}>
                        <input className="input is-link"
                        type="text"
                        name="nombre" 
                        placeholder="Nombre" 
                        autoComplete="off"
                        onChange={handleChange}
                        value={nombre} />
                        <input className="input is-link"
                        type="number" 
                        name="edad" 
                        placeholder="Edad"
                        autoComplete="off"
                        min="1"
                        onChange={handleChange}
                        value={edad} />
                        <Tipo
                        tipos={tipos}
                        value={tipo}
                        handleChange={handleChange}/>
                        <br/>
                        <label className="checkbox">
                            <input
                            type="checkbox"
                            name="vacunado"
                            onChange={handleChange}
                            checked={vacunado}/> Vacunado
                        </label>
                        <textarea className="textarea is-link"
                        rows="3"
                        name="observaciones"
                        placeholder="Observaciones"
                        onChange={handleChange}
                        value={observaciones}/>
                        <button className="button is-success buttonForm"
                        type="submit" 
                        value="Enviar">Enviar</button>
                        <button className="button is-link buttonForm"
                        type="reset" 
                        onClick={handleReset}
                        value="Limpiar">Limpiar</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Formulario;
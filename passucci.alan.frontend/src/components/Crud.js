import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Formulario from './Formulario';
import Tabla from './Tabla';
import Spinner from './Spinner';

const URL_MASCOTAS = "http://localhost:5000/api/mascotas";
const URL_TIPOS = "http://localhost:5000/api/tipos";

const Crud = () => {
    const token = window.localStorage.getItem("token");
    const [pets, setPets] = useState([]);
    const [tipos, setTipos] = useState([]);
    const [petEdit, setPetEdit] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory();

    useEffect(() => {
        const getPets = async(url) => {
            setIsLoading(true);
            try {
                const res = await fetch(url, {
                    method: "GET",
                    headers: {
                        "Authorization": token
                    }
                });
                const data = await res.json();
                data.forEach(pet => {
                    setPets(pets => {
                        return [...pets, pet];
                    });
                });
            } catch (err) {
                console.error(err.message);
            } finally{
                setIsLoading(false);
            }
        };
        const getTipos = async(url) => {
            setIsLoading(true);
            try {
                const res = await fetch(url, {
                    method: "GET",
                    headers: {
                        "Authorization": token
                    }
                });
                const data = await res.json();
                data.forEach(tipo => {
                    setTipos(tipos => {
                        return [...tipos, tipo];
                    });
                });
                setIsLoading(false);
            } catch (err) {
                console.error(err.message);
            }
            finally{
                setIsLoading(false);
            }
        };
        getPets(URL_MASCOTAS);
        getTipos(URL_TIPOS);
    }, [token]);

    const createPet = newPet => {
        setIsLoading(true);
        fetch(URL_MASCOTAS, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            },
            body: JSON.stringify(newPet)
        })
        .then(res => res.json())
        .then(nuevaMascota => {
            setPets(pets => [...pets, nuevaMascota]);
            alert("Alta exitosa!");
        })
        .finally(() => setIsLoading(false));
    };

    const updatePet = petUpdated => {
        setIsLoading(true);
        fetch(URL_MASCOTAS + "/" + petUpdated.id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            },
            body: JSON.stringify(petUpdated)
        })
        .then(res => res.json())
        .then(petModificada => {
            setPets(pets => {
                return pets.map(pet => pet.id === petModificada.id ? petModificada : pet);
            });
            alert("Modificacion exitosa!");
        })
        .finally(() => setIsLoading(false));
    };

    const deletePet = id => {
        if(window.confirm("¿Confirma eliminacion de " + id + "?")){
            setIsLoading(true);
            fetch(URL_MASCOTAS + "/" + id, {
                method: "DELETE",
                headers: { "Authorization": token }
            })
            .then(res => {
                if(res.ok){
                    setPets(pets => {
                        return pets.filter(pet => pet.id !== id);
                    });
                    alert("Borrado exitoso!");    
                }
            })
            .finally(() => setIsLoading(false));
        }
    };

    const verDetallesPet = id => {
        history.push("/mascota/"+id);
    };

    return (
        <section>
            <div className="columns is-centered">
                <div className="column is-6">
                    <Formulario
                    createPet={createPet}
                    updatePet={updatePet}
                    petEdit={petEdit}
                    setPetEdit={setPetEdit}
                    tipos={tipos} />
                </div>
                <div className="column is-6">
                    <h2 className="title is-4">Lista de Mascotas</h2>
                    {
                        isLoading?
                        <div className="centradoTabla"><Spinner/></div>:
                        <Tabla
                        data={pets}
                        verDetallesPet={verDetallesPet}
                        setPetEdit={setPetEdit}
                        deletePet={deletePet}/>
                    }
                </div>
            </div>
        </section>
    );
};

export default Crud;

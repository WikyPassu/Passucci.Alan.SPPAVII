import React from 'react';

const Row = ({pet, setPetEdit, deletePet, verDetallesPet}) => {
    const {id, nombre, tipo} = pet;
    return (
        <tr>
            <td>{nombre}</td>
            <td>{tipo}</td>
            <td>
                <button className="button is-link buttonTable" onClick={() => { verDetallesPet(id) }}>Ver Detalles</button>
                <button className="button is-warning buttonTable" onClick={() => { setPetEdit(pet) }}>Modificar</button>
                <button className="button is-danger buttonTable" onClick={() => { deletePet(id) }}>Eliminar</button>
            </td>
        </tr>
    )
};

export default Row;
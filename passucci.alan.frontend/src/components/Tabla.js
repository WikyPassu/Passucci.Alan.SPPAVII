import React from 'react';
import Row from './Row';

const Tabla = ({data, setPetEdit, deletePet, verDetallesPet}) => {
    return (
        <>
            <table className="table" align="center">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Tipo</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                {
                    data.length?
                    data.map(pet => <Row 
                                    key={pet.id}
                                    pet={pet}
                                    verDetallesPet={verDetallesPet}
                                    setPetEdit={setPetEdit}
                                    deletePet={deletePet} />)
                    :<tr><td colSpan={3}>No hay datos</td></tr>
                }
                </tbody>
            </table>
        </>
    )
};

export default Tabla;
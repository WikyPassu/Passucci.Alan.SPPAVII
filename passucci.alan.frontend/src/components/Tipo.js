import React from 'react'

const Tipo = ({tipos, value, handleChange}) => {
    return (
        <div className="select is-link is-fullwidth">
            <select
            name="tipo"
            value={value}
            onChange={handleChange}>
                <option
                key="-1"
                value=""
                >Seleccione tipo</option>
                {
                    tipos.map(tipo => {
                        return <option
                                key={tipo.id} 
                                value={tipo.descripcion}
                                >{tipo.descripcion}</option>
                    })
                }
            </select>
        </div>
    );
};

export default Tipo;

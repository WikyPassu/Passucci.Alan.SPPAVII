import React, { Component } from 'react';

class Titulo extends Component {
    render() { 
        return ( 
            <h1 className="title is-1">{this.props.titulo}</h1>
        );
    }
}
 
export default Titulo;
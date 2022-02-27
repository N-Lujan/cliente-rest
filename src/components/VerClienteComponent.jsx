import React, {Component} from 'react';
import ClienteService from '../services/ClienteService';

class VerClienteComponent extends Component{
    constructor(props){
        super(props)

        this.state = {
            id: this.props.match.params.id,
            cliente: {}
        }
    }

    componentDidMount(){
        ClienteService.getClienteById(this.state.id)
            .then(respuesta =>{
                this.setState({cliente: respuesta.data});
            })
    }

    render(){return (
        <div>
            <br/><br/>
            <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offser-md-3">
                        <h3 className="text-center">Ver Detalles de Cliente</h3>
                        <div className="card-body">
                            <div className="row">
                                <label>Nombres Completos: </label>
                                <div>{this.state.cliente.nombre}</div>
                            </div>

                            <div className="row">
                                <label>Apellidos Completos: </label>
                                <div>{this.state.cliente.apellido}</div>
                            </div>

                            <div className="row">
                                <label>DNI: </label>
                                <div>{this.state.cliente.dni}</div>
                            </div>

                            <div className="row">
                                <label>Celular: </label>
                                <div>{this.state.cliente.celular}</div>
                            </div>

                            <div className="row">
                                <label>eMail: </label>
                                <div>{this.state.cliente.email}</div>
                            </div>

                            <div className="row">
                                <label>Fecha de Nacimiento: </label>
                                <div>{this.state.cliente.fechaNacimiento}</div>
                            </div>
                        </div>
                    </div>                   
                </div>
            </div>
        </div>
    )}
}

export default VerClienteComponent
import React, {Component} from 'react';
import ClienteService from '../services/ClienteService';

class ListarClientesComponent extends Component{
    //El constructor es invocado antes de que el componente sea
    //montado, aquí declaramos las variables de estado.
    constructor(props){
        super(props);

        this.state = {
            clientes: []
        }

        this.agregarCliente = this.agregarCliente.bind(this);
        this.editarCliente = this.editarCliente.bind(this);
        this.eliminarCliente = this.eliminarCliente.bind(this);
        this.verCliente = this.verCliente.bind(this);
    }

    //Esta función se ejecuta al montar el componente, invoca
    //al servicio y puebla la variable de estado clientes.
    componentDidMount(){
        ClienteService.getClientes().then((respuesta) => {
            this.setState({clientes: respuesta.data});
        })
    }

    agregarCliente(){
        this.props.history.push('/add-cliente/_add');
    }

    editarCliente(id){
        this.props.history.push('/add-cliente/' + id);
    }

    eliminarCliente(id){
        ClienteService.eliminarCliente(id).then(respuesta => {
            this.setState({
                clientes: this.state.clientes.filter(
                    cliente => cliente.id !== id)
            })
        })
    }

    verCliente(id){
        this.props.history.push('/view-cliente/' + id);
    }

    render(){ return (
        <div>
            <h2 className="text-center">Lista de Clientes</h2>
            
                <button className="btn btn-primary"
                    onClick={this.agregarCliente}>
                    Agregar Cliente
                </button>
            
            <br/><br/>
            <div className="row">
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Cliente Apellidos</th>
                            <th>Cliente Nombre</th>
                            <th>Cliente Email</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody> {
                        this.state.clientes.map(
                            cliente =>
                            <tr key={cliente.id}>
                                <td>{cliente.apellido}</td>
                                <td>{cliente.nombre}</td>
                                <td>{cliente.email}</td>
                                <td>
                                    <button className="btn btn-info" 
                                        onClick={()=>
                                        this.editarCliente(cliente.id)}>
                                        Editar
                                    </button>
                                    <button className="btn btn-danger" 
                                        style={{marginLeft: "10px"}}
                                        onClick={()=>
                                        this.eliminarCliente(cliente.id)}>
                                        Eliminar
                                    </button>
                                    <button className="btn btn-warning" 
                                        style={{marginLeft: "10px"}}
                                        onClick={()=>
                                        this.verCliente(cliente.id)}>
                                        Ver
                                    </button>
                                </td>
                            </tr>
                        )
                    }                        
                    </tbody>
                </table>
            </div>
        </div>
    )}
}

export default ListarClientesComponent
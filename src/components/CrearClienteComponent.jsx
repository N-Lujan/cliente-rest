import React, {Component} from 'react';
import ClienteService from '../services/ClienteService';

class CrearClienteComponent extends Component{
    constructor(props){
        super(props)

        this.state = {
            id: this.props.match.params.id,
            nombre: '',
            apellido: '',
            dni: '',
            celular: '',
            email: '',
            fechaNacimiento: ''
        }

        this.changeNombreHandler = this.changeNombreHandler.bind(this);
        this.changeApellidoHandler = this.changeApellidoHandler.bind(this);
        this.changeDniHandler = this.changeDniHandler.bind(this) ;
        this.changeCelularHandler = this.changeCelularHandler.bind(this);
        this.changeEmailHandler = this.changeEmailHandler.bind(this);
        this.changeFechaNacimientoHandler = this.changeFechaNacimientoHandler.bind(this);
        this.agregarActualizarCliente = this.agregarActualizarCliente.bind(this);
    }

    componentDidMount (){
        if (this.state.id === '_add'){
            return
        } else {
            ClienteService.getClienteById(this.state.id).then ((respuesta)=>{
                let cliente = respuesta.data;
                this.setState({
                    nombre: cliente.nombre,
                    apellido: cliente.apellido,
                    dni: cliente.dni,
                    celular: cliente.celular,
                    email: cliente.email,
                    fechaNacimiento: cliente.fechaNacimiento
                });
            });
        }
    }

    agregarActualizarCliente = (e)=>{
        e.preventDefault();
        let cliente ={
            id: null,
            nombre: this.state.nombre,
            apellido: this.state.apellido,
            dni: this.state.dni,
            celular: this.state.celular,
            email: this.state.email,
            fechaNacimiento: this.state.fechaNacimiento
        }        
        if (this.state.id === '_add'){
            ClienteService.crearCliente(cliente).then(respuesta => {
                this.props.history.push('/clientes');
            })
        } else {
            cliente.id = this.state.id;
            ClienteService.actualizarCliente(cliente)
                .then (respuesta => {
                    this.props.history.push('/clientes');
                })                
        }
    }
    
    changeNombreHandler = (event) =>{
        this.setState({nombre: event.target.value});
    }
    changeApellidoHandler = (event) =>{
        this.setState({apellido: event.target.value});
    }
    changeDniHandler = (event) =>{
        this.setState({dni: event.target.value});
    }
    changeCelularHandler = (event) =>{
        this.setState({celular: event.target.value});
    }
    changeEmailHandler = (event) =>{
        this.setState({email: event.target.value});
    }
    changeFechaNacimientoHandler = (event) =>{
        this.setState({fechaNacimiento: event.target.value});
    }

    cancel(){
        this.props.history.push('/clientes');
    }

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center">Agregar Cliente</h3>
        } else{
            return <h3 className="text-center">Actualizar Cliente</h3>
        }
    }

    render() { return(
        <div>
            <br/><br/>
            <div className="row">
                <div className="card col-md-6 offset-md-3 offser-md-3">
                    {this.getTitle()}
                    <div className="card-body">
                        <form>
                            <div className="form-group">
                                <label>Nombres:</label>
                                <input name="nombre"
                                    className="form-control"
                                    placeholder="Nombres completos"
                                    value={this.state.nombre}
                                    onChange={this.changeNombreHandler}/>
                            </div>

                            <div className="form-group">
                                <label>Apellidos:</label>
                                <input name="apellido"
                                    className="form-control"
                                    placeholder="Apellidos completos"
                                    value={this.state.apellido}
                                    onChange={this.changeApellidoHandler}/>
                            </div>

                            <div className="form-group">
                                <label>DNI:</label>
                                <input name="dni"
                                    className="form-control"
                                    placeholder="Ingrese DNI"
                                    value={this.state.dni}
                                    onChange={this.changeDniHandler}/>
                            </div>

                            <div className="form-group">
                                <label>Celular:</label>
                                <input name="celular"
                                    className="form-control"
                                    placeholder="Numero celular"
                                    value={this.state.celular}
                                    onChange={this.changeCelularHandler}/>
                            </div>

                            <div className="form-group">
                                <label>eMail:</label>
                                <input name="email"
                                    className="form-control"
                                    placeholder="Correo electrónico"
                                    value={this.state.email}
                                    onChange={this.changeEmailHandler}/>
                            </div>
                            
                            <div className="form-group">
                                <label>Fecha Nacimiento:</label>
                                <input name="fechaNacimiento"
                                    type="date"
                                    className="form-control"
                                    placeholder="Ingrese DNI"
                                    value={this.state.fechaNacimiento}
                                    onChange={this.changeFechaNacimientoHandler}/>
                            </div>

                            <button className="btn btn-success"
                                onClick={this.agregarActualizarCliente}>
                                Guardar
                            </button>
                            <button className="btn btn-danger"
                                onClick={this.cancel.bind(this)}
                                style={{marginLeft: "10px"}}>
                                Cancelar
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )}    
}

export default CrearClienteComponent
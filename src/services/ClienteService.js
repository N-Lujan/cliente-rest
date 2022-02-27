import axios from 'axios';

const CLIENTE_API_BASE_URL = "http://localhost:8091/cliente";

class ClienteService {
    getClientes() {
        return axios.get(CLIENTE_API_BASE_URL);
    }

    crearCliente(cliente) {
        return axios.post(CLIENTE_API_BASE_URL, cliente);
    }

    getClienteById(clienteID) {
        return axios.get(CLIENTE_API_BASE_URL + '/' + clienteID);
    }

    actualizarCliente(cliente, clienteID) {
        return axios.put(CLIENTE_API_BASE_URL, cliente);
    }

    eliminarCliente(clienteID) {
        return axios.delete(CLIENTE_API_BASE_URL + '/' + clienteID);
    }
}

export default new ClienteService()
'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';

const CadastrarCliente = () => {
    const [cliente, setCliente] = useState({
        nome: '',
        cpf: '',
        email: '',
        telefone: '',
    });

    const [clientesCadastrados, setClientesCadastrados] = useState([
        {
            id: '',
            nome: '',
            cpf: '',
            email: '',
            telefone: '',
        }
    ]);

    const handleChange = (event: any) => {
        setCliente({ ...cliente, [event.target.name]: event.target.value });
    };

    const handleSubmit = (event: any) => {
        event.preventDefault();
        axios.post('http://localhost:3000/cliente', cliente)
            .then((response) => {
                console.log(response);
                alert('Cliente cadastrado com sucesso!');
            })
            .catch((error) => {
                console.log(error);
                alert('Erro ao cadastrar o cliente!');
            });
    };

    const fetchClientesCadastrados = () => {
        // Lógica para buscar os imóveis cadastrados do servidor
        axios.get('http://localhost:3000/cliente')
            .then((response) => {
                setClientesCadastrados(response.data);
            })
            .catch((error) => {
                console.error('Erro ao buscar imóveis cadastrados:', error);
            });
    };

    useEffect(() => {
        // Carregar a lista de imóveis ao montar o componente
        fetchClientesCadastrados();
    }, []);

    return (
        <>
            <div className='items-center h-[100vh] flex justify-evenly bg-gray-200'>

                <div className='items-center h-[100vh] flex flex-col justify-center bg-gray-200'>
                    <h1>Cadastrar Cliente</h1>
                    <form className=' ml-5 w-full' onSubmit={handleSubmit}>
                        <label className='mt-2'>Nome:</label>
                        <input className="form-control mb-2" type="text" name="nome" value={cliente.nome} onChange={handleChange} />

                        <label className='mt-2'>CPF:</label>
                        <input className="form-control  mb-2" type="text" name="cpf" value={cliente.cpf} onChange={handleChange} />

                        <label className='mt-2'>Email:</label>
                        <input className="form-control  mb-2" type="text" name="email" value={cliente.email} onChange={handleChange} />

                        <label className='mt-2'>Telefone:</label>
                        <input className="form-control mb-2" type="text" name="telefone" value={cliente.telefone} onChange={handleChange} />

                        <button className='btn btn-primary mt-2' type="submit">Cadastrar</button>
                    </form>

                </div>
                <div >

                    <div className=''>
                        <h1>Clientes Cadastrados</h1>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>CPF</th>
                                    <th>Email</th>
                                    <th>Telefone</th>
                                </tr>
                            </thead>
                            <tbody>
                                {clientesCadastrados.map((cliente) => (
                                    <tr key={cliente.id}>
                                        <td>{cliente.nome}</td>
                                        <td>{cliente.cpf}</td>
                                        <td>{cliente.email}</td>
                                        <td>{cliente.telefone}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>


        </>
    );
};

export default CadastrarCliente;
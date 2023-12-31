'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';

const CadastrarLocacao = () => {


    const [locacao, setLocacao] = useState({
        dataInicio: '',
        dataFim: '',
        status: '',
        cliente: '',
        imovel: '',
    });

    const [locacoesCadastradas, setLocacoesCadastradas] = useState([
        {
            id: '',
            dataInicio: '',
            dataFim: '',
            status: '',
            cliente: '',
            imovel: '',
        }
    ]);

    const handleChange = (event: any) => {
        if (event.target.name === 'cliente' || event.target.name === 'imovel') {
            setLocacao({ ...locacao, [event.target.name]: parseInt(event.target.value) });
        } else {
            setLocacao({ ...locacao, [event.target.name]: event.target.value });
        }
    };

    const handleSubmit = async (event: any) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:3000/locacao', locacao);
            console.log(response.data);
            alert('Locação criada com sucesso!');
        } catch (error) {
            console.error('Erro ao criar locação:', error);
            alert('Erro ao criar locação!');
        }
    };

    const fetchLocacoesCadastradas = () => {
        // Lógica para buscar os imóveis cadastrados do servidor
        axios.get('http://localhost:3000/locacao')
            .then((response) => {
                setLocacoesCadastradas(response.data);
            })
            .catch((error) => {
                console.error('Erro ao buscar locações cadastradas:', error);
            });
    };

    useEffect(() => {
        // Carregar a lista de imóveis ao montar o componente
        fetchLocacoesCadastradas();
    }, []);

    return (
        <div className='items-center h-[100vh] flex justify-evenly bg-gray-200'>
            <div>
                <h1>Cadastrar Imovel</h1>
                <form className=' ml-5 w-full' onSubmit={handleSubmit}>
                    <label className='mt-2'>Data de Inicio:</label>
                    <input className="form-control mb-2" type="text" name="dataInicio" value={locacao.dataInicio} onChange={handleChange} />

                    <label className='mt-2'>Data de Fim:</label>
                    <input className="form-control  mb-2" type="text" name="dataFim" value={locacao.dataFim} onChange={handleChange} />

                    <label className='mt-2'>Status:</label>
                    <input className="form-control  mb-2" type="text" name="status" value={locacao.status} onChange={handleChange} />

                    <label className='mt-2'>ID do cliente:</label>
                    <input className="form-control  mb-2" type="number" name="cliente" value={locacao.cliente} onChange={handleChange} />

                    <label className='mt-2'>ID do Imovel:</label>
                    <input className="form-control  mb-2" type="number" name="imovel" value={locacao.imovel} onChange={handleChange} />

                    <button className='btn btn-primary mt-2' type="submit">Cadastrar</button>
                </form>
            </div>
            <div >

                <div className=''>
                    <h1>Imóveis Locados</h1>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Data de Inicio</th>
                                <th>Data de Fim</th>
                                <th>Status</th>
                                <th>Cliente</th>
                                <th>Imovel</th>
                            </tr>
                        </thead>
                        <tbody>
                            {locacoesCadastradas.map((locacao) => (
                                <tr key={locacao.id}>
                                    <td>{locacao.dataInicio}</td>
                                    <td>{locacao.dataFim}</td>
                                    <td>{locacao.status}</td>
                                    <td>{locacao.cliente}</td>
                                    <td>{locacao.imovel}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>


    );
};


export default CadastrarLocacao;
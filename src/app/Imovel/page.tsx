'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';

const CadastrarImovel = () => {
  const [imovel, setImovel] = useState({
    tipo: '',
    endereco: '',
    valor: ''
  });

  const [imoveisCadastrados, setImoveisCadastrados] = useState([
    {
      id: '',
      tipo: '',
      endereco: '',
      valor: ''
    }
  ]);

  const handleChange = (event: any) => {
    if (event.target.name === 'valor') {
      setImovel({ ...imovel, [event.target.name]: parseInt(event.target.value) });
    } else {
      setImovel({ ...imovel, [event.target.name]: event.target.value });
    }
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    axios.post('http://localhost:3000/imovel', imovel)
      .then((response) => {
        console.log(response);
        alert('Imovel cadastrado com sucesso!');
      })
      .catch((error) => {
        console.log(error);
        alert('Erro ao cadastrar o Imovel!');
      });
  };

  const fetchImoveisCadastrados = () => {
    // Lógica para buscar os imóveis cadastrados do servidor
    axios.get('http://localhost:3000/imovel')
      .then((response) => {
        setImoveisCadastrados(response.data);
      })
      .catch((error) => {
        console.error('Erro ao buscar imóveis cadastrados:', error);
      });
  };

  useEffect(() => {
    // Carregar a lista de imóveis ao montar o componente
    fetchImoveisCadastrados();
  }, []);

  return (
    <div className='items-center h-[100vh] flex justify-evenly bg-gray-200'>
      <div>
      <h1>Cadastrar Imovel</h1>
      <form className=' ml-5 w-full' onSubmit={handleSubmit}>
        <label className='mt-2'>Tipo:</label>
        <input className="form-control mb-2" type="text" name="tipo" value={imovel.tipo} onChange={handleChange} />

        <label className='mt-2'>Endereço:</label>
        <input className="form-control  mb-2" type="text" name="endereco" value={imovel.endereco} onChange={handleChange} />

        <label className='mt-2'>Valor:</label>
        <input className="form-control  mb-2" type="number" name="valor" value={imovel.valor} onChange={handleChange} />

        <button className='btn btn-primary mt-2' type="submit">Cadastrar</button>
      </form>
      </div>
      <div >
        
        <div className=''>
          <h1>Imóveis Cadastrados</h1>
          <table className="table">
            <thead>
              <tr>
                <th>Tipo</th>
                <th>Endereço</th>
                <th>Valor</th>
              </tr>
            </thead>
            <tbody>
              {imoveisCadastrados.map((imovel) => (
                <tr key={imovel.id}>
                  <td>{imovel.tipo}</td>
                  <td>{imovel.endereco}</td>
                  <td>{imovel.valor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>


  );
};


export default CadastrarImovel;
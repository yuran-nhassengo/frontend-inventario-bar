import axios from 'axios';
import React, { useState } from 'react';

export const EntradaForm = () => {
  const [produtoId, setProdutoId] = useState('');
  const [quantidade, setQuantidade] = useState('');
  // const [data, setData] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await axios.post("http://localhost:8000/api/stock/entrada/create-entrada", {
        produtoId,
        quantidade,
      });
      alert('Entrada adicionado com sucesso!');
      
      // Limpar os campos do formulário após a submissão bem-sucedida
      setProdutoId('');
      setQuantidade('');
    } catch (error) {
      console.error("Erro ao adicionar produto:", error);
    }
  };

 return (
    <div className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Registrar Entrada</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="produtoId">
            ID do Produto
          </label>
          <input
            type="String"
            id="produtoId"
            value={produtoId}
            onChange={(e) => setProdutoId(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="quantidade">
            Quantidade
          </label>
          <input
            type="number"
            id="quantidade"
            value={quantidade}
            onChange={(e) => setQuantidade(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        {/* <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="data">
            Data
          </label>
          <input
            type="date"
            id="data"
            value={data}
            onChange={(e) => setData(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div> */}
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Registrar Entrada
        </button>
      </form>
    </div>
  );
};



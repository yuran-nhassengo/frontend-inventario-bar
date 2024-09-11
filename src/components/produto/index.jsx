import React, { useState } from 'react';
import axios from 'axios';

export const AdicionarProdutoForm = ({ closeModal, refreshStock }) => {
  const [nome, setNome] = useState('');
  const [categoria, setCategoria] = useState('Bebidas'); // Definir um valor padrão
  const [quantidade, setQuantidade] = useState('');
  const [precoCompra, setPrecoCompra] = useState('');
  const [precoVenda, setPrecoVenda] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8000/api/stock/add-stock", {
        nome,
        categoria,
        quantidade,
        precoCompra,
        precoVenda
      });
      refreshStock(); // Atualiza a lista de produtos após adicionar
      closeModal(); // Fecha o modal
    } catch (error) {
      console.error("Erro ao adicionar produto:", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Adicionar Novo Produto</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="nome">
            Nome
          </label>
          <input
            type="text"
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="categoria">
            Categoria
          </label>
          <select
            id="categoria"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          >
            <option value="Bebidas">Bebidas</option>
            <option value="Comidas">Comidas</option>
            <option value="Outros">Outros</option>
          </select>
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
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="precoCompra">
            Preço de Compra
          </label>
          <input
            type="number"
            id="precoCompra"
            value={precoCompra}
            onChange={(e) => setPrecoCompra(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            step="0.01"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="precoVenda">
            Preço de Venda
          </label>
          <input
            type="number"
            id="precoVenda"
            value={precoVenda}
            onChange={(e) => setPrecoVenda(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            step="0.01"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Adicionar Produto
        </button>
      </form>
    </div>
  );
};

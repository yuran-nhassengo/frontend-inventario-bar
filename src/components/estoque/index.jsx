import React, { useState, useEffect } from 'react';
import {EntradaForm} from '../entrada';
import {SaidaForm} from '../saida';
import {RelatorioView }from '../relatorio';
import { Header } from '../header';
import axios from 'axios';

export const EstoqueView = () => {
  const [produtos, setProdutos] = useState([]);
  const [view, setView] = useState('estoque');

  const fecthStock = async () => {

    try {

      const response = await  axios.get("http://localhost:8000/api/stock/get-stock");

      console.log("teste",response.data);

      setProdutos(response.data);
      
    } catch (error) {

      console.log(error);

    }
  };

  useEffect(() => {
    fecthStock();
  }, []);

  return (
    
    <div>
    <Header/>

    <div className="max-w-4xl mx-auto p-4 bg-white shadow-md rounded-lg">
      
      {/* <div className="mb-4 flex space-x-4">
        <button
          onClick={() => setView('entrada')}
          className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Formulário de Entrada
        </button>
        <button
          onClick={() => setView('saida')}
          className="px-4 py-2 bg-red-600 text-white font-semibold rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Formulário de Saída
        </button>
        <button
          onClick={() => setView('relatorio')}
          className="px-4 py-2 bg-green-600 text-white font-semibold rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Relatórios
        </button>
      </div> */}

      {view === 'estoque' && (
        <>
          <h2 className="text-xl font-semibold mb-4">Visualizar Estoque</h2>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoria</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantidade</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Preço Compra</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Preço Venda</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {produtos.map((produto) => (
                <tr key={produto.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{produto.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{produto.nome}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{produto.categoria}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{produto.quantidade}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{produto.precoCompra.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{produto.precoVenda.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {view === 'entrada' && <EntradaForm />}
      {view === 'saida' && <SaidaForm />}
      {view === 'relatorio' && <RelatorioView />}
    </div>
    </div>
  );

  
};

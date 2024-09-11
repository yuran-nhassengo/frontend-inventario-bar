import React, { useState, useEffect } from 'react';
import { EntradaForm } from '../entrada';
import { SaidaForm } from '../saida';
import { RelatorioView } from '../relatorio';
import { Header } from '../header';
import axios from 'axios';
import { AdicionarProdutoForm } from '../produto';

export const EstoqueView = () => {
  const [produtos, setProdutos] = useState([]);
  const [view, setView] = useState('estoque');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fecthStock = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/stock/get-stock");
      setProdutos(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fecthStock();
  }, []);

  const openModal = (formType) => {
    setView(formType);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Header openModal={openModal} />
      <div className="max-w-4xl mx-auto p-4 bg-white shadow-md rounded-lg">
        {/* {view === 'estoque' && ( */}
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
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{produto._id}</td>
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
        {/* )} */}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto relative overflow-auto">
            <button onClick={closeModal} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
            {view === 'entrada' && <EntradaForm />}
            {view === 'saida' && <SaidaForm />}
            {view === 'relatorio' && <RelatorioView />}
            {view === 'produto' && <AdicionarProdutoForm />}
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { EntradaForm } from '../entrada';
import { SaidaForm } from '../saida';
import { RelatorioView } from '../relatorio';
import { Header } from '../header';
import { AdicionarProdutoForm } from '../produto';

export const EstoqueView = () => {
  const [produtos, setProdutos] = useState([]);
  const [view, setView] = useState('estoque');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [quantities, setQuantities] = useState({});

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

  const handleProductSelection = (e, produto) => {
    const { checked } = e.target;
    if (checked) {
      setSelectedProducts((prev) => [...prev, produto]);
      setQuantities((prev) => ({ ...prev, [produto._id]: produto.quantidade }));
    } else {
      setSelectedProducts((prev) => prev.filter(p => p._id !== produto.id));
      const { [produto._id]: removed, ...rest } = quantities;
      setQuantities(rest);
    }
  };

  const handleUpdateQuantities = async () => {
    try {
        const updates = Object.entries(quantities).map(([id, quantity]) => ({
            id,
            quantity,
        }));

         console.log("Dados a serem enviados para atualização:", updates);

        // Verifique se o updates array está vazio antes de enviar a requisição
        if (updates.length === 0) {
            alert('Nenhuma quantidade foi alterada.');
            return;
        }

        await axios.put("http://localhost:8000/api/stock/update-stock-all", {
            updates,
        });

        fecthStock(); // Recarregar o estoque após a atualização
        alert("Estoque atualizado com sucesso!");
        closeModal(); // Fechar o modal
    } catch (error) {
        // Adicione mais informações sobre o erro
        console.error("Erro ao atualizar o estoque:", error.response ? error.response.data : error.message);
        alert("Erro ao atualizar o estoque. Verifique o console para mais detalhes.");
    }
};


  const openUpdateQuantitiesModal = () => {
    if (selectedProducts.length > 0) {
      setView('update-quantities');
      setIsModalOpen(true);
    } else {
      alert('Selecione ao menos um produto.');
    }
  };

  return (
    <div>
      <Header openModal={openModal} />
      <div className="max-w-4xl mx-auto p-4 bg-white shadow-md rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Visualizar Estoque</h2>
        <button onClick={openUpdateQuantitiesModal} className="bg-green-500 text-white px-4 py-2 rounded mb-4">
          Atualizar Quantidades
        </button>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Selecionar
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nome
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Categoria
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Quantidade
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Preço Compra
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Preço Venda
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {produtos.map((produto) => (
              <tr key={produto.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <input
                    type="checkbox"
                    onChange={(e) => handleProductSelection(e, produto)}
                  />
                </td>
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
            {view === 'update-quantities' && (
              <>
                <h2 className="text-xl font-semibold mb-4">Atualizar Quantidades</h2>
                {selectedProducts.map((produto) => (
                  <div key={produto.id} className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      {produto.nome}
                      <input
                        type="number"
                        value={quantities[produto.id] || ""}
                        onChange={(e) => setQuantities((prev) => ({
                          ...prev,
                          [produto.id]: parseInt(e.target.value, 10) || 0
                        }))}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                      />
                    </label>
                  </div>
                ))}
                <button onClick={handleUpdateQuantities} className="bg-blue-500 text-white px-4 py-2 rounded">
                  Atualizar Quantidades
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

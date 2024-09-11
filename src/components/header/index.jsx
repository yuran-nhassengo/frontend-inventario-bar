import React from 'react';

export const Header = ({ openModal }) => {
  return (
    <header className="flex items-center justify-evenly mt-4 mb-16">
      <div>
        <h1 className="text-3xl">Inventario Orn Lounge & Bar</h1>
      </div>

      <div>
        <nav>
          <button
            onClick={() => openModal('entrada')}
            className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Formulário de Entrada
          </button>
          <button
            onClick={() => openModal('saida')}
            className="px-4 py-2 bg-red-600 text-white font-semibold rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Formulário de Saída
          </button>
          <button
            onClick={() => openModal('relatorio')}
            className="px-4 py-2 bg-green-600 text-white font-semibold rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Relatórios
          </button>
          <button
            onClick={() => openModal('produto')}
            className="px-4 py-2 bg-yellow-600 text-white font-semibold rounded-md shadow-sm hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
          >
            Produto
          </button>
        </nav>
      </div>
    </header>
  );
};

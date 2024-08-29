import React, { useState, useEffect } from 'react';

// Função para simular a geração de relatórios
export const gerarRelatorioExemplo = () => {
  return [
    { id: 1, tipo: 'Entrada', descricao: 'Entrada de 50 unidades de Cerveja', data: '2024-08-29' },
    { id: 2, tipo: 'Saída', descricao: 'Saída de 10 unidades de Cerveja', data: '2024-08-29' },
  ];
};

const RelatorioView = () => {
  const [relatorios, setRelatorios] = useState([]);

  useEffect(() => {
    // Simula a geração e obtenção dos relatórios
    setRelatorios(gerarRelatorioExemplo());
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Relatórios</h2>
      <button
        onClick={() => setRelatorios(gerarRelatorioExemplo())}
        className="mb-4 px-4 py-2 bg-green-600 text-white font-semibold rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
      >
        Gerar Relatório
      </button>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descrição</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {relatorios.map((relatorio) => (
            <tr key={relatorio.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{relatorio.id}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{relatorio.tipo}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{relatorio.descricao}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{relatorio.data}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


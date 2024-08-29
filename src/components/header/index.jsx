import React from 'react'

export const Header = () => {
  return (
    <header className="flex">
        <div>
         <h1>Inventario Orn Lounge & Bar</h1>
        </div>
        
        <nav>
        <button
          className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Formulário de Entrada
        </button>
        <button
          className="px-4 py-2 bg-red-600 text-white font-semibold rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Formulário de Saída
        </button>
        <button
          className="px-4 py-2 bg-green-600 text-white font-semibold rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Relatórios
        </button>
        </nav>
    </header>
  )
}



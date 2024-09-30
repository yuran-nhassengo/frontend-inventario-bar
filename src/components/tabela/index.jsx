import React, { useEffect, useState } from 'react'
import Item from './Item'
import { Header } from '../header';
import axios from 'axios';

const Table = () => {

    const [produtos, setProdutos] = useState([]);
    const [produtosUpdate, setProdutosUpdate] = useState([]);
    const [view, setView] = useState('estoque');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [quantities, setQuantities] = useState({});

    const [editar,setEditar] = useState(false);

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

    const handleEditar = ()=>{
        
        if(!editar){

         console.log("Produtos atualizados  ",produtosUpdate)
         alert("Produtos Alterados com Sucesso!")
        };
        
        setEditar(!editar);
    
    }

  return (
    <div>
        <Header openModal={openModal} />
      <div className='flex justify-center items-start'>
            <button onClick={handleEditar} className='w-auto border-2 px-2 text-white border-blue-300 bg-blue-400 rounded'>
                {editar?"Editar":"Salvar"}
            </button>
      </div>
      <div>
      <div className="border-2 border-black">
      <ul className="grid grid-cols-8 justify-center space-x-8 items-center">
        <li className='w-auto  '>ID</li>
        <li className="h-full col-span-3 border-l-4 ">PRODUTOS</li>
        <li className=" border-l-4 ">Quantidade Atual</li>
        <li className=" border-l-4 ">Quantidade Existente</li>
        <li className="h-full border-l-4 ">Motivos</li>
      </ul>
    </div>
        {/* {console.log("Tabela Produtos: "+JSON.stringify(produtos))} */}
        {produtos.map( item => { return <Item key={item._id} produto={item} disable={editar} setProdutos={setProdutosUpdate}/> } )}
        
        
      </div>
    </div>
  )
}

export default Table

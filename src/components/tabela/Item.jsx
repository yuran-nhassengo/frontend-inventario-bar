import React, { useState } from 'react'

const Item = ({disable,setProdutos, produto:{_id,nome,quantidade,qa,motivo} }) => {

        const [qAtual,setQAtual] = useState(quantidade);

        const handleQuantity = (id,qty) =>{

          setProdutos((currentState) =>{ 
            
            const existingProduct = currentState.findIndex(
                product => product.id === id
            );

            if(existingProduct !== -1){

                const updateProducts= [...currentState]
                updateProducts[existingProduct].qty =qty;

                return updateProducts;
            } else{

                return  [...currentState,{id,qty}]
            }

            
            
            
        
        
        
        });

          console.log("E Id: "+id+" Quantidade Atualizada: "+qty);
          
        }

  return (
    <div className="border-2 border-black">
      <ul className="grid grid-cols-8 justify-center space-x-8 items-center">
        <li className='w-auto border-l-2 border-black'>{_id}</li>
        <li className="col-span-3 border-l-4 ">{nome}</li>
        <li className='justify-center items-center border-l-4'>
            {quantidade}
        </li>
        <li >
            <input onInput={(e)=>setQAtual(e.target.value)} onBlur={()=>handleQuantity(_id,qAtual)} className={`border-l-4  w-full ${!disable ? "hover:border-blue-700" : ""}`} 
            disabled={disable} type="number" value={qAtual} placeholder="Quantidade Existente" />
        </li>
        <li className="border-l-4 w-full justify-center items-center">
            <select className=' justify-center items-center' disabled={disable} name="" id="">
                <option value="">Selecione...</option>
                <option value="falha">Falha de Registo</option>
                <option value="quebra">Quebra de Stock</option>
                <option value="acerto">Acerto de stock</option>
                <option value="outros">Outros</option>
            </select> 
            </li>
      </ul>
    </div>
  )
}

export default Item

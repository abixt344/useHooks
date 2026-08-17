import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';


  // Cadastros com hooks...
  const Cadastro = () => {
    const[tarefas, setTarefas] = useState([]);
    const[texto, setTexto] = useState('');
  
  // Carregar dados do localStorage ao abrir...
  useEffect(() => {
    const salvas = localStorage.getItem('tarefas');
    if(salvas){
      setTarefas(JSON.parse(salvas));
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
  }, [tarefas])
  const adicionar = (e) => {
    e.preventDefault();
    if (!texto.trim()) return;
      setTarefas([...tarefas, {texto}]);
      setTexto('');
  }
  const remover = (index) => {
    setTarefas(tarefas.filter((_, i) => i !==index));
  }

  return (
    <>
      <div>
        <h2>
          Gerenciador de Tarefas
        </h2>
        <form onSubmit={adicionar}>
          <input type="text" placeholder='Digite uma nova tarefa...' value={texto} 
          onChange={(e) => setTexto(e.target.value)}/>
          
          <button type='submit'>Adicionar</button>

        </form>
        
        <ul>
          {tarefas.map((item, index) => 
            <li key={index}>
              {item.texto}
              <button onClick={() => remover(index)}>Remover</button>
            </li>
          )}
        </ul>
      </div>

    </>
  )
  } //Fechamento da chave do const Cadastro

  function App() {
  return <Cadastro />;
}
  

export default App

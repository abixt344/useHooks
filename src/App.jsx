import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';

const Cadastro = () => {
  const [tarefas, setTarefas] = useState([]);
  const [texto, setTexto] = useState('');

  // Carregar dados do localStorage ao abrir
  useEffect(() => {
    const salvas = localStorage.getItem('tarefas');

    if (salvas) {
      setTarefas(JSON.parse(salvas));
    }
  }, []);

  // Salvar tarefas no localStorage
  useEffect(() => {
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
  }, [tarefas]);

  const adicionar = (e) => {
    e.preventDefault();

    if (!texto.trim()) return;

    setTarefas([...tarefas, { texto }]);
    setTexto('');
  };

  const remover = (index) => {
    setTarefas(tarefas.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-light min-vh-100 py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">

            <div className="card shadow border-0">
              
              <div className="card-header bg-primary text-white text-center py-4">
                <h1 className="h3 mb-1">
                  Gerenciador de Tarefas
                </h1>
                <p className="mb-0">
                  Organize suas tarefas de forma simples
                </p>
              </div>

              <div className="card-body p-4">

                <form onSubmit={adicionar} className="mb-4">
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Digite uma nova tarefa..."
                      value={texto}
                      onChange={(e) => setTexto(e.target.value)}
                    />

                    <button
                      type="submit"
                      className="btn btn-primary"
                    >
                      Adicionar
                    </button>
                  </div>
                </form>

                {tarefas.length === 0 ? (
                  <div className="text-center text-muted py-4">
                    <p className="mb-0">
                      Nenhuma tarefa cadastrada.
                    </p>
                  </div>
                ) : (
                  <ul className="list-group">
                    {tarefas.map((item, index) => (
                      <li
                        key={index}
                        className="list-group-item d-flex justify-content-between align-items-center"
                      >
                        <span>{item.texto}</span>

                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => remover(index)}
                        >
                          Remover
                        </button>
                      </li>
                    ))}
                  </ul>
                )}

              </div>

              <div className="card-footer text-center text-muted">
                <small>
                  Total de tarefas: <strong>{tarefas.length}</strong>
                </small>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

function App() {
  return <Cadastro />;
}

export default App;

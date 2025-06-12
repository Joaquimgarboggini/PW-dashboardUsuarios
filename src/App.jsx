import { useEffect, useState } from "react";
import UserCard from "./components/UserCard";
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPag = 5;

  useEffect(() => {
    fetch('http://localhost:3000/peoples')
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error('Erro ao buscar usuários: ', err));
  }, []);

  const lastUser = currentPage * usersPag;
  const firstUser = lastUser - usersPag;
  const currentUsers = users.slice(firstUser, lastUser);

  const nextPage = () => {
    if (currentPage < Math.ceil(users.length / usersPag)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (

    <div className="App">
      <h1>Dashboard de Usuários</h1>
      <p>Total de usuários: {users.length}</p>
      <div className="user-container">
        {currentUsers.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>

      <div className="pagination">
        <button className="pagination-button prev" onClick={prevPage} disabled={currentPage === 1}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
          </svg>
        </button>

        <span>{currentPage}/{Math.ceil(users.length / usersPag)}</span>

        <button className="pagination-button next" onClick={nextPage} disabled={currentPage === Math.ceil(users.length / usersPag)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8" />
          </svg>
        </button>
      </div>

    </div>
  );
}

export default App;
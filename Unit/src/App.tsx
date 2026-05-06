import { useState, useEffect } from 'react'
import './App.css'

function createBook(title: string, author: string, status: string) {
  return {
    id: crypto.randomUUID(),
    title,
    author,
    status,
  };
}

function App() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return localStorage.getItem("theme") === "dark";
  });

  const [books, setBooks] = useState<{id: string, title: string, author: string, status: string}[]>(() => {
  const saved = localStorage.getItem("books");
    return saved ? JSON.parse(saved) : [];
  });

  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [status, setStatus] = useState<string>("to-read");



  useEffect(() => {
    localStorage.setItem("books", JSON.stringify(books));
  }, [books]);

  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);



  function handleToggleTheme() {
    setDarkMode(!darkMode);
  }

  function handleAdd(book: {id: string, title: string, author: string, status: string}) {
    setBooks([...books, book]);
  }

  function handleDelete(id: string) {
    setBooks(books.filter(book => book.id !== id));
  }

  return (
    <div className={darkMode ? 'app dark' : 'app'}>

      <header className="header">
        <h1>Book List App</h1>
        <button className="toggle-btn" onClick={handleToggleTheme}>
          {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        </button>
      </header>

      <main className="main">
        <div className="list-side">
          <h2>My Books</h2>
          <table className="book-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Status</th> 
                {/* Could have made status editable */}
                <th>Actions</th> 
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book.id}>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.status}</td>
                  <td>
                    <button className="delete-btn" onClick={() => handleDelete(book.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="form-side">
          <h2>Add a New Book</h2>
          <form onSubmit={(e) => {
            e.preventDefault();
            handleAdd(createBook(title, author, status));
            setTitle("");
            setAuthor("");
            setStatus("to-read");
          }}>
            <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
            <input type="text" placeholder="Author" value={author} onChange={e => setAuthor(e.target.value)} />
            <select value={status} onChange={e => setStatus(e.target.value)}>
              <option value="to-read">To Read</option>
              <option value="reading">Reading</option>
              <option value="done">Done</option>
            </select>
            <button type="submit" className="add-btn">Add Book</button>
          </form>
        </div>
      </main>

    </div>
  )
}

export default App
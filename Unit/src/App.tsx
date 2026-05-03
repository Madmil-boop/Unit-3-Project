import { useState } from 'react'
import './App.css'

function App() {
  const [darkMode, setDarkMode] = useState(false);
  // const [books, setBooks] = useState([]);


  function handleToggleTheme() {
    setDarkMode(!darkMode);
  }

  return (
    <>
    <div className={darkMode ? 'dark-theme' : 'light-theme'}>

      <header>
        < h1>Book List App</h1>
        <button onClick={handleToggleTheme}>
          {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        </button>
      </header>

      <main>
        <div className="book-list">
          <h2>My Books</h2>
          <ul>
            {/* {books.map((book, index) => ( */}
              {/* <li key={index}>{book.title} by {book.author} - {book.status}</li> */}
            {/* ))} */}
          </ul> 
        </div>

        <div className="add-book-form">
          <h2>Add a New Book</h2>
          <form>
            <input type="text" placeholder="Title" />
            <input type="text" placeholder="Author" />
            <input type="text" placeholder="Status" />
            <button type="submit">Add Book</button>
          </form>
        </div>
      </main>
      </div>


    </>
  )
}

export default App

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function BookList() {
  const [books, setBooks] = useState([]);

  function loadBooks() {
    axios.get("https://worksheet-library.mashupstack.com/books")
      .then(response => {
        setBooks(response.data);
      });
  }

  useEffect(() => {
    loadBooks();
  }, []);

  function deleteBook(id) {
    axios.delete("https://worksheet-library.mashupstack.com/books/" + id)
      .then(() => {
        loadBooks();
      });
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Library Books</h1>

      <Link to="/add">
        <button>Add Book</button>
      </Link>

      <div style={{ marginTop: "20px" }}>
        {books.map(book => (
          <div key={book.id} style={{ 
              border: "1px solid black", 
              padding: "10px", 
              marginBottom: "10px" 
            }}>
            <h2>{book.title}</h2>
            <p><b>Author:</b> {book.author}</p>
            <p><b>Published Year:</b> {book.published_year}</p>
            <p><b>Genre:</b> {book.genre}</p>

            <Link to={`/edit/${book.id}`}>
              <button>Edit</button>
            </Link>

            <button onClick={() => deleteBook(book.id)} style={{ marginLeft: "10px" }}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookList;

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddBook() {
  const [book, setBook] = useState({
    title: "",
    author: "",
    published_year: "",
    genre: ""
  });

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    axios.post("https://worksheet-library.mashupstack.com/books", book)
      .then(() => {
        navigate("/");
      });
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Add New Book</h1>

      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Title" 
          value={book.title}
          onChange={e => setBook({...book, title: e.target.value})}
        /><br /><br />

        <input 
          type="text" 
          placeholder="Author" 
          value={book.author}
          onChange={e => setBook({...book, author: e.target.value})}
        /><br /><br />

        <input 
          type="number" 
          placeholder="Published Year" 
          value={book.published_year}
          onChange={e => setBook({...book, published_year: e.target.value})}
        /><br /><br />

        <input 
          type="text" 
          placeholder="Genre" 
          value={book.genre}
          onChange={e => setBook({...book, genre: e.target.value})}
        /><br /><br />

        <button type="submit">Add Book</button>
      </form>
    </div>
  );
}

export default AddBook;

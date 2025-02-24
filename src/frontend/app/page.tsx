'use client'

import React, { useEffect, useState } from "react";

interface Book {
  title: string;
  id: string;
}

const Home: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [errMessage, setErrMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:3000/api/books");
        // To do - replace hard-coded url by environment variable based declaration

        if (!response.ok) { // if HTTP-status is 200-299
          throw new Error(`HTTP Error: ${response.status}`);
        }
        console.log(response.status)

        const data = await response.json();
        console.log(data)
        setBooks(data);
        setErrMessage("");
      } catch (error) {
        console.error("An error occurred: ", error);
        setErrMessage("The service is not available at the moment. Try to refresh the page.",);
      }
    };

    fetchData();
  }, []);

  return (
<div>
        <h1 style={{marginBottom: "20px"}}>Book List</h1>
        {errMessage ? (
            <p>{errMessage}</p>
        ):(
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>id</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map((book, index) => {
                        return (
                            <tr key={index}>
                                <td>{book.title}</td> 
                                <td>{book.id}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        )}
    </div>
  );
};

export default Home;
